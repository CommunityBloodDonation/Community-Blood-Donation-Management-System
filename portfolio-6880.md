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
| Frontend implementation | Developed and integrated HTML, CSS, and JavaScript page behavior for the donor, hospital, public, or administrator workflows assigned during the project. | `pages/` role interfaces; system structure in [System Architecture](docs/architecture.md). |
| Supabase integration | Worked with Supabase Auth and PostgreSQL-backed operations used for profiles, blood requests, donation history, and administrator functions. | [Database SQL](supabase-blood-requests.sql); [System Architecture](docs/architecture.md). |
| Implementation support | Used the product backlog and Definition of Done to connect feature work to acceptance criteria and documented project behavior. | [Product Backlog](docs/product-backlog.md); [Definition of Done](docs/definition-of-done.md). |

## Skills developed

HTML, CSS, JavaScript, Supabase Auth, PostgreSQL/RLS concepts, debugging across role-based workflows, and collaborating through an iterative backlog.

## Challenge and approach

The application spans several user roles and data permissions. I approached this by mapping pages and data operations to the role that uses them, then checking the documented ownership and RLS boundaries while integrating features.

## Reflection and next steps

This project strengthened my experience connecting frontend interactions to a hosted backend. I would continue by consolidating shared Supabase setup and adding repeatable checks for role access and request lifecycle behavior.

## Project references

- [README and setup](README.md)
- [Product backlog](docs/product-backlog.md)
- [Definition of Done](docs/definition-of-done.md)
- [System architecture](docs/architecture.md)
- [Sprint journals](docs/sprint-journals.md)
