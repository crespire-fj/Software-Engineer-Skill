# Project Context

## Project Summary

Project name: Software Engineering Agent Governance Pack

Project owner or organization: CrespiRe / Software Factory

Primary users: developers, technical leads, and AI coding agents working in software repositories.

Current status: reusable governance pack with optional Codex subagent starter files and a local onboarding wizard.

This project provides a stack-agnostic operating guide for AI-assisted software engineering. It defines root agent instructions, task-specific skill routing, reusable documentation templates, ADR discipline, safe workflow rules, and optional Codex custom agents.

The project is not an application framework. It is a governance and workflow layer that can be copied into application repositories so human developers and AI agents share the same safety, documentation, and review expectations.

## Problem Statement

AI coding agents can produce useful implementation work quickly, but they can also make unsafe changes when project context, permissions, module ownership, data contracts, and verification expectations are unclear.

This pack reduces that risk by giving each repository a consistent operating system for agent-assisted development. It tells agents what to read, which skill files to load, when to stop and ask, how to verify changes, and where to document important decisions.

## Solution Overview

The pack is built around a router-and-skills model:

* `AGENTS.md` defines universal rules, required workflow, stop-and-ask conditions, and completion criteria.
* `/.agents/INDEX.md` maps task signals to relevant skill files.
* `/.agents/skills/*.md` provide focused engineering guidance for security, modules, project planning, task breakdown, task assignment, brand identity, UX design, UI mock approval, database work, migrations, API design, data modeling, UI, testing, performance, caching, jobs, integrations, observability, configuration, documentation, and team workflows.
* `/.agents/templates/` provides reusable templates for ADRs, module READMEs, project context, project plans, task breakdowns, task assignments, brand identity kits, UX design briefs, UI mock approvals, and Codex custom agents.
* `/.codex/agents/` provides a small optional starter pack of governed Codex custom agents.
* `/adr/` stores project-level decisions.
* `scripts/validate-governance-pack.py` checks basic governance integrity.
* `tools/project-onboarding-wizard/` provides a local HTML and JavaScript wizard for generating first-draft project context, planning, design, task, assignment, and ADR artifacts.

The main non-goal is breadth for its own sake. The pack favors a curated, safe-by-default set of rules and agents over a large catalog of loosely governed roles.

## Users and Roles

* Repository maintainer: installs and adapts the governance pack for a software project.
* Developer: follows the same project context, module, documentation, and safety rules as the agent.
* Parent AI agent: reads the router, loads relevant skills, owns final integration, and verifies work.
* Specialist AI agent: handles bounded review, mapping, documentation, testing strategy, performance, database, API, or security analysis.

Detailed permission behavior belongs to the target application that installs this pack. This repository only defines governance rules.

## Core Modules

Module: Root agent workflow
Purpose: `AGENTS.md` defines universal workflow, non-negotiables, stop conditions, and Definition of Done.
README: root `README.md`

Module: Skill router
Purpose: `/.agents/INDEX.md` lists available skills, routing tables, ownership boundaries, templates, and optional Codex agent pack guidance.
README: root `README.md`

Module: Skill library
Purpose: `/.agents/skills/` contains task-specific guidance used by agents before planning or implementation.
README: `/.agents/INDEX.md`

Module: Product planning and design workflow
Purpose: `project-planning.md`, `task-breakdown.md`, `task-assignment.md`, `brand-identity.md`, `ux-design.md`, and `ui-mock-approval.md` move broad ideas through approval checkpoints before implementation.
README: `/.agents/INDEX.md`

Module: Templates
Purpose: `/.agents/templates/` contains reusable ADR, module README, project context, project plan, task breakdown, task assignment, brand identity kit, UX design brief, UI mock approval, and Codex agent templates.
README: root `README.md`

Module: Codex custom agents
Purpose: `/.codex/agents/` contains optional project-scoped Codex agents that implement bounded specialist roles.
README: `/.codex/agents/README.md`

Module: Validation
Purpose: `scripts/validate-governance-pack.py` checks governance pack integrity without adding runtime dependencies.
README: root `README.md`

Module: Project onboarding wizard
Purpose: `tools/project-onboarding-wizard/` helps users create or update first-draft governance artifacts from a browser form.
README: `tools/project-onboarding-wizard/README.md`

## Architecture Overview

This repository is documentation-first. There is no application runtime, database, background worker, frontend, or server API.

The architecture is organized as portable repository assets:

* root files define installable operating guidance and context
* `/.agents/` contains agent governance rules and templates
* `/.codex/` contains optional Codex-specific execution helpers
* `/adr/` records decisions about this governance pack
* `/scripts/` contains maintenance checks
* `/tools/` contains optional local utilities for using the pack

The main integration path is copying these files into another software project, then adapting `PROJECT_CONTEXT.md`, module READMEs, ADRs, and any project-specific Codex agents.

