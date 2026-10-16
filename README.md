# Community Blood Donation Management System

A web application that connects blood donors, hospitals, blood banks, and people who need blood. It supports donor and hospital accounts, donation history, blood requests, an opt-in donor directory, and administrator tools.

For the SE32022 client/boutique crossover, this is Team 7's implementation of Team 6's Community Blood Donation app product idea.

## Technology stack

- **Frontend:** HTML, CSS, and JavaScript
- **Backend and database:** Supabase Auth and PostgreSQL
- **Development server:** VS Code Live Server or another static HTTP server

The application has no build step. Serve it over HTTP; some pages load shared content with `fetch` and do not work correctly from a `file://` URL.

## Run locally

1. Open this repository in VS Code.
2. Configure the Supabase project URL and publishable key in the pages that initialize the Supabase client.
3. Run `supabase-blood-requests.sql` in the Supabase SQL Editor. The project also expects `donor_profiles` and `staff_profiles` tables to exist.
4. Start Live Server from the repository root.
5. Open `pages/Public Interfaces/Home/index.html`.

Never put a Supabase service-role key or user password in frontend code.

## Administrator setup

Create an Auth user, then add that user to `public.admin_profiles` in the Supabase SQL Editor:

```sql
INSERT INTO public.admin_profiles (id, email)
SELECT id, email
FROM auth.users
WHERE email = 'admin@example.com';
```

Open `pages/Admin Interface/admin-dashboard.html` through Live Server. Run the SQL file first so the administrator policies and `admin_delete_user` function are available.

## Lecturer demonstration

The team reports that donor and hospital registration/login, hospital request creation and completion, donor donation recording, and the administrator workflow have been verified against the configured Supabase project (2026-10-14). Use prepared test accounts and serve the site over HTTP; do not display account passwords or privileged credentials. The team should confirm the presentation machine can reach the configured Supabase project before the demonstration.

**Live deployment:** Add the publicly accessible deployment URL here before final handover. The repository currently provides local run instructions as a fallback; it does not record a live deployment URL.

### Client handover

The handover covers the public request pages, donor registration/profile and donation history, hospital request management, and administrator tools. The recipient should receive the deployment URL, setup notes, and a secure way to obtain their own account access. Do not place passwords, service-role keys, or other secrets in this repository. Known limitations are listed below and in [Sprint Journals](docs/sprint-journals.md).

Known limitations to disclose if asked: password recovery is not connected to Supabase Auth, the donor directory/contact action is not a live integration, and eligibility information is a simplified estimate rather than medical advice. See [Sprint Journals](docs/sprint-journals.md) for release notes and [System Architecture](docs/architecture.md) for the system boundaries.

## Repository structure

```text
your-repo/
  docs/
    product-backlog.md
    definition-of-done.md
    architecture.md
    sprint-journals.md
  pages/                         Application code, organized by interface
  Assets/                        Shared image assets
  portfolio-6880.md              Software Developer
  portfolio-6882.md              Project Owner
  portfolio-6883.md              Scrum Master
  portfolio-6945.md              UI/UX Designer
  supabase-blood-requests.sql     Database schema, functions, and policies
  README.md                      Setup, deployment, and usage guide
```

Application code is organized by user role under `pages/`. The four shared project documents are in `docs/`, and each team member's portfolio is in the repository root. Architecture diagrams use Mermaid.

## Project documents

- [GitHub repository](https://github.com/CommunityBloodDonation/Community-Blood-Donation-Management-System)
- [GitHub issues](https://github.com/CommunityBloodDonation/Community-Blood-Donation-Management-System/issues)

- [Product backlog](docs/product-backlog.md)
- [Definition of Done](docs/definition-of-done.md)
- [System architecture](docs/architecture.md)
- [Sprint journals](docs/sprint-journals.md)
- [6880 — Software Developer portfolio](portfolio-6880.md)
- [6882 Project Owner portfolio](portfolio-6882.md)
- [6883 Scrum Master portfolio](portfolio-6883.md)
- [6945 — UI/UX Developer portfolio](portfolio-6945.md)

## Team

- 6880 RMTV KARUNARATHNA - Software Developer
- 6882 SADPR SURAWEERA - Project Owner
- 6883 AD RANAWAKA - Scrum Master
- 6945 SPOV KARUNARATHILAKA - UI/UX Developer

This is a group project for the RAD/Scrum assignment. Individual responsibilities and project evidence are documented in each student's portfolio.


