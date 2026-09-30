# Product Backlog

## Product Vision

Provide a simple and secure platform that helps donors, hospitals, blood banks, patients, and administrators coordinate blood availability and donation records.

## Priorities

- **Must:** Required for a usable academic release.
- **Should:** Important improvements that strengthen the main workflows.
- **Could:** Valuable enhancements when time permits.
- **Won't yet:** Explicitly outside the current release.

## Current Release Backlog

| ID | Priority | User story | Acceptance criteria | Status |
|---|---|---|---|---|
| PB-01 | Must | As a donor, I want to register and log in so that I can access my dashboard. | Donor registration validates required fields, creates a Supabase Auth user, creates/verifies `donor_profiles`, and redirects to the donor dashboard after login. | Implemented |
| PB-02 | Must | As hospital staff, I want to register and log in so that I can publish blood requirements. | Hospital registration stores account metadata and creates/verifies `staff_profiles`; successful login redirects to the hospital dashboard. | Implemented |
| PB-03 | Must | As a donor, I want to view and update my profile. | The profile view displays donor details and the update form saves the authenticated donor record. | Implemented |
| PB-04 | Must | As a donor, I want to record donations so that my contribution history is available. | A completed donation is inserted into `donation_history`, updates the last donation date, and appears in history totals. | Implemented |
| PB-05 | Must | As hospital staff, I want to create a blood request. | The request form validates blood group, units, urgency, date, ward, and contact data and inserts an authenticated hospital-owned request. | Implemented |
| PB-06 | Must | As a visitor or donor, I want to see open blood requests. | Open requests can be read publicly and are displayed in the public request view or donor preview. | Implemented / verify page integration |
| PB-07 | Must | As hospital staff, I want to manage my requests. | The owner can view, edit, cancel, delete, and complete requests; completed requests are archived separately. | Implemented; SQL and UI wired |
| PB-08 | Must | As an administrator, I want to manage platform data. | An Auth user listed in `admin_profiles` can view, search, and delete permitted records. | Implemented |
| PB-09 | Must | As the platform, I want to protect user data. | RLS restricts donor history and hospital requests to their owners; administrator actions require `is_admin()`. | Implemented |
| PB-10 | Should | As a donor, I want to know whether I can donate. | The dashboard calculates a basic result using age and a 180-day interval from the last donation. | Implemented; requires medical review |
| PB-11 | Should | As a visitor, I want to see aggregate donation statistics. | Public functions return donor count, completed donation count, and total units without exposing private rows. | Implemented; verify home-page rendering |
| PB-12 | Should | As a donor, I want to search real available donors. | Directory search uses `donor_profiles`, supports blood-group/location filtering, and respects availability/consent. | Implemented in frontend and SQL; apply SQL and verify Supabase policies |
| PB-13 | Should | As a donor, I want to respond to an emergency request. | A donor can view request details and submit a response that the hospital can track. | Implemented in frontend and SQL; apply SQL and verify end-to-end |
| PB-14 | Should | As a user, I want to recover my password. | Supabase sends a real recovery email and the reset form updates the password securely. | Implemented; configure allowed redirect URL in Supabase and verify email flow |
| PB-15 | Could | As a hospital, I want to see connected donor responses. | The dashboard calculates connected donors from recorded request responses. | Implemented in dashboard and SQL; apply SQL and verify |
| PB-16 | Could | As a user, I want emergency notifications. | The system sends configurable email, SMS, or push notifications for emergency requests. | Not started |
| PB-17 | Could | As an administrator, I want an audit trail. | Administrative deletions and important updates are recorded with actor, timestamp, action, and target. | Not started |
| PB-18 | Could | As a maintainer, I want automated tests. | Authentication, RLS-sensitive workflows, request lifecycle, and responsive UI have repeatable automated checks. | Not started |

## Remaining Preparation

- Apply the updated `supabase-blood-requests.sql` in Supabase before demonstrating directory preferences or donor responses.
- Add the reset page URL to Supabase Auth's allowed redirect URLs and configure the recovery email template.
- Add in-app or email/SMS notification delivery for requests and donor responses.
- Add administrator charts/reports and an audit log for protected changes.
- Review loading, error, and empty states across pages, then perform responsive and role/RLS verification.
- Verify public About, How It Works, and Contact page coverage against the final submission rubric.

## Technical Debt and Cleanup

- Review dynamic HTML rendering for consistent output escaping.
- Normalize inconsistent folder naming such as `Doner Interfaces` and filenames containing leading spaces.
- Centralize the Supabase client configuration so URLs and publishable keys are not repeated across pages.
- Add loading, empty, and error states consistently across every data-driven page.
- Verify all relative asset paths when served from the repository root.

## Definition of Priority Completion

The current academic release is considered feature-complete when all Must items work through Live Server with a configured Supabase project, the main role workflows can be demonstrated end to end, and known prototype-only areas are documented.
