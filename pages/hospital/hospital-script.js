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
   PROFILE DROPDOWN
================================================== */

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


/* QUICK ACTION */

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
   OPEN UPDATE MODAL
================================================== */

function openUpdate() {

    /*
       Fill form with current information
    */

    document.getElementById("hospitalName").value =
        hospitalData.name;

    document.getElementById("hospitalEmail").value =
        hospitalData.email;

    document.getElementById("hospitalPhone").value =
        hospitalData.phone;

    document.getElementById("hospitalLocation").value =
        hospitalData.location;

    document.getElementById("registrationNumber").value =
        hospitalData.registration;

    document.getElementById("hospitalType").value =
        hospitalData.type;

    document.getElementById("hospitalAddress").value =
        hospitalData.address;

    document.getElementById("bloodBank").value =
        hospitalData.bloodBank;

    document.getElementById("emergencyContact").value =
        hospitalData.emergency;


    /*
       Close information
       Open update
    */

    informationModal.classList.remove("show");

    updateModal.classList.add("show");

}


openUpdateBtn.addEventListener(
    "click",
    openUpdate
);


/* ==================================================
   CLOSE UPDATE
================================================== */

function cancelProfileUpdate() {

    /*
       IMPORTANT:
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


        /*
           Get form values
        */

        const name =
            document.getElementById("hospitalName").value.trim();

        const email =
            document.getElementById("hospitalEmail").value.trim();

        const phone =
            document.getElementById("hospitalPhone").value.trim();

        const location =
            document.getElementById("hospitalLocation").value.trim();

        const registration =
            document.getElementById("registrationNumber").value.trim();

        const type =
            document.getElementById("hospitalType").value;

        const address =
            document.getElementById("hospitalAddress").value.trim();

        const bloodBank =
            document.getElementById("bloodBank").value;

        const emergency =
            document.getElementById("emergencyContact").value.trim();


        /*
           Basic validation
        */

        if (
            !name ||
            !email ||
            !phone ||
            !location ||
            !registration ||
            !address ||
            !emergency
        ) {

            alert("Please complete all required fields.");

            return;

        }


        /*
           Update main profile data
        */

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


        /*
           Update dashboard name
        */

        document.getElementById(
            "welcomeName"
        ).textContent =
            hospitalData.name + "!";


        document.getElementById(
            "menuHospitalName"
        ).textContent =
            hospitalData.name;


        /*
           Close update modal
           Open information modal
        */

        updateModal.classList.remove("show");

        updateInformationDisplay();

        informationModal.classList.add("show");


        /*
           Success message
        */

        console.log("Hospital profile updated.");

    }
);


/* ==================================================
   UPDATE INFORMATION DISPLAY
================================================== */

function updateInformationDisplay() {

    document.getElementById("infoName")
        .textContent = hospitalData.name;

    document.getElementById("infoEmail")
        .textContent = hospitalData.email;

    document.getElementById("infoPhone")
        .textContent = hospitalData.phone;

    document.getElementById("infoLocation")
        .textContent = hospitalData.location;

    document.getElementById("infoRegistration")
        .textContent = hospitalData.registration;

    document.getElementById("infoType")
        .textContent = hospitalData.type;

    document.getElementById("infoAddress")
        .textContent = hospitalData.address;

    document.getElementById("infoBloodBank")
        .textContent = hospitalData.bloodBank;

    document.getElementById("infoEmergency")
        .textContent = hospitalData.emergency;

}


/* ==================================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
================================================== */

informationModal.addEventListener(
    "click",
    function (event) {

        if (event.target === informationModal) {

            informationModal.classList.remove("show");

        }

    }
);


updateModal.addEventListener(
    "click",
    function (event) {

        if (event.target === updateModal) {

            cancelProfileUpdate();

        }

    }
);


/* ==================================================
   ESC KEY
================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            if (updateModal.classList.contains("show")) {

                cancelProfileUpdate();

            }

            else if (
                informationModal.classList.contains("show")
            ) {

                informationModal.classList.remove("show");

            }

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
            confirm("Do you want to logout?")
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