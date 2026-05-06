# Software Engineering Agent Governance Pack

## Overview

This project provides a reusable software engineering guidance system for AI-assisted development projects.

It is designed to help developers and AI agents work safely, consistently, and maintainably across software projects by defining:

* universal engineering rules
* task-specific skill guidance
* module documentation standards
* architecture decision record templates
* project context templates
* safe development workflows
* stop-and-ask criteria for risky or ambiguous work

The goal is not to create a rigid coding framework. The goal is to provide an engineering operating system that helps agents and developers make better decisions during implementation.

This pack is stack-agnostic and can be used across projects built with technologies such as .NET, Angular, React, Next.js, Node.js, SQL databases, APIs, SaaS products, internal business systems, and other software platforms.

---

## Why This Exists

AI agents can move quickly, but without clear engineering guardrails they may:

* bypass existing architecture
* introduce inconsistent patterns
* skip server-side authorization
* expose sensitive data
* create unsafe database migrations
* over-abstract too early
* add unnecessary dependencies
* miss documentation updates
* make changes without understanding project context
* break module contracts or existing consumers

This pack reduces those risks by giving agents a structured way to:

1. read the project context
2. identify the type of task
3. load the correct skill files
4. follow non-negotiable rules
5. stop and ask when decisions are unsafe or unclear
6. update documentation and ADRs when needed

---

## Recommended Project Structure

Add this governance pack to a software project using the following structure:

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
    modules.md
    database.md
    migrations.md
    api-design.md
    data-modeling.md
    ui-components.md
    caching.md
    performance.md
    background-jobs.md
    external-integrations.md
    testing.md
    observability.md
    configuration.md
    documentation.md
  /templates
    adr.md
    module-readme.md
    project-context.md

/adr
  0001-example.md
