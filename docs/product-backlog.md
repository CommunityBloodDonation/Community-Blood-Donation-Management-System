# Product Backlog

**Project:** Community Blood Donation Management System (CBDMS)  
**Methodology:** RAD with Scrum  
**Project duration:** 10 weeks, planned as five two-week sprints  
**Status:** Final planning baseline for a completed project  
**Version:** 1.0

> This backlog records the intended product scope and acceptance criteria. Proposed stories and sprint allocations are planning information, not evidence that a feature was implemented, tested, or accepted. Consult the application, sprint journals, and project evidence for actual delivery status. The project is closed; the proposed plan below is retained as its planning record.

## Purpose

This document defines the product vision, scope, user roles, priorities, proposed sprint sequence, and acceptance criteria for the CBDMS. It is the human-readable backlog index. No GitHub issue links, assignees, estimates, or implementation status are invented here; none were supplied with the source backlog.

## Product Vision and Problem

Build a centralized, responsive web application connecting blood donors, hospitals and blood banks, and patients or requesters. It should help authorized users manage blood requests, find potential donors by blood group and location, coordinate urgent needs, maintain donation histories, and monitor activity.

During emergencies, finding a suitable donor can be slow when people rely on social media, telephone calls, and personal contacts. A centralized platform can make donor information and request status easier to manage, reduce duplicated effort, and help authorized organizations coordinate blood requirements.

## Objectives

- Maintain donor profiles and a centralized donor directory.
- Support donor searches by blood group, location, availability, and eligibility information.
- Let authorized users create and track blood requests.
- Support emergency notifications to potentially suitable donors and allow donors to accept or decline requests.
- Maintain donation records and show history to appropriate users.
- Support hospital and blood-bank registration and administrator verification.
- Provide administrative statistics and reports.
- Protect personal data through authentication and role-based access control.
- Deliver a responsive, usable application and test the integrated system.

## Scope

### In scope

- Donor, patient/requester, and hospital/blood-bank registration and login.
- User profiles and role-based access.
- Donor profile, availability, eligibility-status display, and donation history.
- Hospital/blood-bank profiles and verification.
- Blood request creation, viewing, status updates, and tracking.
- Donor search, matching filters, emergency notifications, and donor responses.
- Administrator user, request, and organization management.
- Reports, statistics, responsive interface, security, performance, integration, testing, and project documentation.

### Out of scope

- Medical diagnosis or treatment advice.
- Detailed medical records beyond information needed for donation eligibility.
- Online payments.
- Replacing professional medical judgment or official blood-bank procedures.
- Treating an application eligibility rule as proof that a donor is medically fit.

## User Roles

| Role | Main responsibilities |
|---|---|
| Donor | Register, manage profile and availability, view relevant requests and notifications, respond to requests, and view eligibility status and donation history. |
| Hospital/blood-bank staff | Manage the organization profile, submit and manage blood requests, search for potential donors, update request status, and maintain authorized donation records. |
| Patient/requester | Register, create or submit requests where permitted, and track request status. |
| System administrator | Manage users, verify organizations, monitor requests, and view reports and statistics. |

Access must be enforced by application logic and backend policies, not only by hiding interface elements.

## Backlog Conventions

### Priority

- **High:** Required for the main workflow, security, or a core project objective.
- **Medium:** Important supporting capability that can follow core workflows.
- **Low:** Useful enhancement that is not essential to the initial release.

### Status workflow

The proposed GitHub Projects statuses are **Product Backlog** (identified, not selected), **To Do** (selected and ready), **In Progress**, **Review/Testing**, and **Done**. A story belongs in To Do only after sprint planning. Done requires its acceptance criteria, review/testing, and evidence to be complete. These are workflow definitions from the baseline, not current statuses for this closed project.

### Issue fields, estimates, and dependencies

If this backlog is used to continue the product, track each story in an issue titled `[US-XX] Short story title`. Include its story, acceptance criteria, dependencies, relevant SRS references, priority, module/type labels, planned sprint, agreed assignee, and links to implementation evidence. Add only real issue URLs; do not invent them. Keep estimates unestimated until the team estimates together. Sprint allocation is not a substitute for capacity planning. Record dependencies such as authentication, schema, access policies, UI design, or other stories; split stories when needed to fit a sprint.

