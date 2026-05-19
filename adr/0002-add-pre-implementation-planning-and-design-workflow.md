# ADR 0002: Add Pre-Implementation Planning and Design Workflow

## Status

Status: Accepted

## Date

2026-05-19

## Context

The governance pack already provided strong implementation guardrails through `AGENTS.md`, the skill router, engineering skill files, templates, ADR discipline, validation, and optional Codex subagents.

That model worked well once implementation scope was known, but it did not fully govern the earlier lifecycle where broad project ideas become plans, approved designs, implementation tasks, and assignments. Without explicit pre-implementation guidance, agents could jump from a product idea directly to code, invent brand and UX decisions, create vague tasks, or split work across agents without clear ownership.

User-facing products also need approval checkpoints before code is written. Brand identity, UX flows, UI mockups, task breakdowns, and task assignments are separate decisions from implementation and should be documented when they affect future work.

## Decision

Add a pre-implementation planning and design workflow to the governance pack.

The workflow is:

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

Add six new skill files:

* `project-planning.md`
* `task-breakdown.md`
* `task-assignment.md`
* `brand-identity.md`
* `ux-design.md`
* `ui-mock-approval.md`

Add six matching templates:

* `project-plan.md`
* `task-breakdown.md`
* `task-assignment.md`
* `brand-identity-kit.md`
* `ux-design-brief.md`
* `ui-mock-approval.md`

Update `AGENTS.md`, `/.agents/INDEX.md`, `README.md`, `PROJECT_CONTEXT.md`, and validation allowlists so the new workflow is discoverable, routable, and documented.

After the brand identity kit is finalized, agents may use Image Gen skills or approved image-generation tooling to create mock design concepts, screen comps, visual references, or supporting bitmap assets. Generated mock images are approval references and must be translated into explicit layout, component, state, accessibility, and behavior requirements before implementation.

## Consequences

This makes the governance pack cover the full path from idea to implementation, not only code changes.

Benefits:

* Broad project ideas get structured before code starts.
* Brand and UX decisions become explicit approval checkpoints.
* UI mockups can use Image Gen safely after brand direction is approved.
* Task breakdowns become implementation-ready with acceptance criteria and verification expectations.
* Task assignments get clearer ownership, boundaries, and integration rules.
* Agents are less likely to invent product, design, or coordination decisions during implementation.

Tradeoffs:

* New products and major features have more upfront process.
* Maintainers must keep additional skills and templates aligned.
* Some small changes may need explicit skips to avoid unnecessary ceremony.

## Alternatives Considered

Keep the pack implementation-only.

This was not selected because it leaves a gap between project idea and safe implementation, especially for new products and user-facing workflows.

Put all planning and design guidance into `ui-components.md` and `agent-team.md`.

This was not selected because project planning, brand identity, UX flow, mock approval, task breakdown, and task assignment are distinct concerns with different stop conditions and outputs.

Add only templates without skills.

This was not selected because agents need routing rules, non-negotiables, defaults, and stop-and-ask criteria to use the templates consistently.

## Implementation Notes

The new skills are additive to the baseline `security.md` and `modules.md` rules.

For broad ideas, new products, major features, and user-facing workflows, agents should complete or explicitly skip the relevant approval checkpoints before coding.

## Related

* `/AGENTS.md`
* `/.agents/INDEX.md`
* `/.agents/skills/project-planning.md`
* `/.agents/skills/brand-identity.md`
* `/.agents/skills/ux-design.md`
* `/.agents/skills/ui-mock-approval.md`
* `/.agents/skills/task-breakdown.md`
* `/.agents/skills/task-assignment.md`

## Supersedes

None.

## Superseded By

