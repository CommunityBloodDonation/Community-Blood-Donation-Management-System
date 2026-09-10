/* ==================================================
   HOSPITAL PROFILE DATA
================================================== */

let hospitalData = {

    name: "City Hospital",

    email: "hospital@example.com",

    phone: "+94 11 234 5678",

    location: "Colombo",

    registration: "HSP-001",

    type: "General Hospital",

    address: "123 Main Street, Colombo, Sri Lanka",

    bloodBank: "Available",

    emergency: "+94 77 123 4567"

};



/* ==================================================
   GET ELEMENTS
================================================== */

const profileBtn =
    document.getElementById("profileBtn");

const profileCard =
    document.getElementById("profileCard");

const informationBtn =
    document.getElementById("informationBtn");

const informationModal =
    document.getElementById("informationModal");

const updateModal =
    document.getElementById("updateModal");

const openUpdateBtn =
    document.getElementById("openUpdateBtn");

const quickUpdateProfile =
    document.getElementById("quickUpdateProfile");

const closeInformation =
    document.getElementById("closeInformation");

const closeUpdate =
    document.getElementById("closeUpdate");

const cancelUpdate =
    document.getElementById("cancelUpdate");

const updateForm =
    document.getElementById("updateForm");

const logoutBtn =
    document.getElementById("logoutBtn");



/* ==================================================
   CREATE REQUEST ELEMENTS
================================================== */

const createRequestBtn =
    document.getElementById("createRequestBtn");

const requestModal =
    document.getElementById("requestModal");

const closeRequest =
    document.getElementById("closeRequest");

const cancelRequest =
    document.getElementById("cancelRequest");

const requestForm =
    document.getElementById("requestForm");



/* ==================================================
   PROFILE DROPDOWN
================================================== */

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



/* ==================================================
   OPEN INFORMATION MODAL
================================================== */

function openInformation() {

    profileCard.classList.remove("show");

    updateInformationDisplay();

    informationModal.classList.add("show");

}


informationBtn.addEventListener(
    "click",
    openInformation
);



/* ==================================================
   QUICK INFORMATION
================================================== */

quickUpdateProfile.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        openInformation();

    }
);



/* ==================================================
   CLOSE INFORMATION
================================================== */

closeInformation.addEventListener(
    "click",
    function () {

        informationModal.classList.remove("show");

    }
);



/* ==================================================
   OPEN UPDATE PROFILE
================================================== */

function openUpdate() {


    document.getElementById(
        "hospitalName"
    ).value =
        hospitalData.name;


    document.getElementById(
        "hospitalEmail"
    ).value =
        hospitalData.email;


    document.getElementById(
        "hospitalPhone"
    ).value =
        hospitalData.phone;


    document.getElementById(
        "hospitalLocation"
    ).value =
        hospitalData.location;


    document.getElementById(
        "registrationNumber"
    ).value =
        hospitalData.registration;


    document.getElementById(
        "hospitalType"
    ).value =
        hospitalData.type;


    document.getElementById(
        "hospitalAddress"
    ).value =
        hospitalData.address;


    document.getElementById(
        "bloodBank"
    ).value =
        hospitalData.bloodBank;


    document.getElementById(
        "emergencyContact"
    ).value =
        hospitalData.emergency;


    informationModal.classList.remove("show");

    updateModal.classList.add("show");

}


openUpdateBtn.addEventListener(
    "click",
    openUpdate
);



/* ==================================================
   CANCEL PROFILE UPDATE
================================================== */

function cancelProfileUpdate() {

    /*
       Do not change hospitalData.
    */

    updateModal.classList.remove("show");

    informationModal.classList.add("show");

}


cancelUpdate.addEventListener(
    "click",
    cancelProfileUpdate
);


closeUpdate.addEventListener(
    "click",
    cancelProfileUpdate
);



/* ==================================================
   SAVE PROFILE
================================================== */

updateForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "hospitalName"
            ).value.trim();


        const email =
            document.getElementById(
                "hospitalEmail"
            ).value.trim();


        const phone =
            document.getElementById(
                "hospitalPhone"
            ).value.trim();


        const location =
            document.getElementById(
                "hospitalLocation"
            ).value.trim();


        const registration =
            document.getElementById(
                "registrationNumber"
            ).value.trim();


        const type =
            document.getElementById(
                "hospitalType"
            ).value;


        const address =
            document.getElementById(
                "hospitalAddress"
            ).value.trim();


        const bloodBank =
            document.getElementById(
                "bloodBank"
            ).value;


        const emergency =
            document.getElementById(
                "emergencyContact"
            ).value.trim();



        /* VALIDATION */

        if (
            !name ||
            !email ||
            !phone ||
            !location ||
            !registration ||
            !address ||
            !emergency
        ) {

            alert(
                "Please complete all required fields."
            );

            return;

        }



        /* UPDATE DATA */

        hospitalData = {

            name: name,

            email: email,

            phone: phone,

            location: location,

            registration: registration,

            type: type,

            address: address,

            bloodBank: bloodBank,

            emergency: emergency

        };



        /* UPDATE DASHBOARD */

        document.getElementById(
            "welcomeName"
        ).textContent =
            hospitalData.name + "!";


        document.getElementById(
            "menuHospitalName"
        ).textContent =
            hospitalData.name;



        /* CLOSE UPDATE */

        updateModal.classList.remove("show");


        /* REFRESH INFORMATION */

        updateInformationDisplay();


        /* OPEN INFORMATION */

        informationModal.classList.add("show");


        console.log(
            "Hospital profile updated."
        );

    }
);



