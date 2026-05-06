# Skill: Security

## When this applies

Load this skill when a task touches authentication, authorization, roles, permissions, user input, public forms, admin actions, file uploads, sensitive data, API endpoints, webhooks, external callbacks, or any operation that reads or changes protected data.

Security is cross-cutting. If unsure whether this skill applies, load it.

This skill is a baseline skill and should be loaded for all non-trivial tasks.

---

## Non-Negotiables

Violating these rules blocks completion.

1. Authorization must be enforced server-side. Frontend hiding is never sufficient.
2. Authentication is not authorization. A logged-in user is not automatically allowed to perform an action.
3. Server-side input validation is required for all user-controlled data.
4. Client-side validation is for user experience only and must not be trusted.
5. Never log secrets, passwords, tokens, private keys, payment secrets, or sensitive personal data.
6. Never commit secrets, production `.env` files, credentials, tokens, or private keys.
7. SQL must be parameterized or use ORM-safe/query-builder-safe methods. Do not interpolate user input into SQL.
8. Admin actions require explicit server-side permission checks.
9. Workspace, tenant, organization, or user-owned data must always be scoped to the current user’s authorized access.
10. Authentication, authorization, permission, and ownership behavior must not change silently.
11. Public forms and unauthenticated endpoints must include server-side validation and rate limiting at minimum.
12. File uploads must validate file size, type, extension, storage path, and access rules server-side.
13. Webhooks and external callbacks must be verified and processed idempotently.
14. Do not expose stack traces, SQL errors, file paths, secrets, or internal implementation details to users.
15. If permission behavior, ownership, or sensitive data handling is unclear, stop and ask.

---

## Defaults

### Authentication and Authorization

Use the project’s existing authentication and authorization patterns. Do not introduce a new authentication mechanism unless explicitly required and justified.

Authorization must be checked near the protected operation, usually in the API, service, policy, guard, middleware, or domain layer. UI checks may hide unavailable actions, but the server must still enforce the rule.

RBAC and permission logic should be explicit, centralized where practical, and consistent across the project. Avoid duplicating permission checks across unrelated files.

### Ownership and Data Scope

For multi-user, tenant, organization, or workspace-based systems, every protected read or write must enforce ownership scope. Do not fetch or mutate by record ID alone when the record belongs to a user, workspace, tenant, or organization.

A safe operation checks both authentication and authorization for the target record’s scope.

### Input Validation

Validate all user-controlled data server-side before using it in database queries, shell commands, file paths, templates, redirects, external APIs, or business workflows.

Validation should cover required fields, type, length, allowed values, ranges, ownership references, file constraints, and business rules.

Reject invalid input before side effects and return a consistent user-safe error.

### Public Forms and Abuse Protection

Public forms and unauthenticated endpoints must include server-side validation and rate limiting at minimum.

Add honeypot fields, CAPTCHA or equivalent challenges, duplicate submission controls, content limits, and abuse monitoring when the endpoint is exposed to spam, automation, account enumeration, payment abuse, or high-volume submission risk.

Do not rely only on CAPTCHA. Do not reveal detailed spam-detection reasons to attackers.

### SQL Injection Prevention

Use ORM-safe methods, query builders with bound parameters, parameterized SQL, or stored procedures with safe parameters.

Raw SQL is allowed only when necessary, reviewed, and fully parameterized.

### XSS and Unsafe Rendering

Use framework-safe rendering patterns. Escape or sanitize user-generated content before rendering.

Do not render raw user HTML unless sanitized and intentionally supported. Validate user-controlled URLs and reject unsafe protocols such as `javascript:`.

### CSRF Protection

For cookie-based authentication, all state-changing requests must use the project’s CSRF protection pattern. Reject state-changing requests that do not satisfy that protection.

For token-based APIs, follow the project’s existing token-handling pattern and do not expose tokens through logs, URLs, or unsafe storage.

### File Upload Security

Validate uploads server-side for size, allowed extension, allowed MIME type, safe storage name, storage path, and access rules.

Do not trust the original file name. Prevent path traversal and executable uploads. Do not expose internal server paths. Do not store production uploads in deployment-cleared folders unless intentionally temporary.

