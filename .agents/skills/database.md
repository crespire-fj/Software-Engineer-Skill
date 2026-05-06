# Skill: Database

## When this applies

Load this skill when a task touches SQL, ORM queries, query builders, database access, indexes, relationships, constraints, transactions, data integrity, data retrieval, or query-level database performance.

For schema changes, also load `migrations.md`.

For slow pages, heavy dashboards, N+1 queries, or system-level scalability work, also load `performance.md`.

---

## Non-Negotiables

Violating these rules blocks completion.

1. All SQL must be parameterized or use ORM-safe/query-builder-safe methods.
2. Never interpolate user-controlled input into SQL, filters, sort clauses, or raw query fragments.
3. Use the project’s approved database client, ORM, repository, or query builder.
4. Use the project’s connection pool. Do not open or close database connections manually unless the stack explicitly requires it.
5. Do not create a new database client per request unless the project stack explicitly requires it.
6. Do not load unbounded datasets by default.
7. Queries that read or mutate protected data must enforce user, workspace, tenant, organization, or ownership scope.
8. Do not make destructive data changes unless explicitly approved.
9. Do not change the meaning of existing fields without documentation and a migration plan.
10. Do not bypass existing data access services, repositories, permission checks, or validation flows.
11. Do not add indexes blindly. Every new index must support a known query or constraint.
12. If a schema change becomes necessary mid-task and `migrations.md` was not loaded, stop and load it before proceeding.

---

## Defaults

### Existing Patterns First

Follow the project’s existing database conventions before introducing new patterns.

Respect existing choices around ORM or query builder, repository pattern, service-layer access, transaction handling, naming conventions, soft delete behavior, audit fields, and tenant or workspace scoping.

Do not introduce a second data access style unless explicitly required and justified.

### Query Safety

Use parameterized queries, ORM-safe methods, or query builders with bound parameters.

Raw SQL is allowed only when necessary, reviewed, and fully parameterized.

Dynamic filtering, sorting, and searching must validate allowed fields before constructing query expressions.

### Connection Pooling

Use the project’s configured connection pool.

Do not manually open and close connections as a general pattern.

Respect existing configuration for pool size, idle timeout, connection timeout, query timeout, transaction timeout, and deployment limits.

Avoid long-running transactions, queries inside loops, and database clients created inside request handlers.

### Data Scope

Security owns the canonical rule that protected records must be scoped. Database implementation must apply that scope inside the query wherever practical, not only after fetching the record.

Database filtering must support the same authorization model enforced by the service or API layer.

### Query Shape

Fetch only what the use case needs when practical.

Use pagination, limits, filters, date ranges, search parameters, or ownership scope for lists that can grow.

Avoid `SELECT *` on large or sensitive tables unless the project pattern explicitly permits it and the result is bounded.

### Transactions

Use transactions when multiple database writes must succeed or fail as one unit.

Keep transactions short.

Avoid external API calls, file uploads, email sends, or slow operations inside database transactions unless explicitly required and safe.

### Relationships and Constraints

Use relationships and constraints to protect data integrity where practical.

Prefer clear foreign keys, uniqueness constraints, and required fields when the business rule is stable.

Avoid relying only on application code for core integrity rules that the database can safely enforce.

### Indexing

Indexes should support real query patterns.

Add indexes for specific filter, join, sort, uniqueness, foreign key, slug, or external reference lookup needs.

Consider write overhead, table size, selectivity, and composite index order before adding indexes.

### Database-Level Performance

Database performance guidance in this skill is limited to query-level concerns: bounded result sets, indexed filters, avoiding N+1 patterns, avoiding queries inside loops, and keeping transactions short.

Page-level, dashboard-level, caching, load, and scalability strategy belong in `performance.md`.

### Sensitive Stored Data

Security owns sensitive data policy. Database work must follow the project’s approved approach for encrypted columns, hashed values, masking, retention, and access controls.

Choosing between database-level encryption, application-level encryption, hashing, or not storing the value is a design decision. Use an ADR when the choice is significant.

---

## Patterns

### Pattern: Query Through the Approved Boundary

Database access should go through the project’s approved data access boundary, such as a service, repository, ORM client, or query builder.

Do not scatter direct database calls across unrelated UI, controller, or integration code.

### Pattern: Scope Inside the Query

Ownership, tenant, workspace, or organization scope should be applied as part of the database query wherever practical.

Post-fetch authorization checks may still be useful, but they should not be the only barrier preventing cross-scope data exposure.

### Pattern: Bound the Result Set

Any query that can return many records must have a clear bound through pagination, limit, filtering, date range, ownership scope, or another safe constraint.

Unbounded reads are production risks.

### Pattern: Transact Only the Consistent Unit

Use a transaction for the smallest set of database changes that must remain consistent together.

Do not hold transactions open across slow work, external calls, or user-facing delays.

### Pattern: Index for the Query You Have

An index should exist because a specific query, constraint, or access pattern needs it.

Do not add indexes speculatively or as a substitute for understanding the query.

---

## Common Mistakes

* Building SQL with string concatenation or interpolation.
* Trusting frontend filter or sort fields directly.
* Fetching by record ID without ownership scope.
* Loading all records on page load.
* Filtering large datasets in memory.
* Creating database clients inside request handlers.
* Manually opening and closing pooled connections.
* Running queries inside loops instead of batching or joining.
* Creating N+1 query patterns.
* Holding transactions open during external API calls.
* Adding indexes without knowing which query they support.
* Adding too many indexes and slowing writes.
* Ignoring composite index order.
* Using `SELECT *` for large or sensitive tables.
* Changing column meaning without a migration plan.
* Removing or weakening constraints without documenting why.
* Ignoring soft delete, audit fields, or tenant scope used elsewhere in the project.
* Treating admin or reporting queries as if datasets will always remain small.

---

## Stop and Ask If

Stop and ask before proceeding if:

* ownership or tenant scope is unclear
* the query needs raw SQL and safe parameterization is unclear
* the task requires schema changes but does not mention migrations
* the task appears to require destructive data changes
* existing naming or data access conventions are unclear
* a field’s meaning appears to be changing
* the data model conflicts with the requested behavior
* a query is likely to be expensive and there is no accepted performance strategy
* a new index is needed but the query pattern is unclear
* a transaction boundary is unclear
* sensitive data storage requirements are unclear
* encrypted column, hashing, masking, or retention behavior must be chosen and no project decision exists
* the secure data access path conflicts with existing implementation

When stopping, explain the database risk and ask the smallest necessary clarification.

---

## Related Skills

* `migrations.md`
* `performance.md`
* `data-modeling.md`
