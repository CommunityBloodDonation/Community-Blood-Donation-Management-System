# Community Blood Donation Management System

## Product Backlog --- RAD Continuous Assessment

**File:** `docs/product-backlog.md`\
**Methodology:** RAD using Scrum\
**Duration:** 10 weeks --- five 2-week sprints\
**Stack:** HTML, CSS, JavaScript, Supabase Authentication, PostgreSQL
and Row Level Security (RLS)

## 1. Purpose and Product Goal

This backlog organizes the work required to verify, complete, integrate,
test and document the Community Blood Donation Management System. The
goal is to provide a centralized web application connecting blood donors
and hospitals through blood requests, while providing public information
and secure administrative monitoring.

**Important:** The existing system already contains public pages, donor
and hospital areas, admin functions, blood requests, donation history,
Supabase integration and security policies. Treat work as new
development only where the feature is actually missing. Check the
current code before moving any issue to Done. Keep statuses, commits,
pull requests and test results truthful.

## 2. Feature Catalogue

### Public

-   Home, About, How It Works and Contact pages.
-   Public open blood-request list, request details and status.
-   Search and filter blood requests.
-   Public statistics based on actual database data.

### Authentication and access

-   Donor and hospital/staff registration and login.
-   Protected admin login.
-   Role-based authorization and navigation.
-   Logout/session handling.
-   Real password reset flow.
-   Authentication validation and error feedback.

### Donor

-   Donor dashboard and profile.
-   Blood group and contact details.
-   Eligibility information and last-donation details.
-   Donation records and history.
-   View relevant open blood requests.
-   Donor availability/consent for contact, if approved.

### Hospital

-   Hospital/staff profile and dashboard.
-   Create, view, edit, cancel/close and complete blood requests.
-   Request status management and validation.

### Blood request coordination

-   Live request data.
-   Search and filtering.
-   Donor matching by blood group/location, if approved.
-   Donor response and hospital review workflow.
-   Consistent request-completion and donation-record updates.

### Admin

-   Dashboard and statistics.
-   View/search donors and hospitals.
-   Monitor blood requests and donation history.
-   Protected administrative actions.

### Security, quality and delivery

-   Supabase Auth and RLS verification.
-   Role-based access and protected database operations.
-   Responsive layouts, loading/empty/error states and confirmations.
-   Functional, integration, regression and user acceptance testing.
-   Deployment, README, architecture/database documentation, sprint
    journals, handover and individual portfolios.

### Known gaps to verify

The existing documentation identifies potential gaps: hardcoded
donor-directory data, prototype password recovery, incomplete donor
contact and donor-request matching workflows, no real notifications,
some hospital profile data relying on local storage, simplified
eligibility logic, no separate patient account workflow, and limited
automated tests. Confirm each against the current code and client
priorities before scheduling it. Do not claim a gap is fixed until
tested.

## 3. GitHub Project Workflow

Use these statuses in order:

`Product Backlog → Sprint Backlog → In Progress → Review / QA → Done`

Recommended fields: - **Sprint:** Sprint 1--5 - **Priority:** Urgent,
High, Medium, Low - **Epic:** Authentication, Donor, Hospital, Blood
Requests, Admin, Public, Security, UI/UX - **Story Points:** relative
estimate agreed by the team

Each backlog item must have a GitHub Issue. T1--T30 are labels used in
this document, **not GitHub issue numbers**. Record the actual issue
number when linking the item. For development, use a branch, meaningful
commits and a pull request; review and test before merging. Link a PR to
its issue (for example, `Closes #123`) when appropriate.

## 4. Sprint 1 --- Discovery, Setup & Backlog Creation

**Goal:** Understand the existing application, establish the GitHub
workflow, agree requirements and prepare Scrum and architecture
documentation.

### T1 --- Project & GitHub Setup

-   **Epic:** Authentication \| **Priority:** High \| **Points:** 3
-   **User story:** As a team member, I want the repository and GitHub
    Project configured so the team can coordinate and track work.
-   **Tasks:** Configure the board; confirm Status, Sprint, Priority,
    Epic and Story Points; check team access; prepare repository
    documentation structure; agree branch/PR workflow.
-   **Acceptance criteria:**
    -   Given the team has repository access, when setup is reviewed,
        then the board and required fields are available.
    -   Given a task is created, when it is added to the project, then
        its status and planning fields can be assigned.
    -   Given a code change is ready, when it is submitted, then the
        team can use the agreed branch and PR workflow.
