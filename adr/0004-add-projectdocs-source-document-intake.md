# ADR 0004: Add ProjectDocs Source Document Intake

## Status

Status: Accepted

## Date

2026-05-20

## Context

The local onboarding wizard can generate first-draft governance artifacts, but real projects often begin with source documents such as PRDs, specs, briefs, research notes, design references, and stakeholder docs.

If those source documents are not collected in a predictable location, project manager agents may create project plans, task breakdowns, or assignments from incomplete chat context. That weakens the planning workflow added in ADR 0002 and the onboarding wizard added in ADR 0003.

## Decision

Use `/ProjectDocs/` as the project-specific documentation folder produced by the onboarding wizard.

The wizard will:

* allow users to select source documents in the onboarding screen
* copy selected files into `/ProjectDocs/Source/` when writing files to a chosen project folder
* generate planning artifacts under `/ProjectDocs/`
* list selected source documents in generated `PROJECT_CONTEXT.md` and `ProjectDocs/project-plan.md`
* reference source-document review in generated task breakdown and assignment drafts

Project manager agents must inspect `/ProjectDocs/` when it exists, especially `/ProjectDocs/Source/`, before creating project plans, breaking down tasks, or assigning work.

## Consequences

Benefits:

* PRDs, specs, briefs, research, and design references have a predictable home.
* Project manager agents can find source material before planning or delegating.
* Generated tasks and assignments can trace back to source documents.
* The pack avoids storing project-specific documents inside `/.agents/`, which remains reserved for operating rules, reusable skills, and templates.

Tradeoffs:

* Existing references to `/project-docs/` are superseded by `/ProjectDocs/`.
* Uploaded source documents may contain sensitive project information, so users must avoid uploading secrets, credentials, private keys, and production operational details.
* Browser refreshes clear selected file handles; users must reselect source documents before writing them.

## Alternatives Considered

Keep generated artifacts in `/project-docs/` and uploaded source documents in `/ProjectDocs/`.

This was not selected because it splits project planning material across two similarly named folders.

Store source documents under `/.agents/`.

This was not selected because `/.agents/` is reserved for reusable agent guidance, not project-specific product documents.

Only ask users to summarize source documents in text fields.

This was not selected because summaries are useful but do not replace access to the source files.

## Implementation Notes

The onboarding wizard remains local-only and dependency-free. It does not upload source documents to any remote service.

The wizard validates selected source document extensions and caps each selected source document at 50 MB before writing.

## Related

* ADR 0002: Add Pre-Implementation Planning and Design Workflow
* ADR 0003: Add Local Project Onboarding Wizard
* `/AGENTS.md`
* `/.agents/skills/agent-team.md`
* `/.agents/skills/project-planning.md`
* `/.agents/skills/task-breakdown.md`
* `/.agents/skills/task-assignment.md`
* `/tools/project-onboarding-wizard/`

## Supersedes

* ADR 0003: Add Local Project Onboarding Wizard

## Superseded By