## Technology Stack

Primary content format: Markdown

Codex custom agent format: TOML

Validation script: Python 3.11 or newer, using only the standard library

Onboarding wizard: static HTML, CSS, and JavaScript

Runtime application stack: none

Database, ORM, hosting, auth, email, payments, storage, analytics: not applicable to this repository

## Key Business Rules

* The pack must stay stack-agnostic.
* `AGENTS.md` is authoritative for universal workflow, non-negotiables, stop conditions, and completion criteria.
* Skill files should be focused, additive, and easy for agents to load before implementation.
* Agent rules belong in `/.agents/`.
* Project decisions belong in `/adr/`.
* Optional Codex custom agents belong in `/.codex/agents/`.
* Read-only should be the default sandbox for review, mapping, research, and planning agents.
* Write-capable agents need narrow assigned file scope and parent-agent integration.
* Validation tooling must avoid new project dependencies unless explicitly justified.

## Security and Access Model

This repository does not authenticate users or serve protected data.

Its security responsibilities are documentation and governance oriented:

* never commit or document real secrets, credentials, tokens, private keys, or production `.env` files
* keep examples safe and placeholder-based
* require server-side authorization and validation in projects that install the pack
* default reviewer-style Codex agents to `read-only`
* keep write-capable agent instructions scoped and auditable
* validate common secret-like patterns in text assets before release
* keep the onboarding wizard local-only and dependency-free; it must not send project details to external services

## Data and Ownership Model

This repository has no runtime data model.

Ownership is documentation ownership:

* `AGENTS.md` owns universal agent workflow rules
* `/.agents/INDEX.md` owns skill routing and manifest rules
* `/.agents/skills/*.md` own domain-specific engineering guidance
* `/.agents/templates/` owns reusable documentation and agent templates
* `/.codex/agents/*.toml` own Codex-specific specialist role instructions
* `tools/project-onboarding-wizard/*` owns the local onboarding wizard UI and generation logic
* `/adr/*.md` own project decisions for the governance pack
* `PROJECT_CONTEXT.md` owns the current high-level project context

## External Integrations

Codex is the only intended tool integration surface. The `.codex/agents/*.toml` files are designed for project-scoped Codex custom agents.

There are no external APIs, webhooks, payment providers, storage providers, or live third-party credentials in this repository.

## Deployment and Environments

There is no deployed runtime.

The pack is installed by copying files into a target repository. Validation runs locally with:

```bash
python scripts/validate-governance-pack.py
```

Python 3.11 or newer is required for validation because the script uses the standard library TOML parser.

## Configuration Overview

Configuration is limited to example Codex settings in `/.codex/config.example.toml`.

Do not store real local Codex configuration, credentials, API keys, or environment-specific secrets in this repository.

## Operational Concerns

The main maintenance risks are documentation drift and agent instruction drift:

* new skill files must be listed in `/.agents/INDEX.md`
* routed skill references must point to existing files
* planning, brand, UX, mock approval, task breakdown, and task assignment templates must stay aligned with their skill files
* Codex agent TOML files must stay parseable and documented
* `PROJECT_CONTEXT.md` must remain non-empty and current
* significant decisions should be recorded in `/adr/`

## Current Constraints and Risks

* The pack is governance-only and must be adapted to each target repository.
* Codex model names may change over time and may need updates in `.codex/agents/*.toml`.
* The validation script checks structure and common mistakes, but it is not a substitute for human review.
* The current Codex agent starter pack is intentionally small; more roles should be added only when they are reusable and bounded.

## Roadmap and Planned Changes

Near-term improvements:

* refine the starter agent set through real project usage
* refine the pre-implementation planning, design, and approval templates through real project usage
* add more validation checks when recurring drift appears
* add example installation diffs for common project types if needed
* keep ADRs updated as governance decisions evolve

## Documentation Map

`AGENTS.md`: root operating guide and non-negotiables

`/.agents/INDEX.md`: skill manifest, routing guide, templates, and optional Codex agent pack overview

`/.agents/skills/`: task-specific engineering guidance

`/.agents/templates/`: reusable ADR, module README, project context, planning, design approval, task, and Codex agent templates

`/.codex/agents/`: project-scoped Codex custom agent starter pack

`/.codex/agents/README.md`: Codex agent usage and safety rules

`/adr/`: architecture and governance decision records

`scripts/validate-governance-pack.py`: governance pack validation script

`tools/project-onboarding-wizard/`: local browser wizard for generating project onboarding artifacts

`README.md`: install, usage, maintenance, and status documentation

## Last Updated

Date: 2026-05-19

Summary:

* Added project context for the governance pack itself.
* Added optional Codex custom agent starter pack context and validation expectations.
* Added pre-implementation planning, brand identity, UX design, UI mock approval, task breakdown, and task assignment context.
* Added local onboarding wizard context.
