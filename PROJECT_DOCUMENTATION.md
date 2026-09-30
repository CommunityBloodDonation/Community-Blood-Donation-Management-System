# Community Blood Donation Management System

## 1. Project Overview

The Community Blood Donation Management System is a web-based blood donation coordination platform. It connects blood donors, hospitals, blood banks, patients, and system administrators through one central interface.

The project is designed to make it easier to:

- Register and authenticate donors and hospital staff.
- Store donor and hospital profile information.
- Publish and view hospital blood requirements.
- Highlight emergency, urgent, and normal blood requests.
- Record a donor's completed donations.
- Calculate a basic donor eligibility result from age and last donation date.
- Provide administrators with visibility over users, requests, and donation history.
- Display public donation statistics.

This is a group RAD/Scrum assignment project. The application is implemented as a frontend-first web system using HTML, CSS, JavaScript, and Supabase.

## 2. Project Objectives

The main objectives are:

1. Reduce the time required to find suitable blood support.
2. Give hospitals a direct way to publish blood requirements.
3. Give donors a personal dashboard for profile and donation information.
4. Keep donation records available for future reference.
5. Provide role-based access for donors, hospital staff, and administrators.
6. Improve visibility of urgent blood requirements.
7. Protect user-owned records with Supabase authentication and Row Level Security.

## 3. User Roles

### 3.1 Donor

A donor can:

- Create an account with personal details and blood group.
- Log in through the donor portal.
- View a donor dashboard.
- View or update donor information.
- See blood group, last donation, total donations, and eligibility information.
- Record a completed blood donation.
- View a short donation history on the dashboard.
- View the full donation history page.
- See the latest open hospital blood requests.
- Sign out of the system.

### 3.2 Hospital or Blood Bank Staff

Hospital staff can:

- Create a hospital account.
- Store hospital identity, registration, contact, location, type, address, blood-bank status, and emergency contact.
- Log in through the hospital portal.
- View a hospital dashboard.
- Create a blood request.
- View the hospital's own open requests.
- Delete an open request.
- Complete a request and move it to completed request history.
- View hospital profile information and update it locally through the profile interface.
- Sign out of the system.

### 3.3 System Administrator

An administrator can:

- Sign in using a Supabase Auth account that has an entry in `public.admin_profiles`.
- View counts for donors, hospital staff, blood requests, and completed donations.
- Search the currently selected data list.
- View donor profiles.
- View hospital staff profiles.
- View open or active blood requests.
- View completed blood requests.
- View donation history.
- Delete donor and staff accounts through the protected `admin_delete_user` function.
- Delete request, completed-request, and donation-history records.

### 3.4 Public Visitor or Patient

Unauthenticated visitors can:

- Read the public home page.
- Read open blood requests.
- View public statistics supplied by Supabase functions.
- Open the login and registration portal.

There is no separate patient account workflow in the current implementation. Patient or case information can be represented in a hospital request through the optional case reference or patient ID field.

## 4. Technology Stack

### Frontend

- HTML5 for page structure and forms.
- CSS3 for responsive layouts, dashboards, cards, modals, tables, status badges, and forms.
- Vanilla JavaScript for state, validation, UI events, Supabase calls, modal behavior, filtering, and rendering.
- Supabase JavaScript client loaded from jsDelivr.

### Backend and Database

- Supabase Auth for email/password authentication.
- Supabase PostgreSQL for profiles, requests, completed requests, donation history, and administrator records.
- Row Level Security policies for user-owned and administrator-owned access.
- PostgreSQL functions for public statistics and protected administrator operations.

### Hosting and Development

- The pages are static files and are intended to be opened through VS Code Live Server or another static web server.
- Several pages load other HTML fragments with `fetch`, so opening files directly with the `file://` protocol may prevent some modal and profile features from working.

## 5. Main Application Areas

### 5.1 Public Home Page

File: `pages/Public Interfaces/Home/index.html`

The home page introduces the Community Blood Donation Network and contains:

- Brand header with login and registration links.
- Hero section with calls to find blood requests or become a donor.
- About section explaining the purpose of the platform.
- Feature section covering donor connection, donor search, urgent requests, information management, hospital coordination, and regular donation.
- Public statistics section.
- Public blood-request area.
- Footer/contact information.