## Proposed Sprint Plan

The five two-week sprints are the proposed sequence from the original planning baseline. They are not a claim about completed sprint delivery.

| Sprint | Focus | Stories | Intended outcome |
|---|---|---|---|
| 1 | Foundation, registration, authentication, access control, responsive UI | US-01–US-05 | Users register/login, access is role-aware, profiles can be managed, and the basic interface works across screen sizes. |
| 2 | Donor management and donation history | US-06–US-11 | Donor information, availability, eligibility display, donation records, and history are supported. |
| 3 | Organization/requester accounts and blood requests | US-12–US-19 | Organizations and requesters can register, and blood requests can be created and tracked through defined statuses. |
| 4 | Donor search, matching, emergency responses | US-20–US-26 | Authorized staff can search for potential donors; emergency requests can reach matching donors who can respond. |
| 5 | Administration, reporting, integration, quality, release readiness | US-27–US-38 | Admin tools and reports are available, modules integrated, and security, performance, reliability, and major workflows reviewed. |

Sprint 5 is broader than the earlier sprints. The baseline recommends prioritizing security, end-to-end integration, and core workflow tests if capacity is insufficient, with lower-priority report refinements deferred. Actual capacity and the assignment rubric should guide planning.

## Product Backlog Index

The story titles, priorities, and proposed sprints below are from the supplied baseline. GitHub issue links are omitted because none were provided.

| ID | Epic/module | Story | Priority | Proposed sprint |
|---|---|---|---|---|
| US-01 | Authentication | User Registration | High | 1 |
| US-02 | Authentication | User Login | High | 1 |
| US-03 | Authorization | Role-Based Access Control | High | 1 |
| US-04 | User Management | Manage User Profile | Medium | 1 |
| US-05 | UI/UX | Responsive Interface | High | 1 |
| US-06 | Donor Management | Donor Registration | High | 2 |
| US-07 | Donor Management | Update Donor Information | High | 2 |
| US-08 | Eligibility | Check Donor Eligibility | High | 2 |
| US-09 | Donor Management | Manage Availability | Medium | 2 |
| US-10 | Donation History | View Donation History | Medium | 2 |
| US-11 | Donation Management | Maintain Donation Records | High | 2 |
| US-12 | Organization Management | Hospital/Blood Bank Registration | High | 3 |
| US-13 | Organization Management | Hospital/Blood Bank Profile | Medium | 3 |
| US-14 | Organization Management | Hospital/Blood Bank Verification | High | 3 |
| US-15 | Requester Management | Patient/Requester Registration | High | 3 |
| US-16 | Blood Requests | Create Blood Request | High | 3 |
| US-17 | Blood Requests | View Blood Requests | High | 3 |
| US-18 | Blood Requests | Update Blood Request Status | High | 3 |
| US-19 | Blood Requests | Track Blood Request | High | 3 |
| US-20 | Donor Search | Search by Blood Group | High | 4 |
| US-21 | Donor Search | Search by Location | High | 4 |
| US-22 | Donor Search | Search by Availability | High | 4 |
| US-23 | Donor Matching | Combined Donor Search | High | 4 |
| US-24 | Emergency Requests | Mark Emergency Blood Request | High | 4 |
| US-25 | Notifications | Notify Matching Eligible Donors | High | 4 |
| US-26 | Donor Responses | Accept/Decline Donation Request | High | 4 |
| US-27 | Administration | Manage Users | High | 5 |
| US-28 | Administration | Monitor Blood Requests | High | 5 |
| US-29 | Administration | Verify Organizations | High | 5 |
| US-30 | Reporting | View Total Donor Statistics | Medium | 5 |
| US-31 | Reporting | View Blood Group Distribution | Medium | 5 |
| US-32 | Reporting | View Donation Statistics | Medium | 5 |
| US-33 | Reporting | View Blood Request Statistics | Medium | 5 |
| US-34 | Integration | Integrate System Modules | High | 5 |
| US-35 | Performance | System Performance | Medium | 5 |
| US-36 | Security | Security and Data Protection | High | 5 |
| US-37 | Reliability | System Reliability | Medium | 5 |
| US-38 | Testing | System Testing | High | 5 |

