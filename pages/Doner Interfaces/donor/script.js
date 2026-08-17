document.addEventListener("DOMContentLoaded", function () {

    const profileBtn = document.getElementById("profileBtn");
    const profileCard = document.getElementById("profileCard");
    const logoutBtn = document.getElementById("logoutBtn");
    const updateProfileBtn = document.getElementById("updateProfileBtn");
    const quickUpdateProfile = document.getElementById("quickUpdateProfile");
    const updateOverlay = document.getElementById("updateOverlay");
    const updateClose = document.getElementById("updateClose");
    const updateCancel = document.getElementById("updateCancel");


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


    /* UPDATE PROFILE MODAL */

    function openUpdateProfile(event) {
        if (event) {
            event.preventDefault();
        }

        profileCard.classList.remove("show");

        if (updateOverlay) {
            updateOverlay.classList.add("show");
        }
    }

    function closeUpdateProfile() {
        if (updateOverlay) {
            updateOverlay.classList.remove("show");
        }
    }

    if (updateProfileBtn) {
        updateProfileBtn.addEventListener("click", openUpdateProfile);
    }

    if (quickUpdateProfile) {
        quickUpdateProfile.addEventListener("click", openUpdateProfile);
    }

    if (updateClose) {
        updateClose.addEventListener("click", closeUpdateProfile);
    }

    if (updateCancel) {
        updateCancel.addEventListener("click", closeUpdateProfile);
    }

    if (updateOverlay) {
        updateOverlay.addEventListener("click", function (event) {
            if (event.target === updateOverlay) {
                closeUpdateProfile();
            }
        });
    }


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