The page also includes a scroll-aware header that hides while scrolling down and reappears while scrolling up.

The home page loads `home.css` and `home.js`. The statistics and open-request areas are intended to use Supabase-backed data where the related markup and integration are present.

### 5.2 Authentication and Registration Portal

File: `pages/Public Interfaces/Login/login.html`

The login page supports two portal modes:

- Donor.
- Hospital.

Each mode has two tabs:

- Login.
- Register.

The page therefore presents four forms:

1. Donor login.
2. Donor registration.
3. Hospital staff login.
4. Hospital staff registration.

#### Donor registration fields

- Full name.
- Email address.
- Password with a minimum length of six characters.
- Phone number.
- Blood group.
- Date of birth.
- Gender.
- City.
- Address.
- Last donation date.

The registration process creates a Supabase Auth user and stores the submitted profile values in Auth metadata. When a session is available, it also creates or verifies a matching row in `donor_profiles`.

#### Hospital registration fields

- Hospital email.
- Password with a minimum length of six characters.
- Hospital or clinic name.
- Registration number.
- Phone number.
- Location.
- Hospital type.
- Address.
- Blood-bank availability.
- Emergency contact.

The registration process creates a Supabase Auth user with `account_type: staff` and creates or verifies the related `staff_profiles` row.

#### Login behavior

Login uses `signInWithPassword`. The system checks the Auth metadata account type and then verifies or repairs the corresponding profile record. Successful login information is also placed in `localStorage` for dashboard display, and the user is redirected to the correct role dashboard.

## 6. Donor Features

### 6.1 Donor Dashboard

File: `pages/Doner Interfaces/donor/donor-dashboard.html`

The dashboard provides:

- Welcome message using the donor's first name.
- Blood group summary.
- Eligibility status.
- Last donation date.
- Total donation count.
- Current emergency/open request preview.
- Recent donation history preview.
- Quick actions for donor information, eligibility, and full history.
- Profile dropdown with information and logout actions.

The dashboard uses `pages/Doner Interfaces/donor/script.js` and `style.css`.

### 6.2 Donor Profile and Update Flow

The dashboard dynamically loads:

- `donor-information.html` for the read-only information view.
- `donor-update-profile.html` for the update form.

The information view displays name, email, phone, blood group, date of birth, gender, city, address, last donation, and eligibility.

The update form allows the donor to edit those values. The JavaScript attempts to update the authenticated user's `donor_profiles` row using Supabase and also keeps the display model in `localStorage`.

### 6.3 Eligibility Calculation

The donor dashboard performs a basic client-side eligibility calculation:

- Missing or invalid dates result in `Not verified`.
- An age below 18 or above 60 results in `Not eligible`.
- Fewer than 180 days since the last donation results in `Not eligible`.
- Otherwise the result is `Eligible`.

The next eligible date is calculated as 180 days after the last donation. This is a software estimate only and must be confirmed by an authorized healthcare professional.

### 6.4 Recording a Donation

The donor dashboard includes a modal form with:

- Donation date.
- Units donated.
- Hospital or donation center.

On submission, the system:

1. Confirms that an authenticated user exists.
2. Inserts a row into `donation_history` with status `completed`.
3. Updates `donor_profiles.last_donation`.
4. Refreshes the stored donor summary.
5. Reloads the dashboard and history display.

### 6.5 Donation History Page

File: `pages/Doner Interfaces/donor/donation-history.html`

The full history page displays:

- Total completed donations.
- Total completed units.
- Donation date.
- Hospital or donation center.
- Donation status.
- Units recorded for each donation.

Only the authenticated donor's records are queried through `donor_id`.

### 6.6 Emergency Request Preview

The donor dashboard queries the latest three open records from `blood_requests`. Each preview shows blood group, required units, hospital name, location, and urgency.

The separate donation request page is:

`pages/Doner Interfaces/donor/donation-requests.html`

It provides a styled request-list interface with urgency badges and request details. The page layout is present, while the current repository should be treated as requiring verification of its final data-loading integration before being described as a complete live donor response workflow.

### 6.7 Donor Directory

Files:

- `pages/Doner Interfaces/donor details/donor-list.html`
- `pages/Doner Interfaces/donor details/donor-list.js`

The directory UI supports:

