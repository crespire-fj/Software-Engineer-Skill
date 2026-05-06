<!--
  Module README Template

  Use this template for major modules, feature areas, or business capabilities.

  Store the completed README inside the relevant module folder as README.md.

  Keep this document concise and accurate. It should help a developer or agent understand the module before changing it.

  Do not turn this file into a full implementation manual. Document purpose, contracts, invariants, ownership, security rules, gotchas, and test expectations.
-->

# Module Name

## Purpose

Describe what this module is responsible for.

Include the business capability, user workflow, or system responsibility it owns.

Keep this section short enough that a developer or agent can quickly understand why the module exists.

## Public Contracts

List the contracts other parts of the system may rely on.

Examples:

* API routes or controller actions
* services or service methods
* exported functions or classes
* UI components
* events or messages
* background jobs
* DTOs, request models, or response models
* configuration keys
* database tables or views owned by this module

For each contract, briefly state what it exposes and who consumes it.

## Dependencies

List what this module depends on.

Examples:

* internal modules
* shared services
* database tables owned by other modules
* external providers
* environment variables
* background jobs
* queues
* permissions or roles
* feature flags

Avoid vague dependency lists. Include only dependencies that matter for changing or understanding this module.

## Invariants

List rules that must always remain true.

Examples:

* a user must belong to a workspace before accessing workspace data
* a payment event must not be processed twice
* a free plan must not access premium-only features unless explicitly allowed
* a soft-deleted record must not appear in normal user-facing lists
* a module-owned record must not be mutated outside the owning module’s service

Invariants are the most important part of this README. Keep them accurate.

## Data Ownership

Describe what data this module owns.

Include:

* primary tables, collections, or entities owned by the module
* important fields or status values
* data this module only reads from other modules
* data this module is not allowed to mutate directly
* source-of-truth rules

If ownership is shared or unclear, document the current rule and link to the relevant ADR if one exists.

## Security Rules

Document authentication, authorization, validation, and access control rules specific to this module.

Include where relevant:

* required roles or permissions
* ownership or workspace/tenant scope
* admin-only actions
* public endpoints
* file upload rules
* sensitive data handling
* audit logging expectations
* rate limits or abuse controls

Do not rely only on UI behavior for security rules.

## State and Lifecycle

Describe important states and allowed transitions.

Examples:

* draft → submitted → approved → rejected
* pending payment → paid → expired → cancelled
* queued → running → completed → failed
* active → inactive → deleted

If this module does not have meaningful state transitions, write `Not applicable`.

## External Integrations

List external providers or systems this module interacts with.

Include:

* provider name
* purpose of integration
* important callbacks or webhooks
* required configuration keys
* retry or idempotency expectations
* reconciliation rules where applicable

If there are no external integrations, write `None`.

## Background Jobs

List jobs, scheduled tasks, queues, or async workflows owned or used by this module.

Include:

* job name
* trigger
* purpose
* idempotency rule
* failure handling
* user or admin visibility, if any

If there are no background jobs, write `None`.

## Configuration

List important configuration values used by this module.

Include environment variables, feature flags, provider settings, limits, and defaults that affect behavior.

Do not include real secrets or credentials.

## Observability

Describe important logs, audit records, metrics, or operational signals for this module.

Include critical events that should be diagnosable in production.

Examples:

* payment callback received
* subscription activated
* import failed
* admin approval completed
* webhook rejected
* file upload failed

## Testing Notes

List the most important behaviors to test.

Include:

* business rules
* permission checks
* ownership boundaries
* validation failures
* important state transitions
* idempotency behavior
* integration boundaries
* migration or data-shape assumptions

Do not list every test file. Focus on the coverage that must not be missed.

## Gotchas

Document known edge cases, historical decisions, fragile areas, or common mistakes.

This section should help future maintainers avoid repeating known problems.

Examples:

* provider sends duplicate callbacks
* old records may have null values
* status names differ between provider and internal model
* dashboard queries must stay paginated
* public links must be scoped by workspace

If there are no known gotchas, write `None currently known`.

## Related Documentation

Link related documents where applicable.

Examples:

* ADRs
* API documentation
* database documentation
* integration documentation
* deployment notes
* design notes
* issue or task references

## Last Updated

Date: YYYY-MM-DD

Summary:

* Short summary of the latest meaningful documentation update.
* Include the reason if the update followed a behavior, contract, security, or data change.