### Secrets and Configuration

Store secrets in approved environment variables or secret-management systems. Keep `.env.example` updated with placeholder values when configuration changes.

Only expose variables to the frontend when they are intentionally public and safe.

### Logging and Error Safety

Security owns what must never be logged or exposed. Observability owns what should be logged and how.

Never log passwords, full tokens, private keys, payment secrets, full card details, authentication headers, password reset tokens, sensitive personal data, raw uploaded file contents, or webhook secrets.

Never expose stack traces, SQL errors, ORM errors, file paths, internal service names, secrets, tokens, webhook validation details, or implementation details to users.

### Webhooks and External Callbacks

Security owns webhook authenticity and idempotency rules. External integration design belongs in `external-integrations.md`.

Verify provider signatures, tokens, HMACs, shared secrets, or provider-supported authenticity mechanisms. Validate payload shape and event type. Process callbacks idempotently and handle retries without duplicating business effects.

---

## Patterns

### Pattern: Server-Enforced Access

Every protected action must be authorized on the server at the point where the action is performed.

UI hiding, route hiding, disabled buttons, and client-side checks may improve user experience, but they do not provide security.

### Pattern: Scope Every Protected Record

Any read or write involving user-owned, workspace-owned, tenant-owned, or organization-owned data must include the relevant ownership scope.

A record ID alone is not enough to prove access.

### Pattern: Validate Before Side Effects

User-controlled input must be validated before it can trigger persistence, state changes, privileged actions, redirects, external calls, file writes, or notifications.

The important security boundary is not only whether validation exists, but whether it happens before the system does anything meaningful with the input.

### Pattern: Public Entry Points Need Abuse Controls

Unauthenticated forms and public endpoints must be designed as abuse targets by default.

Use validation, rate limiting, and additional controls such as honeypots, CAPTCHA or equivalent challenges, content limits, and duplicate submission handling according to risk.

### Pattern: Verify External Events Before Acting

Webhooks and callbacks must be authenticated, validated, and deduplicated before they change business state.

Never trust an external event only because it reached the correct URL.

### Pattern: Fail Safely Without Leaking Internals

Security failures should deny access, avoid side effects, and return safe messages.

Logs may capture safe diagnostic context, but user-facing responses must not reveal stack traces, SQL errors, secrets, tokens, file paths, or implementation details.

---

## Common Mistakes

* Treating login as sufficient permission.
* Relying on hidden UI controls for authorization.
* Validating input only in the frontend.
* Fetching records by ID without checking ownership scope.
* Adding admin routes without explicit admin checks.
* Admin pages fetching or exposing more data than needed.
* Logging tokens, credentials, raw provider callbacks, or password reset tokens.
* Returning stack traces or SQL errors to users.
* Accepting webhook payloads without verification.
* Processing duplicate webhooks more than once.
* Interpolating user input into SQL.
* Allowing over-posting by accepting full entity objects from clients.
* Forgetting rate limits on public endpoints.
* Treating CAPTCHA as the only spam protection.
* Trusting uploaded file names or MIME types without validation.
* Exposing internal storage paths.
* Hardcoding secrets into source code.
* Changing permission behavior without documentation or tests.
* Forgetting CSRF protection on cookie-authenticated state-changing requests.
* Exposing tokens in URLs, logs, or client-visible errors.

---

## Stop and Ask If

Stop and ask before proceeding if:

* required permission behavior is unclear
* role or ownership rules are unclear
* data scope is unclear
* the task may expose data across users, workspaces, tenants, or organizations
* the task changes authentication behavior
* the task changes authorization behavior
* the task changes admin capabilities
* the task changes payment, subscription, or plan-gating behavior
* the task requires handling sensitive data without clear rules
* webhook verification requirements are unclear
* public form abuse controls are unspecified and the endpoint is high risk
* the task requires storing or exposing uploaded files without clear access rules
* the existing implementation conflicts with documented security expectations
* the secure approach requires a broader architectural change than requested

When stopping, explain the security risk and ask the smallest necessary clarification.

---

## Related Skills

* `api-design.md`
* `data-modeling.md`
* `external-integrations.md`


