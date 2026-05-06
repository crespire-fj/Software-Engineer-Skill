# Skill: Background Jobs

## When this applies

Load this skill when a task creates, modifies, removes, schedules, retries, or monitors background work.

This includes queues, workers, cron jobs, scheduled tasks, delayed jobs, batch processors, imports, exports, email sending, report generation, webhook retries, payment verification, file processing, analytics sync, and long-running workflows.

For performance and request-path decisions, also load `performance.md`.

For external providers, webhooks, payments, email, and storage, also load `external-integrations.md`.

For idempotent database writes and data integrity, also load `database.md`.

---

## Non-Negotiables

Violating these rules blocks completion.

1. Background jobs that can be retried must be idempotent or protected against duplicate effects.
2. A retried job must not create duplicate payments, subscriptions, emails, records, imports, exports, notifications, or state transitions.
3. Jobs that mutate protected data must enforce authorization, ownership, tenant, workspace, or system-scope rules appropriate to the job.
4. Do not move work into a background job to bypass validation, authorization, audit logging, or data integrity checks.
5. Jobs that call external services must handle timeout, failure, retry, and duplicate-response behavior explicitly.
6. Failed jobs must be visible through logs, status records, dead-letter handling, or another diagnosable failure path.
7. Scheduled jobs must not assume a single server instance unless the deployment guarantees it.
8. Job payloads must not contain secrets, raw credentials, full tokens, payment secrets, or unnecessary sensitive data.
9. Long-running jobs must define a clear batch size, chunk size, processing bound, or timeout boundary.
10. User-initiated long-running jobs must expose status to the user or operator.
11. Job processing must preserve the same business invariants as the synchronous workflow it replaces.

---

## Defaults

### Existing Job Pattern First

Follow the project’s existing queue, worker, scheduler, retry, and job-status patterns.

Do not introduce a second job system unless explicitly required and justified.

Use the existing logging, status, and operational conventions for jobs when available.

### When Work Belongs in a Job

Use background jobs for work that is slow, retryable, scheduled, batch-oriented, external-service dependent, or not required for the immediate user response.

Examples include email sending, PDF generation, report exports, file processing, imports, analytics aggregation, webhook retries, and external sync.

Do not move work to the background if the user must know the result immediately before continuing.

### Job Payloads

Job payloads should be small, stable, and safe.

Prefer passing identifiers and reloading current state inside the job instead of storing large or sensitive snapshots in the payload.

Include enough context for idempotency, ownership checks, and diagnostics without leaking sensitive data.

### Idempotency

Assume a job may run more than once.

Use unique job keys, idempotency keys, processed-event records, status guards, database constraints, or transaction checks to prevent duplicate effects.

Idempotency is mandatory for payments, subscription activation, imports, webhooks, notifications, and external side effects.

### Retries

Retries should be intentional.

Retry transient failures such as temporary network issues, rate limits, timeouts, and unavailable providers.

Do not blindly retry validation failures, authorization failures, malformed payloads, permanent business rule violations, or missing required data.

### Failure Handling

Failed jobs must be diagnosable.

Use logs, status tables, job dashboards, failure queues, dead-letter queues, or admin review flows according to project conventions.

A failed job should not disappear silently.

### Scheduling and Concurrency

Scheduled jobs must account for deployment topology.

If multiple app instances may run the same scheduler, use database locks, unique job identifiers, an external lock service, or infrastructure-level scheduling to prevent duplicate execution.

Concurrent workers must not corrupt shared state.

### Progress and User Feedback

Long-running user-initiated jobs should expose status to the user or operator.

Common states include queued, running, completed, failed, cancelled, and expired.

Do not leave users guessing whether an import, export, report, or processing task succeeded.

### External Side Effects

Jobs that send emails, call payment providers, upload files, post webhooks, or notify users need duplicate-send protection and safe retry behavior.

External side effects from jobs are higher risk than ordinary in-request calls because the user may no longer be present, retries may happen later, and failures can be harder to notice or cancel.

Use idempotency keys, provider references, status guards, processed-event records, or outbox-style tracking where appropriate.

External integration protocol details belong in `external-integrations.md`; this skill owns job execution safety.

---

## Patterns

### Pattern: Retry-Safe by Design

A background job should be safe to run again.

Repeated execution must not duplicate business effects or corrupt state.

### Pattern: Payloads Carry References, Not Secrets

Job payloads should usually contain IDs and safe metadata, not full sensitive objects, raw provider payloads, credentials, or large snapshots.

The job should reload current state from the trusted source when it runs.

### Pattern: Failures Must Surface

A background job failure is an operational event, not invisible implementation detail.

Failed work needs a diagnosable record and, where appropriate, a retry, dead-letter, or manual review path.

### Pattern: Queue Slow Work, Not Unsafe Work

Moving work out of a request path changes when it runs, not the rules it must follow.

Validation, authorization, data integrity, audit, and business invariants still apply.

### Pattern: Schedule Once, Execute Safely

Scheduled work must be safe in multi-instance deployments.

Use locks, unique keys, or infrastructure guarantees to avoid duplicate scheduled execution.

### Pattern: Bound Batch Work

Batch jobs should process work in bounded chunks.

Large jobs need batching, progress tracking, timeout awareness, and recovery behavior.

---

## Common Mistakes

* Creating jobs that send duplicate emails when retried.
* Activating a subscription twice because the same job or callback ran twice.
* Importing duplicate rows after a retry.
* Retrying permanent validation or business rule failures.
* Putting secrets or raw tokens in job payloads.
* Storing large snapshots in the queue instead of reloading current state.
* Running scheduled jobs on multiple instances without a lock or uniqueness guard.
* Moving work into a job and accidentally bypassing permission checks.
* Failing silently without logs, status records, or dead-letter handling.
* Running large batch jobs without chunking.
* Holding database transactions open across slow external calls.
* Assuming jobs run immediately.
* Assuming jobs run exactly once.
* Assuming job execution order is guaranteed when the queue does not guarantee it.
* Not exposing progress for long-running user-initiated work.
* Retrying external side effects without duplicate-send protection.
* Treating local worker behavior as representative of production scheduling.

---

## Stop and Ask If

Stop and ask before proceeding if:

* it is unclear whether work should run synchronously or in the background
* duplicate execution could cause harm and idempotency rules are unclear
* retry behavior is unclear
* failure handling or dead-letter behavior is unclear
* the job mutates protected data and ownership or authorization scope is unclear
* the job sends emails, payments, notifications, files, or external requests and duplicate-send behavior is unclear
* scheduling behavior is unclear in a multi-instance deployment
* job ordering, concurrency, or locking requirements are unclear
* long-running job progress or user feedback expectations are unclear
* the payload may include sensitive data and safe handling is unclear
* the job may process production-sized data and batching or resource limits are unclear
* moving the work to a job may change business behavior or user expectations

When stopping, explain the background-job risk and ask the smallest necessary clarification.

---

## Related Skills

* `performance.md`
* `external-integrations.md`
* `database.md`
* `observability.md`
* `security.md`