/* ==================================================
   UPDATE INFORMATION DISPLAY
================================================== */

function updateInformationDisplay() {

    document.getElementById(
        "infoName"
    ).textContent =
        hospitalData.name;


    document.getElementById(
        "infoEmail"
    ).textContent =
        hospitalData.email;


    document.getElementById(
        "infoPhone"
    ).textContent =
        hospitalData.phone;


    document.getElementById(
        "infoLocation"
    ).textContent =
        hospitalData.location;


    document.getElementById(
        "infoRegistration"
    ).textContent =
        hospitalData.registration;


    document.getElementById(
        "infoType"
    ).textContent =
        hospitalData.type;


    document.getElementById(
        "infoAddress"
    ).textContent =
        hospitalData.address;


    document.getElementById(
        "infoBloodBank"
    ).textContent =
        hospitalData.bloodBank;


    document.getElementById(
        "infoEmergency"
    ).textContent =
        hospitalData.emergency;

}



/* ==================================================
   CLOSE INFORMATION OUTSIDE
================================================== */

informationModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === informationModal
        ) {

            informationModal.classList.remove(
                "show"
            );

        }

    }
);



/* ==================================================
   CLOSE UPDATE OUTSIDE
================================================== */

updateModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === updateModal
        ) {

            cancelProfileUpdate();

        }

    }
);



/* ==================================================
   CREATE BLOOD REQUEST
================================================== */


/* OPEN REQUEST MODAL */

createRequestBtn.addEventListener(
    "click",
    function (event) {

        event.preventDefault();


        /* CLOSE PROFILE DROPDOWN */

        profileCard.classList.remove(
            "show"
        );


        /* OPEN REQUEST */

        requestModal.classList.add(
            "show"
        );

    }
);



/* ==================================================
   CLOSE REQUEST MODAL
================================================== */

function closeRequestModal() {

    requestModal.classList.remove(
        "show"
    );


    requestForm.reset();

}


closeRequest.addEventListener(
    "click",
    closeRequestModal
);


cancelRequest.addEventListener(
    "click",
    closeRequestModal
);



/* ==================================================
   CLOSE REQUEST WHEN CLICKING OUTSIDE
================================================== */

requestModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === requestModal
        ) {

            closeRequestModal();

        }

    }
);



/* ==================================================
   CREATE REQUEST FORM
================================================== */

requestForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();



        /* GET VALUES */

        const bloodGroup =
            document.getElementById(
                "requestBloodGroup"
            ).value;


        const units =
            document.getElementById(
                "requestUnits"
            ).value;


        const urgency =
            document.getElementById(
                "requestUrgency"
            ).value;


        const requiredDate =
            document.getElementById(
                "requestDate"
            ).value;


        const ward =
            document.getElementById(
                "requestWard"
            ).value.trim();


        const contact =
            document.getElementById(
                "requestContact"
            ).value.trim();


        const reference =
            document.getElementById(
                "requestReference"
            ).value.trim();


        const notes =
            document.getElementById(
                "requestNotes"
            ).value.trim();



        /* ==================================================
           VALIDATION
        ================================================== */

        if (
            !bloodGroup ||
            !units ||
            !urgency ||
            !requiredDate ||
            !ward ||
            !contact
        ) {

            alert(
                "Please complete all required fields."
            );

            return;

        }



        /* ==================================================
           REQUEST DATA
        ================================================== */

        const bloodRequest = {

            hospitalName:
                hospitalData.name,

            hospitalRegistration:
                hospitalData.registration,

            bloodGroup:
                bloodGroup,

            unitsRequired:
                Number(units),

            urgency:
                urgency,

            requiredDate:
                requiredDate,

            ward:
                ward,

            contact:
                contact,

            reference:
                reference,

            notes:
                notes

        };



        /* ==================================================
           TEMPORARY FRONTEND TEST
        ================================================== */

        console.log(
            "Blood request created:",
            bloodRequest
        );



        /*
           ==================================================
           BACKEND CONNECTION
           ==================================================

           Later, when your Node.js / MySQL backend
           is connected, replace the temporary section
           above with your API request.

           Example:

           fetch("/api/blood-requests", {

               method: "POST",

               headers: {
                   "Content-Type": "application/json"
               },

               body: JSON.stringify(bloodRequest)

           });

        */



        alert(
            "Blood request form completed successfully."
        );


        closeRequestModal();

    }
);



/* ==================================================
   ESC KEY
================================================== */

document.addEventListener(
    "keydown",
    function (event) {


        if (event.key !== "Escape") {

            return;

        }



        /* REQUEST */

        if (
            requestModal.classList.contains(
                "show"
            )
        ) {

            closeRequestModal();

            return;

        }



        /* UPDATE */

        if (
            updateModal.classList.contains(
                "show"
            )
        ) {

            cancelProfileUpdate();

            return;

        }



        /* INFORMATION */

        if (
            informationModal.classList.contains(
                "show"
            )
        ) {

            informationModal.classList.remove(
                "show"
            );

        }

    }
);



/* ==================================================
   LOGOUT
================================================== */

logoutBtn.addEventListener(
    "click",
    function () {

        if (
            confirm(
                "Do you want to logout?"
            )
        ) {

            window.location.href =
                "../../Public Interfaces/Home/Home.html";

        }

    }
);



/* ==================================================
   INITIAL DISPLAY
================================================== */

updateInformationDisplay();