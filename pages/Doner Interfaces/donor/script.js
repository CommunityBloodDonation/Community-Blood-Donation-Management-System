
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


document.addEventListener("DOMContentLoaded", async () => {
    const profileBtn = document.getElementById("profileBtn");
    const profileCard = document.getElementById("profileCard");

    const informationBtn = document.getElementById("informationBtn");
    const quickInformationBtn = document.getElementById("quickInformationBtn");
    const bloodDetailsBtn = document.getElementById("bloodDetailsBtn");

    const informationModal = document.getElementById("informationModal");
    const updateModal = document.getElementById("updateModal");

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

    let donor = loadDonor();

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

        document.getElementById("eligibility").textContent =
            displayValue(donor.eligibility);

        document.getElementById("eligibleDate").textContent =
            donor.eligibleDate ? formatDate(donor.eligibleDate) : "Not available";

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

    // Close modals
    closeInformation.addEventListener("click", closeAllModals);
    closeUpdate.addEventListener("click", returnToInformation);

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

    updateDashboard();
});