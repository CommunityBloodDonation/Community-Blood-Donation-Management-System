# Definition of Done

This document defines when a feature, user story, sprint increment, and release can be considered complete for the Community Blood Donation Management System.

Use this as the team's shared completion checklist. A backlog item moves to Done only when its applicable criteria below are satisfied and its status/evidence are reflected in the backlog and sprint journal.

## User Story Done

A user story is done when:

- The user goal and acceptance criteria are understood.
- The relevant HTML, CSS, and JavaScript behavior is implemented.
- Required form fields and basic invalid-input cases are handled.
- The feature works through the intended Live Server URL.
- Supabase reads and writes use the correct table and authenticated user ID where required.
- Empty, loading, and error states are present for data-driven screens.
- The feature does not expose another user's private records.
- Any unfinished integration is explicitly marked as a limitation or backlog item.
- The affected page is checked at desktop and mobile widths.
- The documentation is updated when the user-visible behavior changes.

## Database and Security Done

Database work is done when:

- Required tables, columns, constraints, indexes, and timestamps are defined.
- Foreign keys point to the correct Auth or application records.
- Row Level Security is enabled for protected tables.
- Policies enforce ownership using `auth.uid()` where applicable.
- Administrator policies require `public.is_admin()`.
- Public functions expose aggregate information only and do not reveal private profile data.
- Security-definer functions set a safe `search_path` and restrict execution privileges.
- No service-role key or password is committed to frontend code.
- The SQL can be run in the configured Supabase project without avoidable errors.

## Frontend Done

Frontend work is done when:

- Navigation points to existing pages.
- Controls have labels, useful names, and appropriate input types.
- Buttons cannot be submitted repeatedly while an asynchronous operation is in progress.
- Success and failure messages are understandable.
- Dynamic values are inserted safely, especially in tables and cards.
- Modals can be opened, closed, and dismissed in a predictable way.
- Responsive layouts do not introduce horizontal overflow or overlapping content.
- Images load with meaningful alternative text where appropriate.
- The page works when served over HTTP through Live Server.

## Role Workflow Done

### Donor

- Registration and login work with a donor account.
- Donor profile data loads for the authenticated user.
- Profile edits persist to the donor profile record.
- Eligibility and next eligible date display using valid input data.
- Donation recording creates an authenticated donor-owned history record.
- Donation history totals and entries match the database.
- Logout ends the Supabase session.

### Hospital Staff

- Registration and login work with a staff account.
- Hospital information is displayed consistently after login.
- A request can be created with valid required data.
- Request ownership is tied to the authenticated hospital.
- Open requests can be reviewed and deleted by their owner.
- Completion archives the request and removes it from active results.

### Administrator

- An administrator must be authenticated and listed in `admin_profiles`.
- Dashboard counts match the loaded records.
- Each section loads the intended table.
- Search filters the active section.
- Destructive actions require confirmation.
- User deletion calls the protected RPC rather than exposing privileged credentials.

## Sprint Increment Done

A sprint increment is done when:

- All committed stories satisfy the user-story definition of done.
- The changed pages have been manually tested using representative donor, hospital, and administrator accounts.
- Database policy changes have been tested with both allowed and denied access paths.
- No known blocking error remains in the changed workflow.
- Documentation, backlog status, and sprint journal entries are updated.
- Changes are reviewed by at least one other team member when possible.

## Release Done

An academic release is done when:

- The project can be opened from the documented Live Server entry point.
- Supabase setup instructions and administrator setup are documented.
- The main donor, hospital, public, and administrator demonstrations are repeatable.
- Known limitations are listed honestly.
- The final repository contains no accidental secrets, debug credentials, or unrelated generated files.
- `docs/product-backlog.md`, `docs/definition-of-done.md`, `docs/architecture.md`, and `docs/sprint-journals.md` are present and current.
- `README.md` explains setup, deployment, and where the deliverables live.
- One individual portfolio per team member is present in the repository root, identifies the assigned project role, and links contributions to repository evidence.
