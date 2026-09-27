/* ==================================================
   HOSPITAL DATA
================================================== */

const defaultHospitalData = {

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


function normalizeHospitalProfile(profile = {}) {

    return {
        name: profile.hospital_name || profile.name || "Hospital",
        email: profile.email || "",
        phone: profile.phone || "",
        location: profile.location || "",
        registration: profile.registration_number || profile.registration || "",
        type: profile.hospital_type || profile.type || "Hospital",
        address: profile.address || "",
        bloodBank: profile.blood_bank || profile.bloodBank || "Available",
        emergency: profile.emergency_contact || profile.emergency || ""
    };

}



/* ==================================================
   LOAD HOSPITAL DATA
================================================== */

let hospitalData =
    JSON.parse(
        localStorage.getItem("hospitalData")
    );


if (!hospitalData) {

    hospitalData = {
        ...defaultHospitalData
    };

    localStorage.setItem(
        "hospitalData",
        JSON.stringify(hospitalData)
    );

}


hospitalData = normalizeHospitalProfile(hospitalData);

localStorage.setItem(
    "hospitalData",
    JSON.stringify(hospitalData)
);



/* ==================================================
   SAVE HOSPITAL DATA
================================================== */

function saveHospitalData() {

    localStorage.setItem(
        "hospitalData",
        JSON.stringify(hospitalData)
    );

}



/* ==================================================
   UPDATE DASHBOARD NAME
================================================== */

function updateHospitalNames() {

    const welcomeName =
        document.getElementById("welcomeName");

    const menuHospitalName =
        document.getElementById("menuHospitalName");


    if (welcomeName) {

        welcomeName.textContent =
            hospitalData.name + "!";

    }


    if (menuHospitalName) {

        menuHospitalName.textContent =
            hospitalData.name;

    }

}


updateHospitalNames();



/* ==================================================
   PROFILE DROPDOWN
================================================== */

const profileBtn =
    document.getElementById("profileBtn");

const profileCard =
    document.getElementById("profileCard");


if (profileBtn && profileCard) {

    profileBtn.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();

            profileCard.classList.toggle("show");

        }
    );


    profileCard.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();

        }
    );


    document.addEventListener(
        "click",
        function() {

            profileCard.classList.remove("show");

        }
    );

}



/* ==================================================
   MODALS
================================================== */

const informationModal =
    document.getElementById("informationModal");

const updateModal =
    document.getElementById("updateModal");

const requestModal =
    document.getElementById("requestModal");



/* ==================================================
   OPEN INFORMATION MODAL
================================================== */

function openInformationModal() {

    if (!informationModal) {
        return;
    }


    updateInformationPopup();


    if (profileCard) {

        profileCard.classList.remove("show");

    }


    informationModal.classList.add("show");

}


const informationBtn =
    document.getElementById("informationBtn");

const quickInformationBtn =
    document.getElementById("quickInformationBtn");


if (informationBtn) {

    informationBtn.addEventListener(
        "click",
        openInformationModal
    );

}


if (quickInformationBtn) {

    quickInformationBtn.addEventListener(
        "click",
        openInformationModal
    );

}



/* ==================================================
   UPDATE INFORMATION POPUP
================================================== */

function updateInformationPopup() {

    const infoName =
        document.getElementById("infoName");

    const infoEmail =
        document.getElementById("infoEmail");

    const infoPhone =
        document.getElementById("infoPhone");

    const infoLocation =
        document.getElementById("infoLocation");

    const infoRegistration =
        document.getElementById("infoRegistration");

    const infoType =
        document.getElementById("infoType");

    const infoAddress =
        document.getElementById("infoAddress");

    const infoBloodBank =
        document.getElementById("infoBloodBank");

    const infoEmergency =
        document.getElementById("infoEmergency");


    if (infoName) {

        infoName.textContent =
            hospitalData.name;

    }


    if (infoEmail) {

        infoEmail.textContent =
            hospitalData.email;

    }


    if (infoPhone) {

        infoPhone.textContent =
            hospitalData.phone;

    }


    if (infoLocation) {

        infoLocation.textContent =
            hospitalData.location;

    }


    if (infoRegistration) {

        infoRegistration.textContent =
            hospitalData.registration;

    }


    if (infoType) {

        infoType.textContent =
            hospitalData.type;

    }


    if (infoAddress) {

        infoAddress.textContent =
            hospitalData.address;

    }


    if (infoBloodBank) {

        infoBloodBank.textContent =
            hospitalData.bloodBank;

    }


    if (infoEmergency) {

        infoEmergency.textContent =
            hospitalData.emergency;

    }

}



/* ==================================================
   CLOSE INFORMATION MODAL
================================================== */

function closeInformationModal() {

    if (informationModal) {

        informationModal.classList.remove("show");

    }

}