## User Stories and Acceptance Criteria

The following acceptance criteria summarize the supplied baseline. Any detail dependent on client policy should be confirmed before implementation. These criteria describe intended outcomes, not verified project results.

### Sprint 1 — Foundation, registration, and authentication

#### US-01 — User Registration

As a new user, I want to register so that I can access the system. Registration collects required information, validates inputs, prevents duplicate accounts, stores credentials using the selected authentication provider, assigns the appropriate role, and gives clear success/error feedback.

#### US-02 — User Login

As a registered user, I want to log in so that I can use authorized features. Valid credentials establish an authenticated session; invalid credentials show a safe error; users reach the appropriate role area; logout ends access to protected features.

#### US-03 — Role-Based Access Control

As a system administrator, I want access limited by role so that users can only perform authorized actions. Roles are assigned and checked on protected operations, backend policies enforce restrictions, and representative unauthorized attempts are denied.

#### US-04 — Manage User Profile

As a user, I want to view and update my profile so that my information remains current. Users see only permitted profile fields, valid changes persist, invalid input is rejected with feedback, and users cannot edit another person's profile without authorization.

#### US-05 — Responsive Interface

As a user, I want the interface to work across screen sizes so that I can use core features on mobile and desktop. Core pages adapt without clipping, navigation and forms remain usable, and key workflows are checked at representative viewport sizes.

### Sprint 2 — Donor management and donation history

#### US-06 — Donor Registration

As a donor, I want to register donor-specific information so that I can be considered for matching. Required donor fields are validated, the record is associated with the authenticated account, and sensitive data is protected by role policies.

#### US-07 — Update Donor Information

As a donor, I want to update my donor information so that search and contact details stay current. Authorized donors can update permitted fields, changes persist, and other users cannot modify the profile.

#### US-08 — Check Donor Eligibility

As a donor, I want to view an eligibility status so that I understand whether I may be considered for donation. The status uses an agreed rule and available data, missing data is handled clearly, and the interface states that the result is informational and not a medical decision.

#### US-09 — Manage Availability

As a donor, I want to set my availability so that matching reflects whether I can be contacted. Donors can change the availability value, it persists, and searches honor it according to consent and access rules.

#### US-10 — View Donation History

As a donor, I want to view my donation history so that I can review prior contributions. Only authorized records appear, dates/details are readable, and empty/error states are handled.

#### US-11 — Maintain Donation Records

As authorized staff, I want to maintain donation records so that completed donations are recorded accurately. Records include agreed fields, authorized users can create/update them, changes are validated and traceable as required, and donors can see only their permitted history.

### Sprint 3 — Organization/requester accounts and blood requests

#### US-12 — Hospital/Blood Bank Registration

As hospital or blood-bank staff, I want to register an organization account so that I can manage blood needs. Required organization and contact details are validated, the account is associated with its staff user, and verification state is recorded.

#### US-13 — Hospital/Blood Bank Profile

As organization staff, I want to manage the organization profile so that requesters and administrators have current information. Authorized staff can update permitted details, changes persist, and organization records remain isolated from other organizations.

#### US-14 — Hospital/Blood Bank Verification

As an administrator, I want to verify an organization so that restricted functions are available only to approved organizations. Administrators can review evidence and approve/reject with a recorded decision; verification status controls relevant access and is visible to the organization where appropriate.

#### US-15 — Patient/Requester Registration

As a requester, I want to register so that I can submit or track requests where permitted. Registration validates required fields, protects personal information, and applies the agreed requester permissions and verification requirements.

#### US-16 — Create Blood Request

As an authorized requester, I want to create a blood request so that a blood need can be coordinated. The form validates agreed blood group, quantity, urgency, date, location, and contact fields; the request is persisted with an owner and initial status.

