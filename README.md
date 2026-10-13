# Community Blood Donation Management System

A web application that connects blood donors, hospitals, blood banks, and people who need blood. It supports donor and hospital accounts, donation history, blood requests, an opt-in donor directory, and administrator tools.

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

The guide allows teams to organize application code according to their technology stack; this repository uses `pages/`. Keep the four required shared documents in `docs/` and one individual portfolio per student in the repository root. The architecture diagrams use Mermaid.

## Project documents

- [Product backlog](docs/product-backlog.md)
- [Definition of Done](docs/definition-of-done.md)
- [System architecture](docs/architecture.md)
- [Sprint journals](docs/sprint-journals.md)
- [6880 â€” Software Developer portfolio](portfolio-6880.md)
- [6882 Project Owner portfolio](portfolio-6882.md)
- [6883 Scrum Master portfolio](portfolio-6883.md)
- [6945 â€” UI/UX Designer portfolio](portfolio-6945.md)

## Team

- 6880 RMTV KARUNARATHNA â€” Software Developer
- 6882 SADPR SURAWEERA — Project Owner
- 6883 AD RANAWAKA — Scrum Master
- 6945 SPOV KARUNARATHILAKA â€” UI/UX Designer

This is a group project for the RAD/Scrum assignment. Individual responsibilities and project evidence are documented in each student's portfolio.