-   **Expected outcome:** GitHub is ready for Scrum-based tracking.

### T2 --- Existing System Analysis & Requirements

-   **Epic:** UI/UX \| **Priority:** High \| **Points:** 5
-   **User story:** As the team, we want to review the existing system
    so we can identify implemented features and remaining work.
-   **Tasks:** Review public, donor, hospital and admin modules; review
    database and RLS; list limitations; confirm requirements and scope.
-   **Acceptance criteria:**
    -   Given the current code, when each module is reviewed, then its
        existing features and gaps are documented.
    -   Given a requirement is proposed, when it is reviewed, then it is
        classified as required, optional or out of scope.
    -   Given analysis is complete, when planning begins, then findings
        can be used to prioritize work.
-   **Expected outcome:** A documented baseline of the application and
    remaining work.

### T3 --- Product Backlog Development

-   **Epic:** Public \| **Priority:** High \| **Points:** 5
-   **User story:** As the Product Owner, I want a prioritized backlog
    so the team can deliver high-value features first.
-   **Tasks:** Identify epics and stories; prioritize work; assign
    proposed sprints; estimate points; refine backlog after feedback.
-   **Acceptance criteria:**
    -   Given project requirements, when backlog items are created, then
        each has an objective and expected outcome.
    -   Given an item is ready for planning, when it is reviewed, then
        priority, epic, estimate and acceptance criteria are present.
    -   Given feedback changes scope, when the backlog is refined, then
        changes and priorities are recorded.
-   **Expected outcome:** A prioritized backlog ready for sprint
    planning.

### T4 --- User Stories & Acceptance Criteria

-   **Epic:** Public \| **Priority:** Medium \| **Points:** 5
-   **User story:** As a team member, I want testable user stories so
    requirements can be implemented and verified.
-   **Tasks:** Define donor, hospital, admin and public stories; write
    Given--When--Then criteria; link stories to epics.
-   **Acceptance criteria:**
    -   Given a backlog item, when reviewed, then it describes a user
        need and expected value.
    -   Given a story is selected, when tested, then its criteria
        provide a clear pass/fail basis.
    -   Given requirements change, when the story is updated, then its
        criteria are updated too.
-   **Expected outcome:** Clear, testable user stories.

### T5 --- Scrum Documentation Setup

-   **Epic:** UI/UX \| **Priority:** Medium \| **Points:** 3
-   **User story:** As the team, we want Scrum documents established so
    our process and progress are visible.
-   **Tasks:** Document roles and sprint structure; prepare Definition
    of Done; prepare sprint journals; plan records of planning,
    stand-ups, reviews and retrospectives.
-   **Acceptance criteria:**
    -   Given the repository is reviewed, when documentation setup is
        checked, then required Scrum files exist.
    -   Given a sprint occurs, when its journal is updated, then actual
        activities and outcomes are recorded.
    -   Given an item is marked Done, when checked against the
        Definition of Done, then the applicable criteria are met.
-   **Expected outcome:** Organized Scrum/RAD documentation.

### T6 --- System Architecture & Database Documentation

-   **Epic:** Security \| **Priority:** High \| **Points:** 5
-   **User story:** As a developer, I want architecture and database
    documentation so implementation and integration remain consistent.
-   **Tasks:** Document frontend/Supabase architecture, components, data
    flows, tables, relationships and security boundaries; prepare
    Mermaid diagrams.
-   **Acceptance criteria:**
    -   Given the current application, when architecture is reviewed,
        then the diagram represents its actual major components.
    -   Given the database is reviewed, when entities are documented,
        then tables and relationships are accurately described.
    -   Given access boundaries exist, when security is documented, then
        relevant roles and rules are identified.
-   **Expected outcome:** Reliable technical baseline.
-   **Sprint 1 total:** **26 points**

## 5. Sprint 2 --- Core Development & Initial MVP

**Goal:** Verify and complete core authentication, donor, hospital and
public blood-request workflows.

### T7 --- Authentication & Role Management

-   **Epic:** Authentication \| **Priority:** High \| **Points:** 5
-   **User story:** As a registered user, I want secure login and
    role-appropriate access.
