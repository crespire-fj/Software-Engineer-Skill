# Skill: Performance

## When this applies

Load this skill when a task touches slow pages, heavy dashboards, large lists, high-traffic endpoints, scalability, latency, throughput, expensive workflows, N+1 symptoms, repeated API calls, timeouts, resource usage, or production load concerns.

Also load this skill when adding reporting, analytics, exports, imports, background processing, caching, pagination, rate limiting, or performance-sensitive integrations.

For query-level database design, also load `database.md`.

For UI rendering, re-render behavior, virtualization, and frontend interaction performance, also load `ui-components.md`.

For caching behavior, also load `caching.md`.

---

## Non-Negotiables

Violating these rules blocks completion.

1. Do not load unbounded datasets into memory for user-facing pages, admin screens, reports, or APIs.
2. List, search, reporting, and admin views that can grow must use pagination, filters, limits, streaming, batching, or another explicit bound.
3. Do not introduce repeated database queries, API calls, or external calls inside loops without a batching, joining, caching, or concurrency strategy.
4. Do not add slow, retryable, external-service-dependent, or non-immediate work to synchronous request paths when it can be deferred, queued, or processed asynchronously.
5. Do not solve performance problems by bypassing authorization, validation, data ownership checks, or audit requirements.
6. Do not add caching as a performance fix without following `caching.md`.
7. Performance-sensitive changes must preserve correctness, security, and data integrity.
8. If a change may significantly increase database load, API latency, memory use, external API cost, or request volume, measure or estimate the impact before finalizing.

---

## Defaults

### Correctness Before Optimization

Performance improvements must not weaken correctness, security, data integrity, or maintainability.

Fix obvious design problems before adding complex optimization layers.

Do not use performance as a reason to skip permission checks, validation, logging, or safe data scoping.

### Existing Performance Patterns First

Follow the project’s existing patterns for pagination, filtering, caching, batching, background jobs, streaming, lazy loading, and reporting.

Do not introduce a new performance architecture during a small feature task unless explicitly required and justified.

Performance work should use the project’s existing tools, patterns, and infrastructure. Introducing new caching layers, queuing systems, or infrastructure requires clear justification and usually an ADR.

### Bound Work

Any operation that may grow with users, records, files, tenants, workspaces, or time must have a bound.

Bounds may include pagination, page size limits, date ranges, ownership scope, search filters, batching, streaming, queueing, or explicit maximum input sizes.

### Database Load

Performance owns the system impact of database work. `database.md` owns query mechanics.

Watch for N+1 patterns, unbounded joins, repeated queries, large table scans, missing pagination, expensive aggregates, and dashboard queries that run on every page load.

### API and External Calls

Avoid repeated network calls when one batched request, joined request, or cached result can safely satisfy the use case.

External API calls should consider latency, rate limits, retry behavior, cost, and failure modes.

### Request/Response Paths

Keep user-facing request paths reasonably fast and predictable.

Slow, retryable, expensive, scheduled, or non-immediate work should usually move to a background job, queue, batch process, or async workflow.

### Dashboards, Reports, and Analytics

Dashboard and analytics features must not run expensive global aggregations on every page load.

Prefer precomputed summaries, cached aggregates, filtered date ranges, and paginated results.

Query design belongs in `database.md`; this skill owns the load strategy.

### Measurement

Optimize based on evidence where practical.

Use available logs, metrics, traces, query plans, timings, database diagnostics, browser profiling, or controlled estimates.

Do not assume the slowest-looking code is the actual bottleneck without checking.

### Resource Limits

Consider memory, CPU, database connections, file size, payload size, third-party API limits, hosting limits, and concurrency.

Performance work should fit the deployment environment, not only the local development machine.

---

## Patterns

### Pattern: Bound the Work

Every growing operation needs a limit, page, filter, batch size, stream, queue, or explicit maximum.

Unbounded work becomes a production risk as data grows.

### Pattern: Measure Before Complexity

Prefer simple, evidence-based improvements before adding caching, queues, new infrastructure, or broad refactors.

Measurement can be direct metrics, query plans, logs, profiling, or a reasoned estimate when tooling is limited.

### Pattern: Move Slow Work Out of the Request

If work is slow, retryable, scheduled, external-service dependent, or not required for the immediate response, move it out of the synchronous request path.

Use queues, jobs, batching, streaming, or progressive processing where appropriate.

### Pattern: Optimize the Whole Path

Performance is usually a path problem, not a single-line problem.

Consider database queries, API shape, serialization, network payload, frontend rendering, external calls, and deployment limits together.

### Pattern: Scale the Common Case

Optimize for the flows users hit most often and the operations most likely to grow.

Do not over-optimize rare paths while common paths remain slow or fragile.

### Pattern: Performance Must Preserve Safety

A faster path that skips validation, authorization, ownership scope, audit logging, or error handling is not an acceptable optimization.

---

## Common Mistakes

* Loading all records and filtering in memory.
* Building admin pages that fetch every row on page load.
* Running dashboard-wide aggregate queries on every request.
* Creating N+1 database query patterns.
* Making API calls inside loops instead of batching.
* Returning oversized payloads with fields the UI does not need.
* Adding caching before fixing an inefficient query or missing bound.
* Adding background jobs without idempotency or retry rules.
* Holding database transactions open during slow work.
* Running large exports synchronously in a web request.
* Recomputing expensive summaries every page load.
* Ignoring database connection limits, hosting limits, or third-party rate limits.
* Optimizing based on guesswork when logs or timings are available.
* Adding large dependencies for small performance improvements.
* Improving one layer while the bottleneck is somewhere else.
* Skipping security checks to reduce latency.
* Treating local development performance as representative of production.

---

## Stop and Ask If

Stop and ask before proceeding if:

* expected data volume, user volume, or concurrency is unclear and affects the design
* the task may significantly increase database load, memory use, API latency, external API cost, or request volume
* an operation may need pagination, batching, streaming, queueing, or background processing but the expected behavior is unclear
* a dashboard, report, export, or analytics feature needs metrics definitions or date ranges that are unclear
* performance requirements conflict with security, validation, audit, or data integrity requirements
* a proposed optimization requires new infrastructure, caching, queues, or major refactoring
* the bottleneck is unknown and measurement is possible but has not been done
* hosting or deployment limits are relevant but unknown
* external provider rate limits, pricing, or latency may affect the design
* a performance change may alter API contracts, UI behavior, or user expectations

When stopping, explain the performance risk and ask the smallest necessary clarification.

---

## Related Skills

* `database.md`
* `caching.md`
* `ui-components.md`
* `background-jobs.md`
* `observability.md`
