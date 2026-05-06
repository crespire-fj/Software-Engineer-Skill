# AGENTS.md

Version: 1.0
Last updated: 2026-05-04

## Purpose

This file is the always-loaded operating guide for developers and AI agents working on this project.

It defines universal rules, the required workflow, stop conditions, completion criteria, and the minimum skill-routing guidance required to work safely.

Detailed task-specific guidance lives under `/.agents/`.

Before making changes, read this file first. Then read `/.agents/INDEX.md` when it exists. Use the routing table in this file if `/.agents/INDEX.md` is missing or incomplete.

---

## Non-Negotiables

These rules apply to every task. Violating them blocks completion.

1. Authorization must be enforced server-side. Frontend hiding is never sufficient.
2. Input validation must occur server-side for all user-controlled data. Client-side validation is never sufficient.
3. Never commit secrets, tokens, passwords, private keys, credentials, or production `.env` files.
4. Never log secrets, tokens, passwords, payment secrets, private keys, or sensitive personal data.
5. All SQL must be parameterized or use ORM-safe/query-builder-safe methods. No unsafe string concatenation or interpolation.
6. Database migrations must preserve existing data unless a destructive change is explicitly approved.
7. Do not silently change public contracts, API response shapes, database field meanings, module invariants, or permission behavior.
8. Do not introduce new dependencies without clear justification.
9. Do not bypass existing services, validation, permission checks, logging patterns, or project-approved architecture.
10. If the task is ambiguous, risky, destructive, or conflicts with existing patterns, stop and ask before proceeding.

---

## Required Workflow

For every task:

1. Read this `AGENTS.md`.
2. Read `/.agents/INDEX.md` if it exists. If it does not exist or is incomplete, use the routing table in this file.
3. For any non-trivial task, read `PROJECT_CONTEXT.md` before planning. If `PROJECT_CONTEXT.md` is missing and the task requires business, product, architectural, integration, data, or security context, stop and ask. Only skip `PROJECT_CONTEXT.md` for true micro-edits such as typos, comments, or static copy that do not affect behavior.
4. Identify task signals and load the relevant files from `/.agents/skills/`.
5. Always load `security.md` and `modules.md` when they exist. These are the default baseline skills.
6. Inspect existing implementation patterns before changing code.
7. State which skills were loaded and why. If a seemingly relevant skill is not loaded, state why not.
8. Make the smallest safe change that satisfies the request.
9. Preserve existing behavior unless the task explicitly requires changing it.
10. Verify security, data, performance, and documentation impact.
11. Update relevant documentation, templates, module READMEs, or ADRs where required.
12. Run existing tests or checks where available. If tests cannot be run, state why.
13. Summarize what changed, what was checked, documentation updated, ADRs added or updated, and any risks or follow-up work.

---

## Skill Loading and Routing

Skill files live in `/.agents/skills/`.

The full skill manifest lives in `/.agents/INDEX.md`.

`/.agents/INDEX.md` should describe the available skills, when each skill applies, related skills, and project-specific additions or overrides. The routing table in this file remains the minimum fallback router.

If `/.agents/INDEX.md` is missing or incomplete, use the routing table below.

If unsure, load more rather than fewer.

If a task touches multiple areas, load all relevant skills.

Do not proceed on assumptions when a required skill file says to stop and ask.

Before planning or implementing, declare loaded skills.

Example:

```txt
Loaded skills:
- security.md because it is a baseline skill.
- modules.md because it is a baseline skill.
- api-design.md because this task adds a new endpoint.
- database.md because this task changes a query.

Not loaded:
- ui-components.md because this task has no UI change.
```

If no additional skill beyond the baseline is required, state why.

Example:

```txt
Loaded skills:
- security.md because it is a baseline skill.
- modules.md because it is a baseline skill.

No additional skill files required because this task only updates static copy and does not affect security, data, API contracts, modules, configuration, or behavior.
```

### Minimum Routing Table

All rows are additive to the baseline skills. For non-trivial tasks, load `security.md` and `modules.md` plus any matching rows below.

When drafting or updating `security.md`, include public-form-specific controls such as rate limiting, honeypot fields, CAPTCHA or equivalent bot protection, abuse monitoring, and safe handling of unauthenticated input.

#### Atomic task signals