- Search by donor name or city.
- Filter by blood group.
- Filter by availability status.
- Donor count.
- Donor cards.
- Donor detail popup.

At present, the JavaScript uses three temporary hardcoded donor records. It is therefore a working UI prototype rather than a live Supabase donor search. The contact button is also a visual control and does not currently implement a communication service.

## 7. Hospital Features

### 7.1 Hospital Dashboard

File: `pages/Hospital Interface/hospital-dashboard.html`

The hospital dashboard contains:

- Hospital welcome area.
- Active request count.
- Connected donor count display area.
- Completed request count.
- Total requested/completed blood units.
- Current request list.
- Hospital profile dropdown.
- Information and update profile actions.
- Logout action.

The main behavior is implemented in `pages/Hospital Interface/hospital-script.js`.

### 7.2 Creating a Blood Request

File: `pages/Hospital Interface/create-blood-request.html`

The request form collects:

- Blood group.
- Units required.
- Urgency: Emergency, Urgent, or Normal.
- Required date.
- Ward or department.
- Contact number.
- Case reference or patient ID.
- Additional notes.

The database model also associates the request with the authenticated hospital, hospital name, registration number, and location.

### 7.3 Request Lifecycle

An open request is visible to public and authenticated readers through the public read policy. The hospital that owns the request can:

- View it on its dashboard.
- Delete it.
- Complete it.

When completed, the record is archived in `completed_blood_requests` and is no longer part of the active request list. The completed-request table retains the request details and completion timestamp.

### 7.4 Hospital Profile

File: `pages/Hospital Interface/ hospital-update-profile.html`

The hospital profile form contains hospital name, email, phone, location, registration number, hospital type, address, blood-bank status, and emergency contact.

The dashboard uses `localStorage` as the current display source for hospital information and initializes fallback sample data when no stored profile exists. The live Supabase profile synchronization should be verified when demonstrating profile edits.

## 8. Administrator Features

Files:

- `pages/Admin Interface/admin-dashboard.html`
- `pages/Admin Interface/admin.js`
- `pages/Admin Interface/admin.css`

The administrator page starts with a dedicated sign-in view. A valid Supabase Auth user must also exist in `public.admin_profiles` before the administration dashboard is shown.

The dashboard loads five datasets in parallel:

1. Donor profiles.
2. Hospital staff profiles.
3. Active blood requests.
4. Donation history.
5. Completed blood requests.

Each section supports a text search across the current rows. The table renderer selects relevant columns for each section and adds a delete action.

Deleting a donor or hospital staff record calls the protected `admin_delete_user` PostgreSQL function. Deleting a request, completed request, or donation record deletes from its corresponding table.

## 9. Password Recovery Screens

Files:

- `pages/Public Interfaces/Forget-Password/forgot-password.html`
- `pages/Public Interfaces/Forget-Password/otp-verification.html`
- `pages/Public Interfaces/Forget-Password/reset-password/reset-password.html`

The password recovery UI contains:

1. Email entry.
2. OTP entry with six-digit format validation.
3. Resend countdown behavior.
4. Reset-password page.

The current email, OTP, and reset actions are demonstration flows using alerts and page navigation. They do not currently call Supabase Auth password recovery, send a real OTP, or update a Supabase password. This is a clear future integration area.

## 10. Database Design

The database additions and policies are defined in `supabase-blood-requests.sql`.

### 10.1 `blood_requests`

Stores active hospital requirements.

Important columns:

- `id`: UUID primary key.
- `hospital_id`: Auth user ID of the hospital owner.
- `hospital_name`.
- `hospital_registration`.
- `location`.
- `blood_group`.
- `units` with a positive-value check.
- `urgency` restricted to Emergency, Urgent, or Normal.
- `required_date`.
- `ward`.
- `contact`.
- `reference`.
- `notes`.
- `status` restricted to open, fulfilled, or cancelled.
- `created_at`.

Indexes are provided for request creation time and status.

### 10.2 `completed_blood_requests`

Stores archived/completed hospital requests. It retains the request identity and details, together with `completed_at` and `created_at` timestamps.

### 10.3 `donation_history`

Stores donor donation records.

Important columns:

