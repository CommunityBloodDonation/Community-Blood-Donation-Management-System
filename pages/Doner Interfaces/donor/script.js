
let donor = {};


function formatDonationHistoryDate(value) {
    if (!value) {
        return "Not provided";
    }

    const date = new Date(value + "T00:00:00");
    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
}


async function loadDonorProfileFromSupabase() {
    if (!window.supabase || !supabaseClient) {
        console.warn("Supabase client is unavailable.");
        return null;
    }

    try {
        const {
            data: { user },
            error: authError
        } = await supabaseClient.auth.getUser();

        if (authError || !user) {
            console.warn("No authenticated donor session was found.", authError);
            return null;
        }

        const { data, error } = await supabaseClient
            .from("donor_profiles")
            .select("*")
            .eq("id", user.id)
            .maybeSingle();

        if (error) {
            console.error("Error loading donor profile from Supabase:", error);
            return null;
        }

        if (!data) {
            console.warn("No donor profile exists for the current authenticated user.");
            return null;
        }

        const donorProfile = {
            name: data.full_name || user.user_metadata?.full_name || "Donor",
            email: data.email || user.email || "",
            phone: data.phone || user.user_metadata?.phone || "",
            bloodGroup: data.blood_group || user.user_metadata?.blood_group || "",
            dob: data.dob || user.user_metadata?.dob || "",
            gender: data.gender || user.user_metadata?.gender || "",
            city: data.city || data.district || user.user_metadata?.city || user.user_metadata?.district || "",
            address: data.address || user.user_metadata?.address || "",
            lastDonation: data.last_donation || user.user_metadata?.last_donation || "",
            eligibility: "Not verified",
            eligibleDate: "",
            totalDonations: ""
        };

        localStorage.setItem("bloodConnectDonorProfile", JSON.stringify(donorProfile));
        return donorProfile;
    } catch (error) {
        console.error("Failed to sync donor profile from Supabase:", error);
        return null;
    }
}


async function loadDonorDonationCount(userId) {
    try {
        const {
            count,
            error
        } = await supabaseClient
            .from("donation_history")
            .select("id", {
                count: "exact",
                head: true
            })
            .eq("donor_id", userId)
            .eq("status", "completed");

        if (error) {
            console.error("Error loading donor donation count:", error);
            return 0;
        }

        return count ?? 0;
    } catch (error) {
        console.error("Failed to load donor donation count:", error);
        return 0;
    }
}


async function loadDonationHistory() {
    const historyList = document.getElementById("donationHistoryList");

    if (!historyList || !supabaseClient) {
        return;
    }

    try {
        const {
            data: { user },
            error: authError
        } = await supabaseClient.auth.getUser();

        if (authError || !user) {
            throw new Error("No authenticated donor session found.");
        }

        const { data, error } = await supabaseClient
            .from("donation_history")
            .select("id, donation_date, hospital_name, units, status")
            .eq("donor_id", user.id)
            .order("donation_date", { ascending: false });

        if (error) {
            throw error;
        }

        const completedDonations = (data || []).filter(
            donation => donation.status === "completed"
        );

        donor.lastDonation = completedDonations[0]?.donation_date || "";
        donor.totalDonations = completedDonations.length;
        localStorage.setItem(
            "bloodConnectDonorProfile",
            JSON.stringify(donor)
        );

        historyList.innerHTML = "";

        if (!data || data.length === 0) {
            historyList.innerHTML = `
                <div class="empty-state compact-empty">
                    <h3>No donations recorded yet</h3>
                    <p>Use Record Donation after you donate blood.</p>
                </div>
            `;
            return;
        }

        data.slice(0, 3).forEach(donation => {
            const item = document.createElement("article");
            item.className = "donation-history-item";

            const details = document.createElement("div");
            details.className = "donation-history-details";

            const date = document.createElement("strong");
            date.textContent = formatDonationHistoryDate(donation.donation_date);

            const hospital = document.createElement("small");
            hospital.textContent = donation.hospital_name || "Donation center not provided";

            const units = document.createElement("span");
            units.textContent = `${donation.units || 1} unit${donation.units === 1 ? "" : "s"}`;

            details.append(date, hospital);
            item.append(details, units);
            historyList.appendChild(item);
        });
    } catch (error) {
        console.error("Error loading donation history:", error);
        historyList.innerHTML = `
            <div class="empty-state compact-empty">
                <h3>Unable to load donation history</h3>
                <p>Check the donations table and its RLS policies.</p>
            </div>
        `;
    }
}


