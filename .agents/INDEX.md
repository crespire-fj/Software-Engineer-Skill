# Agent Skill Index

## Purpose

This file lives at `/.agents/INDEX.md`.

This file is the manifest and routing guide for agent-specific skills.

After reading `/AGENTS.md`, read this file to identify which skill files from `/.agents/skills/` apply to the current task.

Use `/AGENTS.md` as the minimum router. Use this file as the fuller skill index, including descriptions, common task routing, templates, and project-specific overrides.

If this file conflicts with `/AGENTS.md`, `/AGENTS.md` takes precedence for non-negotiables, workflow, stop conditions, and completion criteria.

---

## Skill Loading Rules

These rules summarize `/AGENTS.md` skill-loading guidance. `/AGENTS.md` is authoritative.

Load all skills relevant to the task before planning or implementing.

Always load the baseline skills for non-trivial tasks when they exist:

* `security.md`
* `modules.md`

If unsure whether a skill applies, load it.

If a task touches multiple areas, load all matching skills.

If a relevant skill file is missing, proceed only if the task can be completed safely using `/AGENTS.md`; otherwise stop and ask.

Before planning or implementing, declare which skills were loaded and why. If a seemingly relevant skill is not loaded, state why not.

Example:

```txt
Loaded skills:
- security.md because it is a baseline skill.
- modules.md because it is a baseline skill.
- api-design.md because this task adds an endpoint.
- data-modeling.md because this task changes response shape.

Not loaded:
- migrations.md because this task does not change schema or stored data.
```

---

## Available Skills

| Skill                 | File                                       | Purpose                                                                                                                                                                  |
| --------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Security              | `/.agents/skills/security.md`              | Authentication, authorization, RBAC, ownership scope, input validation, public form abuse controls, file upload safety, webhook authenticity, and sensitive data safety. |
| Modules               | `/.agents/skills/modules.md`               | Module boundaries, public contracts, invariants, data ownership, README discipline, dependency direction, and AHA abstraction discipline.                                |
| Database              | `/.agents/skills/database.md`              | SQL, ORM, query builders, query safety, connection pooling, query-level performance, constraints, relationships, indexing, and data access patterns.                     |
| Migrations            | `/.agents/skills/migrations.md`            | Schema changes, additive-first migrations, backfills, seed data, rollback, destructive change approval, and production data safety.                                      |
| API Design            | `/.agents/skills/api-design.md`            | Endpoint contracts, route and method design, request/response shape, pagination, filtering, sorting, errors, idempotency, and compatibility.                             |
| Data Modeling         | `/.agents/skills/data-modeling.md`         | Entities, DTOs, request models, response models, mapping, over-posting prevention, source of truth, field meaning, and state modeling.                                   |
| UI Components         | `/.agents/skills/ui-components.md`         | UI screens, components, styling scope, design tokens, shared component contracts, forms, accessibility, responsive behavior, and UI states.                              |
| Caching               | `/.agents/skills/caching.md`               | Cache keys, TTLs, invalidation, stale data behavior, permission-sensitive caching, negative caching, and provider response caching mechanics.                            |
| Performance           | `/.agents/skills/performance.md`           | System and page-level performance, bounded work, scalability, request-path discipline, dashboards, reports, measurement, and resource limits.                            |
| Background Jobs       | `/.agents/skills/background-jobs.md`       | Queues, workers, scheduled jobs, retries, idempotency, payload safety, failure handling, progress, and multi-instance scheduling safety.                                 |
| External Integrations | `/.agents/skills/external-integrations.md` | Third-party APIs, provider adapters, webhooks, callbacks, payments, email, storage, OAuth, provider retries, and reconciliation.                                         |
| Testing               | `/.agents/skills/testing.md`               | Unit, integration, API, E2E, component, contract, regression, migration, and security testing strategy.                                                                  |
| Observability         | `/.agents/skills/observability.md`         | Structured logs, correlation IDs, audit logs, metrics, traces, health checks, diagnostics, and production debugging.                                                     |
| Configuration         | `/.agents/skills/configuration.md`         | Environment variables, `.env.example`, secrets, client/server config boundaries, feature flags, provider config, dependencies, and package updates.                      |
| Documentation         | `/.agents/skills/documentation.md`         | ADRs, README updates, project documentation, environment documentation, documentation drift, and decision records.                                                       |

---

## Routing Table

All rows are additive to the baseline skills. For non-trivial tasks, load `security.md` and `modules.md` plus any matching rows below.

### Atomic Task Signals

| Task signal                                                                 | Load these additional skills                                  |
| --------------------------------------------------------------------------- | ------------------------------------------------------------- |
| SQL, ORM, query builders, indexes, relationships, database performance      | `database.md`                                                 |
| Schema changes, migrations, seed data, destructive changes                  | `database.md`, `migrations.md`                                |
| New or modified API endpoint                                                | `api-design.md`, `data-modeling.md`                           |
| Returning data to clients, DTOs, entities, mapping, over-posting            | `data-modeling.md`                                            |
| New UI screen, component, layout, styling, accessibility, design states     | `ui-components.md`                                            |
| Major module change, module contract, module folder, module README          | `modules.md`                                                  |
| Logging, audit logs, metrics, correlation IDs, production debugging         | `observability.md`                                            |
| Tests, test strategy, test coverage, regression protection                  | `testing.md`                                                  |
| Slow queries, heavy pages, high traffic, scalability, N+1 symptoms          | `performance.md`, `database.md`                               |
| Caching, TTLs, invalidation, cache keys, stale data                         | `caching.md`                                                  |
| Background jobs, queues, retries, scheduled jobs, async processing          | `background-jobs.md`                                          |
| External APIs, webhooks, payments, email, storage, third-party services     | `external-integrations.md`                                    |
| Environment variables, config, secrets, feature flags, dependency additions | `configuration.md`                                            |
| ADRs, README updates, project docs, decision documentation                  | `documentation.md`                                            |
| File storage or uploads                                                     | `security.md`, `configuration.md`, `external-integrations.md` |
| Major architecture or project structure decision                            | `documentation.md` and write or update an ADR in `/adr/`      |