- `id`.
- `donor_id` linked to `auth.users`.
- `hospital_name`.
- `donation_date`.
- `units` with a positive-value check.
- `status` restricted to completed or cancelled.
- `created_at`.

An index is provided on `donor_id`.

### 10.4 `admin_profiles`

Marks which Auth users are administrators. The role is restricted to `admin`, and the record is linked to `auth.users`.

### 10.5 Existing profile tables

The application also expects:

- `donor_profiles` for donor personal and blood information.
- `staff_profiles` for hospital information.

Those profile tables are referenced by the frontend and by the administrator policies. They must already exist in the Supabase project or be created by the project's broader database setup.

## 11. Security and Access Control

The SQL file enables Row Level Security on the new tables.

### Public access

- Anyone using the anonymous or authenticated role can read records from `blood_requests` only when `status = 'open'`.
- Anonymous and authenticated users can execute the public summary functions.

### Hospital access

- Only authenticated hospitals can insert requests where `hospital_id = auth.uid()`.
- Hospitals can update and delete only their own requests.
- Hospitals can read and archive only their own completed requests.

### Donor access

- Donors can read only their own donation history.
- Donors can insert and update only records where `donor_id = auth.uid()`.

### Administrator access

- `is_admin()` checks for a matching administrator record.
- Administrators can manage donor profiles, staff profiles, active requests, completed requests, and donation history.
- `admin_delete_user` refuses to run unless the caller is an administrator.

The frontend uses a publishable Supabase key. A Supabase service-role key must never be placed in frontend JavaScript. Database protection must therefore remain enforced by Auth and RLS policies.

## 12. Public Statistics

The SQL file provides two security-definer functions:

- `get_public_donation_summary()` returns completed donation count and total completed units.
- `get_public_donor_count()` returns the number of donor profiles.

Both functions are granted to anonymous and authenticated roles so the public home page can display aggregate information without exposing private profile rows.

## 13. Data and State Management

The system uses two complementary approaches:

### Supabase state

Supabase is the source of truth for authenticated profile records, blood requests, completed requests, and donation history.

### Browser local storage

`localStorage` is used to make dashboard displays immediately available between page navigations. Important keys include:

- `bloodConnectDonorProfile`.
- `hospitalData`.

The application refreshes local display data from Supabase in important donor flows, but local storage should be treated as a cache rather than a security boundary.

## 14. Folder and File Structure

```text
README.md
PROJECT_DOCUMENTATION.md
supabase-blood-requests.sql
Assets/images/
pages/
  Admin Interface/
    admin-dashboard.html
    admin.css
    admin.js
  Doner Interfaces/
    donor/
      donor-dashboard.html
      donor-information.html
      donor-update-profile.html
      donation-history.html
      donation-requests.html
      script.js
      style.css
    donor details/
      donor-list.html
      donor-list.css
      donor-list.js
  Hospital Interface/
    hospital-dashboard.html
    hospital-script.js
    hospital-style.css
    create-blood-request.html
    hospital-update-profile.html
  Public Interfaces/
    Home/
      index.html
      home.css
      home.js
    Login/
      login.html
      style.css
    Blood Requests/
      blood-requests.html
    Forget-Password/
      forgot-password.html
      forget-password.css
      otp-verification.html
      otp-verification.css
      reset-password/
        reset-password.html
        reset-password.css
```

The repository contains both root-level and page-level `Assets/images` locations. Image paths should be checked when moving pages or deploying them under a different base path.

## 15. Setup Instructions

### Step 1: Configure Supabase

1. Create or open the configured Supabase project.
2. Open the Supabase SQL Editor.
3. Run the complete `supabase-blood-requests.sql` file.
4. Confirm that `donor_profiles` and `staff_profiles` also exist.
5. Confirm that email authentication settings match the expected registration behavior.

### Step 2: Create an administrator

1. Create an administrator Auth account in Supabase Auth or through the existing account flow.
2. Insert the Auth user into `public.admin_profiles`:

```sql
INSERT INTO public.admin_profiles (id, email)
SELECT id, email
FROM auth.users
WHERE email = 'admin@example.com';
```

3. Use the administrator login page through Live Server.

### Step 3: Run the frontend

