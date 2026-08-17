document.addEventListener("DOMContentLoaded", function () {

    const profileBtn = document.getElementById("profileBtn");
    const profileCard = document.getElementById("profileCard");
    const logoutBtn = document.getElementById("logoutBtn");


    /* CHECK ELEMENTS */

    if (!profileBtn) {
        console.log("Profile button not found");
        return;
    }

    if (!profileCard) {
        console.log("Profile card not found");
        return;
    }


    /* OPEN PROFILE MENU */

    profileBtn.addEventListener("click", function (event) {

        event.stopPropagation();

        profileCard.classList.toggle("show");

    });


    /* PREVENT CARD FROM CLOSING */

    profileCard.addEventListener("click", function (event) {

        event.stopPropagation();

    });


    /* CLOSE WHEN CLICKING OUTSIDE */

    document.addEventListener("click", function () {

        profileCard.classList.remove("show");

    });


    /* LOGOUT */

    if(logoutBtn){

        logoutBtn.addEventListener("click", function(event){

            event.preventDefault();

            if(confirm("Do you want to logout?")){

                window.location.href = "../../Public Interfaces/Home/Home.html";

            }

        });

    }

});