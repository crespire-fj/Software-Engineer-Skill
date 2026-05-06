# Skill: Observability

## When this applies

Load this skill when a task adds, modifies, removes, or relies on logging, metrics, traces, audit logs, health checks, monitoring, alerting, diagnostics, production debugging, request correlation, or operational visibility.

Also load this skill when changing critical flows such as authentication, authorization, payments, subscriptions, webhooks, background jobs, imports, exports, admin actions, file processing, caching, external integrations, or error handling.

For sensitive data and what must never be logged, also load `security.md`.

For API error response behavior, also load `api-design.md`.

For background job failures, also load `background-jobs.md`.

---

## Non-Negotiables

Violating these rules blocks completion.

1. Critical flows must have enough safe diagnostic information to investigate production failures.
2. Logs, metrics, traces, and audit records must not contain secrets, passwords, full tokens, private keys, payment secrets, or sensitive personal data.
3. Authentication, authorization, payment, subscription, webhook, admin, import, export, and background job failures must not disappear silently.
4. Security-sensitive and financial state changes must be auditable where the project supports audit logging.
5. External integration failures must record safe provider references, status, and failure category where available.
6. Background job failures must be visible through logs, status records, dead-letter handling, or another diagnosable failure path.
7. Correlation or request identifiers must be preserved across service boundaries where the project has an established pattern.
8. Do not expose internal diagnostic details, stack traces, provider secrets, or raw logs to end users.
9. Do not log at high volume in hot paths without a clear diagnostic purpose. Prefer structured, queryable fields over raw message strings for important events.
10. If a critical flow cannot be diagnosed after failure, add or update safe observability before considering the task complete.

---

## Defaults

### Existing Observability Pattern First

Follow the project’s existing logging, metrics, tracing, audit, health check, alerting, and correlation ID patterns.

Do not introduce a second observability stack unless explicitly required and justified.

Use the existing logger, telemetry client, audit service, or monitoring conventions when available.

### Structured Logging

Prefer structured logs over unstructured message strings for important events.

Useful fields may include event name, module, action, status, request ID, correlation ID, safe user or workspace identifier, safe provider reference, duration, and failure category.

Keep log fields stable enough to search, filter, and aggregate.

### Correlation IDs

Correlation IDs help connect related events across API requests, background jobs, external callbacks, and internal service calls.

Preserve existing correlation IDs where provided and generate one at the boundary when the project pattern supports it.

Do not use sensitive values as correlation IDs.

### Critical Flow Logging

Critical flows should log safe start, success, failure, and important state-transition events where practical.

Examples include login attempts, password reset, role changes, permission changes, payment callbacks, subscription updates, admin approvals, imports, exports, file processing, and external provider callbacks.

Logs should support investigation without exposing sensitive data.

### Audit Logging

Audit logs are for accountability, not general debugging.

Use audit logs for sensitive user, admin, financial, permission, configuration, and data-access events where the project supports them.

Audit records should capture who acted, what action occurred, what target was affected, when it happened, safe contextual details, and, where applicable, the previous and new state of the affected record.

### Metrics

Metrics should help detect trends and operational failures.

Useful metrics may include request latency, error rate, throughput, job failure count, queue depth, cache hit rate, external provider failure count, payment callback failures, and import/export duration.

Use metrics for aggregate behavior, not sensitive event payloads.

### Tracing

Tracing is useful when a request crosses multiple services, jobs, providers, or internal modules.

Use tracing to understand slow or failing paths when the project has tracing support.

Do not add tracing payloads that contain secrets or sensitive data.

### Health Checks

Health checks should reflect meaningful system readiness or liveness.

Do not expose detailed internal system information publicly.

Health checks that include dependencies should fail safely and avoid leaking credentials, connection strings, or provider internals.

### Error Diagnostics

Unexpected errors should be logged with safe technical context.

User-facing errors should remain safe and generic where needed.

API response shape belongs in `api-design.md`; observability owns the internal diagnostic record.

### Noise Control

Logs and metrics should be useful.

Avoid high-volume low-value logs in hot paths.

Use appropriate levels such as debug, info, warning, error, or critical according to project convention.

---

## Patterns

### Pattern: Diagnose Without Leaking

Observability should make failures understandable without exposing secrets, sensitive data, or internal implementation details to users.

Safe diagnostics are useful; unsafe diagnostics are vulnerabilities.

### Pattern: Correlate the Path

A single user action may cross APIs, jobs, databases, providers, and callbacks.

Correlation IDs or equivalent request context should connect those events where the project supports it.

### Pattern: Critical Events Leave Trails

Important business and security events should leave searchable, safe records.

If a payment, subscription, role change, admin action, or import fails, operators should be able to understand what happened.

### Pattern: Audit Accountability Separately

Audit logs answer who did what, to which target, and when.

Do not treat ordinary debug logs as a substitute for audit records on sensitive actions.

### Pattern: Measure What Can Break

Metrics should cover the parts of the system that users, operators, or business workflows depend on.

Latency, error rate, throughput, queue depth, provider failures, and cache behavior are often more useful than raw log volume.

### Pattern: Silence Is a Bug

Critical failures that disappear without logs, status records, alerts, or review paths are production defects.

If the system cannot explain a failure, observability is incomplete.

---

## Common Mistakes

* Logging secrets, tokens, credentials, raw authentication headers, or password reset tokens.
* Logging full provider payloads that contain sensitive data.
* Logging sensitive personal data when a safe identifier would be enough.
* Returning stack traces or raw logs to users.
* Using plain text logs that are hard to search for important events.
* Creating noisy logs that hide real failures.
* Logging only success paths and not failures.
* Failing background jobs silently.
* Losing correlation ID context when moving from request to job or callback.
* Treating audit logs and debug logs as interchangeable.
* Adding metrics that cannot inform an operational decision.
* Exposing health checks with detailed internal dependency information.
* Logging provider failures without safe provider reference IDs.
* Failing to log payment, subscription, webhook, or admin state transitions.
* Relying on users to report failures because the system has no diagnostics.
* Adding observability after production incidents instead of during critical flow implementation.

---

## Stop and Ask If

Stop and ask before proceeding if:

* the task changes a critical flow and the expected diagnostic trail is unclear
* audit requirements are unclear for a sensitive action
* it is unclear whether a value is safe to log
* correlation ID behavior is unclear across requests, jobs, or provider callbacks
* failure handling exists but operators would not be able to diagnose the failure
* metrics or alerts are required but the target signal is unclear
* health check exposure or dependency detail is unclear
* provider references are needed for troubleshooting but safe fields are unclear
* logging volume may become high enough to affect cost, performance, or signal quality
* production debugging requires sensitive data and no safe redaction strategy exists
* observability changes may expose internal details to users or public endpoints

When stopping, explain the observability risk and ask the smallest necessary clarification.

---

## Related Skills

* `security.md`
* `api-design.md`
* `background-jobs.md`
* `external-integrations.md`
* `performance.md`
* `caching.md`
