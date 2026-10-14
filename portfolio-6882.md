# Individual Portfolio: SADPR SURAWEERA

**Student ID:** 6882  
**Project role:** Project Owner  
**Project:** Community Blood Donation Management System (CBDMS)  
**Methodology:** RAD with Scrum

## Project Overview

The Community Blood Donation Management System is a web application designed to help donors, hospitals and blood banks coordinate donation activity and blood requests. The repository includes public information pages, donor and hospital workflows, donation records, request management, and administrator tools. The frontend uses HTML, CSS, and JavaScript; Supabase provides authentication and database services.

## Role and Responsibilities

As Project Owner, my focus was the product direction: defining the users the system serves, shaping the scope around their needs, ordering the proposed work, and making completion expectations understandable to the team. The product serves donors, hospital/blood-bank staff, requesters, administrators, and public visitors, each with distinct tasks and access needs.

| Responsibility | Contribution reflected in the project | Evidence |
|---|---|---|
| Product vision | Framed the platform around coordinating blood requests, donor discovery, donation history, and administrative oversight. | [Product backlog](docs/product-backlog.md), [README](README.md) |
| Scope and user needs | Organized the scope into user profiles, organization accounts, requests, donor search and responses, administration, reporting, and quality requirements. Documented exclusions such as medical diagnosis and replacing professional medical judgment. | [Product boundaries and risks](docs/product-backlog.md#product-boundaries-and-risks) |
| Backlog refinement | Maintained a structured index of 30 planned backlog items with priorities and a five-sprint sequence. The sprint assignments are planned estimates, not proof of delivery. | [Product backlog — story index](docs/product-backlog.md#ordered-story-index) |
| Acceptance and release clarity | Documented readiness and completion criteria, including validation, authorization, testing, review, documentation, and evidence expectations. | [Definition of Done](docs/definition-of-done.md) |
| Product risk visibility | Kept policy and integration decisions visible, including eligibility rules, donor privacy, notification delivery, and Supabase/RLS verification. | [Product backlog — risks](docs/product-backlog.md#product-boundaries-and-risks), [Sprint journals](docs/sprint-journals.md) |

## Product Decisions and Priorities

The backlog prioritizes authentication, role-based access, donor and organization profiles, donation records, and blood request workflows as core product capabilities. Donor search, emergency responses, and administration extend those workflows. Reporting, performance, reliability, and system testing are also specified so that the intended product is evaluated beyond its visible interface.

The backlog separates in-scope capabilities from out-of-scope medical decisions and payments. It also states that role restrictions must be enforced by backend policies and that eligibility output is informational rather than a medical determination. These boundaries help keep the product useful without overstating what the application can safely decide.

## Project Evidence and Outcome

The repository contains a 30-story product baseline, five proposed sprint groupings, acceptance criteria, a Definition of Ready and Definition of Done, and sprint journals describing implementation increments and outstanding verification. The codebase and SQL provide implementation evidence for features; the backlog itself is a planning record and does not certify every story as complete. The project documentation identifies role/RLS checks and some integrations as follow-up work.

### Commit history

These are file-history pages, not direct links to a specific authored pull request or commit. Add direct links to significant commits or pull requests for each sprint, and ensure the linked work is authored by your GitHub account.

- [Product backlog history](https://github.com/CommunityBloodDonation/Community-Blood-Donation-Management-System/commits/main/docs/product-backlog.md)
- [Definition of Done history](https://github.com/CommunityBloodDonation/Community-Blood-Donation-Management-System/commits/main/docs/definition-of-done.md)

## Skills Developed

Product vision and scope definition, user-role analysis, backlog organization, prioritization, acceptance-criteria writing, risk communication, and balancing desired functionality against project constraints.

## Challenge and Approach

The product spans several user groups with different permissions, and some expected behavior depends on client or environment decisions. For example, official donor eligibility rules, requester verification, permitted donor data, notification delivery, and organization verification need explicit policy. Recording these decisions and dependencies in the backlog makes assumptions visible and gives implementation and review a shared reference.

## Reflection and Future Improvements

This project strengthened my understanding of how product ownership connects user needs to a deliverable scope and measurable acceptance criteria. If the product continues, I would validate the most important workflows with donor and hospital representatives, confirm unresolved policy decisions early, and ensure each accepted story links to test results and demonstration evidence. I would also use actual team capacity and feedback to revise the proposed sprint sequence rather than treating the initial plan as fixed.

For the assessed Agile reflection, add a specific bottleneck you personally faced, how you adapted to help the team self-organize, and an engineering practice you actually used (such as pair programming, code review, or TDD) with why you chose it. The repository does not establish those personal details, so they must come from your own experience.

## Project References

- [README and setup](README.md)
- [Product backlog](docs/product-backlog.md)
- [Definition of Done](docs/definition-of-done.md)
- [System architecture](docs/architecture.md)
- [Sprint journals](docs/sprint-journals.md)
