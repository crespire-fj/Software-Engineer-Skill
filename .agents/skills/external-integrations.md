# Skill: External Integrations

## When this applies

Load this skill when a task adds, modifies, removes, or troubleshoots an integration with an external provider, third-party API, webhook, callback, payment gateway, email service, storage provider, OAuth provider, analytics service, AI provider, SMS provider, or partner system.

Also load this skill when changing provider credentials, callback URLs, API clients, SDK usage, provider payload handling, retry behavior, provider rate-limit behavior, or integration-specific configuration.

For secrets, environment variables, and dependency additions, also load `configuration.md`.

For webhook authenticity and idempotency, also load `security.md`.

For background retries or async processing, also load `background-jobs.md`.

For caching provider responses, also load `caching.md`.

---

## Non-Negotiables

Violating these rules blocks completion.

1. Provider secrets, API keys, OAuth secrets, webhook secrets, private keys, and tokens must never be committed, logged, or exposed to client-side code.
2. External callbacks and webhooks must verify provider authenticity before changing business state.
3. External callbacks and webhooks must be idempotent or protected against duplicate processing.
4. Do not trust provider payloads until their authenticity, shape, event type, and required fields are validated.
5. Do not scatter provider-specific API calls across unrelated modules. Use the project’s integration service, adapter, or client boundary.
6. Do not activate payments, subscriptions, account state, or privileged actions from an external event without verifying the event using the provider’s supported mechanism.
7. External calls must define explicit behavior for provider timeouts, failures, rate limits, retries, and duplicate responses. Unhandled failure modes are not acceptable.
8. Do not store raw provider payloads containing sensitive data unless explicitly required and protected.
9. Do not mix staging and production credentials, URLs, callback paths, or provider modes.
10. If provider behavior can affect billing, payments, authentication, authorization, data access, or user notifications, the failure and recovery behavior must be explicit.

---

## Defaults

### Existing Integration Pattern First

Follow the project’s existing provider integration patterns before introducing new clients, SDKs, adapters, or protocols.

Respect existing choices around service boundaries, configuration, logging, retries, provider payload storage, webhook handling, and error translation.

Do not introduce a second integration style unless explicitly required and justified.

### Adapter Boundary

External provider logic should live behind a project-approved service, adapter, gateway, or client wrapper.

Internal modules should depend on project-owned contracts, not raw provider SDKs or raw HTTP calls scattered throughout the system.

Provider-specific payloads should be translated into internal commands, events, or models at the boundary.

### Provider Configuration

Follow `configuration.md` for all provider credentials, secrets, and environment variables.

Integration-specific configuration must also cover provider modes, callback URLs, and webhook endpoints.

Do not mix staging and production values.

### Webhooks and Callbacks

Webhooks and callbacks must verify authenticity using the provider’s supported mechanism, such as signatures, HMACs, shared secrets, verification tokens, or signed payloads.

Validate event type, payload shape, required fields, timestamp or replay controls where supported, and event source before changing business state.

Return the response expected by the provider without exposing internal errors or secrets.

### Payments and Subscription Events

Payment and subscription integrations require extra caution.

Do not activate, extend, downgrade, refund, or cancel subscriptions solely because a client-side redirect or unverified callback says payment succeeded.

Use provider verification, transaction references, event IDs, idempotency guards, and internal status records.

### Retry and Rate-Limit Behavior

External calls should handle timeout, transient failure, provider downtime, rate limits, duplicate responses, and retry behavior intentionally.

Retry only when the operation is safe or protected against duplicate effects.

Do not blindly retry non-idempotent provider actions.

### Provider Payloads

Data modeling owns the rule that external payload shape must not become internal model shape by accident.

External integrations owns provider protocol behavior, required fields, event types, and provider-specific semantics.

Store only provider payload fields that are needed for audit, reconciliation, troubleshooting, or business rules.

### Provider-Specific Behaviors