async function handleDonationSubmit(event) {
    event.preventDefault();

    const saveButton = document.getElementById("saveDonationBtn");
    const donationDate = document.getElementById("donationDate").value;
    const donationUnits = Number(document.getElementById("donationUnits").value);
    const donationHospital = document.getElementById("donationHospital").value.trim();

    if (saveButton) {
        saveButton.disabled = true;
        saveButton.textContent = "Saving...";
    }

    try {
        const {
            data: { user },
            error: authError
        } = await supabaseClient.auth.getUser();

        if (authError || !user) {
            throw new Error("Please log in again before recording a donation.");
        }

        const { error } = await supabaseClient
            .from("donation_history")
            .insert({
                donor_id: user.id,
                hospital_name: donationHospital,
                donation_date: donationDate,
                units: donationUnits,
                status: "completed"
            });

        if (error) {
            throw error;
        }

        const { error: profileError } = await supabaseClient
            .from("donor_profiles")
            .update({ last_donation: donationDate })
            .eq("id", user.id);

        if (profileError) {
            throw profileError;
        }

        donor.lastDonation = donationDate;
        donor.totalDonations = await loadDonorDonationCount(user.id);
        localStorage.setItem(
            "bloodConnectDonorProfile",
            JSON.stringify(donor)
        );
        window.location.reload();
        await loadDonationHistory();
        document.getElementById("donationForm").reset();
        document.getElementById("donationModal").classList.remove("show");
        document.body.style.overflow = "";
    } catch (error) {
        console.error("Error saving donation:", error);
        alert("Unable to save donation: " + error.message);
    } finally {
        if (saveButton) {
            saveButton.disabled = false;
            saveButton.textContent = "Save Donation";
        }
    }
}


