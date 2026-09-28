const SUPABASE_URL = "https://ayrcawqhhgpmllwvkjjr.supabase.co";
const SUPABASE_KEY = "sb_publishable_XNMDU8mTvE42rJ4LOwkKKA_tcTopl1-";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// =====================================================
// APPLICATION STATE
// =====================================================

const state = {
    donors: [],
    staff: [],
    requests: [],
    completed: [],
    history: [],
    section: "donors"
};

const labels = {
    donors: "Donors",
    staff: "Hospital Staff",
    requests: "Blood Requests",
    completed: "Completed Requests",
    history: "Donation History"
};


// =====================================================
// HELPER FUNCTION
// =====================================================

function escapeText(value) {
    return String(value ?? "");
}


// =====================================================
// RENDER TABLE ROWS
// =====================================================

function renderRows() {

    const rows = state[state.section];

    const search = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    const filtered = rows.filter(row =>
        Object.values(row).some(value =>
            escapeText(value)
                .toLowerCase()
                .includes(search)
        )
    );

    const container =
        document.getElementById("tableContainer");

    document.getElementById("sectionTitle").textContent =
        labels[state.section];


    // -------------------------------------------------
    // No records
    // -------------------------------------------------

    if (!filtered.length) {

        container.innerHTML =
            "<div class='empty'>No records found.</div>";

        return;
    }


    // -------------------------------------------------
    // Select columns according to section
    // -------------------------------------------------

    const columns =
        state.section === "donors"

            ? [
                "id",
                "full_name",
                "email",
                "blood_group",
                "district",
                "last_donation"
            ]

            : state.section === "staff"

                ? [
                    "id",
                    "hospital_name",
                    "email",
                    "registration_number",
                    "location",
                    "hospital_type"
                ]

                : state.section === "requests"

                    ? [
                        "id",
                        "hospital_name",
                        "blood_group",
                        "units",
                        "urgency",
                        "status",
                        "created_at"
                    ]

                    : state.section === "completed"
                        ? [
                            "id",
                            "hospital_name",
                            "blood_group",
                            "units",
                            "urgency",
                            "completed_at"
                        ]
                        : [
                        "id",
                        "donor_id",
                        "hospital_name",
                        "donation_date",
                        "units",
                        "status"
                    ];


    // -------------------------------------------------
    // Create table headers
    // -------------------------------------------------

    const headers = columns
        .map(column =>
            `<th>${column.replaceAll("_", " ")}</th>`
        )
        .join("");


    // -------------------------------------------------
    // Create table body
    // -------------------------------------------------

    const body = filtered
        .map(row => {

            const values = columns
                .map(column =>
                    `<td>${escapeText(row[column])}</td>`
                )
                .join("");

            return `
                <tr>
                    ${values}

                    <td>
                        <button
                            class="delete-btn"
                            data-id="${escapeText(row.id)}"
                            type="button">
                            Delete
                        </button>
                    </td>

                </tr>
            `;
        })
        .join("");


    // -------------------------------------------------
    // Insert table
    // -------------------------------------------------

    container.innerHTML = `
        <table>

            <thead>
                <tr>
                    ${headers}
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                ${body}
            </tbody>

        </table>
    `;


    // -------------------------------------------------
    // Delete button events
    // -------------------------------------------------

    container
        .querySelectorAll(".delete-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => deleteRecord(button.dataset.id)
            );

        });
}


// =====================================================
// LOAD DATA FROM SUPABASE
// =====================================================

async function loadData() {

    try {

        const queries = await Promise.all([

            // Donors
            supabaseClient
                .from("donor_profiles")
                .select(
                    "id, full_name, email, blood_group, district, last_donation"
                )
                .order("full_name"),


            // Hospital Staff
            supabaseClient
                .from("staff_profiles")
                .select(
                    "id, hospital_name, email, registration_number, location, hospital_type"
                )
                .order("hospital_name"),


            // Blood Requests
            supabaseClient
                .from("blood_requests")
                .select(
                    "id, hospital_name, blood_group, units, urgency, status, created_at"
                )
                .order(
                    "created_at",
                    {
                        ascending: false
                    }
                ),


            // Donation History
            supabaseClient
                .from("donation_history")
                .select(
                    "id, donor_id, hospital_name, donation_date, units, status"
                )
                .order(
                    "donation_date",
                    {
                        ascending: false
                    }
                ),

            // Completed Blood Requests
            supabaseClient
                .from("completed_blood_requests")
                .select(
                    "id, hospital_name, blood_group, units, urgency, completed_at"
                )
                .order(
                    "completed_at",
                    {
                        ascending: false
                    }
                )

        ]);


        // -------------------------------------------------
        // Check errors
        // -------------------------------------------------

        const error =
            queries.find(result => result.error)?.error;

        if (error) {
            throw error;
        }


        // -------------------------------------------------
        // Store data
        // -------------------------------------------------

        [
            state.donors,
            state.staff,
            state.requests,
            state.history,
            state.completed

        ] = queries.map(
            result => result.data || []
        );


        // -------------------------------------------------
        // Update dashboard statistics
        // -------------------------------------------------

        document.getElementById("donorCount").textContent =
            state.donors.length;

        document.getElementById("staffCount").textContent =
            state.staff.length;

        document.getElementById("requestCount").textContent =
            state.requests.length;

        document.getElementById("historyCount").textContent =
            state.history.filter(
                row => row.status === "completed"
            ).length;


        // -------------------------------------------------
        // Render current section
        // -------------------------------------------------

        renderRows();

    }

    catch (error) {

        console.error(
            "Failed to load admin data:",
            error
        );

        alert(
            "Failed to load dashboard data: " +
            error.message
        );
    }
}