#### US-17 — View Blood Requests

As a user, I want to view requests permitted for my role so that I can find relevant needs. Results show useful request details and status, access follows privacy rules, and loading, empty, and error states are handled.

#### US-18 — Update Blood Request Status

As an authorized request owner or staff member, I want to update a request status so that progress is accurate. Only permitted transitions are accepted, changes persist with relevant timestamps, and unauthorized updates are denied.

#### US-19 — Track Blood Request

As a requester, I want to track my request so that I know its current progress. The owner can see status and relevant updates; status reflects persisted data; and users cannot view private requests they do not own or have permission to access.

### Sprint 4 — Donor search, matching, and emergency responses

#### US-20 — Search by Blood Group

As authorized staff, I want to search donors by blood group so that I can identify potentially suitable donors. Search filters persisted donor data, handles invalid/no-match cases, and exposes only permitted donor information.

#### US-21 — Search by Location

As authorized staff, I want to search donors by location so that I can find nearby potential donors. Location representation and matching rules are agreed, results respect privacy/consent, and empty/error cases are clear.

#### US-22 — Search by Availability

As authorized staff, I want to filter donors by availability so that I contact donors who may respond. Search uses current availability values and respects donor consent and authorization.

#### US-23 — Combined Donor Search

As authorized staff, I want to combine blood group, location, availability, and eligibility filters so that I can find relevant potential donors. Filters work together against current data, results follow access rules, and the interface communicates when no matches are found.

#### US-24 — Mark Emergency Blood Request

As an authorized requester, I want to mark a request as an emergency so that it receives appropriate priority. Only authorized roles can set emergency priority, the value persists and is visible where permitted, and urgency does not bypass access controls.

#### US-25 — Notify Matching Eligible Donors

As a requester, I want matching eligible donors to be notified so that urgent needs can be communicated. The system selects recipients using agreed matching/eligibility rules, records or reports delivery outcomes, avoids disclosing unnecessary personal data, and clearly documents unsupported channels or failures.

#### US-26 — Accept/Decline Donation Request

As a donor, I want to accept or decline a request so that staff can coordinate responses. Authenticated donors can respond to relevant open requests, one response state is recorded with timestamps, and authorized staff can view response status.

### Sprint 5 — Administration, reporting, integration, and quality

#### US-27 — Manage Users

As an administrator, I want to manage user accounts so that access and records can be administered. Only administrators can perform agreed actions, actions are validated, and non-administrators are denied.

#### US-28 — Monitor Blood Requests

As an administrator, I want to monitor requests so that I can oversee system activity. Authorized administrators can view and filter requests, see key fields/statuses, and receive clear empty/loading/error states from persisted data.

#### US-29 — Verify Organizations

As an administrator, I want to verify hospitals and blood banks so that organizational accounts can be trusted. Administrators can review, approve, or reject organizations, record decisions, and verification status controls restricted functions. This overlaps US-14; the team may combine implementation while preserving traceability.

#### US-30 — View Total Donor Statistics

As an administrator, I want to view registered donor totals so that I can monitor the donor population. Counts use an agreed definition and persisted data, handle empty data, and are restricted to authorized administrators.

#### US-31 — View Blood Group Distribution

As an administrator, I want to view donor distribution by blood group so that I can understand the donor population. Counts are grouped from current data and presented clearly; missing/invalid values are handled; access is restricted.

#### US-32 — View Donation Statistics

As an administrator, I want to view donation statistics so that I can monitor activity. Agreed measures and periods are clearly labeled, derived from saved records, handle empty data/date boundaries, and are restricted to administrators.

#### US-33 — View Blood Request Statistics

As an administrator, I want to view request statistics so that I can monitor demand. Counts use application status categories and persisted data, filters are clear, empty data is handled, and access is restricted.

#### US-34 — Integrate System Modules

As a system user, I want major modules to work together so that I can complete the blood donation workflow in one system. Registration/login, profiles, requests, search, notifications/responses, and administration use consistent data and role rules; core data persists; at least one end-to-end workflow is tested; integration issues are documented and reviewed.