-   **Tasks:** Verify donor/hospital registration and login; verify
    admin authentication; enforce role access; check logout/session
    handling; improve validation and error messages.
-   **Acceptance criteria:**
    -   Given valid credentials, when login succeeds, then the correct
        authorized area is shown.
    -   Given invalid credentials, when login is attempted, then access
        is denied with a useful error.
    -   Given a user lacks a role, when a protected action is attempted,
        then access is denied.
    -   Given a user logs out, when they revisit a protected page, then
        authentication is required where applicable.
-   **Expected outcome:** Secure, consistent authentication and role
    access.

### T8 --- Donor Registration & Profile

-   **Epic:** Donor \| **Priority:** High \| **Points:** 5
-   **User story:** As a donor, I want to register and manage my
    profile.
-   **Tasks:** Verify registration/profile creation; validate required
    fields; view/edit profile; verify Supabase persistence; improve
    feedback.
-   **Acceptance criteria:**
    -   Given valid details, when registration is submitted, then the
        account and required profile are created or a clear error
        appears.
    -   Given a signed-in donor, when they open their profile, then
        saved details are displayed.
    -   Given valid edits, when saved, then changes persist after
        reload.
    -   Given required fields are invalid, when submitted, then
        validation prevents invalid data from being saved.
-   **Expected outcome:** Donors can maintain their profile information.

### T9 --- Donor Eligibility & Donation History

-   **Epic:** Donor \| **Priority:** High \| **Points:** 5
-   **User story:** As a donor, I want to view my recorded donation
    history and eligibility information.
-   **Tasks:** Verify history retrieval; display last donation and
    recorded count; verify date handling; make eligibility wording
    cautious; test dashboard updates.
-   **Acceptance criteria:**
    -   Given a donor has donation records, when history is opened, then
        only permitted records are shown.
    -   Given a donation is saved, when the dashboard refreshes, then
        relevant details are updated.
    -   Given dates are missing or invalid, when eligibility is
        displayed, then the system handles the data safely.
    -   Given eligibility is shown, when a donor reads it, then it is
        clear that final eligibility requires qualified healthcare
        confirmation.
-   **Expected outcome:** Accurate, responsibly presented donation
    information.

### T10 --- Hospital Registration & Profile

-   **Epic:** Hospital \| **Priority:** High \| **Points:** 5
-   **User story:** As hospital staff, I want to register and maintain
    hospital information.
-   **Tasks:** Verify registration/login; verify profile creation;
    view/update details; persist data in the agreed data source;
    validate fields.
-   **Acceptance criteria:**
    -   Given valid details, when registration is submitted, then the
        required account/profile is created or a clear error appears.
    -   Given authorized staff, when the profile is opened, then saved
        details are displayed.
    -   Given valid edits, when saved, then changes persist after
        reload.
    -   Given unauthorized access, when a profile change is attempted,
        then the change is rejected.
-   **Expected outcome:** Secure hospital profile management.

### T11 --- Blood Request Management

-   **Epic:** Blood Requests \| **Priority:** Urgent \| **Points:** 8
-   **User story:** As authorized hospital staff, I want to create and
    manage blood requests.
-   **Tasks:** Create validated requests; view hospital requests; edit
    where permitted; cancel/close and complete requests; verify status
    updates.
-   **Acceptance criteria:**
    -   Given valid details, when an authorized user creates a request,
        then it is saved with the correct status.
    -   Given an existing request, when authorized staff update or close
        it, then the change is persisted.
    -   Given required fields are invalid, when submitted, then
        validation prevents invalid data.
    -   Given an unauthorized user attempts to change a request, when
        the operation is processed, then access is denied.
-   **Expected outcome:** Validated blood-request lifecycle.

### T12 --- Public Blood Request Search

-   **Epic:** Public \| **Priority:** Medium \| **Points:** 5
-   **User story:** As a visitor, I want to view and search open blood
    requests.
-   **Tasks:** Display live requests; search/filter by relevant fields;
    show details/status; add loading, empty and error states; protect
    private data.
-   **Acceptance criteria:**
    -   Given open requests exist, when the page loads, then current
        public requests are displayed.
    -   Given a search/filter is selected, when it runs, then matching
        requests are shown.
    -   Given no result matches, when results are displayed, then a
        clear empty state appears.
    -   Given a request is closed, when the list refreshes, then it is
        not incorrectly shown as open.
