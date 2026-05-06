# Skill: API Design

## When this applies

Load this skill when a task creates, modifies, removes, or consumes an API endpoint, route, controller action, server action, RPC method, webhook endpoint, or public service contract.

Also load this skill when changing request shape, response shape, error handling, pagination, filtering, sorting, versioning, idempotency, or endpoint naming.

For authorization, input validation, and abuse controls, also load `security.md`.

For DTOs, response models, entity exposure, and over-posting concerns, also load `data-modeling.md`.

---

## Non-Negotiables

Violating these rules blocks completion.

1. Do not silently change an existing API contract.
2. New or changed endpoints must enforce server-side authorization where required.
3. New or changed endpoints must validate request input server-side.
4. Do not expose database entities directly unless this is an intentional and documented project pattern.
5. Do not return secrets, tokens, private implementation details, or sensitive internal fields in API responses.
6. Mutations that can cause duplicate business effects must be idempotent or explicitly protected against duplicate submission.
7. List endpoints that can grow must support pagination, limits, or another explicit bound.
8. Error responses must be user-safe and must not expose stack traces, SQL errors, file paths, provider secrets, or internal implementation details.
9. Do not introduce a second API response style unless explicitly required and justified.
10. If a public contract changes, update consumers, tests, and documentation.

---

## Defaults

### Existing API Style First

Follow the project’s existing API conventions before introducing new patterns.

Respect existing route naming, HTTP method usage, response shape, error format, authentication mechanism, pagination model, and controller or handler structure.

Do not standardize the whole API as part of a feature task unless explicitly requested.

### Endpoint Responsibility

An endpoint should coordinate request handling, validation, authorization, service calls, response shaping, and error translation.

Avoid placing complex business logic directly inside controllers, route handlers, or server actions when the project has service or domain layers.

### Route and Method Design

Use predictable route names and HTTP methods consistent with the project’s existing API.

Common defaults are `GET` for retrieval, `POST` for creation or non-idempotent actions, `PUT` or `PATCH` for updates, and `DELETE` for removal, archiving, disabling, or deactivation.

Project conventions take precedence when they differ.

### Request Shape

Request bodies should accept only fields the operation needs.

Avoid accepting full database entities or broad objects that allow over-posting.

Use explicit request models, DTOs, schemas, or validators where the project supports them.

### Response Shape

Responses should be consistent with the project’s existing API response style.

Shape responses for the client use case rather than leaking internal database structures.

Avoid returning fields that are not needed by the caller, especially sensitive, internal, audit, or security-related fields.

### Error Handling

Expected errors should be translated into consistent, user-safe responses.

Examples include validation errors, unauthorized errors, forbidden errors, not-found errors, conflicts, duplicate submissions, and business rule violations.

Unexpected errors should be logged safely and returned as generic user-safe responses.

Security owns what must not leak. Observability owns how errors are logged.

### Pagination, Filtering, and Sorting

List endpoints that can grow should support pagination or another explicit bound.

Filtering and sorting should validate allowed fields server-side.

Do not pass arbitrary client-provided sort, filter, or search fragments directly into database queries.

### Idempotency

Use idempotency keys, unique request references, processed-event tables, transaction guards, or equivalent protections when duplicate submissions can cause harm.

This is especially important for payments, subscription changes, imports, exports, order creation, account actions, webhook processing, and email-triggering mutations.

### Versioning and Compatibility

Avoid breaking existing clients without an intentional versioning or migration plan.

Public APIs require clear backward compatibility handling.

Internal APIs should still avoid silent breaking changes when multiple screens, modules, jobs, or integrations depend on them.

---

## Patterns

### Pattern: Contract First

An API endpoint is a contract between producer and consumer.

Changing request shape, response shape, status behavior, or error behavior requires checking consumers, tests, and documentation.

### Pattern: Thin Boundary, Strong Service

API handlers should stay thin and delegate business workflow to the appropriate service, module, or domain layer.

The endpoint coordinates the request; the service owns the business rule.

### Pattern: Explicit Input, Shaped Output

Accept only the fields needed for the operation and return only the fields needed by the caller.

Do not let database shape become the API shape by accident.

### Pattern: Bound Every List

Any list endpoint that can grow must have a clear bound through pagination, limit, ownership scope, date range, or another safe constraint.

Unbounded list endpoints become production risks.

### Pattern: Make Dangerous Mutations Repeat-Safe

If repeating the same request can create duplicate business effects, the endpoint needs idempotency or duplicate-submission protection.

This is required for state-changing flows with external systems, retries, callbacks, or user resubmission risk.

### Pattern: Translate Errors at the Boundary

The API boundary should translate validation failures, authorization failures, not-found states, conflicts, and unexpected exceptions into the project’s standard safe response format.

Internal errors should not leak to clients.

---

## Common Mistakes

* Changing a response shape without checking consumers.
* Adding an endpoint that bypasses an existing service layer.
* Treating authentication as authorization.
* Validating request input only in the frontend.
* Returning database entities directly by accident.
* Accepting full entity objects from clients and enabling over-posting.
* Returning internal fields, secrets, tokens, or provider details.
* Creating unbounded list endpoints.
* Passing arbitrary sort or filter fields directly to the database.
* Returning stack traces, SQL errors, or raw provider errors to clients.
* Using `POST` for everything without project convention or reason.
* Creating inconsistent response shapes for similar endpoints.
* Forgetting idempotency for payment, webhook, import, or email-triggering endpoints.
* Adding a new API style during a small feature change.
* Breaking internal API consumers because the endpoint was assumed to have no callers.
* Failing to update API documentation or tests after contract changes.

---

## Stop and Ask If

Stop and ask before proceeding if:

* the endpoint’s consumer is unclear
* backward compatibility requirements are unclear
* versioning requirements are unclear
* the API response shape conflicts with existing conventions
* the request shape could allow over-posting
* required authorization behavior is unclear
* duplicate submission could cause harm and idempotency rules are unclear
* list size may grow and pagination or bounding behavior is unspecified
* the endpoint changes payment, subscription, authentication, authorization, or admin behavior
* the change may break an existing screen, job, integration, or public client
* a public API versioning decision is required
* the task requires replacing an existing API style with a new one

When stopping, explain the API contract risk and ask the smallest necessary clarification.

---

## Related Skills

* `security.md`
* `data-modeling.md`
* `external-integrations.md`