#### US-35 — System Performance

As a system user, I want the system to respond quickly so that I can search and manage requests efficiently. Define and measure response-time expectations under agreed conditions, document environment/data/results, record bottlenecks, and treat the approximate three-second search and 1,000 concurrent-user figures as targets unless validated by suitable tests.

#### US-36 — Security and Data Protection

As a user, I want personal information and credentials protected from unauthorized access. Use secure authentication, never store plaintext passwords in application code, enforce backend as well as UI authorization, limit personal data to authorized purposes, keep secrets out of the repository, validate inputs, avoid sensitive error leaks, and review policies with representative access tests.

#### US-37 — System Reliability

As a system user, I want the system to remain reliable so that requests and donor information are not lost. Core operations persist data and report failures, common network/backend errors do not silently appear successful, limitations are documented, and availability targets are claimed only when measured over a defined period.

#### US-38 — System Testing

As the project team, we want to test major functions so that defects can be addressed before release. Cover authentication, access, profiles, eligibility, requests/statuses, search, notifications/responses, reports, and administration; include positive, negative, validation, and unauthorized cases; record defects/results/limitations and complete a final demonstration checklist.

## Definition of Ready

A story is ready for sprint selection when:

- Its purpose and user value are understood.
- Acceptance criteria are clear and testable.
- Required fields, permissions, and expected outcomes are described.
- Dependencies and external decisions are identified.
- It is small enough for a sprint or has been split.
- Priority is agreed with the Product Owner and the team has enough information to estimate it.

## Definition of Done

A story may be marked Done when:

- All agreed acceptance criteria pass.
- Implementation is committed on an appropriate branch and peer review is complete according to team practice.
- Relevant tests have been run and their results recorded.
- Authorization and validation have been checked where relevant; no known critical defect remains open.
- Documentation is updated when behavior, setup, or design changes.
- The feature has been demonstrated or accepted by the Product Owner/client where required.
- The issue/project status links to relevant pull requests or evidence.

A visual mockup alone is not Done when the story requires persistent data, authorization, or working behavior, unless the story explicitly defines a prototype outcome.

## Suggested Labels and GitHub Workflow

Use only relevant labels: `user-story`, `bug`, `task`, `authentication`, `authorization`, `donor-management`, `eligibility`, `organization-management`, `blood-requests`, `donor-search`, `notifications`, `donation-history`, `admin`, `reporting`, `security`, `testing`, `documentation`, and `priority:high` / `priority:medium` / `priority:low`.

For continued development, create issues for stories the team intends to track, copy the story and acceptance criteria, apply relevant labels and agreed priority, estimate as a team, and add them to the project backlog. At planning, select only work that fits capacity, agree on ownership, and move it through implementation and review. Mark Done only after the Definition of Done is met. Link issues, commits, pull requests, and evidence using real repository URLs; revise the backlog when scope or priority changes.

## Risks and Decisions to Confirm

The original baseline identified these policy or environment questions for implementation:

- Required fields for donor, requester, hospital, and blood-bank accounts.
- Official eligibility rule and interval after a prior donation.
- Which roles may create, approve, reject, and fulfill requests; and whether requester-submitted requests require verification.
- Valid blood groups, quantity units, urgency levels, and allowed status transitions.
- What donor information may be shown to staff and other roles.
- Notification channel and what counts as delivery.
- How donor location is represented/searched.
- Required donation statistics and reporting periods.
- Account suspension/deletion and organization rejection behavior.
- Whether performance and availability targets can be tested in the assignment environment.

## Change Log and Closure

| Version | Date | Description |
|---|---|---|
| 1.0 | 2026-10-13 | Consolidated baseline: 38 stories, acceptance criteria, priorities, five-sprint proposal, and workflow guidance. |

The academic project is complete. This document preserves the supplied planning baseline in a structured form. Its proposed stories and criteria should not be read as evidence that the work was implemented or reviewed; actual delivery status is recorded in project implementation evidence and sprint journals. The proposed sprint plan is historical planning context, not a current commitment.