-   **Expected outcome:** Public users can find current requests safely.
-   **Sprint 2 total:** **33 points**

## 6. Sprint 3 --- Integration & Iterative Enhancements

**Goal:** Integrate modules and data flows, improve admin visibility,
and verify security and complete workflows.

### T13 --- Donor--Blood Request Integration

-   **Epic:** Blood Requests \| **Priority:** High \| **Points:** 8
-   **User story:** As a donor, I want to view and interact with
    relevant open requests.
-   **Tasks:** Connect donor pages to live requests; display relevant
    requests; implement the approved response workflow; connect
    interactions to the database; test integration.
-   **Acceptance criteria:**
    -   Given open requests exist, when a donor opens the relevant page,
        then current database records are displayed.
    -   Given the approved response workflow is enabled, when a donor
        responds, then the response is stored and visible to authorized
        hospital staff.
    -   Given a user is unauthorized, when a protected interaction is
        attempted, then it is rejected.
    -   Given a request is closed, when the donor refreshes, then it is
        not treated as active.
-   **Expected outcome:** Integrated donor-facing request workflow.

### T14 --- Donation & Request Workflow

-   **Epic:** Donor \| **Priority:** High \| **Points:** 5
-   **User story:** As an authorized user, I want donation records and
    request status changes to remain consistent.
-   **Tasks:** Connect donation history to donor profiles; verify record
    updates; connect request completion to related records where
    applicable; prevent duplicate/inconsistent updates; handle errors.
-   **Acceptance criteria:**
    -   Given a donation record is created, when saved, then it is
        associated with the correct donor.
    -   Given a request is completed, when the workflow runs, then its
        status and related records are updated consistently.
    -   Given an operation fails, when feedback is shown, then the
        system does not falsely report success.
    -   Given a duplicate action is attempted, when processed, then
        unintended duplicate changes are prevented where supported.
-   **Expected outcome:** Connected donation and request data flows.

### T15 --- Admin Management & Monitoring

-   **Epic:** Admin \| **Priority:** High \| **Points:** 5
-   **User story:** As an administrator, I want to monitor key records
    and activity.
-   **Tasks:** Review donor/hospital records; monitor requests; view
    donation records; verify protected actions; improve dashboard and
    search.
-   **Acceptance criteria:**
    -   Given an authenticated admin, when the admin area opens, then
        authorized summaries and records are shown.
    -   Given an admin searches, when the query is submitted, then
        matching authorized records are displayed.
    -   Given a non-admin attempts an admin action, when processed, then
        access is denied.
    -   Given an administrative operation fails, when feedback is shown,
        then failure is reported accurately.
-   **Expected outcome:** Protected admin monitoring.

### T16 --- Public Statistics & Dashboard Integration

-   **Epic:** Public \| **Priority:** Medium \| **Points:** 5
-   **User story:** As a visitor, I want public statistics based on
    actual system data.
-   **Tasks:** Connect statistics to Supabase; verify donor/hospital
    counts; verify request/donation totals where available; refresh
    data; handle errors.
-   **Acceptance criteria:**
    -   Given valid database records exist, when the dashboard loads,
        then statistics come from the agreed data source.
    -   Given records change, when statistics refresh, then totals
        reflect current permitted data.
    -   Given a query fails, when the dashboard renders, then a safe
        fallback/error state is shown rather than fabricated values.
    -   Given public statistics load, when data is queried, then private
        personal information is not exposed.
-   **Expected outcome:** Accurate public statistics.

### T17 --- Security & RLS Integration

-   **Epic:** Security \| **Priority:** High \| **Points:** 5
-   **User story:** As a user, I want role-based rules to protect my
    data.
-   **Tasks:** Review authentication; verify roles; test RLS; test donor
    data boundaries; test hospital request ownership; verify admin
    operations.
-   **Acceptance criteria:**
    -   Given a donor is signed in, when they query donor records, then
        only permitted records are accessible.
    -   Given hospital staff are signed in, when they access requests,
        then only authorized operations are allowed.
    -   Given an unauthorized user attempts a protected database
        operation, when it runs, then it is denied.
    -   Given an admin-only action is attempted by a non-admin, when
        processed, then it is rejected.
-   **Expected outcome:** Verified authentication, authorization and
    database access rules.

### T18 --- System Integration Testing

