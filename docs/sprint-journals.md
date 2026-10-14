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

The team reports that the configured Supabase environment and the core workflows below have been verified and are working (reported 2026-10-14):

- Donor and hospital registration and login.
- Hospital blood-request creation and completion.
- Donor donation recording.
- Administrator workflow.

The application is intended to be served through Live Server or another HTTP server. For a lecturer demonstration, open the public home page and use prepared donor, hospital, and administrator accounts. Do not display passwords or privileged credentials. The workflows above are recorded from the team's confirmation; this repository review did not independently exercise the live Supabase environment.

The backlog contains planned estimates, not measured sprint velocity. Actual sprint dates, completed issue links, review/retrospective notes, burndown data, and formal UAT feedback are not recorded in this repository. If the lecturer requires process evidence, add the team's real GitHub issue/project links and actual meeting or test records before submission; do not infer them from the planned backlog.

Before the demonstration, confirm the presentation machine can reach the configured Supabase project and that the required tables and administrator profile are present. Record any environment-specific issues if they arise.

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

- The Supabase project must retain the required `donor_profiles` and `staff_profiles` tables, which are not created by the supplied SQL file.
- Password recovery screens are not connected to Supabase Auth; do not present password recovery as a working feature.
- The eligibility calculation is a simplified software estimate, not a medical decision.
- The donor directory and contact action are not live integrations; do not promise live matching or contact delivery.
- Frontend pages depend on correct relative paths and an HTTP development server.

## Ceremony and analytics evidence required by the assignment

The sprint summaries above describe repository work; they are not a dated ceremony log. This repository does not currently contain the required dated Sprint Planning notes, at least three standup summaries per week, sprint review feedback from the client team, retrospective findings, GitHub Projects board URL/history, or sprint-close burndown snapshots. Add the team's actual records and board evidence here before submission. Do not reconstruct meeting notes or velocity from planned story points.

The documented UAT and workflow confirmation is the team's report dated 2026-10-14; there is no detailed client-team UAT scenario/result log or Milestone 1/2 feedback record in this repository yet.
