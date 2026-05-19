# Software Engineering Agent Governance Pack

## Overview

This project provides a reusable software engineering guidance system for AI-assisted development projects.

It is designed to help developers and AI agents work safely, consistently, and maintainably across software projects by defining:

* universal engineering rules
* task-specific skill guidance
* module documentation standards
* architecture decision record templates
* project context templates
* project planning, task breakdown, and task assignment workflows
* brand identity, UX design, and UI mock approval workflows
* a local onboarding wizard for generating first-draft project artifacts
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
    agent-team.md
    security.md
    modules.md
    project-planning.md
    task-breakdown.md
    task-assignment.md
    brand-identity.md
    ux-design.md
    ui-mock-approval.md
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
    codex-agent.toml
    module-readme.md
    project-context.md
    project-plan.md
    task-breakdown.md
    task-assignment.md
    brand-identity-kit.md
    ux-design-brief.md
    ui-mock-approval.md

/.codex
  config.example.toml
  /agents
    agent-organizer.toml
    api-contract-reviewer.toml
    code-mapper.toml
    database-migration-reviewer.toml
    documentation-maintainer.toml
    performance-reviewer.toml
    security-reviewer.toml
    test-strategist.toml

/adr
  0001-example.md

/scripts
  validate-governance-pack.py

/tools
  /project-onboarding-wizard
    index.html
    styles.css
    app.js
```

### Key folders

| Path                  | Purpose                                                                      |
| --------------------- | ---------------------------------------------------------------------------- |
| `AGENTS.md`           | Always-loaded root operating guide for agents.                               |
| `/.agents/INDEX.md`   | Skill manifest and routing guide.                                            |
| `/.agents/skills/`    | Task-specific engineering guidance files.                                    |
| `/.agents/templates/` | Reusable templates for ADRs, Codex agents, module READMEs, context, plans, tasks, assignments, brand, UX, and mock approvals. |
| `/.codex/agents/`     | Optional project-scoped Codex custom agents built from the governance rules. |
| `/adr/`               | Architecture Decision Records for project decisions.                         |
| `/scripts/`           | Maintenance and validation scripts for the pack.                             |
| `/tools/`             | Optional local utilities such as the project onboarding wizard.              |
| `PROJECT_CONTEXT.md`  | Root-level project overview and constraints.                                 |

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

* `agent-team.md` for optional project manager and specialist subagent coordination on broad or risky work
* `security.md` for authorization, input validation, ownership scope, public forms, and sensitive data
* `project-planning.md` for turning broad ideas, MVPs, and roadmap items into approved implementation direction
* `task-breakdown.md` for converting approved plans into implementation-ready tasks
* `task-assignment.md` for assigning bounded work to agents, subagents, or contributors
* `brand-identity.md` for product identity, tone, visual tokens, typography, imagery, and accessibility direction
* `ux-design.md` for user journeys, onboarding, navigation, states, privacy moments, and accessibility flow
* `ui-mock-approval.md` for wireframes, mockups, prototypes, responsive states, and Image Gen-assisted mock concepts after brand approval
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
7. For broad ideas, new products, major features, or user-facing workflows, complete the appropriate pre-implementation steps: project plan, brand identity, UX design, UI mock approval, task breakdown, and task assignment.
8. Declare which skills were loaded and why.
9. Inspect existing implementation patterns.
10. Make the smallest safe change.
11. Verify tests, security, data impact, and documentation impact.
12. Update module READMEs, `.env.example`, or ADRs where required.
13. Summarize what changed, what was checked, and any risks.

---

## Baseline Skills

For non-trivial tasks, always load:

```txt
/.agents/skills/security.md
/.agents/skills/modules.md
```

These are baseline skills because most development tasks can accidentally affect security, module ownership, public contracts, or invariants.

---

## Optional Team Workflow

For broad, risky, cross-module, long-running, or context-heavy work, agents may use an optional team workflow described in:

```txt
/.agents/skills/agent-team.md
```

In this workflow, a project manager agent owns task intake, context loading, scope control, delegation, integration, final verification, and user communication. Specialist subagents handle bounded concerns such as security review, database review, API design, UI implementation, testing, documentation, performance analysis, or integration review.

The team workflow does not replace the default router-and-skills model. Each agent still follows `AGENTS.md`, `/.agents/INDEX.md`, and the relevant skill files. The project manager remains responsible for reviewing specialist output, resolving conflicts, preserving module ownership, and confirming the Definition of Done.

Use this workflow when parallel specialist work reduces risk or context pressure. Avoid it for small tasks where coordination adds overhead without improving safety.

---

## Product Planning and Design Approval Workflow

For new products, major features, or user-facing workflows, this pack supports a pre-implementation lifecycle:

```txt
Idea or project context
  -> project plan
  -> brand identity kit
  -> UX design brief
  -> UI mock approval
  -> task breakdown
  -> task assignment
  -> implementation
  -> testing, docs, and review
