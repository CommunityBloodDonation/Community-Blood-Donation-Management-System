/* =================================
   DONOR PROFILE UPDATE
   ================================= */

const popup = document.getElementById("profilePopup");
const closeBtn = document.getElementById("closePopup");
const cancelBtn = document.getElementById("cancelBtn");
const form = document.getElementById("donorProfileForm");


/* ---------- Close Popup ---------- */

function closePopup() {
    popup.style.display = "none";
}

closeBtn.addEventListener("click", closePopup);

cancelBtn.addEventListener("click", closePopup);


/* ---------- Click Outside Popup ---------- */

popup.addEventListener("click", function (event) {

    if (event.target === popup) {
        closePopup();
    }

});


/* ---------- ESC Key ---------- */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closePopup();
    }

});


/* ---------- Save Profile ---------- */

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const newPassword =
        document.getElementById("newPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    /* Password validation */

    if (newPassword !== "" && newPassword !== confirmPassword) {

        alert("Passwords do not match.");

        return;
    }


    /* Get form values */

    const profile = {

        fullName:
            document.getElementById("fullName").value,

        email:
            document.getElementById("email").value,

        phone:
            document.getElementById("phone").value,

        bloodGroup:
            document.getElementById("bloodGroup").value,

        dob:
            document.getElementById("dob").value,

        city:
            document.getElementById("city").value,

        address:
            document.getElementById("address").value
    };


    /* Save temporarily in browser */

    localStorage.setItem(
        "donorProfile",
        JSON.stringify(profile)
    );


    alert("Profile updated successfully!");

    closePopup();

});


/* ---------- Load Existing Profile ---------- */

function loadProfile() {

    const savedProfile =
        localStorage.getItem("donorProfile");


    if (!savedProfile) {
        return;
    }


    const profile =
        JSON.parse(savedProfile);


    document.getElementById("fullName").value =
        profile.fullName || "";

    document.getElementById("email").value =
        profile.email || "";

    document.getElementById("phone").value =
        profile.phone || "";

    document.getElementById("bloodGroup").value =
        profile.bloodGroup || "";

    document.getElementById("dob").value =
        profile.dob || "";

    document.getElementById("city").value =
        profile.city || "";

    document.getElementById("address").value =
        profile.address || "";
}


/* Load when page opens */

loadProfile();