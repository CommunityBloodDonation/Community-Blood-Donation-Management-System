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


async function loadHospitalRequests() {
    const requestsContainer =
        document.getElementById("requests");

    if (!requestsContainer || !window.supabase || !supabaseClient) {
        return;
    }

    try {
        const {
            data: { user },
            error: authError
        } = await supabaseClient.auth.getUser();

        if (authError || !user) {
            throw new Error("No authenticated hospital session found.");
        }

        const { data, error } = await supabaseClient
            .from("blood_requests")
            .select("*")
            .eq("hospital_id", user.id)
            .order("created_at", { ascending: false });

        if (error) {
            throw error;
        }

        const activeCount = data.filter(request => request.status === "open").length;
        const completedCount = data.filter(request => request.status === "fulfilled").length;
        const totalUnits = data.reduce(
            (total, request) => total + Number(request.units || 0),
            0
        );

        document.getElementById("activeRequests").textContent = activeCount;
        document.getElementById("completedRequests").textContent = completedCount;
        document.getElementById("bloodUnits").textContent = totalUnits;

        requestsContainer.innerHTML = "";

        if (!data.length) {
            const emptyMessage = document.createElement("p");
            emptyMessage.className = "empty";
            emptyMessage.textContent = "No current blood requests.";
            requestsContainer.appendChild(emptyMessage);
            return;
        }

        data.forEach(request => {
            const card = document.createElement("article");
            card.className = "hospital-request";

            const details = document.createElement("div");
            details.className = "hospital-request-details";

            const title = document.createElement("strong");
            title.textContent = `${request.blood_group} - ${request.units} unit${request.units === 1 ? "" : "s"}`;

            const metadata = document.createElement("small");
            metadata.textContent = `${request.urgency} | ${request.ward} | Required: ${request.required_date}`;

            const status = document.createElement("span");
            status.className = `request-status ${request.status}`;
            status.textContent = request.status;

            details.append(title, metadata, status);

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "delete-request-btn";
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () =>
                deleteHospitalRequest(request.id)
            );

            card.append(details, deleteButton);
            requestsContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading hospital blood requests:", error);
        requestsContainer.innerHTML = "";

        const errorMessage = document.createElement("p");
        errorMessage.className = "empty";
        errorMessage.textContent = "Unable to load your blood requests.";
        requestsContainer.appendChild(errorMessage);
    }
}


async function deleteHospitalRequest(requestId) {
    if (!confirm("Delete this blood request? This action cannot be undone.")) {
        return;
    }

    try {
        const {
            data: { user },
            error: authError
        } = await supabaseClient.auth.getUser();

        if (authError || !user) {
            throw new Error("No authenticated hospital session found.");
        }

        const { error } = await supabaseClient
            .from("blood_requests")
            .delete()
            .eq("id", requestId)
            .eq("hospital_id", user.id);

        if (error) {
            throw error;
        }

        await loadHospitalRequests();
    } catch (error) {
        console.error("Error deleting hospital blood request:", error);
        alert("Unable to delete the blood request: " + error.message);
    }
}



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
loadHospitalRequests();



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
                "%20hospital-update-profile.html"
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
        async function(event) {

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

            const submitButton =
                requestForm.querySelector(
                    "button[type='submit']"
                );



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



            if (!window.supabase || !supabaseClient) {
                alert("Database connection is unavailable.");
                return;
            }

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "Saving...";
            }

            try {
                const {
                    data: { user },
                    error: authError
                } = await supabaseClient.auth.getUser();

                if (authError || !user) {
                    throw new Error("Please log in before creating a blood request.");
                }

                const { error } = await supabaseClient
                    .from("blood_requests")
                    .insert({
                        hospital_id: user.id,
                        hospital_name: hospitalData.name,
                        hospital_registration: hospitalData.registration,
                        location: hospitalData.location,
                        blood_group: bloodGroup,
                        units: Number(units),
                        urgency: urgency,
                        required_date: requiredDate,
                        ward: ward,
                        contact: contact,
                        reference: reference || null,
                        notes: notes || null,
                        status: "open"
                    });

                if (error) {
                    throw error;
                }

                alert("Blood request created successfully.");
                requestForm.reset();
                requestModal.classList.remove("show");
                await loadHospitalRequests();
            } catch (error) {
                console.error("Error saving blood request:", error);
                alert("Unable to save the blood request: " + error.message);
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = "Create Request";
                }
            }

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