-   **Epic:** UI/UX \| **Priority:** High \| **Points:** 5
-   **User story:** As the team, we want end-to-end tests to find
    integration defects.
-   **Tasks:** Test donor, hospital, admin and public workflows; record
    defects; fix and retest confirmed issues.
-   **Acceptance criteria:**
    -   Given modules are integrated, when end-to-end scenarios run,
        then actual results are recorded against expected results.
    -   Given a test fails, when an issue is logged, then it includes
        reproduction steps and expected/actual behaviour.
    -   Given a defect is fixed, when retested, then the new result is
        recorded.
    -   Given testing ends, when the sprint is reviewed, then unresolved
        defects are documented.
-   **Expected outcome:** Major workflows are integration-tested.
-   **Sprint 3 total:** **33 points**

## 7. Sprint 4 --- Feature Completion & UX Polish

**Goal:** Complete agreed primary scope, improve usability, strengthen
validation/error handling, fix defects and conduct UAT.

### T19 --- Donor Module Enhancement

-   **Epic:** Donor \| **Priority:** High \| **Points:** 5
-   **User story:** As a donor, I want a clear and reliable
    dashboard/profile experience.
-   **Tasks:** Improve dashboard/profile layout; improve history and
    eligibility display; add validation; improve feedback.
-   **Acceptance criteria:**
    -   Given a donor is signed in, when the dashboard opens, then
        available donor information is displayed clearly.
    -   Given profile fields are invalid, when changes are submitted,
        then validation identifies the problem.
    -   Given there is no history, when the page loads, then a helpful
        empty state appears.
    -   Given an action succeeds or fails, when it completes, then
        accurate feedback appears.
-   **Expected outcome:** More usable donor experience.

### T20 --- Hospital Module Enhancement

-   **Epic:** Hospital \| **Priority:** High \| **Points:** 5
-   **User story:** As hospital staff, I want a clear dashboard and
    request-management interface.
-   **Tasks:** Improve dashboard/profile; improve request forms;
    validate fields; improve status display and feedback.
-   **Acceptance criteria:**
    -   Given authorized staff sign in, when the dashboard opens, then
        permitted request information is shown.
    -   Given invalid request fields, when submitted, then validation
        prevents invalid submission.
    -   Given a request status changes, when the dashboard refreshes,
        then the correct status is displayed.
    -   Given saving fails, when feedback appears, then success is not
        falsely reported.
-   **Expected outcome:** More reliable hospital workflow.

### T21 --- Blood Request & Search Enhancement

-   **Epic:** Blood Requests \| **Priority:** High \| **Points:** 5
-   **User story:** As a user, I want accurate request details and
    useful search options.
-   **Tasks:** Improve request display/search/filtering; improve status
    information; validate data; improve error handling.
-   **Acceptance criteria:**
    -   Given multiple open requests exist, when a user searches or
        filters, then matching results are shown.
    -   Given a request has a status, when displayed, then the status is
        accurate.
    -   Given no result matches, when results render, then an empty
        state appears.
    -   Given invalid request data is submitted, when processed, then
        validation feedback appears.
-   **Expected outcome:** Accurate and usable request search.

### T22 --- Admin & Public UI Enhancement

-   **Epic:** UI/UX \| **Priority:** Medium \| **Points:** 5
-   **User story:** As a visitor or admin, I want a consistent
    responsive interface.
-   **Tasks:** Improve public/admin layouts; improve navigation; improve
    mobile/tablet responsiveness; standardize components; improve
    loading/empty states.
-   **Acceptance criteria:**
    -   Given the application is opened at common desktop/mobile widths,
        when pages are viewed, then content remains usable.
    -   Given a user navigates pages, when navigation is used, then
        destinations work as expected.
    -   Given a page is loading or has no results, when it renders, then
        an appropriate state is shown.
    -   Given a common component appears on multiple pages, when
        reviewed, then its styling/behaviour is consistent.
-   **Expected outcome:** Consistent responsive interfaces.

### T23 --- Validation, Error Handling & Bug Fixing

-   **Epic:** Security \| **Priority:** High \| **Points:** 5
-   **User story:** As a user, I want invalid input and errors handled
    clearly.
-   **Tasks:** Test validation; handle invalid input; improve auth error
    handling; fix confirmed database/UI/functional bugs; retest.
