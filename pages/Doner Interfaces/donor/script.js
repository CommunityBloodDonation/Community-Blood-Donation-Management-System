document.addEventListener("DOMContentLoaded", function () {

    /* ================= PROFILE MENU ================= */

    const profileBtn = document.getElementById("profileBtn");
    const profileCard = document.getElementById("profileCard");

    profileBtn.addEventListener("click", function (e) {

        e.stopPropagation();

        profileCard.classList.toggle("show");

    });


    profileCard.addEventListener("click", function (e) {
        e.stopPropagation();
    });


    document.addEventListener("click", function () {

        profileCard.classList.remove("show");

    });


    /* ================= POPUPS ================= */

    const infoBtn = document.getElementById("infoBtn");

    const infoModal = document.getElementById("infoModal");
    const updateModal = document.getElementById("updateModal");

    const openUpdate = document.getElementById("openUpdate");

    const closeInfo = document.getElementById("closeInfo");
    const closeUpdate = document.getElementById("closeUpdate");

    const cancelUpdate = document.getElementById("cancelUpdate");

    const updateForm = document.getElementById("updateForm");


    /* ================= DEFAULT DONOR DATA ================= */

    const defaultData = {

        name: "Donor",
        email: "donor@example.com",
        phone: "+94 77 123 4567",
        blood: "O+",
        dob: "1998-01-01",
        gender: "Male",
        address: "Colombo",
        city: "Colombo",
        lastDonation: "Not recorded",
        eligibility: "Not checked"

    };


    /* ================= LOAD DATA ================= */

    function getDonorData() {

        const saved =
            localStorage.getItem("bloodConnectDonor");

        if (saved) {
            return JSON.parse(saved);
        }

        return defaultData;
    }


    /* ================= UPDATE PAGE ================= */

    function updatePage(data) {

        const firstLetter =
            data.name.charAt(0).toUpperCase();


        /* Header */

        document.getElementById("avatarLetter").textContent =
            firstLetter;

        document.getElementById("largeAvatar").textContent =
            firstLetter;

        document.getElementById("menuName").textContent =
            data.name;


        /* Welcome */

        document.getElementById("welcomeName").textContent =
            data.name + "!";


        /* Stats */

        document.getElementById("bloodGroup").textContent =
            data.blood;

        document.getElementById("lastDonation").textContent =
            data.lastDonation;

        document.getElementById("eligibility").textContent =
            data.eligibility;


        /* Information popup */

        document.getElementById("infoAvatar").textContent =
            firstLetter;

        document.getElementById("infoName").textContent =
            data.name;

        document.getElementById("infoEmail").textContent =
            data.email;

        document.getElementById("infoPhone").textContent =
            data.phone;

        document.getElementById("infoBlood").textContent =
            data.blood;

        document.getElementById("infoDob").textContent =
            data.dob;

        document.getElementById("infoGender").textContent =
            data.gender;

        document.getElementById("infoAddress").textContent =
            data.address;

        document.getElementById("infoCity").textContent =
            data.city;

        document.getElementById("infoLastDonation").textContent =
            data.lastDonation;

        document.getElementById("infoEligibility").textContent =
            data.eligibility;

    }


    /* ================= LOAD FORM ================= */

    function loadForm(data) {

        document.getElementById("formName").value =
            data.name;

        document.getElementById("formEmail").value =
            data.email;

        document.getElementById("formPhone").value =
            data.phone;

        document.getElementById("formBlood").value =
            data.blood;

        document.getElementById("formDob").value =
            data.dob;

        document.getElementById("formGender").value =
            data.gender;

        document.getElementById("formAddress").value =
            data.address;

        document.getElementById("formCity").value =
            data.city;

    }


    /* ================= OPEN INFORMATION ================= */

    infoBtn.addEventListener("click", function () {

        profileCard.classList.remove("show");

        updatePage(getDonorData());

        infoModal.classList.add("show");

    });


    /* ================= OPEN UPDATE ================= */

    openUpdate.addEventListener("click", function () {

        const data = getDonorData();

        loadForm(data);

        infoModal.classList.remove("show");

        updateModal.classList.add("show");

    });


    /* ================= CLOSE INFORMATION ================= */

    closeInfo.addEventListener("click", function () {

        infoModal.classList.remove("show");

    });


    /* ================= CANCEL UPDATE ================= */

    cancelUpdate.addEventListener("click", function () {

        updateModal.classList.remove("show");

        updatePage(getDonorData());

        infoModal.classList.add("show");

    });


    /* ================= SAVE CHANGES ================= */

    updateForm.addEventListener("submit", function (e) {

        e.preventDefault();


        const oldData = getDonorData();


        const newData = {

            name:
                document.getElementById("formName").value.trim(),

            email:
                document.getElementById("formEmail").value.trim(),

            phone:
                document.getElementById("formPhone").value.trim(),

            blood:
                document.getElementById("formBlood").value,

            dob:
                document.getElementById("formDob").value,

            gender:
                document.getElementById("formGender").value,

            address:
                document.getElementById("formAddress").value.trim(),

            city:
                document.getElementById("formCity").value.trim(),

            lastDonation:
                oldData.lastDonation,

            eligibility:
                oldData.eligibility

        };


        /* SAVE TO BROWSER */

        localStorage.setItem(
            "bloodConnectDonor",
            JSON.stringify(newData)
        );


        /* UPDATE PAGE */

        updatePage(newData);


        /* CLOSE UPDATE */

        updateModal.classList.remove("show");


        /* SHOW INFORMATION */

        infoModal.classList.add("show");

    });


    /* ================= CLOSE UPDATE ================= */

    closeUpdate.addEventListener("click", function () {

        updateModal.classList.remove("show");

        updatePage(getDonorData());

        infoModal.classList.add("show");

    });


    /* ================= OUTSIDE CLICK ================= */

    infoModal.addEventListener("click", function (e) {

        if (e.target === infoModal) {
            infoModal.classList.remove("show");
        }

    });


    updateModal.addEventListener("click", function (e) {

        if (e.target === updateModal) {
            updateModal.classList.remove("show");
        }

    });


    /* ================= LOGOUT ================= */

    document.getElementById("logoutBtn")
        .addEventListener("click", function () {

            const confirmLogout =
                confirm("Do you want to logout?");

            if (confirmLogout) {

                localStorage.removeItem("bloodConnectDonor");

                window.location.href =
                    "../../Public Interfaces/Home/Home.html";

            }

        });


    /* ================= INITIAL DATA ================= */

    updatePage(getDonorData());

});