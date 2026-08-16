document.addEventListener("DOMContentLoaded", function(){

    const profileBtn = document.getElementById("profileBtn");
    const profileCard = document.getElementById("profileCard");
    const logoutBtn = document.getElementById("logoutBtn");


    /* PROFILE DROPDOWN */

    if(profileBtn && profileCard){

        profileBtn.addEventListener("click", function(event){

            event.stopPropagation();

            profileCard.classList.toggle("show");

        });


        profileCard.addEventListener("click", function(event){

            event.stopPropagation();

        });


        document.addEventListener("click", function(){

            profileCard.classList.remove("show");

        });

    }


    /* LOGOUT */

    if(logoutBtn){

        logoutBtn.addEventListener("click", function(event){

            event.preventDefault();

            if(confirm("Do you want to logout?")){

                alert("Logout successful.");

                /*
                Later connect this to your login page:

                window.location.href = "login.html";
                */

            }

        });

    }


    loadHospitalData();

});


/* HOSPITAL DATA */

function loadHospitalData(){

    document.getElementById("totalRequests").textContent = "—";

    document.getElementById("activeRequests").textContent = "—";

    document.getElementById("fulfilledRequests").textContent = "—";

    document.getElementById("availableDonors").textContent = "—";

}


/* DISPLAY REAL REQUESTS FROM BACKEND */

function displayRequests(requests){

    const box = document.getElementById("requests");

    if(!box){
        return;
    }


    if(!requests || requests.length === 0){

        box.innerHTML =
            '<p class="empty">No verified blood requests available.</p>';

        return;

    }


    box.innerHTML = "";


    requests.forEach(function(request){

        const item = document.createElement("div");

        item.className = "request";


        item.innerHTML = `
            <div class="blood-group">
                ${request.bloodGroup}
            </div>

            <div>
                <strong>${request.hospitalName}</strong>
                <small>${request.location}</small>
            </div>

            <span class="status">
                ${request.status}
            </span>
        `;


        box.appendChild(item);

    });

}