1. Open the repository in VS Code.
2. Start Live Server from the repository root or an appropriate page folder.
3. Open `pages/Public Interfaces/Home/index.html` or `pages/Public Interfaces/Login/login.html` through the server URL.
4. Register a donor and hospital test account.
5. Verify that the corresponding profile rows are created.
6. Log in to each role and test its workflow.

## 16. Demonstration Flow

For a complete presentation demonstration:

1. Open the home page and explain the platform purpose.
2. Register a donor with blood group, location, date of birth, and last donation date.
3. Log in as the donor and show the dashboard, eligibility calculation, profile view, donation recording, and history page.
4. Register a hospital staff account.
5. Log in as the hospital and create an Emergency request.
6. Return to the public request view and donor dashboard to show the request preview.
7. Complete or delete the hospital request and show the completed-request result.
8. Log in as the administrator and demonstrate counts, search, tabs, and controlled deletion.
9. Explain that password recovery and donor directory data are currently prototype-level integrations.

## 17. Testing Checklist

### Authentication

- Donor registration accepts valid required fields.
- Hospital registration accepts valid required fields.
- Passwords shorter than six characters are rejected.
- Donor and hospital account types cannot use the wrong portal.
- Invalid login credentials show an error.
- Successful users reach the correct dashboard.
- Logout clears the active session.

### Donor

- Profile details load after login.
- Donor profile edits save correctly.
- Eligibility changes when age or donation date changes.
- Donation records insert successfully.
- Last donation updates after recording a donation.
- History totals match completed records.
- Only the signed-in donor can read their history.

### Hospital

- A hospital can create a request only while authenticated.
- Required fields and positive unit counts are enforced.
- Open requests appear in public and donor views.
- A hospital sees only its own dashboard requests.
- Delete removes the selected request.
- Complete moves the request to completed history.

### Administrator

- Non-admin Auth users cannot enter the admin dashboard.
- Admin counts match the database.
- Tabs load the correct section.
- Search filters the selected section.
- Deletion requires confirmation.
- Donor/staff deletion uses the protected RPC function.

### Responsive UI

- Test the home page on desktop and mobile widths.
- Test donor and hospital dashboards on narrow screens.
- Test tables, cards, forms, and modals for overflow.
- Confirm that image paths work when served from Live Server.

## 18. Current Limitations and Future Enhancements

The following points should be stated honestly in a project presentation:

- The donor directory uses hardcoded temporary records instead of querying `donor_profiles`.
- The password recovery pages are UI demonstrations; real Supabase reset-password and OTP integration is still required.
- The hospital dashboard includes a donors-connected display area, but there is no complete donor-request response/matching workflow yet.
- The contact-donor action is visual and does not yet send a message or notification.
- Emergency notifications are represented through urgency and request previews; push, email, or SMS notifications are not implemented.
- The hospital profile interface currently relies heavily on local storage for its display model and should be fully synchronized with `staff_profiles`.
- Eligibility is a simplified client-side estimate and is not a medical decision.
- Input rendering and output escaping should be reviewed further wherever dynamic HTML templates are used.
- A separate patient account and patient dashboard are not implemented.
- Automated unit, integration, and end-to-end tests are not included in the repository.

Recommended future work:

1. Replace hardcoded donor data with a Supabase donor search query.
2. Add donor availability and consent controls.
3. Build request-to-donor matching and response tracking.
4. Add real email/password recovery through Supabase Auth.
5. Add real notification delivery for emergency requests.
6. Synchronize hospital profile updates directly with Supabase.
7. Add server-side or database-backed eligibility rules reviewed by healthcare professionals.
8. Add audit logs for administrator actions.
9. Add automated tests and deployment configuration.
10. Add a patient/requester account if the project requirements require one.

## 19. Team

- 6880 RMTV KARUNARATHNA
- 6882 SADPR SURAWEERA
- 6883 AD RANAWAKA
- 6945 SPOV KARUNATHILAKA

## 20. Conclusion

The project provides a functional foundation for a community blood donation network. Its strongest completed areas are role-based authentication, donor and hospital dashboards, Supabase-backed donation history, hospital blood-request management, public request visibility, and administrator data management with RLS protection.

The remaining prototype areas are isolated and clearly identifiable. With live donor directory queries, real password recovery, notifications, and a complete donor-request response workflow, the system can be extended into a more complete production-ready blood donation coordination platform.
