/* =================================
   HOSPITAL DASHBOARD
================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =========================
       PROFILE MENU
    ========================= */

    const profileBtn = document.getElementById("profileBtn");
    const profileCard = document.getElementById("profileCard");
    const logoutBtn = document.getElementById("logoutBtn");


    if (profileBtn && profileCard) {

        profileBtn.addEventListener("click", function (event) {

            event.stopPropagation();

            profileCard.classList.toggle("show");

        });


        profileCard.addEventListener("click", function (event) {

            event.stopPropagation();

        });


        document.addEventListener("click", function () {

            profileCard.classList.remove("show");

        });

    }


    /* =========================
       LOGOUT
    ========================= */

    if (logoutBtn) {

        logoutBtn.addEventListener("click", function (event) {

            event.preventDefault();

            alert("Logout clicked.");

            /*
                Later connect this to your
                real login/backend system.

                Example:

                localStorage.removeItem("token");
                window.location.href = "login.html";
            */

        });

    }


    /* =========================
       LOAD HOSPITAL DATA
    ========================= */

    loadHospitalData();

});


/* =================================
   HOSPITAL DATA
================================= */

function loadHospitalData() {

    /*
        At this stage there is no fake
        blood request data.

        These values remain as "—"
        until your backend/database
        provides real information.
    */


    const totalRequests =
        document.getElementById("totalRequests");

    const activeRequests =
        document.getElementById("activeRequests");

    const fulfilledRequests =
        document.getElementById("fulfilledRequests");

    const availableDonors =
        document.getElementById("availableDonors");


    if (totalRequests) {
        totalRequests.textContent = "—";
    }

    if (activeRequests) {
        activeRequests.textContent = "—";
    }

    if (fulfilledRequests) {
        fulfilledRequests.textContent = "—";
    }

    if (availableDonors) {
        availableDonors.textContent = "—";
    }

}


/* =================================
   DISPLAY REAL BLOOD REQUESTS
================================= */

function displayRequests(requests) {

    const requestContainer =
        document.getElementById("requests");


    if (!requestContainer) {
        return;
    }


    /* No data */

    if (!requests || requests.length === 0) {

        requestContainer.innerHTML = `
            <p class="empty">
                No verified blood requests available.
            </p>
        `;

        return;

    }


    /* Create request elements */

    requestContainer.innerHTML = "";


    requests.forEach(function (request) {

        const item =
            document.createElement("div");

        item.className = "request";


        item.innerHTML = `

            <div class="blood-group">
                ${request.bloodGroup}
            </div>

            <div>

                <strong>
                    ${request.hospitalName}
                </strong>

                <small>
                    ${request.location}
                </small>

            </div>

            <span class="status">
                ${request.status}
            </span>

        `;


        requestContainer.appendChild(item);

    });

}


/* =================================
   FUTURE API FUNCTION
================================= */

async function loadRealRequests() {

    /*
        Later, when your backend is ready,
        you can replace this function with
        your real API request.

        Example:

        const response =
            await fetch("/api/blood-requests");

        const requests =
            await response.json();

        displayRequests(requests);
    */

}