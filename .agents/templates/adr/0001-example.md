## Purpose

This file is the always-loaded operating guide for developers and AI agents working on this project.

It defines universal rules, the required workflow, stop conditions, and completion criteria.

Detailed task-specific guidance lives under:


/.agents/

Before making changes, read this file first. Then read:

/.agents/INDEX.md

Use the index to identify and load the relevant skill files for the task.

Non-Negotiables

These rules apply to every task. Violating them blocks completion.

Authorization must be enforced server-side. Frontend hiding is never sufficient.
Never commit secrets, tokens, passwords, private keys, credentials, or production .env files.
Never log secrets, tokens, passwords, payment secrets, private keys, or sensitive personal data.
All SQL must be parameterized or use ORM-safe/query-builder-safe methods. No unsafe string concatenation or interpolation.
Database migrations must preserve existing data unless a destructive change is explicitly approved.
Do not silently change public contracts, API response shapes, database field meanings, module invariants, or permission behavior.
Do not introduce new dependencies without clear justification.
Do not bypass existing services, validation, permission checks, logging patterns, or project-approved architecture.
Do not perform broad refactors unless explicitly requested.
If the task is ambiguous, risky, destructive, or conflicts with existing patterns, stop and ask before proceeding.
Required Workflow

For every task:

Read this AGENTS.md.
Read /.agents/INDEX.md.
Identify the task signals.
Load the relevant files from /.agents/skills/.
Read PROJECT_CONTEXT.md if the task affects business logic, architecture, data, security, integrations, or major UI behavior.
Inspect existing implementation patterns before changing code.
State which skills were loaded and why.
Make the smallest safe change that satisfies the request.
Preserve existing behavior unless the task explicitly requires changing it.
Verify security, data, performance, and documentation impact.
Update relevant documentation, templates, module READMEs, or ADRs where required.
Summarize what changed, what was checked, and any risks or follow-up work.
Skill Loading Rule

Load the skill files matching the task.

If unsure, load more rather than fewer.

If a task touches multiple areas, load all relevant skills.

Do not proceed on assumptions when a required skill file says to stop and ask.

Skill files live in:

/.agents/skills/

The skill manifest and routing table live in:

/.agents/INDEX.md
Skill Loading Declaration

Before planning or implementing, state which skills were loaded and why.

Example:

Loaded skills:
- security.md because this task modifies role-based access checks.
- api-design.md because this task adds a new endpoint.
- database.md because this task changes a query.

If no additional skill is required, state why.

Example:

Loaded skills:
- No additional skill files required because this task only updates static copy and does not affect security, data, API contracts, modules, configuration, or behavior.
Stop-and-Ask Criteria

Stop and ask before proceeding if:

the business rule is ambiguous
permission behavior is unclear
data ownership is unclear
the task requires destructive database changes
the task could affect production data
the request conflicts with existing code or documentation
the task changes a public API contract
the task changes payment, subscription, authentication, or authorization behavior
the task requires choosing between multiple architectural approaches
a required environment variable or credential is missing
the correct module ownership is unclear
the change may break existing users
the task requires a broad refactor not explicitly requested
an ADR appears necessary but the decision cannot be made safely from existing context

When stopping, explain the risk and ask the smallest necessary clarification.

Definition of Done

A task is complete only when:

the requested scope is implemented
relevant skill files were loaded and followed
existing behavior is preserved unless intentionally changed
server-side authorization is enforced where required
input validation is handled where required
database changes are safe and documented
errors are handled consistently
critical flows have useful logs where appropriate
tests are added or updated where appropriate
documentation is updated where appropriate
.env.example is updated if configuration changed
an ADR is added or updated when a significant decision is made
no secrets are committed or logged
no unnecessary dependencies are added
no unrelated refactors are included
risks or follow-up work are clearly stated
Documentation and ADR Locations

Agent operating guidance lives under:

/.agents/

Skill files live under:

/.agents/skills/

Reusable templates live under:

/.agents/templates/

Architecture Decision Records live at the project root under:

/adr/

Do not store ADRs inside /.agents/.

Agent rules belong in /.agents/.

Project decisions belong in /adr/.

Expected Agent Infrastructure

This project should use the following structure:

/
  AGENTS.md
  PROJECT_CONTEXT.md
  README.md
  .env.example

/.agents
  INDEX.md
  /skills
    security.md
    database.md
    migrations.md
    api-design.md
    data-modeling.md
    ui-components.md
    modules.md
    observability.md
    testing.md
    performance.md
    caching.md
    background-jobs.md
    external-integrations.md
    configuration.md
    documentation.md
  /templates
    module-readme.md
    adr.md
    project-context.md

/adr
  0001-example.md

If any expected file or folder is missing and the current task depends on it, recommend creating it.

Do not create missing infrastructure files unless the task asks for it or the change requires it.

Final Response Expectations

When completing a task, summarize:

skills loaded
files changed
what changed
validation or tests performed
documentation updated
ADRs added or updated
risks, assumptions, or follow-up work

Keep the summary direct and specific.