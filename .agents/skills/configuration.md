# Skill: Configuration

## When this applies

Load this skill when a task adds, modifies, removes, or relies on configuration.

This includes environment variables, `.env.example`, secrets, runtime settings, feature flags, build configuration, deployment settings, third-party credentials, dependency additions, package updates, and framework configuration files.

Also load this skill when a task changes how the application connects to databases, email, payments, storage, authentication providers, analytics, queues, external APIs, or AI services.

For secrets and sensitive data handling, also load `security.md`.

For deployment behavior, also load `documentation.md` when setup or hosting instructions must change.

---

## Non-Negotiables

Violating these rules blocks completion.

1. Never commit real secrets, credentials, tokens, private keys, production `.env` files, or provider secrets.
2. Never expose server-only secrets to client-side code.
3. New, changed, or removed environment variables must be reflected in `.env.example` using safe placeholder values.
4. Do not hardcode environment-specific values in application code when configuration should control them.
5. Do not add a new dependency without clear justification.
6. Do not introduce duplicate dependencies that solve the same problem unless explicitly justified.
7. Do not change production-impacting configuration defaults silently.
8. Do not remove existing configuration values without checking whether they are still used.
9. If a configuration value affects security, billing, payments, authentication, authorization, storage, or external integrations, the safe default must be explicit.

---

## Defaults

### Existing Configuration Pattern First

Follow the project’s existing configuration structure and naming conventions.

Respect existing choices around `.env` naming, config modules, validation libraries, deployment-specific overrides, feature flags, and secret handling.

Configuration names should be clear, consistent with project convention, and specific enough to identify the provider, purpose, and environment scope.

Do not introduce a second configuration system unless explicitly required and justified.

### Environment Variables

Environment variables should be grouped and named consistently.

Use clear prefixes or categories where the project already does so, such as database, authentication, email, payments, storage, logging, or external provider settings.

Keep `.env.example` safe, current, and useful for setup.

### Secrets

Secrets belong in approved environment variables, secret managers, hosting provider secret stores, or deployment configuration.

Do not place secrets in source code, documentation, screenshots, seed files, tests, logs, build output, or client-visible bundles.

If a value must be public, name it clearly using the project’s convention for public configuration.

### Client-Side Configuration

Only expose configuration to the frontend when the value is intentionally public and safe.

Assume anything shipped to the browser can be viewed by users.

Do not expose server API keys, payment secrets, database credentials, SMTP passwords, private endpoints, signing secrets, or privileged tokens.

### Config Validation

Required configuration values must be validated at startup.

If a required value is missing, fail immediately with a clear error rather than allowing the application to start in a broken or unsafe state.

Use safe defaults only when the default behavior is secure and obvious.

### Feature Flags

Feature flags should have clear names, safe defaults, and documented behavior.

Flags that affect permissions, billing, subscriptions, payments, or data visibility require extra care and should not be treated as simple UI toggles.

### Dependency Policy and Package Updates

Prefer existing project dependencies and built-in platform capabilities before adding new libraries.

Before adding a dependency, consider maintenance status, license, security history, bundle size, transitive dependency weight, overlap with existing dependencies, and whether the dependency is needed at runtime or only during development.

Document major dependency choices with an ADR when they affect architecture, security, deployment, or long-term maintenance.

Package updates should be scoped and intentional. Avoid large unrelated dependency upgrades during feature work unless required for security, compatibility, or the requested change.

Check for breaking changes when updating major versions.

### Provider Configuration

Third-party provider configuration should be explicit and environment-aware.

Examples include connection strings, API keys, webhook secrets, OAuth credentials, storage configuration, and provider-specific endpoints.

Do not mix staging and production credentials.

### Operational Defaults

Defaults should be safe for the environment where they run.

Development convenience defaults must not weaken production behavior.

Production-sensitive settings such as debug mode, logging level, cookie security, CORS, CSRF, rate limits, callback URLs, and payment mode must be reviewed carefully.

---

## Patterns

### Pattern: Configuration Is a Contract

Configuration is part of the application contract.

When a variable is added, changed, renamed, or removed, update `.env.example`, setup documentation, deployment notes, and any validation logic that depends on it.

### Pattern: Secrets Stay Server-Side

A value that grants privileged access must stay on the server side.

Client-visible configuration must be treated as public information.

### Pattern: Safe Defaults First

When configuration is missing or ambiguous, the default should fail closed or disable risky behavior rather than silently enabling insecure behavior.

Security-sensitive, payment-sensitive, and data-sensitive features should not activate accidentally.

### Pattern: One Setting, One Meaning

Each configuration value should have one clear responsibility.

Avoid overlapping variables where it is unclear which one wins.

### Pattern: Dependencies Must Earn Their Place

A dependency should solve a real problem better than the existing stack.

Do not add packages for small tasks that can be handled clearly with existing code or platform features.

---

## Common Mistakes

* Committing real `.env` files or secrets.
* Putting server secrets in frontend-exposed variables.
* Adding environment variables without updating `.env.example`.
* Hardcoding URLs, credentials, callback paths, or provider modes in code.
* Mixing staging and production credentials.
* Leaving debug mode, verbose logging, or unsafe CORS enabled in production.
* Adding dependencies that duplicate existing packages.
* Upgrading many unrelated packages during a small feature task.
* Ignoring breaking changes during major dependency updates.
* Keeping stale feature flags forever.
* Using unclear variable names such as `KEY`, `SECRET`, or `URL` without provider or purpose.
* Allowing missing configuration to fail later in a user-facing flow instead of failing early.
* Documenting real credentials in README files, issue notes, or examples.
* Changing payment, email, storage, or authentication configuration without checking environment-specific behavior.
* Assuming a frontend variable is private because it is stored in an environment file.

---

## Stop and Ask If

Stop and ask before proceeding if:

* a required configuration value is missing and no safe default exists
* it is unclear whether a value is server-only or safe to expose publicly
* staging and production behavior may differ and the target environment is unclear
* a configuration change affects authentication, authorization, payments, billing, storage, or external integrations
* a dependency addition is requested but the need is unclear
* a dependency has licensing, maintenance, size, or security concerns
* a major package update may introduce breaking changes
* a feature flag affects permissions, billing, subscriptions, or data visibility and the intended behavior is unclear
* configuration names or ownership are unclear
* existing configuration appears unused but removal impact is unclear
* the task requires changing production-impacting defaults without explicit approval

When stopping, explain the configuration risk and ask the smallest necessary clarification.

---

## Related Skills

* `security.md`
* `documentation.md`
* `external-integrations.md`
* `observability.md`