// =====================================================
// DELETE RECORD
// =====================================================

async function deleteRecord(id) {

    const confirmed = confirm(
        "Delete this record? This action cannot be undone."
    );

    if (!confirmed) {
        return;
    }


    try {

        // -------------------------------------------------
        // Donors / Staff
        // -------------------------------------------------

        if (
            state.section === "donors" ||
            state.section === "staff"
        ) {

            const { error } =
                await supabaseClient.rpc(
                    "admin_delete_user",
                    {
                        target_user_id: id
                    }
                );

            if (error) {
                throw error;
            }

        }


        // -------------------------------------------------
        // Blood Requests / Donation History
        // -------------------------------------------------

        else {

            const table =
                state.section === "requests"
                    ? "blood_requests"
                    : state.section === "completed"
                        ? "completed_blood_requests"
                        : "donation_history";


            const { error } =
                await supabaseClient
                    .from(table)
                    .delete()
                    .eq("id", id);


            if (error) {
                throw error;
            }

        }


        // Reload data
        await loadData();

    }

    catch (error) {

        console.error(
            "Delete failed:",
            error
        );

        alert(
            "Delete failed: " +
            error.message
        );
    }
}


// =====================================================
// START ADMIN SESSION
// =====================================================

async function startAdminSession() {

    const {
        data: {
            user
        },
        error
    } = await supabaseClient.auth.getUser();


    if (error || !user) {
        return false;
    }


    // -------------------------------------------------
    // Check admin_profiles table
    // -------------------------------------------------

    const {
        data: admin,
        error: adminError
    } = await supabaseClient
        .from("admin_profiles")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();


    if (adminError || !admin) {
        return false;
    }


    // -------------------------------------------------
    // Show admin dashboard
    // -------------------------------------------------

    document
        .getElementById("loginView")
        .classList
        .add("hidden");


    document
        .getElementById("adminView")
        .classList
        .remove("hidden");


    document
        .getElementById("logoutButton")
        .classList
        .remove("hidden");


    // Load dashboard data
    await loadData();

    return true;
}


// =====================================================
// ADMIN LOGIN
// =====================================================

document
    .getElementById("loginForm")
    .addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const errorBox =
                document.getElementById("loginError");

            errorBox.textContent = "";


            const email =
                document
                    .getElementById("adminEmail")
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById("adminPassword")
                    .value;


            // -------------------------------------------------
            // Sign in with Supabase
            // -------------------------------------------------

            const { error } =
                await supabaseClient.auth.signInWithPassword({

                    email: email,

                    password: password

                });


            // -------------------------------------------------
            // Check admin account
            // -------------------------------------------------

            if (
                error ||
                !(await startAdminSession())
            ) {

                await supabaseClient.auth.signOut();


                errorBox.textContent =
                    error?.message ||
                    "This account is not registered as an administrator.";

            }

        }
    );


// =====================================================
// ADMIN TABS
// =====================================================

document
    .querySelectorAll(".tab")
    .forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                // Remove active state
                document
                    .querySelectorAll(".tab")
                    .forEach(item =>
                        item.classList.remove("active")
                    );


                // Add active state
                tab.classList.add("active");


                // Change section
                state.section =
                    tab.dataset.section;


                // Clear search
                document
                    .getElementById("searchInput")
                    .value = "";


                // Render table
                renderRows();

            }
        );

    });


// =====================================================
// SEARCH
// =====================================================

document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        renderRows
    );


// =====================================================
// LOGOUT
// =====================================================

document
    .getElementById("logoutButton")
    .addEventListener(
        "click",
        async () => {

            await supabaseClient.auth.signOut();

            window.location.reload();

        }
    );


// =====================================================
// CHECK EXISTING ADMIN SESSION
// =====================================================

startAdminSession()
    .catch(error =>
        console.error(
            "Admin session check failed:",
            error
        )
    );