const closeInformation =
    document.getElementById("closeInformation");

const closeInformationBtn =
    document.getElementById("closeInformationBtn");


if (closeInformation) {

    closeInformation.addEventListener(
        "click",
        closeInformationModal
    );

}


if (closeInformationBtn) {

    closeInformationBtn.addEventListener(
        "click",
        closeInformationModal
    );

}



/* ==================================================
   LOAD UPDATE PROFILE HTML
================================================== */

async function openUpdateModal() {

    if (!updateModal) {
        return;
    }


    try {

        const response =
            await fetch(
                "hospital-update-profile.html"
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load update profile."
            );

        }


        const html =
            await response.text();


        const parser =
            new DOMParser();


        const documentData =
            parser.parseFromString(
                html,
                "text/html"
            );


        const content =
            documentData.querySelector(
                ".popup-page-content"
            );


        if (!content) {

            throw new Error(
                "Update profile content not found."
            );

        }


        document.getElementById(
            "updateContent"
        ).innerHTML =
            content.innerHTML;


        informationModal.classList.remove(
            "show"
        );


        updateModal.classList.add(
            "show"
        );


        setupUpdateForm();


    }
    catch (error) {

        console.error(error);

        alert(
            "Unable to open the Update Profile popup. " +
            "Please make sure you are using VS Code Live Server."
        );

    }

}



const openUpdateBtn =
    document.getElementById("openUpdateBtn");


if (openUpdateBtn) {

    openUpdateBtn.addEventListener(
        "click",
        openUpdateModal
    );

}



/* ==================================================
   SETUP UPDATE FORM
================================================== */

function setupUpdateForm() {

    const updateForm =
        document.getElementById("updateForm");


    if (!updateForm) {
        return;
    }


    const hospitalName =
        document.getElementById("hospitalName");

    const hospitalEmail =
        document.getElementById("hospitalEmail");

    const hospitalPhone =
        document.getElementById("hospitalPhone");

    const hospitalLocation =
        document.getElementById("hospitalLocation");

    const registrationNumber =
        document.getElementById("registrationNumber");

    const hospitalType =
        document.getElementById("hospitalType");

    const hospitalAddress =
        document.getElementById("hospitalAddress");

    const bloodBank =
        document.getElementById("bloodBank");

    const emergencyContact =
        document.getElementById("emergencyContact");



    /* ----------------------------------------------
       LOAD EXISTING DATA
    ---------------------------------------------- */

    hospitalName.value =
        hospitalData.name;

    hospitalEmail.value =
        hospitalData.email;

    hospitalPhone.value =
        hospitalData.phone;

    hospitalLocation.value =
        hospitalData.location;

    registrationNumber.value =
        hospitalData.registration;

    hospitalType.value =
        hospitalData.type;

    hospitalAddress.value =
        hospitalData.address;

    bloodBank.value =
        hospitalData.bloodBank;

    emergencyContact.value =
        hospitalData.emergency;



    /* ----------------------------------------------
       SAVE FORM
    ---------------------------------------------- */

    updateForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                hospitalName.value.trim();

            const email =
                hospitalEmail.value.trim();

            const phone =
                hospitalPhone.value.trim();

            const location =
                hospitalLocation.value.trim();

            const registration =
                registrationNumber.value.trim();

            const type =
                hospitalType.value;

            const address =
                hospitalAddress.value.trim();

            const bank =
                bloodBank.value;

            const emergency =
                emergencyContact.value.trim();


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


            hospitalData = {

                name: name,

                email: email,

                phone: phone,

                location: location,

                registration: registration,

                type: type,

                address: address,

                bloodBank: bank,

                emergency: emergency

            };


            saveHospitalData();


            updateHospitalNames();

            updateInformationPopup();


            updateModal.classList.remove(
                "show"
            );


            informationModal.classList.add(
                "show"
            );


            alert(
                "Hospital profile updated successfully."
            );

        }
    );



    /* ----------------------------------------------
       CANCEL UPDATE
    ---------------------------------------------- */

    const cancelUpdate =
        document.getElementById("cancelUpdate");


    if (cancelUpdate) {

        cancelUpdate.addEventListener(
            "click",
            function() {

                updateModal.classList.remove(
                    "show"
                );


                informationModal.classList.add(
                    "show"
                );

            }
        );

    }

}



/* ==================================================
   CLOSE UPDATE MODAL
================================================== */

const closeUpdate =
    document.getElementById("closeUpdate");


if (closeUpdate) {

    closeUpdate.addEventListener(
        "click",
        function() {

            updateModal.classList.remove(
                "show"
            );


            informationModal.classList.add(
                "show"
            );

        }
    );

}