```

### Key folders

| Path                  | Purpose                                                           |
| --------------------- | ----------------------------------------------------------------- |
| `AGENTS.md`           | Always-loaded root operating guide for agents.                    |
| `/.agents/INDEX.md`   | Skill manifest and routing guide.                                 |
| `/.agents/skills/`    | Task-specific engineering guidance files.                         |
| `/.agents/templates/` | Reusable templates for ADRs, module READMEs, and project context. |
| `/adr/`               | Architecture Decision Records for project decisions.              |
| `PROJECT_CONTEXT.md`  | Root-level project overview and constraints.                      |

---

## Core Concept

This system uses a router-and-skills model.

### 1. `AGENTS.md` is the always-loaded router

`AGENTS.md` contains:

* universal non-negotiables
* required workflow
* stop-and-ask criteria
* definition of done
* minimum skill routing table
* documentation and ADR locations

It is intentionally short and operational.

### 2. `/.agents/INDEX.md` is the skill manifest

`INDEX.md` lists all available skill files and provides a fuller routing table.

Agents should read this after `AGENTS.md` to determine which skills apply to a task.

### 3. `/.agents/skills/*.md` are task-specific rules

Each skill file focuses on one engineering area.

Examples:

* `security.md` for authorization, input validation, ownership scope, public forms, and sensitive data
* `database.md` for SQL, ORM usage, indexes, query safety, and data access patterns
* `api-design.md` for API contracts, request/response shape, pagination, errors, and idempotency
* `ui-components.md` for design tokens, component ownership, UI states, accessibility, and shared components
* `migrations.md` for additive-first migrations, rollback, and production data safety

### 4. `/adr/` stores project decisions

ADRs are not agent rules. They are project-level decision records.

Use ADRs for significant decisions involving architecture, data, security, integrations, deployment, payment flows, subscriptions, module boundaries, or dependency choices.

---

## How Agents Should Use This Pack

For every non-trivial task, an agent should:

1. Read `AGENTS.md`.
2. Read `/.agents/INDEX.md` if available.
3. Read `PROJECT_CONTEXT.md` unless the task is a true micro-edit.
4. Identify task signals.
5. Load the baseline skills:

   * `security.md`
   * `modules.md`
6. Load any additional skills required by the task.
7. Declare which skills were loaded and why.
8. Inspect existing implementation patterns.
9. Make the smallest safe change.
10. Verify tests, security, data impact, and documentation impact.
11. Update module READMEs, `.env.example`, or ADRs where required.
12. Summarize what changed, what was checked, and any risks.

---

## Baseline Skills

For non-trivial tasks, always load:

```txt
/.agents/skills/security.md
/.agents/skills/modules.md
```

These are baseline skills because most development tasks can accidentally affect security, module ownership, public contracts, or invariants.

---

## Skill Routing Examples

| Task                     | Skills to load                                                                                                                                     |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Add a new API endpoint   | `security.md`, `modules.md`, `api-design.md`, `data-modeling.md`                                                                                   |
| Change a database query  | `security.md`, `modules.md`, `database.md`                                                                                                         |
| Add a new table          | `security.md`, `modules.md`, `database.md`, `migrations.md`, `data-modeling.md`                                                                    |
| Create a new UI screen   | `security.md`, `modules.md`, `ui-components.md`                                                                                                    |
| Add a payment webhook    | `security.md`, `modules.md`, `external-integrations.md`, `api-design.md`, `observability.md`, `background-jobs.md` if async processing is involved |
| Add caching              | `security.md`, `modules.md`, `caching.md`, `performance.md`                                                                                        |
| Add a background job     | `security.md`, `modules.md`, `background-jobs.md`, `observability.md`, `performance.md`                                                            |
| Add a new dependency     | `security.md`, `modules.md`, `configuration.md`, `documentation.md` if ADR-worthy                                                                  |
| Fix a business logic bug | `security.md`, `modules.md`, `testing.md`, plus the relevant domain skill                                                                          |

The full routing table lives in `/.agents/INDEX.md`.

---

## Skill File Format

Each skill file follows this structure:

```md
# Skill: Skill Name

## When this applies

## Non-Negotiables

## Defaults

## Patterns

## Common Mistakes

## Stop and Ask If

## Related Skills
```

This consistent format helps agents quickly identify:

* when the skill applies
* which rules block completion
* what default approach to follow
* which patterns to invoke
* what mistakes to avoid
* when to stop and clarify
* which related skills to consider

---

## Templates

Templates live in:

```txt
/.agents/templates/
```

### Available templates

| Template             | Purpose                                       |
| -------------------- | --------------------------------------------- |
| `adr.md`             | Template for Architecture Decision Records.   |
| `module-readme.md`   | Template for module-level README files.       |
| `project-context.md` | Template for root-level `PROJECT_CONTEXT.md`. |

Completed ADRs should be stored in:

```txt
/adr/
```

Completed module READMEs should be stored inside the relevant module folder.

Completed project context should be stored at:

```txt
/PROJECT_CONTEXT.md
```

---

## Architecture Decision Records

Use ADRs to document significant decisions.

Examples of ADR-worthy decisions:

* changing the application architecture
* choosing a major dependency
* changing authentication or authorization model
* changing payment or subscription model
* changing file storage strategy
* introducing background jobs or queues
* introducing caching strategy
* changing deployment or hosting approach
* changing module boundaries
* making a significant data ownership decision

ADRs should be numbered sequentially:

```txt
/adr/0001-use-agent-skill-router.md
/adr/0002-store-uploads-outside-deploy-root.md
/adr/0003-use-user-level-subscriptions.md
```

Use `/.agents/templates/adr.md` as the template.

---

## Module READMEs

Major modules should have a `README.md` file.

A module README helps agents and developers understand:

* module purpose
* public contracts
* dependencies
* invariants
* data ownership
* security rules
* state and lifecycle
* integrations
* background jobs
* configuration
* observability
* testing expectations
* gotchas

Use `/.agents/templates/module-readme.md` as the canonical template.

---

## Project Context

Every non-trivial project should include a root-level `PROJECT_CONTEXT.md`.

This file should explain:

* what the project is
* who it serves
* what problem it solves
* core modules
* architecture overview
* technology stack
* business rules
* security and access model
* data ownership model
* external integrations
* deployment environment
* constraints and risks

Use `/.agents/templates/project-context.md` as the template.

---

## Non-Negotiable Engineering Principles

The root `AGENTS.md` defines the authoritative non-negotiables.

At a high level, this pack enforces these principles:

* authorization is enforced server-side
* input validation happens server-side
* secrets are never committed or logged
* SQL is parameterized or ORM-safe
* migrations preserve existing data unless destructive change is approved
* public contracts do not change silently
* dependencies require justification
* existing services, validation, permission checks, and logging patterns are not bypassed
* risky or ambiguous tasks stop for clarification

---

## How to Install in a Project

1. Copy `AGENTS.md` to the project root.
2. Copy the `/.agents/` folder to the project root.
3. Create `/adr/` at the project root.
4. Create `PROJECT_CONTEXT.md` using `/.agents/templates/project-context.md`.
5. Add module READMEs for major modules using `/.agents/templates/module-readme.md`.
6. Update `.env.example` if the project uses environment variables.
7. Commit the governance files with the project.

Recommended first ADR:

```txt
/adr/0001-use-agent-skill-router.md
```

This ADR should record the decision to use this agent governance structure.

---

## How to Maintain This Pack

### Update `AGENTS.md` when:

* universal non-negotiables change
* workflow changes
* stop-and-ask rules change
* definition of done changes
* folder locations change

### Update `/.agents/INDEX.md` when:

* new skills are added
* skills are renamed or removed
* routing rules change
* ownership boundaries change
* templates are added or removed

### Update skill files when:

* domain-specific rules change
* common mistakes are discovered
* new patterns emerge
* stop-and-ask conditions need refinement

### Update templates when:

* repeated documentation structure changes
* module READMEs need new standard sections
* ADR format changes
* project context expectations change

### Update ADRs when:

* a major decision is made
* an older decision is superseded
* project architecture, data ownership, or integration strategy changes

---

## Recommended Versioning

Use a simple version marker in `AGENTS.md`, such as:

```txt
Version: 1.0
Last updated: YYYY-MM-DD
```

When rolling this pack across multiple projects, track which version each project is using.

For major changes to this governance model, consider adding an ADR.

---

## Notes for Developers

This pack is designed to guide AI agents, but it is also useful for human contributors.

Before making significant changes, developers should also read:

* `AGENTS.md`
* `PROJECT_CONTEXT.md`
* relevant module README
* relevant skill files
* relevant ADRs

The system works best when documentation stays accurate and agents are required to declare which skills they loaded before planning or implementation.

---

## Current Status

This governance pack currently includes:

* root `AGENTS.md`
* skill index
* 15 skill files
* ADR template
* module README template
* project context template

It is ready to be added to software projects and refined through real project
