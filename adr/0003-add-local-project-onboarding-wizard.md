# ADR 0003: Add Local Project Onboarding Wizard

## Status

Status: Superseded

## Date

2026-05-19

## Context

The governance pack now defines a pre-implementation lifecycle: project planning, brand identity, UX design, UI mock approval, task breakdown, and task assignment before implementation.

That workflow is safer than jumping directly from an idea to code, but it creates more initial documentation work for users. If the first `PROJECT_CONTEXT.md` and related planning artifacts are hard to create, users may skip them or provide incomplete context.

The pack needs a low-friction way to collect structured project details and generate the first Markdown drafts without adding runtime dependencies or requiring a web server.

## Decision

Add a dependency-free local onboarding wizard under:

```txt
/tools/project-onboarding-wizard/
```

The wizard is built with static HTML, CSS, and JavaScript. It runs locally in the browser, stores draft form data in browser `localStorage`, previews generated Markdown, downloads selected files, and can write selected files to a user-chosen project folder when the browser supports the File System Access API.

The wizard can generate:

* `PROJECT_CONTEXT.md`
* `project-docs/project-plan.md`
* `project-docs/brand-identity-kit.md`
* `project-docs/ux-design-brief.md`
* `project-docs/ui-mock-approval.md`
* `project-docs/task-breakdown.md`
* `project-docs/task-assignment.md`
* `adr/0001-use-agent-governance-pack.md` or the next available ADR number when writing to a selected folder

Project-specific planning artifacts should live in `/project-docs/` or another project documentation location. They should not be stored inside `/.agents/`, which remains reserved for agent operating rules, reusable skills, and reusable templates.

## Consequences

Benefits:

* Users can create first-draft governance artifacts from a guided UI.
* The pack remains dependency-free and stack-agnostic.
* The wizard supports both safe download fallback and direct local-folder writing where available.
* Generated artifacts align with the planning and design templates added in ADR 0002.

Tradeoffs:

* Browser file-writing support depends on the user's browser.
* The wizard does not parse and semantically merge existing Markdown files; existing-file updates still require user review.
* Drafts may still need human editing before they are treated as approved project artifacts.

## Alternatives Considered

Command-line generator only.

This was not selected because a browser wizard is easier for non-CLI users and better for gathering broad product context.

Server-backed web app.

This was not selected because the governance pack should remain portable, dependency-free, and safe to copy into any repository.

Templates only.

This was not selected because templates still require users to know which artifacts to create and how the pieces relate.

## Implementation Notes

The wizard must not send project details to external services.

The validation script scans HTML, CSS, and JavaScript files for common secret-like patterns.

## Related

* ADR 0002: Add Pre-Implementation Planning and Design Workflow
* `/tools/project-onboarding-wizard/index.html`
* `/tools/project-onboarding-wizard/app.js`
* `/tools/project-onboarding-wizard/styles.css`
* `/tools/project-onboarding-wizard/README.md`

## Supersedes

None.

## Superseded By

* ADR 0004: Add ProjectDocs Source Document Intake