-   **Acceptance criteria:**
    -   Given a required field is missing, when submitted, then
        submission is blocked and the field is identified.
    -   Given a database operation fails, when handled, then a useful
        message appears without exposing secrets.
    -   Given a destructive action is initiated, when appropriate, then
        confirmation is requested.
    -   Given a bug is fixed, when retested, then the result is
        recorded.
-   **Expected outcome:** Better error handling and fewer known defects.

### T24 --- User Acceptance Testing & Client Feedback

-   **Epic:** UI/UX \| **Priority:** High \| **Points:** 5
-   **User story:** As the client, I want to try completed workflows and
    provide feedback.
-   **Tasks:** Prepare UAT scenarios; demonstrate features; record
    feedback; classify issues; implement agreed changes; retest.
-   **Acceptance criteria:**
    -   Given agreed UAT scenarios, when testing occurs, then pass/fail
        results and observations are recorded.
    -   Given feedback is received, when reviewed, then it is classified
        as defect, agreed improvement or out of scope.
    -   Given an agreed defect is fixed, when retested, then the outcome
        is documented.
    -   Given UAT ends, when the sprint is reviewed, then unresolved
        issues and accepted limitations are recorded.
-   **Expected outcome:** Features checked against client expectations.
-   **Sprint 4 total:** **30 points**

## 8. Sprint 5 --- Hardening, Deployment & Handover

**Goal:** Stabilize and deploy the application, complete documentation,
prepare individual evidence and hand over the system.

### T25 --- Final System Hardening & Bug Fixing

-   **Epic:** Security \| **Priority:** Urgent \| **Points:** 5
-   **User story:** As a user, I want a stable application with major
    defects resolved.
-   **Tasks:** Review features; fix confirmed bugs; verify database
    operations and access control; run regression tests.
-   **Acceptance criteria:**
    -   Given the release candidate, when regression tests run, then
        results are recorded for major workflows.
    -   Given a critical defect is found, when readiness is assessed,
        then it is fixed or documented as a blocker/limitation.
    -   Given access control is tested, when unauthorized access is
        attempted, then it is denied.
    -   Given a fix is merged, when regression tests rerun, then related
        functionality remains working.
-   **Expected outcome:** Stable release candidate.

### T26 --- Production Deployment

-   **Epic:** Security \| **Priority:** Urgent \| **Points:** 5
-   **User story:** As a user, I want to access the application through
    its deployed environment.
-   **Tasks:** Prepare environment; configure settings/Supabase; deploy;
    verify live URL; test major workflows.
-   **Acceptance criteria:**
    -   Given deployment configuration is ready, when deployed, then the
        intended URL loads.
    -   Given the deployed application loads, when major workflows are
        tested, then tested functions work against the intended backend.
    -   Given secrets are required, when configuration is completed,
        then secrets are not committed to the repository.
    -   Given deployment fails, when investigated, then the failure and
        corrective action are documented.
-   **Expected outcome:** Deployed application with verified major
    workflows.

### T27 --- README & Project Documentation

-   **Epic:** Public \| **Priority:** High \| **Points:** 5
-   **User story:** As a developer/evaluator, I want clear documentation
    to understand and run the application.
-   **Tasks:** Update README; document overview/features/stack; document
    setup and Supabase configuration; add deployment details and
    screenshots.
-   **Acceptance criteria:**
    -   Given a new developer has the repository, when they follow the
        README, then setup steps are clear.
    -   Given configuration values are required, when documented, then
        placeholders are used and secrets are excluded.
    -   Given a feature is described, when checked against the
        application, then documentation matches implementation.
    -   Given deployment exists, when README is reviewed, then its link
        and limitations are recorded where appropriate.
-   **Expected outcome:** Clear setup and project documentation.

### T28 --- Final Scrum & RAD Documentation

-   **Epic:** UI/UX \| **Priority:** High \| **Points:** 5
-   **User story:** As an evaluator, I want Scrum/RAD evidence organized
    so the process can be assessed.
-   **Tasks:** Finalize backlog and Definition of Done; update
    architecture; complete sprint journals; record reviews,
    retrospectives, outcomes and actual velocity/burndown data.
-   **Acceptance criteria:**
    -   Given the sprints have run, when documents are reviewed, then
        they describe actual activities/outcomes.
    -   Given the backlog is finalized, when compared with Issues and
        code, then status/scope agree with evidence.
    -   Given velocity/burndown is reported, when presented, then it is
        based on actual tracked data.
    -   Given architecture changed, when documentation is finalized,
        then diagrams reflect the final system.