async function loadEmergencyRequests() {
    const requestsContainer = document.getElementById("requests");

    if (!requestsContainer || !supabaseClient) {
        return;
    }

    try {
        const { data, error } = await supabaseClient
            .from("blood_requests")
            .select("id, blood_group, hospital_name, location, units, urgency, required_date")
            .eq("status", "open")
            .order("created_at", { ascending: false })
            .limit(3);

        if (error) {
            throw error;
        }

        requestsContainer.innerHTML = "";

        if (!data || data.length === 0) {
            requestsContainer.className = "empty-state";
            requestsContainer.innerHTML = `
                <div class="empty-icon">🩸</div>
                <h3>No current requests</h3>
                <p>There are no open hospital blood requests right now.</p>
            `;
            return;
        }

        requestsContainer.className = "request-preview-list";

        data.forEach(request => {
            const card = document.createElement("article");
            card.className = "request-preview-card";

            const details = document.createElement("div");
            details.className = "request-preview-details";

            const title = document.createElement("strong");
            title.textContent = `${request.blood_group || "N/A"} - ${request.units || 0} unit${request.units === 1 ? "" : "s"}`;

            const hospital = document.createElement("span");
            hospital.textContent = request.hospital_name || "Hospital";

            const location = document.createElement("small");
            location.textContent = request.location || "Location not specified";

            details.append(title, hospital, location);

            const urgency = document.createElement("span");
            urgency.className = "request-preview-urgency";
            urgency.textContent = request.urgency || "Normal";

            card.append(details, urgency);
            requestsContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading donor emergency requests:", error);
        requestsContainer.className = "empty-state";
        requestsContainer.innerHTML = `
            <div class="empty-icon">🩸</div>
            <h3>Unable to load requests</h3>
            <p>Please check the database connection and try again.</p>
        `;
    }
}


document.addEventListener("DOMContentLoaded", async () => {
    const profileBtn = document.getElementById("profileBtn");
    const profileCard = document.getElementById("profileCard");

    const informationBtn = document.getElementById("informationBtn");
    const quickInformationBtn = document.getElementById("quickInformationBtn");
    const bloodDetailsBtn = document.getElementById("bloodDetailsBtn");

    const informationModal = document.getElementById("informationModal");
    const updateModal = document.getElementById("updateModal");
    const donationModal = document.getElementById("donationModal");
    const eligibilityModal = document.getElementById("eligibilityModal");

    const informationContent = document.getElementById("informationContent");
    const updateContent = document.getElementById("updateContent");

    const closeInformation = document.getElementById("closeInformation");
    const closeUpdate = document.getElementById("closeUpdate");
    const logoutBtn = document.getElementById("logoutBtn");

    const STORAGE_KEY = "bloodConnectDonorProfile";

    const defaultDonor = {
        name: "",
        email: "",
        phone: "",
        bloodGroup: "",
        dob: "",
        gender: "",
        city: "",
        address: "",
        lastDonation: "",
        eligibility: "Not verified",
        eligibleDate: "",
        totalDonations: ""
    };

    donor = loadDonor();

    function loadDonor() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? { ...defaultDonor, ...JSON.parse(saved) } : { ...defaultDonor };
        } catch (error) {
            console.error("Could not load donor profile:", error);
            return { ...defaultDonor };
        }
    }

    function saveDonor() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(donor));
    }

    function displayValue(value) {
        return value && String(value).trim() ? String(value) : "Not provided";
    }

    function calculateEligibility(lastDonation, dob) {
        if (!lastDonation || !dob) {
            return "Not verified";
        }

        const today = new Date();
        const birthDate = new Date(dob + "T00:00:00");
        const donationDate = new Date(lastDonation + "T00:00:00");

        if (Number.isNaN(birthDate.getTime()) || Number.isNaN(donationDate.getTime())) {
            return "Not verified";
        }

        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18 || age > 60) {
            return "Not eligible";
        }

        const diffTime = today - donationDate;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays < 180) {
            return "Not eligible";
        }

        return "Eligible";
    }

    function calculateNextEligibleDate(lastDonation) {
        if (!lastDonation) return "Not available";

        const date = new Date(lastDonation + "T00:00:00");
        if (Number.isNaN(date.getTime())) return "Not available";

        const eligibleDate = new Date(date);
        eligibleDate.setDate(eligibleDate.getDate() + 180);

        return eligibleDate.toISOString().split("T")[0];
    }

    function formatDate(value) {
        if (!value) return "Not provided";

        const date = new Date(value + "T00:00:00");
        if (Number.isNaN(date.getTime())) return value;

        return date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    }

    function updateDashboard() {
        const firstName = donor.name.trim().split(/\s+/)[0] || "Donor";
        const initial = firstName.charAt(0).toUpperCase() || "D";

        document.getElementById("welcomeName").textContent = firstName;
        document.getElementById("menuDonorName").textContent = firstName;
        document.getElementById("menuDonorName2").textContent = firstName;

        document.querySelectorAll(".avatar").forEach(avatar => {
            avatar.textContent = initial;
        });

        document.getElementById("bloodGroup").textContent =
            displayValue(donor.bloodGroup);

        donor.eligibility = calculateEligibility(donor.lastDonation, donor.dob);
        donor.eligibleDate = donor.lastDonation ? calculateNextEligibleDate(donor.lastDonation) : "";

        document.getElementById("eligibility").textContent =
            displayValue(donor.eligibility);

        document.getElementById("eligibleDate").textContent =
            donor.eligibleDate && donor.eligibleDate !== "Not available" ? formatDate(donor.eligibleDate) : "Not available";

        document.getElementById("lastDonation").textContent =
            donor.lastDonation ? formatDate(donor.lastDonation) : "Not provided";

        document.getElementById("lastDonationAgo").textContent =
            donor.lastDonation ? "Last recorded donation" : "Donation history unavailable";

        document.getElementById("totalDonations").textContent =
            displayValue(donor.totalDonations);
    }

    function openInformationModal() {
        profileCard.classList.remove("show");
        profileBtn.setAttribute("aria-expanded", "false");
        informationModal.classList.add("show");
        document.body.style.overflow = "hidden";
        loadInformationContent();
    }

    function openUpdateModal() {
        informationModal.classList.remove("show");
        updateModal.classList.add("show");
        loadUpdateContent();
    }

    function closeAllModals() {
        informationModal.classList.remove("show");
        updateModal.classList.remove("show");
        donationModal.classList.remove("show");
        eligibilityModal.classList.remove("show");
        document.body.style.overflow = "";
    }

    async function loadInformationContent() {
        try {
            const response = await fetch("donor-information.html");
            if (!response.ok) throw new Error("Could not load information page.");

            informationContent.innerHTML = await response.text();
            populateInformation();

            document.getElementById("openUpdateBtn")
                .addEventListener("click", openUpdateModal);
        } catch (error) {
            informationContent.innerHTML = `
                <p class="loading-message">
                    Unable to load donor information. Please run this page using
                    VS Code Live Server and check that donor-information.html exists.
                </p>`;
            console.error(error);
        }
    }

    function populateInformation() {
        const fields = {
            infoName: displayValue(donor.name),
            infoFullName: displayValue(donor.name),
            infoEmail: displayValue(donor.email),
            infoPhone: displayValue(donor.phone),
            infoBloodGroup: displayValue(donor.bloodGroup),
            infoDob: formatDate(donor.dob),
            infoGender: displayValue(donor.gender),
            infoCity: displayValue(donor.city),
            infoAddress: displayValue(donor.address),
            infoLastDonation: formatDate(donor.lastDonation),
            infoEligibility: displayValue(donor.eligibility)
        };

        Object.entries(fields).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });

        const initial = (donor.name.trim().charAt(0) || "D").toUpperCase();
        const infoInitial = document.getElementById("infoInitial");
        if (infoInitial) infoInitial.textContent = initial;
    }

    async function loadUpdateContent() {
        try {
            const response = await fetch("donor-update-profile.html");
            if (!response.ok) throw new Error("Could not load update form.");

            updateContent.innerHTML = await response.text();
            populateUpdateForm();

            document.getElementById("updateForm")
                .addEventListener("submit", handleUpdateSubmit);

            document.getElementById("cancelUpdate")
                .addEventListener("click", returnToInformation);

        } catch (error) {
            updateContent.innerHTML = `
                <p class="loading-message">
                    Unable to load the update form. Please run this page using
                    VS Code Live Server and check that donor-update-profile.html exists.
                </p>`;
            console.error(error);
        }
    }

    function populateUpdateForm() {
        const formFields = {
            donorName: donor.name,
            donorEmail: donor.email,
            donorPhone: donor.phone,
            donorBloodGroup: donor.bloodGroup,
            donorDob: donor.dob,
            donorGender: donor.gender,
            donorCity: donor.city,
            donorAddress: donor.address,
            donorLastDonation: donor.lastDonation
        };

        Object.entries(formFields).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.value = value || "";
        });
    }

    async function handleUpdateSubmit(event) {
        event.preventDefault();

        donor = {
            ...donor,
            name: document.getElementById("donorName").value.trim(),
            email: document.getElementById("donorEmail").value.trim(),
            phone: document.getElementById("donorPhone").value.trim(),
            bloodGroup: document.getElementById("donorBloodGroup").value,
            dob: document.getElementById("donorDob").value,
            gender: document.getElementById("donorGender").value,
            city: document.getElementById("donorCity").value.trim(),
            address: document.getElementById("donorAddress").value.trim(),
            lastDonation: document.getElementById("donorLastDonation").value
        };

        donor.eligibility = calculateEligibility(donor.lastDonation, donor.dob);
        donor.eligibleDate = donor.lastDonation ? calculateNextEligibleDate(donor.lastDonation) : "";

        try {
            if (supabaseClient && supabaseClient.auth) {
                const {
                    data: { user },
                    error: userError
                } = await supabaseClient.auth.getUser();

                if (userError || !user) {
                    throw new Error("User session not found. Please log in again.");
                }

                const { error: dbError } = await supabaseClient
                    .from("donor_profiles")
                    .upsert({
                        id: user.id,
                        full_name: donor.name,
                        email: donor.email,
                        phone: donor.phone,
                        blood_group: donor.bloodGroup,
                        dob: donor.dob || null,
                        gender: donor.gender || null,
                        city: donor.city || null,
                        address: donor.address || null,
                        last_donation: donor.lastDonation || null
                    }, {
                        onConflict: "id"
                    });

                if (dbError) {
                    console.error("Supabase donor profile update failed:", dbError);
                    throw dbError;
                }

                if (donor.lastDonation) {
                    const { data: latestDonation, error: historyLookupError } = await supabaseClient
                        .from("donation_history")
                        .select("id")
                        .eq("donor_id", user.id)
                        .eq("status", "completed")
                        .order("donation_date", { ascending: false })
                        .limit(1)
                        .maybeSingle();

                    if (historyLookupError) {
                        throw historyLookupError;
                    }

                    if (latestDonation) {
                        const { error: historyUpdateError } = await supabaseClient
                            .from("donation_history")
                            .update({ donation_date: donor.lastDonation })
                            .eq("id", latestDonation.id)
                            .eq("donor_id", user.id);

                        if (historyUpdateError) {
                            throw historyUpdateError;
                        }
                    } else {
                        const { error: historyInsertError } = await supabaseClient
                            .from("donation_history")
                            .insert({
                                donor_id: user.id,
                                donation_date: donor.lastDonation,
                                units: 1,
                                status: "completed",
                                hospital_name: "Updated from donor profile"
                            });

                        if (historyInsertError) {
                            throw historyInsertError;
                        }
                    }
                }
            }

            saveDonor();
            updateDashboard();
            returnToInformation();
        } catch (error) {
            alert("Unable to save your profile. Please check your Supabase table and RLS policies.");
            console.error(error);
        }
    }

    function returnToInformation() {
        updateModal.classList.remove("show");
        informationModal.classList.add("show");
        document.body.style.overflow = "hidden";
        loadInformationContent();
    }

    // Dropdown toggle
    profileBtn.addEventListener("click", event => {
        event.stopPropagation();
        const isOpen = profileCard.classList.toggle("show");
        profileBtn.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", event => {
        if (!profileCard.contains(event.target) && !profileBtn.contains(event.target)) {
            profileCard.classList.remove("show");
            profileBtn.setAttribute("aria-expanded", "false");
        }
    });

    // Open information modal
    informationBtn.addEventListener("click", openInformationModal);
    quickInformationBtn.addEventListener("click", openInformationModal);
    bloodDetailsBtn.addEventListener("click", openInformationModal);

    document.getElementById("checkEligibilityBtn").addEventListener("click", () => {
        const eligibility = calculateEligibility(donor.lastDonation, donor.dob);
        const eligibleDate = donor.lastDonation
            ? calculateNextEligibleDate(donor.lastDonation)
            : "Not available";

        document.getElementById("eligibilityBloodGroup").textContent =
            displayValue(donor.bloodGroup);
        document.getElementById("eligibilityPopupStatus").textContent =
            displayValue(eligibility);
        document.getElementById("eligibilityPopupLastDonation").textContent =
            donor.lastDonation ? formatDate(donor.lastDonation) : "Not provided";
        document.getElementById("eligibilityPopupDate").textContent =
            eligibleDate === "Not available" ? eligibleDate : formatDate(eligibleDate);

        eligibilityModal.classList.add("show");
        document.body.style.overflow = "hidden";
    });

    document.getElementById("closeEligibility").addEventListener("click", closeAllModals);
    document.getElementById("closeEligibilityBtn").addEventListener("click", closeAllModals);

    // Close modals
    closeInformation.addEventListener("click", closeAllModals);
    closeUpdate.addEventListener("click", returnToInformation);

    document.getElementById("recordDonationBtn").addEventListener("click", () => {
        document.getElementById("donationDate").value = new Date().toISOString().split("T")[0];
        donationModal.classList.add("show");
        document.body.style.overflow = "hidden";
    });

    document.getElementById("closeDonation").addEventListener("click", closeAllModals);
    document.getElementById("cancelDonation").addEventListener("click", closeAllModals);
    document.getElementById("donationForm").addEventListener("submit", handleDonationSubmit);

    informationModal.addEventListener("click", event => {
        if (event.target === informationModal) closeAllModals();
    });

    updateModal.addEventListener("click", event => {
        if (event.target === updateModal) returnToInformation();
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            if (updateModal.classList.contains("show")) {
                returnToInformation();
            } else {
                closeAllModals();
            }
        }
    });

    // Logout
    logoutBtn.addEventListener("click", async () => {
        const confirmed = confirm("Are you sure you want to log out?");
        if (!confirmed) return;

        if (supabaseClient && supabaseClient.auth) {
            await supabaseClient.auth.signOut();
        }

        localStorage.removeItem("bloodConnectDonorProfile");
        window.location.href = "../../Public Interfaces/Home/Home.html";
    });

    // Initial dashboard render
    const syncedProfile = await loadDonorProfileFromSupabase();
    if (syncedProfile) {
        donor = { ...defaultDonor, ...syncedProfile };
    }

    if (supabaseClient && supabaseClient.auth) {
        const {
            data: { user }
        } = await supabaseClient.auth.getUser();

        if (user) {
            donor.totalDonations = await loadDonorDonationCount(user.id);
        }
    }

    await loadEmergencyRequests();
    await loadDonationHistory();

    updateDashboard();
});