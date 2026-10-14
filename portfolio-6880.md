# Individual Portfolio: RMTV KARUNARATHNA

**Student ID:** 6880  
**Project role:** Software Developer  
**Project:** Community Blood Donation Management System

## Project overview

The Community Blood Donation Management System is a web application intended to connect donors, hospitals, blood banks, and people who need blood. It includes public information and blood requests, donor and hospital workflows, donation records, and administrator tools. The frontend uses HTML, CSS, and JavaScript, with Supabase providing authentication and database services.

## Role and contribution

I contributed to implementing the Community Blood Donation Management System as a multi-page web application backed by Supabase. My role focused on translating the team’s requirements into working frontend behavior and database-connected workflows.

| Area | Contribution | Project evidence |
|---|---|---|
| Donor workflows | Implemented donor profile loading and updates, donation recording, request display, and donation history behavior. | [`script.js`](pages/Doner%20Interfaces/donor/script.js), [`donation-history.html`](pages/Doner%20Interfaces/donor/donation-history.html), [`donor-dashboard.html`](pages/Doner%20Interfaces/donor/donor-dashboard.html). |
| Hospital workflows | Implemented request creation and dashboard request lifecycle behavior. | [`hospital-script.js`](pages/Hospital%20Interface/hospital-script.js), [`create-blood-request.html`](pages/Hospital%20Interface/create-blood-request.html), [`hospital-dashboard.html`](pages/Hospital%20Interface/hospital-dashboard.html). |
| Database and access support | Contributed to the documented Supabase schema, request, donation-history, and administrator database operations. | [`supabase-blood-requests.sql`](supabase-blood-requests.sql), [System Architecture](docs/architecture.md). |

### Commit history

These are file-history pages, not direct links to a specific authored pull request or commit. Add direct links to significant commits or pull requests for each sprint, and ensure the linked work is authored by your GitHub account.

- [Donor script history](https://github.com/CommunityBloodDonation/Community-Blood-Donation-Management-System/commits/main/pages/Doner%20Interfaces/donor/script.js)
- [Hospital workflow history](https://github.com/CommunityBloodDonation/Community-Blood-Donation-Management-System/commits/main/pages/Hospital%20Interface/hospital-script.js)
- [Database SQL history](https://github.com/CommunityBloodDonation/Community-Blood-Donation-Management-System/commits/main/supabase-blood-requests.sql)

## Skills developed

HTML, CSS, JavaScript, Supabase Auth, PostgreSQL/RLS concepts, debugging across role-based workflows, and collaborating through an iterative backlog.

## Challenge and approach

The application spans several user roles and data permissions. I approached this by mapping pages and data operations to the role that uses them, then checking the documented ownership and RLS boundaries while integrating features.

## Reflection and next steps

This project strengthened my experience connecting frontend interactions to a hosted backend. I would continue by consolidating shared Supabase setup and adding repeatable checks for role access and request lifecycle behavior.

For the assessed Agile reflection, add a specific bottleneck you personally faced, how you adapted to help the team self-organize, and an engineering practice you actually used (such as pair programming, code review, or TDD) with why you chose it. The repository does not establish those personal details, so they must come from your own experience.

## Project references

- [README and setup](README.md)
- [Product backlog](docs/product-backlog.md)
- [Definition of Done](docs/definition-of-done.md)
- [System architecture](docs/architecture.md)
- [Sprint journals](docs/sprint-journals.md)
