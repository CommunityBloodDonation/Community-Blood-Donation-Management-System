/* ===============================
   DONOR LIST
   =============================== */


/* Temporary UI data
   Replace this later with API data
*/

const donors = [
    {
        name: "Donor One",
        blood: "O+",
        city: "Colombo",
        status: "Available",
        lastDonation: "—",
        total: "—"
    },
    {
        name: "Donor Two",
        blood: "A+",
        city: "Kandy",
        status: "Available",
        lastDonation: "—",
        total: "—"
    },
    {
        name: "Donor Three",
        blood: "B+",
        city: "Galle",
        status: "Unavailable",
        lastDonation: "—",
        total: "—"
    }
];


const donorList = document.getElementById("donorList");
const searchInput = document.getElementById("searchInput");
const bloodFilter = document.getElementById("bloodFilter");
const statusFilter = document.getElementById("statusFilter");
const donorCount = document.getElementById("donorCount");
const noResults = document.getElementById("noResults");


/* ===============================
   DISPLAY DONORS
   =============================== */

function displayDonors(list) {

    donorList.innerHTML = "";

    donorCount.textContent =
        `${list.length} donor${list.length !== 1 ? "s" : ""} found`;


    if (list.length === 0) {

        noResults.style.display = "block";

        return;
    }


    noResults.style.display = "none";


    list.forEach((donor, index) => {

        const card = document.createElement("article");

        card.className = "donor-card";


        card.innerHTML = `

            <div class="donor-avatar">
                ${donor.name.charAt(0)}
            </div>

            <div class="donor-name">
                <strong>${donor.name}</strong>
                <small>Blood Donor</small>
            </div>

            <div class="blood">
                ${donor.blood}
            </div>

            <div class="donor-location">
                <small>Location</small>
                <strong>${donor.city}</strong>
            </div>

            <div class="status ${
                donor.status === "Available"
                ? "available"
                : "unavailable"
            }">

                ● ${donor.status}

            </div>

            <button
                class="view-btn"
                onclick="showDetails(${index})">

                View Details

            </button>
        `;


        donorList.appendChild(card);

    });

}


/* ===============================
   SEARCH + FILTER
   =============================== */

function filterDonors() {

    const search =
        searchInput.value.toLowerCase().trim();

    const blood =
        bloodFilter.value;

    const status =
        statusFilter.value;


    const filtered = donors.filter(donor => {

        const matchesSearch =
            donor.name.toLowerCase().includes(search) ||
            donor.city.toLowerCase().includes(search);


        const matchesBlood =
            blood === "" ||
            donor.blood === blood;


        const matchesStatus =
            status === "" ||
            donor.status === status;


        return (
            matchesSearch &&
            matchesBlood &&
            matchesStatus
        );

    });


    displayDonors(filtered);
}


searchInput.addEventListener(
    "input",
    filterDonors
);

bloodFilter.addEventListener(
    "change",
    filterDonors
);

statusFilter.addEventListener(
    "change",
    filterDonors
);


/* ===============================
   DETAILS POPUP
   =============================== */

const detailsOverlay =
    document.getElementById("detailsOverlay");

const closeDetails =
    document.getElementById("closeDetails");


function showDetails(index) {

    const donor = donors[index];


    document.getElementById("detailsAvatar")
        .textContent = donor.name.charAt(0);

    document.getElementById("detailsName")
        .textContent = donor.name;

    document.getElementById("detailsBlood")
        .textContent = donor.blood;

    document.getElementById("detailsCity")
        .textContent = donor.city;

    document.getElementById("detailsLast")
        .textContent = donor.lastDonation;

    document.getElementById("detailsTotal")
        .textContent = donor.total;


    document.getElementById("detailsStatus")
        .textContent = `● ${donor.status}`;


    detailsOverlay.classList.add("show");
}


/* ===============================
   CLOSE POPUP
   =============================== */

closeDetails.addEventListener(
    "click",
    function () {

        detailsOverlay.classList.remove("show");

    }
);


detailsOverlay.addEventListener(
    "click",
    function (event) {

        if (event.target === detailsOverlay) {

            detailsOverlay.classList.remove("show");

        }

    }
);


/* ESC KEY */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            detailsOverlay.classList.remove("show");

        }

    }
);


/* ===============================
   PROFILE DROPDOWN
   =============================== */

const profileBtn =
    document.getElementById("profileBtn");

const profileCard =
    document.getElementById("profileCard");


profileBtn.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        profileCard.classList.toggle("show");

    }
);


profileCard.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

    }
);


document.addEventListener(
    "click",
    function () {

        profileCard.classList.remove("show");

    }
);


/* ===============================
   LOGOUT
   =============================== */

document.getElementById("logoutBtn")
    .addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            if (confirm("Do you want to logout?")) {

                window.location.href =
                    "../../Public Interfaces/Home/index.html";

            }

        }
    );


/* ===============================
   INITIAL LOAD
   =============================== */

displayDonors(donors);