### Common Task Types

| Task type                       | Load these additional skills                                                                                                                                                                                    |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Payment flow                    | `external-integrations.md`, `api-design.md`, `observability.md`, `background-jobs.md` if async processing or retries are involved                                                                               |
| Subscription or feature gating  | `data-modeling.md`, `api-design.md` if endpoints change, `caching.md` if access state is cached                                                                                                                 |
| Admin dashboard or admin action | `ui-components.md`, `observability.md`, `api-design.md` if endpoints change                                                                                                                                     |
| Report or analytics page        | `performance.md`, `database.md`, `ui-components.md`, `observability.md`, `caching.md` if aggregates are cached                                                                                                  |
| Public form                     | `api-design.md`, `observability.md`, `security.md` for validation, rate limiting, honeypot, CAPTCHA or equivalent controls                                                                                      |
| New major feature module        | `documentation.md`, `data-modeling.md`, `api-design.md`, `testing.md`, `migrations.md`, `database.md` if persistence is involved                                                                                |
| External provider webhook       | `external-integrations.md`, `security.md`, `api-design.md`, `background-jobs.md` if async processing is involved, `observability.md`                                                                            |
| File import                     | `data-modeling.md`, `database.md`, `background-jobs.md`, `testing.md`, `observability.md`                                                                                                                       |
| File export                     | `api-design.md`, `performance.md`, `background-jobs.md` if long-running, `security.md`, `observability.md`                                                                                                      |
| Dependency addition             | `configuration.md`, `documentation.md` if ADR-worthy                                                                                                                                                            |
| Bug fix in business logic       | `testing.md`, `modules.md`, plus any skill matching the area where the bug lives, such as `database.md` for data bugs, `api-design.md` for contract bugs, or `security.md` for permission bugs                  |
| UI-only visual refinement       | `ui-components.md`; load `security.md` if any permission, sensitive data, or auth-adjacent UI changes; load additional skills only if the change touches behavior, API contracts, or shared component contracts |

---

## Skill Ownership Boundaries

Use this section to avoid duplicated or conflicting guidance between skills.

| Concern                                            | Canonical owner            | Related skills                                                   |
| -------------------------------------------------- | -------------------------- | ---------------------------------------------------------------- |
| Server-side authorization and ownership checks     | `security.md`              | `api-design.md`, `database.md`, `ui-components.md`               |
| Module contracts and invariants                    | `modules.md`               | `documentation.md`, `api-design.md`, `data-modeling.md`          |
| Query mechanics and database access                | `database.md`              | `performance.md`, `security.md`, `data-modeling.md`              |
| Schema evolution and production data safety        | `migrations.md`            | `database.md`, `data-modeling.md`, `documentation.md`            |
| API request/response contracts                     | `api-design.md`            | `data-modeling.md`, `security.md`, `testing.md`                  |
| DTOs, public shape, mapping, source of truth       | `data-modeling.md`         | `api-design.md`, `database.md`, `external-integrations.md`       |
| UI rendering, component states, accessibility      | `ui-components.md`         | `security.md`, `performance.md`, `data-modeling.md`              |
| Cache key, TTL, invalidation, stale behavior       | `caching.md`               | `security.md`, `performance.md`, `observability.md`              |
| System/page-level performance strategy             | `performance.md`           | `database.md`, `caching.md`, `ui-components.md`                  |
| Queue, retry, and scheduled job execution safety   | `background-jobs.md`       | `performance.md`, `external-integrations.md`, `observability.md` |
| Provider protocol, callbacks, SDKs, reconciliation | `external-integrations.md` | `security.md`, `configuration.md`, `background-jobs.md`          |
| Test strategy and verification                     | `testing.md`               | All implementation skills                                        |
| Logs, metrics, traces, audit, diagnostics          | `observability.md`         | `security.md`, `performance.md`, `external-integrations.md`      |
| Env vars, secrets configuration, dependencies      | `configuration.md`         | `security.md`, `documentation.md`, `external-integrations.md`    |
| ADRs and documentation drift                       | `documentation.md`         | `modules.md`, `configuration.md`, `migrations.md`                |

---

## Templates

Reusable templates live in `/.agents/templates/`.

| Template        | File                                    | Use for                                                                                                |
| --------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| ADR             | `/.agents/templates/adr.md`             | Significant project decisions. Completed ADRs must be stored in `/adr/`.                               |
| Module README   | `/.agents/templates/module-readme.md`   | Major modules, feature areas, and business capabilities. Completed READMEs live inside module folders. |
| Project Context | `/.agents/templates/project-context.md` | Root-level `PROJECT_CONTEXT.md`.                                                                       |

---

## ADR Location

Architecture Decision Records are project decisions, not agent operating rules.

Completed ADRs live in:

```txt
/adr/
```

Do not store completed ADRs in `/.agents/`.

Use `/.agents/templates/adr.md` as the template.

Use sequential zero-padded numbering and kebab-case titles.

Example:

```txt
/adr/0001-use-agent-skill-router.md
/adr/0002-store-uploads-outside-deploy-root.md
```

---

## Project-Specific Overrides

Project-specific overrides may be added below when a project intentionally differs from the standard skill guidance.

Overrides must be specific, justified, and should not weaken the non-negotiables in `/AGENTS.md`.

If an override represents a significant decision, write or update an ADR in `/adr/`.

### Overrides

None currently defined.