| Task signal                                                             | Load these additional skills                             |
| ----------------------------------------------------------------------- | -------------------------------------------------------- |
| SQL, ORM, query builders, indexes, relationships, database performance  | `database.md`                                            |
| Schema changes, migrations, seed data, destructive changes              | `database.md`, `migrations.md`                           |
| New or modified API endpoint                                            | `api-design.md`, `data-modeling.md`                      |
| Returning data to clients, DTOs, entities, mapping, over-posting        | `data-modeling.md`                                       |
| New UI screen, component, layout, styling, accessibility, design states | `ui-components.md`                                       |
| Major module change, module contract, module folder, module README      | `modules.md`                                             |
| Logging, audit logs, metrics, correlation IDs, production debugging     | `observability.md`                                       |
| Tests, test strategy, test coverage, regression protection              | `testing.md`                                             |
| Slow queries, heavy pages, high traffic, scalability, N+1 issues        | `performance.md`, `database.md`                          |
| Caching, TTLs, invalidation, cache keys, stale data                     | `caching.md`                                             |
| Background jobs, queues, retries, scheduled jobs, async processing      | `background-jobs.md`                                     |
| External APIs, webhooks, payments, email, storage, third-party services | `external-integrations.md`                               |
| Environment variables, config, secrets, dependency additions            | `configuration.md`                                       |
| ADRs, README updates, project docs, decision documentation              | `documentation.md`                                       |
| File storage or uploads                                                 | `configuration.md`, `external-integrations.md`           |
| Major architecture or project structure decision                        | `documentation.md` and write or update an ADR in `/adr/` |

#### Common task types

| Task type                       | Load these additional skills                                                           |
| ------------------------------- | -------------------------------------------------------------------------------------- |
| Payment flow                    | `external-integrations.md`, `api-design.md`, `observability.md`                        |
| Subscription or feature gating  | `data-modeling.md`                                                                     |
| Admin dashboard or admin action | `ui-components.md`, `observability.md`                                                 |
| Report or analytics page        | `performance.md`, `database.md`, `ui-components.md`, `observability.md`                |
| Public form                     | `api-design.md`, `observability.md`                                                    |
| New major feature module        | `documentation.md`, `data-modeling.md`, `api-design.md`, `testing.md`, `migrations.md` |

---

## Stop-and-Ask Criteria

Stop and ask before proceeding if:

* the business rule is ambiguous
* permission behavior is unclear
* data ownership is unclear
* `PROJECT_CONTEXT.md` is missing and the task requires business, product, architectural, integration, data, or security context
* the task requires destructive database changes
* the task could affect production data
* the request conflicts with existing code or documentation
* the task changes a public API contract
* the task changes payment, subscription, authentication, or authorization behavior
* the task requires choosing between multiple architectural approaches
* a required environment variable or credential is missing
* the correct module ownership is unclear
* the change may break existing users
* the task requires a broad refactor not explicitly requested
* an ADR appears necessary but the decision cannot be made safely from existing context

When stopping, explain the risk and ask the smallest necessary clarification.

---

## Definition of Done

A task is complete only when:

* the requested scope is implemented
* relevant skill files were loaded and followed
* existing behavior is preserved unless intentionally changed
* server-side authorization is enforced where required
* server-side input validation is handled where required
* database changes are safe and documented
* errors are handled consistently
* critical flows have useful logs where appropriate
* tests are added or updated where appropriate
* existing tests pass where they can be run
* documentation is updated where appropriate
* `.env.example` is updated if configuration changed
* an ADR is added or updated when a significant decision is made
* no secrets are committed or logged
* no unnecessary dependencies are added
* no unrelated refactors are included
* risks, assumptions, and follow-up work are clearly stated

---

## Agent Infrastructure and Documentation Locations

Agent operating guidance lives under `/.agents/`.

Skill files live under `/.agents/skills/`.

The skill manifest lives at `/.agents/INDEX.md`.

Reusable templates live under `/.agents/templates/`.

Architecture Decision Records live at the project root under `/adr/`.

Do not store ADRs inside `/.agents/`.

Agent rules belong in `/.agents/`.

Project decisions belong in `/adr/`.

Expected structure:

```txt
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
```

Missing infrastructure behavior:

* If `/.agents/INDEX.md` is missing or incomplete, fall back to the minimum routing table in this file.
* If a relevant skill file is missing, proceed only if the task can be completed safely using `AGENTS.md`; otherwise stop and ask.
* If `PROJECT_CONTEXT.md` is missing and the task requires business, product, architectural, integration, data, or security context, stop and ask.
* Do not create missing infrastructure files unless the task asks for it or the change requires it.
