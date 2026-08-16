(function(){

    function setupUpdatePopup(){

        const overlay =
            document.getElementById("updateOverlay");

        const openButton =
            document.getElementById("openUpdateProfile");

        const closeButton =
            document.getElementById("closeUpdate");

        const cancelButton =
            document.getElementById("cancelUpdate");

        const form =
            document.getElementById("hospitalUpdateForm");


        if(!overlay || !openButton || !form){
            return;
        }


        /* =========================
           CLOSE POPUP
        ========================= */

        function hidePopup(){

            overlay.classList.remove("show");

            document.body.style.overflow = "";

        }


        /* =========================
           OPEN POPUP
        ========================= */

        openButton.addEventListener(
            "click",
            function(event){

                event.preventDefault();

                overlay.classList.add("show");

                document.body.style.overflow =
                    "hidden";

            }
        );


        /* CLOSE BUTTON */

        closeButton.addEventListener(
            "click",
            hidePopup
        );


        /* CANCEL BUTTON */

        cancelButton.addEventListener(
            "click",
            hidePopup
        );


        /* CLICK OUTSIDE */

        overlay.addEventListener(
            "click",
            function(event){

                if(event.target === overlay){

                    hidePopup();

                }

            }
        );


        /* ESC KEY */

        document.addEventListener(
            "keydown",
            function(event){

                if(
                    event.key === "Escape" &&
                    overlay.classList.contains("show")
                ){

                    hidePopup();

                }

            }
        );


        /* =========================
           SAVE FORM
        ========================= */

        form.addEventListener(
            "submit",
            function(event){

                event.preventDefault();


                const password =
                    document.getElementById(
                        "newPassword"
                    ).value;


                const confirmPassword =
                    document.getElementById(
                        "confirmPassword"
                    ).value;


                /* PASSWORD CHECK */

                if(
                    password &&
                    password !== confirmPassword
                ){

                    alert(
                        "New password and confirm password do not match."
                    );

                    return;

                }


                /*
                   FRONTEND ONLY

                   Later this section will send
                   the information to your backend.
                */

                alert(
                    "Hospital profile updated successfully."
                );


                hidePopup();

            }
        );

    }


    /* =========================
       LOAD POPUP HTML
    ========================= */

    fetch("hospital-update.html")

        .then(function(response){

            if(!response.ok){

                throw new Error(
                    "hospital-update.html could not be loaded"
                );

            }

            return response.text();

        })

        .then(function(html){

            const container =
                document.getElementById(
                    "updatePopupContainer"
                );

            container.innerHTML = html;

            setupUpdatePopup();

        })

        .catch(function(error){

            console.error(error);

            alert(
                "Update Profile could not be loaded. " +
                "Please run the project using VS Code Live Server."
            );

        });

})();