Outbound communication providers need duplicate-send protection when retries are possible, consistent sender identity, safe template variables, and consent or unsubscribe behavior where required.

Storage integrations must preserve access rules, content type restrictions, file size rules, naming safety, and public/private boundaries.

Do not assume a provider resource is private because it is stored in a bucket, folder, queue, or provider account. Access policy must be explicit.

### Observability and Reconciliation

Critical integrations should be diagnosable.

Log safe provider references, request IDs, event IDs, status transitions, and failure categories where practical.

Payment, subscription, import, export, and notification integrations should support reconciliation between internal records and provider state where appropriate.

---

## Patterns

### Pattern: Wrap Providers Behind Project Contracts

Provider-specific APIs should be contained inside adapters, gateways, clients, or services.

The rest of the application should call project-owned contracts rather than depend directly on provider SDKs or payload shapes.

### Pattern: Verify Before Trusting

External events must be authenticated and validated before they can change internal state.

A callback reaching the correct URL is not proof that it is genuine.

### Pattern: Translate at the Boundary

Provider payloads should be translated into internal models, commands, events, or status records at the integration boundary.

Do not let provider terminology leak through the system unless it is intentionally part of the domain.

### Pattern: Retry Only When Safe

Retries must not duplicate charges, subscriptions, emails, files, imports, exports, or notifications.

Use idempotency, unique provider references, internal status guards, or job tracking before retrying external side effects.

### Pattern: Reconcile Critical State

For critical integrations, internal state should be reconcilable with provider state.

This is especially important for payments, subscriptions, storage, imports, exports, and account-linking flows.

### Pattern: Environment Separation Is Safety

Staging and production provider configuration must remain clearly separated.

Credentials, callback URLs, provider modes, and test data must not cross environments.

---

## Common Mistakes

* Calling provider SDKs directly from UI, controllers, or unrelated modules.
* Hardcoding provider URLs, keys, secrets, callback URLs, or modes.
* Mixing staging and production credentials or webhook URLs.
* Trusting a client-side redirect as proof of payment.
* Trusting a webhook because it reached the correct endpoint.
* Processing the same provider event more than once.
* Retrying non-idempotent provider actions and creating duplicate effects.
* Logging full provider payloads that contain secrets or sensitive data.
* Storing raw provider responses as internal truth without translation.
* Letting provider-specific status names leak into user-facing language.
* Ignoring provider rate limits or timeout behavior.
* Treating provider downtime as an unexpected edge case instead of a normal failure mode.
* Returning internal stack traces or secrets in webhook responses.
* Sending duplicate emails or notifications after retries.
* Assuming storage provider folders are private by default.
* Failing to reconcile payment, subscription, or notification state with provider records.
* Adding a new SDK when the existing HTTP client or adapter pattern is sufficient.

---

## Stop and Ask If

Stop and ask before proceeding if:

* provider authentication, signature, HMAC, token, or callback verification requirements are unclear
* staging vs production provider configuration is unclear
* the integration affects billing, payments, subscriptions, authentication, authorization, or sensitive data
* provider retry, timeout, rate-limit, or duplicate-response behavior is unclear
* the provider operation is non-idempotent and duplicate-effect protection is unclear
* the integration requires storing raw provider payloads and safe storage rules are unclear
* the mapping between provider payload and internal model is unclear
* a provider status value does not map cleanly to internal business state
* callback URL, redirect URL, webhook URL, or provider mode is unclear
* reconciliation behavior is required but internal records or provider references are unclear
* provider credentials or required environment variables are missing
* adding an SDK or dependency is requested but the need is unclear
* the provider’s behavior conflicts with existing module contracts or business rules

When stopping, explain the integration risk and ask the smallest necessary clarification.

---

## Related Skills

* `security.md`
* `configuration.md`
* `background-jobs.md`
* `caching.md`
* `data-modeling.md`
* `observability.md`
