# Skill: Migrations

## When this applies

Load this skill when a task adds, modifies, removes, renames, or backfills database schema or stored data.

This includes tables, columns, indexes, constraints, relationships, seed data, reference data, data migrations, migration scripts, rollback scripts, destructive changes, and changes to field meaning.

For query design and database access, also load `database.md`.

For field meaning, source of truth, DTO impact, or model shape, also load `data-modeling.md`.

For significant schema or data ownership decisions, also load `documentation.md` and consider an ADR.

---

## Non-Negotiables

Violating these rules blocks completion.

1. Migrations must preserve existing data unless destructive change is explicitly approved.
2. Do not drop tables, drop columns, truncate tables, delete production data, or overwrite existing records without explicit approval.
3. Do not change the meaning of existing data without a documented migration plan.
4. Schema changes must not corrupt, lose, or misrepresent data already stored in the database. Additive changes are preferred; transformative changes must account for existing records.
5. Required columns added to existing tables must include a safe default, backfill, or staged rollout plan.
6. Data migrations must be idempotent or protected against accidental repeated execution.
7. Migrations that affect production data must have a rollback strategy or a documented reason rollback is not safe.
8. Do not weaken constraints, relationships, or uniqueness rules without documenting why.
9. Do not rename fields, tables, or enum/status values without checking all consumers.
10. Migration scripts must not contain secrets, production credentials, or environment-specific private values.

---

## Defaults

### Additive First

Prefer additive migrations over destructive migrations.

Safe first steps usually include adding nullable columns, adding new tables, adding new indexes, adding new reference data, or introducing new fields alongside old fields.

Remove old structures only after the application has stopped using them and a deprecation window or explicit approval exists.

### Existing Migration Pattern First

Follow the project’s existing migration tooling, naming convention, file location, transaction behavior, and deployment workflow.

Do not introduce a second migration system unless explicitly required and justified.

Migrations should behave safely across local, staging, and production environments. Avoid environment-specific assumptions unless the migration is explicitly scoped and documented.

### Staged Rollouts

Use staged rollouts when a change cannot be safely applied in one step.

Follow the Add, Migrate, Switch, Remove pattern.

This is especially important for large tables, required fields, renamed fields, and production systems with active users.

### Backfills

Backfills should be safe to run, observable where practical, and designed for the expected data volume.

Large backfills should consider batching, locks, timeouts, retry behavior, and operational impact.

Do not assume development-scale data volume reflects production.

### Rollback

Every migration that affects production should have a rollback strategy.

Rollback may be a down migration, a manual recovery plan, a restore plan, or a documented reason why rollback is unsafe.

Irreversible migrations must be called out explicitly.

### Constraints and Indexes

Add constraints and indexes carefully.

For existing data, verify the current data satisfies the constraint before enforcing it.

For large tables, consider whether index creation can lock the table or slow writes in the target database.

### Reference and Seed Data

Reference or seed data migrations should be idempotent.

Use stable keys where practical rather than relying only on display names.

Do not overwrite existing administrator-managed values unless explicitly required.

### Destructive Changes

Destructive changes require explicit approval and should usually be split into a later migration.

Before destructive change, identify what depends on the data, whether backups exist, whether a deprecation window is needed, and how recovery would work.

### Field Meaning Changes

Changing what a field means is a data migration, not just a code edit.

When a field’s meaning changes, the migration must account for records stored under the old meaning. Existing data must remain readable, usable, or be explicitly transformed as part of the migration plan.

Consumer, contract, report, import, export, and documentation updates are owned by `data-modeling.md` and `documentation.md`.

---

## Patterns

### Pattern: Add, Migrate, Switch, Remove

For risky changes, add the new structure first, migrate or backfill data, switch application behavior, verify, and remove old structure only later.

This reduces production risk and allows safer rollback.

### Pattern: Existing Data Comes First

A schema change must account for records that already exist.

Required fields, new constraints, and changed meanings need defaults, backfills, or staged rollout plans.

### Pattern: Destructive Change Requires Explicit Approval

Dropping, deleting, truncating, overwriting, or permanently transforming data is not a normal implementation detail.

It requires explicit approval and a recovery plan.

### Pattern: Idempotent Data Changes

Seed and data migrations should be safe to run more than once or clearly protected against duplicate effects.

Repeated execution should not create duplicate rows, duplicate permissions, duplicate plans, or inconsistent reference data.

### Pattern: Rollback Is Part of the Design

A migration is incomplete until rollback or recovery behavior is understood.

If rollback is unsafe, the risk must be documented before proceeding.

---

## Common Mistakes

* Dropping a column in the same migration that introduces its replacement.
* Adding a non-nullable column to a populated table without a default or backfill.
* Renaming a column without checking reports, exports, imports, jobs, and API consumers.
* Changing a field’s meaning without documenting the old and new meaning.
* Running destructive updates without a backup or recovery plan.
* Writing seed scripts that create duplicates when run more than once.
* Overwriting administrator-managed reference data.
* Adding constraints before checking existing data quality.
* Creating indexes on large tables without considering lock or write impact.
* Assuming production data volume is similar to development data.
* Running large backfills in one unbounded transaction.
* Mixing schema migration, risky data migration, and cleanup into one irreversible step.
* Removing old fields before all application code has stopped using them.
* Forgetting to update `.env.example`, docs, tests, reports, or imports after schema changes.
* Treating rollback as optional because the migration worked locally.

---

## Stop and Ask If

Stop and ask before proceeding if:

* the task requires dropping, deleting, truncating, or overwriting data
* existing production data could be affected and approval is unclear
* the current data may not satisfy a new constraint
* a required column is being added to an existing table and the default or backfill is unclear
* a field’s meaning is changing and consumer impact is unclear
* rollback or recovery behavior is unclear
* the migration may be expensive on production-sized data
* the migration may require downtime or table locks
* seed or reference data ownership is unclear
* the migration touches billing, payments, subscriptions, authorization, audit logs, or tenant/workspace ownership data
* the deployment order between code and migration is unclear

When stopping, explain the migration risk and ask the smallest necessary clarification.

---

## Related Skills

* `database.md`
* `data-modeling.md`
* `documentation.md`
* `configuration.md`
