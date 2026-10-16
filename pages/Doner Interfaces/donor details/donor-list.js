const SUPABASE_URL = "https://ayrcawqhhgpmllwvkjjr.supabase.co";
const SUPABASE_KEY = "sb_publishable_XNMDU8mTvE42rJ4LOwkKKA_tcTopl1-";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const donors = [];
let visibleDonors = [];
const donorList = document.getElementById("donorList");
const searchInput = document.getElementById("searchInput");
const bloodFilter = document.getElementById("bloodFilter");
const statusFilter = document.getElementById("statusFilter");
const donorCount = document.getElementById("donorCount");
const noResults = document.getElementById("noResults");
const preferenceMessage = document.getElementById("preferenceMessage");

function safeText(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[char]));
}

function displayDonors(list) {
    donorList.replaceChildren();
    donorCount.textContent = `${list.length} donor${list.length === 1 ? "" : "s"} found`;
    noResults.style.display = list.length ? "none" : "block";
    list.forEach((donor, index) => {
        const card = document.createElement("article");
        card.className = "donor-card";
        card.innerHTML = `
            <div class="donor-avatar">${safeText((donor.full_name || "D").charAt(0))}</div>
            <div class="donor-name"><strong>${safeText(donor.full_name || "Donor")}</strong><small>Blood Donor</small></div>
            <div class="blood">${safeText(donor.blood_group || "—")}</div>
            <div class="donor-location"><small>Location</small><strong>${safeText(donor.city || "Not specified")}</strong></div>
            <div class="status available">Available</div>
            <button class="view-btn" type="button" data-index="${index}">View Details</button>`;
        donorList.appendChild(card);
    });
    donorList.querySelectorAll("[data-index]").forEach(button => button.addEventListener("click", () => showDetails(list[Number(button.dataset.index)])));
}

function filterDonors() {
    const search = searchInput.value.trim().toLowerCase();
    const blood = bloodFilter.value;
    visibleDonors = donors.filter(donor => {
        const matchesSearch = `${donor.full_name || ""} ${donor.city || ""}`.toLowerCase().includes(search);
        return matchesSearch && (!blood || donor.blood_group === blood) && (!statusFilter.value || statusFilter.value === "Available");
    });
    displayDonors(visibleDonors);
}

function showDetails(donor) {
    document.getElementById("detailsAvatar").textContent = (donor.full_name || "D").charAt(0);
    document.getElementById("detailsName").textContent = donor.full_name || "Donor";
    document.getElementById("detailsBlood").textContent = donor.blood_group || "Not specified";
    document.getElementById("detailsCity").textContent = donor.city || "Not specified";
    document.getElementById("detailsLast").textContent = donor.last_donation || "Not specified";
    document.getElementById("detailsTotal").textContent = "Contact the hospital through an open request";
    document.getElementById("detailsStatus").textContent = "● Available for contact";
    detailsOverlay.classList.add("show");
}

const detailsOverlay = document.getElementById("detailsOverlay");
document.getElementById("closeDetails").addEventListener("click", () => detailsOverlay.classList.remove("show"));
document.getElementById("viewRequestsBtn").addEventListener("click", () => {
    window.location.href = "../../Public Interfaces/Blood Requests/blood-requests.html";
});
detailsOverlay.addEventListener("click", event => { if (event.target === detailsOverlay) detailsOverlay.classList.remove("show"); });
document.addEventListener("keydown", event => { if (event.key === "Escape") detailsOverlay.classList.remove("show"); });

async function loadDirectory() {
    donorList.innerHTML = "<p class='message'>Loading available donors…</p>";
    const { data, error } = await supabaseClient.from("available_donor_directory")
        .select("id, full_name, blood_group, city, last_donation, is_available")
        .order("full_name", { ascending: true });
    if (error) {
        console.error("Unable to load donor directory:", error);
        donorList.innerHTML = "<p class='message'>Donor directory is unavailable. Apply the latest Supabase SQL and try again.</p>";
        return;
    }
    donors.splice(0, donors.length, ...(data || []));
    filterDonors();
}

async function loadPreferences() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
        document.querySelector(".directory-preferences").hidden = true;
        return;
    }
    const { data, error } = await supabaseClient.from("donor_profiles")
        .select("is_available, contact_consent").eq("id", user.id).maybeSingle();
    if (error || !data) {
        preferenceMessage.textContent = "Sign in with a donor account to manage listing preferences.";
        return;
    }
    document.getElementById("availableToggle").checked = Boolean(data.is_available);
    document.getElementById("consentToggle").checked = Boolean(data.contact_consent);
}

document.getElementById("savePreferences").addEventListener("click", async () => {
    preferenceMessage.textContent = "Saving…";
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) { preferenceMessage.textContent = "Please sign in as a donor first."; return; }
    const { error } = await supabaseClient.from("donor_profiles").update({
        is_available: document.getElementById("availableToggle").checked,
        contact_consent: document.getElementById("consentToggle").checked
    }).eq("id", user.id);
    if (error) { preferenceMessage.textContent = `Unable to save: ${error.message}`; return; }
    preferenceMessage.textContent = "Preferences saved.";
    await loadDirectory();
});

searchInput.addEventListener("input", filterDonors);
bloodFilter.addEventListener("change", filterDonors);
statusFilter.addEventListener("change", filterDonors);
document.getElementById("profileBtn").addEventListener("click", event => { event.stopPropagation(); document.getElementById("profileCard").classList.toggle("show"); });
document.addEventListener("click", () => document.getElementById("profileCard").classList.remove("show"));
document.getElementById("profileCard").addEventListener("click", event => event.stopPropagation());
document.getElementById("logoutBtn").addEventListener("click", async event => {
    event.preventDefault();
    if (!confirm("Do you want to logout?")) return;
    const { error } = await supabaseClient.auth.signOut();
    if (error) { alert("Unable to log out. Please try again."); return; }
    window.location.href = "../../Public Interfaces/Home/index.html";
});

loadPreferences();
loadDirectory();
