# Skill: Documentation

## When this applies

Load this skill when a task affects project documentation, ADRs, README files, module documentation, API documentation, database documentation, deployment notes, environment variables, architecture, business rules, public contracts, or significant technical decisions.

Also load this skill when creating a new major feature, changing module responsibilities, changing configuration, changing data behavior, or making a decision future maintainers need to understand.

For module README rules, also load `modules.md`.

For schema changes, also load `migrations.md` and `database.md`.

---

## Non-Negotiables

Violating these rules blocks completion.

1. Do not leave documentation knowingly inconsistent with implementation.
2. Significant architecture, data, security, integration, deployment, or product-structure decisions must be documented with an ADR.
3. ADRs live in `/adr/`, not inside `/.agents/`.
4. Agent operating guidance lives in `/.agents/`, not inside `/adr/`.
5. Configuration changes must update `.env.example` when new, changed, or removed environment variables are involved.
6. Public contract changes must update the relevant consumer-facing or developer-facing documentation.
7. Module behavior, contract, dependency, invariant, security, or gotcha changes must update the module README when one exists.
8. Do not delete or overwrite historical decision records. Supersede them with a new ADR or update their status.
9. Do not document secrets, real credentials, private keys, production tokens, or sensitive operational details.
10. Documentation must identify assumptions, risks, and follow-up work when the implementation depends on them.

---

## Defaults

### Documentation Should Serve Maintenance

Documentation should explain what future maintainers and agents need to know to safely change the system.

Prefer documenting decisions, contracts, invariants, setup, deployment, and operational behavior over restating obvious code.

Do not create documentation noise that will not be maintained.

### Existing Documentation First

Follow the project’s existing documentation structure, naming style, and level of detail before introducing new files.

Update existing documents when they are the correct home for the information.

Create new documents only when the information has no clear existing home or is large enough to deserve one.

### ADRs

Architecture Decision Records are project decisions, not agent rules.

Store ADRs in `/adr/` using the template at `/.agents/templates/adr.md` when available.

Use the next available number and a short kebab-case title.

Update the status of older ADRs when a decision is deprecated or superseded.

### When to Write an ADR

Write or update an ADR for significant decisions involving architecture, database design, authentication, authorization, payment flow, subscription model, file storage, deployment, background jobs, caching, external integrations, dependency choices, multi-tenancy, data ownership, or module boundaries.

Do not write an ADR for every small implementation detail.

### Project Context

`PROJECT_CONTEXT.md` should explain the project well enough for a new developer or agent to understand the product, users, business problem, core modules, constraints, integrations, and important rules.

Keep it concise and high-signal. Do not turn it into a full product encyclopedia.

### README Files

The root `README.md` should help a developer set up, run, test, and understand the project at a practical level.

Module README files are owned by `modules.md` and should use `/.agents/templates/module-readme.md` when available.

### API, Database, and Deployment Docs

Update API docs when request shape, response shape, authentication, authorization, errors, pagination, or versioning changes.

Update database docs when schema, relationships, data ownership, indexing strategy, migrations, or important data behavior changes.

Update deployment docs when environment variables, build steps, hosting behavior, storage paths, scheduled jobs, or operational requirements change.

### Environment Documentation

`.env.example` must contain safe placeholder values for required configuration.

Do not include real secrets.

Group environment variables by category when practical and remove obsolete variables when they are no longer used.

### Documentation Drift

When documentation conflicts with implementation, either update the documentation or clearly mark it as outdated.

Do not leave contradictory instructions without explanation.

---

## Patterns

### Pattern: Document the Why, Not Just the What

Good documentation explains why a decision or behavior exists.

Code usually shows what happens; documentation should preserve context, tradeoffs, and intent.

### Pattern: ADRs Preserve Decisions

When a significant decision is made, record the context, decision, consequences, and alternatives.

Future maintainers should not have to rediscover why the system is shaped a certain way.

### Pattern: Docs Follow Contracts

When a public contract changes, documentation must change with it.

This includes API contracts, module contracts, configuration contracts, deployment contracts, and data contracts.

### Pattern: One Canonical Home

Each kind of information should have one canonical home.

Avoid copying the same rule into many documents where it will drift.

### Pattern: Templates Are the Source of Structure

Use templates for repeatable documentation such as ADRs, module READMEs, and project context files.

Do not duplicate full templates inside skill files when a canonical template exists.

---

## Common Mistakes

* Changing behavior without updating documentation.
* Writing what changed but not why it changed.
* Storing ADRs inside `/.agents/`.
* Storing agent rules inside `/adr/`.
* Creating multiple documents that explain the same rule differently.
* Leaving outdated documentation unmarked.
* Adding environment variables without updating `.env.example`.
* Adding a module without a README.
* Updating a module but leaving its README stale.
* Changing an API response without updating API documentation or examples.
* Changing deployment behavior without updating setup or hosting notes.
* Documenting secrets, real credentials, private URLs, or production-only sensitive details.
* Writing long documents that agents and developers will not maintain.
* Treating comments, READMEs, ADRs, and issue notes as interchangeable.
* Deleting historical ADRs instead of superseding them.

---

## Stop and Ask If

Stop and ask before proceeding if:

* a significant decision is required but the decision owner or context is unclear
* an ADR appears necessary but the decision cannot be made safely from existing context
* existing documentation conflicts with implementation and the correct source of truth is unclear
* the requested change conflicts with an accepted ADR
* a change appears to supersede an existing ADR
* documentation must include sensitive operational details and the safe level of disclosure is unclear
* a public contract changes and affected consumers are unclear
* a module README is missing or stale and the module behavior is unclear
* a configuration change is required but the environment variable names or deployment target are unclear
* the correct canonical home for documentation is unclear

When stopping, explain the documentation or decision risk and ask the smallest necessary clarification.

---

## Related Skills

* `modules.md`
* `configuration.md`
* `api-design.md`
* `database.md`
* `migrations.md`