```

The goal is to stop agents from jumping directly from a broad idea to code. Plans, brand decisions, UX flows, and mocks should be approved before they become implementation constraints. If the user explicitly skips an approval stage, the agent should record that assumption and keep the implementation conservative.

After the brand identity kit is finalized, agents may use Image Gen skills or approved image-generation tooling to create mock design concepts, screen comps, visual references, or supporting bitmap assets. Generated mock images are approval references, not implementation specifications. They must be translated into explicit layout, component, state, accessibility, and behavior requirements before coding starts.

Reusable templates for these artifacts live in `/.agents/templates/`.

---

## Project Onboarding Wizard

This repository includes a dependency-free local wizard at:

```txt
/tools/project-onboarding-wizard/index.html
```

Open it directly in a browser to collect project context, planning, brand, UX, mock approval, task, and assignment details. The wizard previews generated Markdown and can either download selected files or write them into a selected project folder when the browser supports local folder access.

Generated project-specific artifacts are written to:

```txt
/PROJECT_CONTEXT.md
/project-docs/project-plan.md
/project-docs/brand-identity-kit.md
/project-docs/ux-design-brief.md
/project-docs/ui-mock-approval.md
/project-docs/task-breakdown.md
/project-docs/task-assignment.md
/adr/0001-use-agent-governance-pack.md
```

`/.agents/` remains reserved for agent operating rules, reusable skills, and reusable templates. Planning outputs for a specific project should live in `project-docs/` or another project documentation location.

---

## Codex Subagent Starter Pack

This repository includes a small project-scoped Codex custom agent pack in:

```txt
/.codex/agents/
```

These agents bridge the Markdown skill-router model with Codex-native subagent files. They are intentionally curated rather than exhaustive.

| Agent | Sandbox | Primary use |
| --- | --- | --- |
| `agent-organizer` | `read-only` | Split broad work into safe local and delegated tasks. |
| `api-contract-reviewer` | `read-only` | Review endpoint contracts, DTOs, compatibility, and error behavior. |
| `code-mapper` | `read-only` | Trace code paths, ownership boundaries, validation points, and side effects. |
| `database-migration-reviewer` | `read-only` | Review schema, migration, data-preservation, rollback, and index risks. |
| `documentation-maintainer` | `workspace-write` | Update assigned docs, ADRs, templates, project context, or module READMEs. |
| `performance-reviewer` | `read-only` | Review scalability, bounded work, query load, caching fit, and high-traffic risks. |
| `security-reviewer` | `read-only` | Review authorization, ownership scope, input validation, secrets, uploads, and webhooks. |
| `test-strategist` | `read-only` | Identify regression coverage, test level, edge cases, and verification gaps. |

Read-only is the default for review, mapping, research, and planning work. Use write-capable agents only when the task requires edits and the parent agent can assign a clear write scope.

Example review workflow:

```txt
Review this branch with project-scoped subagents.
Have code-mapper trace the affected behavior, security-reviewer check auth and input risks, and test-strategist identify missing coverage.
Wait for all three, then summarize findings with file references and a smallest-safe-fix recommendation.
```

Example API workflow:

```txt
Review the new endpoint with api-contract-reviewer, security-reviewer, and documentation-maintainer.
Keep the reviewers read-only. Let documentation-maintainer update only the assigned API docs after the contract decision is clear.
```

Example migration workflow:

```txt
Review this migration with database-migration-reviewer and test-strategist.
Check whether existing data is preserved, rollback expectations are clear, and representative data tests are present.
```

Use `/.agents/templates/codex-agent.toml` when creating new project-specific agents.

---

## Skill Routing Examples

| Task                     | Skills to load                                                                                                                                     |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Major cross-module feature | `agent-team.md`, `security.md`, `modules.md`, plus the relevant implementation, testing, and documentation skills                                |
| New product idea         | `security.md`, `modules.md`, `project-planning.md`, `brand-identity.md`, `ux-design.md`, `ui-mock-approval.md`, `task-breakdown.md`, `task-assignment.md`, `documentation.md` |
| Prepare implementation tasks | `security.md`, `modules.md`, `task-breakdown.md`, `task-assignment.md`, `testing.md`                                                          |
| Create UI mock for approval | `security.md`, `modules.md`, `brand-identity.md`, `ux-design.md`, `ui-mock-approval.md`, `ui-components.md`                                   |
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
| `codex-agent.toml`   | Template for Codex custom agent TOML files.   |
| `module-readme.md`   | Template for module-level README files.       |
| `project-context.md` | Template for root-level `PROJECT_CONTEXT.md`. |
| `project-plan.md`    | Template for project, MVP, or major feature plans. |
| `task-breakdown.md`  | Template for implementation-ready task lists. |
| `task-assignment.md` | Template for bounded contributor or agent assignments. |
| `brand-identity-kit.md` | Template for brand identity and visual direction. |
| `ux-design-brief.md` | Template for user journeys, states, and experience decisions. |
| `ui-mock-approval.md` | Template for UI mock approval and implementation handoff notes. |

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
3. Copy `/.codex/agents/` if the project will use Codex custom subagents.
4. Copy selected settings from `/.codex/config.example.toml` into the project's own `/.codex/config.toml` if needed.
5. Create `/adr/` at the project root.
6. Create `PROJECT_CONTEXT.md` using `/.agents/templates/project-context.md`.
7. Optionally open `/tools/project-onboarding-wizard/index.html` to generate first-draft `PROJECT_CONTEXT.md`, `project-docs/*`, and ADR files.
8. Use the planning, brand, UX, mock approval, task breakdown, and assignment templates when taking broad ideas into implementation.
9. Add module READMEs for major modules using `/.agents/templates/module-readme.md`.
10. Update `.env.example` if the project uses environment variables.
11. Run `python scripts/validate-governance-pack.py` when Python 3.11 or newer is available.
12. Commit the governance files with the project.

Recommended first ADR:

```txt
/adr/0001-use-agent-skill-router.md
```

This ADR should record the decision to use this agent governance structure.

---

## Validation

Run the validation script after changing skills, templates, Codex agents, or governance docs:

```bash
python scripts/validate-governance-pack.py
```

The script checks:

* required governance files exist and are not empty
* every skill file is listed in `/.agents/INDEX.md`
* routed skill references point to existing files
* Codex agent TOML files parse and include required fields
* Codex agent names are unique and listed in `/.codex/agents/README.md`
* `PROJECT_CONTEXT.md` has meaningful non-template content
* common secret-like patterns are not present in tracked text assets

The script uses Python standard library `tomllib`, so it requires Python 3.11 or newer and does not add a project dependency.

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
* planning, task, brand, UX, or mock approval artifacts need new standard sections
* Codex custom agent structure or required fields change

### Update `/.codex/agents/` when:

* a reusable specialist role becomes valuable across projects
* an existing agent's scope, sandbox, model, or output contract changes
* skill guidance changes in a way that should be reflected in agent instructions
* workflow examples need a different default agent lineup

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
* 22 skill files
* local project onboarding wizard
* ADR template
* Codex custom agent template
* module README template
* project context template
* project plan, task breakdown, task assignment, brand identity kit, UX brief, and UI mock approval templates
* 8 project-scoped Codex custom agents
* validation script
* accepted ADRs for the Codex subagent starter pack, pre-implementation planning/design workflow, and onboarding wizard

It is ready to be added to software projects and refined through real project use.