/* ==================================================
   CREATE BLOOD REQUEST POPUP
================================================== */

async function openRequestModal() {

    if (!requestModal) {
        return;
    }


    try {

        const response =
            await fetch(
                "create-blood-request.html"
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load blood request."
            );

        }


        const html =
            await response.text();


        const parser =
            new DOMParser();


        const documentData =
            parser.parseFromString(
                html,
                "text/html"
            );


        const content =
            documentData.querySelector(
                ".popup-page-content"
            );


        if (!content) {

            throw new Error(
                "Blood request content not found."
            );

        }


        document.getElementById(
            "requestContent"
        ).innerHTML =
            content.innerHTML;


        requestModal.classList.add(
            "show"
        );


        setupRequestForm();


    }
    catch (error) {

        console.error(error);

        alert(
            "Unable to open the Blood Request popup. " +
            "Please make sure you are using VS Code Live Server."
        );

    }

}



/* ==================================================
   REQUEST BUTTONS
================================================== */

const createRequestBtn =
    document.getElementById(
        "createRequestBtn"
    );

const quickCreateRequestBtn =
    document.getElementById(
        "quickCreateRequestBtn"
    );


if (createRequestBtn) {

    createRequestBtn.addEventListener(
        "click",
        openRequestModal
    );

}


if (quickCreateRequestBtn) {

    quickCreateRequestBtn.addEventListener(
        "click",
        openRequestModal
    );

}



/* ==================================================
   CLOSE REQUEST MODAL
================================================== */

const closeRequest =
    document.getElementById("closeRequest");


if (closeRequest) {

    closeRequest.addEventListener(
        "click",
        function() {

            requestModal.classList.remove(
                "show"
            );

        }
    );

}



/* ==================================================
   SETUP REQUEST FORM
================================================== */

function setupRequestForm() {

    const requestForm =
        document.getElementById(
            "requestForm"
        );


    if (!requestForm) {
        return;
    }



    requestForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


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



            /* ------------------------------------------
               VALIDATION
            ------------------------------------------ */

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



            /* ------------------------------------------
               CREATE REQUEST OBJECT
            ------------------------------------------ */

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
                    notes,

                createdAt:
                    new Date().toISOString()

            };



            /* ------------------------------------------
               FRONTEND TEST
            ------------------------------------------ */

            console.log(
                "Blood Request:",
                bloodRequest
            );


            /*
                IMPORTANT:

                This is NOT saved to MySQL yet.

                Later, when your Node.js backend is ready,
                this object will be sent using fetch():

                fetch("/api/blood-requests", {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body:
                        JSON.stringify(bloodRequest)
                });
            */



            alert(
                "Blood request details validated successfully."
            );


            requestForm.reset();


            requestModal.classList.remove(
                "show"
            );

        }
    );



    /* ------------------------------------------
       CANCEL REQUEST
    ------------------------------------------ */

    const cancelRequest =
        document.getElementById(
            "cancelRequest"
        );


    if (cancelRequest) {

        cancelRequest.addEventListener(
            "click",
            function() {

                requestModal.classList.remove(
                    "show"
                );

            }
        );

    }

}



/* ==================================================
   LOGOUT
================================================== */

const logoutBtn =
    document.getElementById("logoutBtn");


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function() {

            const confirmLogout =
                confirm(
                    "Do you want to logout?"
                );


            if (confirmLogout) {

                window.location.href =
                    "../../Public Interfaces/Home/Home.html";

            }

        }
    );

}



/* ==================================================
   ESCAPE KEY
================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key !== "Escape") {
            return;
        }


        if (
            requestModal &&
            requestModal.classList.contains("show")
        ) {

            requestModal.classList.remove(
                "show"
            );

            return;

        }


        if (
            updateModal &&
            updateModal.classList.contains("show")
        ) {

            updateModal.classList.remove(
                "show"
            );

            if (informationModal) {

                informationModal.classList.add(
                    "show"
                );

            }

            return;

        }


        if (
            informationModal &&
            informationModal.classList.contains("show")
        ) {

            informationModal.classList.remove(
                "show"
            );

        }


        if (profileCard) {

            profileCard.classList.remove(
                "show"
            );

        }

    }
);



/* ==================================================
   CLICK OUTSIDE MODAL
================================================== */

if (informationModal) {

    informationModal.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                informationModal
            ) {

                informationModal.classList.remove(
                    "show"
                );

            }

        }
    );

}


if (updateModal) {

    updateModal.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                updateModal
            ) {

                updateModal.classList.remove(
                    "show"
                );


                informationModal.classList.add(
                    "show"
                );

            }

        }
    );

}


if (requestModal) {

    requestModal.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                requestModal
            ) {

                requestModal.classList.remove(
                    "show"
                );

            }

        }
    );

}