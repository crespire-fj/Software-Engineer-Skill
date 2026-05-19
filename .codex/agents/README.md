# Codex Agent Starter Pack

This directory contains project-scoped Codex custom agents that pair with the governance skills in `/.agents/skills/`.

These agents are intentionally narrow. They do not replace `AGENTS.md`, `/.agents/INDEX.md`, `PROJECT_CONTEXT.md`, or the skill files. They give Codex reusable roles for bounded review, exploration, planning, and documentation work.

## Agents

| Agent | Sandbox | Use for |
| --- | --- | --- |
| `agent-organizer` | `read-only` | Splitting broad work into safe local and delegated tasks. |
| `api-contract-reviewer` | `read-only` | Reviewing endpoint shape, compatibility, DTOs, errors, and version-sensitive API behavior. |
| `code-mapper` | `read-only` | Mapping code paths, ownership boundaries, validation points, and side effects before implementation. |
| `database-migration-reviewer` | `read-only` | Reviewing schema, migration, rollback, indexing, and data-preservation risks. |
| `documentation-maintainer` | `workspace-write` | Updating assigned docs, ADRs, templates, and module READMEs after implementation decisions. |
| `performance-reviewer` | `read-only` | Reviewing request-path cost, query load, caching fit, bounded work, and scalability risks. |
| `security-reviewer` | `read-only` | Reviewing authorization, ownership scope, input validation, secrets, public endpoints, uploads, and webhooks. |
| `test-strategist` | `read-only` | Identifying regression coverage, test level, edge cases, and verification gaps. |

## Usage

Ask Codex explicitly to use these agents. Codex does not spawn custom agents automatically.

Example:

```txt
Review this branch with project-scoped subagents.
Have code-mapper trace the affected behavior, security-reviewer check auth and input risks, and test-strategist identify missing coverage.
Wait for all three, then summarize findings with file references and a smallest-safe-fix recommendation.
```

## Safety Rules

* Read-only agents must not edit files.
* Write-capable agents must edit only the file areas assigned by the parent agent.
* All agents must follow `AGENTS.md`, `/.agents/INDEX.md`, `PROJECT_CONTEXT.md`, and relevant skill files.
* The parent agent remains responsible for integration, final review, and verification.

