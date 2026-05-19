# ADR 0001: Add Codex Subagent Starter Pack

## Status

Status: Accepted

## Date

2026-05-18

## Context

This project provides a reusable software engineering agent governance pack. It already defines root operating rules, skill routing, templates, stop-and-ask criteria, and documentation discipline.

Codex also supports project-scoped custom agents in `.codex/agents/`. Without project-provided agent files, users must translate this pack's skills into custom agent definitions themselves. That creates inconsistent role boundaries, inconsistent sandbox defaults, and a higher chance that reviewer-style agents are given write access.

## Decision

Add a small Codex-native starter pack under `.codex/agents/` plus an example `.codex/config.example.toml`.

The starter pack will favor narrow, governed specialists over a large catalog. Review, mapping, planning, and strategy agents default to `read-only`. The only write-capable starter agent is `documentation-maintainer`, and its scope is limited to assigned documentation files.

Add `/.agents/templates/codex-agent.toml` so projects can create new agents using the same structure and safety expectations.

Add validation tooling to check governance files, skill index coverage, Codex agent TOML shape, and common secret patterns.

## Consequences

Benefits:

* Users can install the governance pack and immediately use project-scoped Codex subagents.
* Agent roles become reusable, auditable, and safer by default.
* The pack now bridges the skill-router model and Codex custom agent configuration.
* Validation gives maintainers a lightweight way to catch drift and malformed agent files.

Tradeoffs:

* The repository now has more files to maintain.
* Model names may need future updates as Codex model availability changes.
* Agent files can still become stale if skill rules change and the corresponding agent instructions are not reviewed.

## Alternatives Considered

* Keep only Markdown skills: simpler, but less directly usable in Codex subagent workflows.
* Vend a broad third-party agent catalog: more coverage, but less governed, harder to audit, and more likely to include agents irrelevant to this pack.
* Make all agents write-capable: more convenient for implementation, but higher risk for conflicts and unintended edits.

## Implementation Notes

Keep the starter pack curated. Add new agents only when they represent a distinct, reusable, bounded responsibility.

When an agent is added or changed, update:

* `.codex/agents/README.md`
* root `README.md` when the public install or workflow story changes
* `scripts/validate-governance-pack.py` if the validation contract changes

## Related

* `AGENTS.md`
* `/.agents/INDEX.md`
* `/.agents/skills/agent-team.md`
* `/.agents/templates/codex-agent.toml`
* `.codex/agents/README.md`

## Supersedes

None.

## Superseded By