-   **Expected outcome:** Complete, evidence-based RAD documentation.

### T29 --- Individual Portfolio & Contribution Documentation

-   **Epic:** UI/UX \| **Priority:** High \| **Points:** 3
-   **User story:** As a team member, I want to document my work and
    reflection so my contribution can be evaluated.
-   **Tasks:** Document role and responsibilities; list issues/tasks;
    link commits/PRs; reflect on Agile participation; prepare
    `portfolio-[student-id].md`.
-   **Acceptance criteria:**
    -   Given a team member contributed, when the portfolio is reviewed,
        then role and specific work are identified.
    -   Given a contribution is claimed, when checked, then it can be
        traced to genuine project evidence.
    -   Given reflection is written, when submitted, then it includes
        specific lessons and improvements.
    -   Given the portfolio file is created, when the repository is
        reviewed, then it follows the required naming convention.
-   **Expected outcome:** Evidence-based individual portfolio.

### T30 --- Final UAT, Handover & Review

-   **Epic:** Public \| **Priority:** Urgent \| **Points:** 5
-   **User story:** As the client, I want a final demonstration and
    handover so I understand the delivered system and its limitations.
-   **Tasks:** Run final UAT; verify deployed workflows; review
    requirements/limitations; prepare handover; demonstrate system;
    record feedback.
-   **Acceptance criteria:**
    -   Given the deployed release candidate, when final UAT runs, then
        results are recorded for agreed scenarios.
    -   Given handover occurs, when the client receives the project,
        then setup, access, deployment and usage information is provided
        securely.
    -   Given limitations remain, when handover occurs, then they are
        disclosed.
    -   Given the demonstration is complete, when reviewed, then
        feedback and outstanding actions are recorded.
-   **Expected outcome:** Demonstrated and documented system ready for
    handover.
-   **Sprint 5 total:** **28 points**

## 9. Sprint Summary

  Sprint      Focus                                Items           Planned points
  ----------- ------------------------------------ ------------- ----------------
  Sprint 1    Discovery, setup and backlog         T1--T6                      26
  Sprint 2    Core development and initial MVP     T7--T12                     33
  Sprint 3    Integration and enhancements         T13--T18                    33
  Sprint 4    Feature completion and UX polish     T19--T24                    30
  Sprint 5    Hardening, deployment and handover   T25--T30                    28
  **Total**   **Five-sprint plan**                 **T1--T30**            **150**

These are planned estimates, not actual completed velocity. Re-estimate
with the team and report actual outcomes from GitHub evidence.

## 10. Definition of Ready

An item is ready for sprint planning when: - The user need and expected
outcome are clear. - Acceptance criteria are testable. - Priority, epic
and estimate are assigned. - Dependencies and required access/data are
identified. - The work is small enough to track in a sprint or has been
split into smaller issues.

## 11. Definition of Done

A backlog item may be marked Done only when: - Agreed implementation is
complete. - Acceptance criteria have been tested. - Relevant validation,
error handling and security checks are complete. - Code is committed on
an appropriate branch. - Pull request is reviewed and merged according
to team workflow. - Relevant documentation is updated. - Issue and
Project status reflect the actual result. - Remaining limitations are
recorded.

For documentation-only work, apply the relevant criteria and ensure the
document reflects the actual system.

## 12. Product Limitations and Safety Notes

-   Eligibility information is informational and must not replace
    assessment by a qualified healthcare professional.
-   Do not expose donor personal/contact information publicly without an
    approved purpose, consent and appropriate access control.
-   Do not claim that notifications, automated matching, patient
    accounts or password recovery are operational until implemented and
    tested.
-   If a feature is not approved or cannot be completed in time,
    document the decision in the backlog and sprint journal.

## 13. Required Repository Documentation

Maintain these files in the repository: - `docs/product-backlog.md` -
`docs/definition-of-done.md` - `docs/architecture.md` -
`docs/sprint-journals.md` - `README.md` - `portfolio-[student-id].md`
for each team member

Use Mermaid diagrams in Markdown where required. Keep this document,
GitHub Issues, the Project board and the implementation evidence
synchronized.

------------------------------------------------------------------------

**End of Product Backlog**
