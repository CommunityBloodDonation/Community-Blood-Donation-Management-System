# Sprint Journals

This journal records the project progression represented by the current repository. It is written as an implementation record based on the completed pages and database work, with unresolved work kept visible for the next sprint.

The journal is the record of sprint goals, team work, outcomes, evidence, and follow-ups. It complements the ordered story index in `product-backlog.md`; individual contribution summaries belong in each student's root-level `portfolio-<student-id>.md` file.

## Sprint 1: Product Foundation

### Goal

Define the problem, target users, navigation, and initial visual language for a community blood donation platform.

### Work completed

- Defined the donor, hospital/blood-bank staff, administrator, and public visitor roles.
- Created the public home page with hero content, feature sections, calls to action, and public-facing navigation.
- Established the repository structure for public, donor, hospital, and administrator interfaces.
- Added reusable visual patterns for headers, cards, dashboards, forms, badges, modals, and empty states.

### Evidence in repository

- `pages/Public Interfaces/Home/index.html`
- `pages/Public Interfaces/Home/home.css`
- `pages/Public Interfaces/Login/login.html`
- Role-specific page folders under `pages/`

### Outcome

The project had a navigable frontend foundation and a clear role-based product direction.

### Follow-up

- Verify all relative image paths through Live Server.
- Keep public claims aligned with features that are actually connected to Supabase.

## Sprint 2: Authentication and Profiles

### Goal

Allow donors and hospital staff to register, authenticate, and reach the correct role dashboard.

### Work completed

- Added donor and hospital login modes.
- Added donor and hospital registration forms.
- Added Supabase email/password authentication.
- Added account-type metadata to distinguish donor and staff accounts.
- Added donor profile creation/repair logic.
- Added hospital staff profile creation/repair logic.
- Added local display state for donor and hospital dashboards.

### Evidence in repository

- `pages/Public Interfaces/Login/login.html`
- `pages/Doner Interfaces/donor/script.js`
- `pages/Hospital Interface/hospital-script.js`
- `public.donor_profiles` and `public.staff_profiles` references throughout the frontend

### Outcome

The two primary operational roles can register and log in through a shared portal, subject to Supabase configuration.

### Follow-up

- Synchronize hospital profile updates directly with Supabase.
- Add automated tests for wrong-role login attempts and incomplete profile repair.

## Sprint 3: Donor and Hospital Workflows

### Goal

Implement the main operational workflows: donation history and hospital blood requests.

### Work completed

- Added donor profile information and update screens.
- Added basic age and donation-date eligibility calculation.
- Added donation recording from the donor dashboard.
- Added donor donation history summaries and full history page.
- Added hospital blood-request form.
- Added active request loading for hospitals.
- Added request deletion.
- Added request completion and archive behavior.
- Added public and donor previews for open requests.

### Evidence in repository

- `pages/Doner Interfaces/donor/donor-dashboard.html`
- `pages/Doner Interfaces/donor/donor-information.html`
- `pages/Doner Interfaces/donor/donor-update-profile.html`
- `pages/Doner Interfaces/donor/donation-history.html`
- `pages/Hospital Interface/create-blood-request.html`
- `pages/Hospital Interface/hospital-dashboard.html`
- `pages/Hospital Interface/hospital-script.js`

### Outcome

The project supports the core donor contribution flow and the hospital request lifecycle.

### Follow-up

- Add donor responses and hospital-to-donor matching.
- Replace the sample donor directory with a live query.
- Add a cancellation workflow if the product requirements require it.

## Sprint 4: Database Security and Administration

### Goal

Protect records and provide controlled administrative oversight.

### Work completed

- Added `blood_requests` and request indexes.
- Added `completed_blood_requests`.
- Added `donation_history` and donor ownership policies.
- Added public aggregate functions for statistics.
- Added `admin_profiles` and `is_admin()`.
- Added administrator policies for profiles, requests, completed requests, and donation history.
- Added the protected `admin_delete_user` function.
- Added administrator dashboard tabs, counts, search, tables, and deletion actions.

### Evidence in repository

- `supabase-blood-requests.sql`
- `pages/Admin Interface/admin-dashboard.html`
- `pages/Admin Interface/admin.js`
- `README.md` administrator setup instructions

### Outcome

The application has a database-backed management surface with explicit ownership and administrator access rules.

### Follow-up

- Test RLS using anonymous, donor, hospital, and admin sessions.
- Add an audit log for destructive administrator operations.
- Avoid relying on frontend assumptions for any security decision.

## Sprint 5: Documentation and Release Readiness

### Goal

Capture the implemented system accurately and prepare a repeatable demonstration.

### Work completed

- Added the required repository documents and role-based individual portfolios.
- Added a product backlog with implemented, pending, and future items.
- Added a definition of done for stories, database work, UI work, sprints, and release.
- Added this architecture note covering frontend layers, data flow, security, and deployment.
- Added this sprint journal.

### Outcome

The project now has a documentation set that distinguishes completed functionality from prototype and future work.

### Release checks

- Configure Supabase and run the complete SQL file.
- Create donor and hospital test users.
- Create an administrator Auth user and add it to `admin_profiles`.
- Run the pages through Live Server.
- Demonstrate registration, login, request creation, donation recording, request completion, and admin search/deletion.
- Record any environment-specific errors before final submission.

## Next Sprint Candidate

### Focus

Complete the highest-value unfinished workflow: live donor discovery and request response tracking.

### Proposed tasks

1. Replace hardcoded donor directory records with a Supabase query.
2. Add donor availability and consent fields.
3. Add a request-response table with donor, request, status, and timestamps.
4. Allow donors to respond to open requests.
5. Show responses to the hospital that owns the request.
6. Add RLS policies for donor and hospital visibility.
7. Add browser tests for the complete request-response flow.

## Open Risks

- Supabase table setup outside the supplied SQL file must exist for profiles and authentication to work.
- Password recovery screens are not connected to Supabase Auth.
- The eligibility calculation is a simplified software estimate, not a medical decision.
- The donor directory and contact action are not live integrations.
- Frontend pages depend on correct relative paths and an HTTP development server.
