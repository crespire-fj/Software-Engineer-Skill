# Skill: Caching

## When this applies

Load this skill when a task adds, modifies, removes, or relies on caching.

This includes in-memory caches, distributed caches, CDN caches, browser caches, API response caches, query caches, computed summaries, static generation, incremental regeneration, and cached files.

Also load this skill when changing TTLs, cache keys, invalidation rules, stale data behavior, cache warming, or cache busting.

For permission-sensitive data, also load `security.md`.

For performance strategy, also load `performance.md`.

---

## Non-Negotiables

Violating these rules blocks completion.

1. Do not cache data without a clear cache key, TTL, and invalidation rule.
2. Do not cache permission-sensitive data unless the user, role, workspace, tenant, organization, or access scope is part of the cache key.
3. Do not serve cached private data to a different user, workspace, tenant, organization, role, or permission scope.
4. Do not cache secrets, tokens, passwords, private keys, payment secrets, or sensitive internal credentials.
5. Cached values for billing, payment status, subscription state, authorization decisions, and audit data must have a verified source-of-truth fallback.
6. Do not cache mutable business data indefinitely.
7. Authorization decisions must not be cached beyond the request scope unless invalidation triggers are tied to permission, role, plan, and ownership changes.
8. Cache invalidation must happen when the underlying data changes, or stale behavior must be explicitly accepted and documented.

---

## Defaults

### Cache Only With a Purpose

Caching should solve a specific problem such as repeated expensive reads, high-latency external calls, expensive computed summaries, heavy public traffic, or static content delivery.

Do not add caching because it might be useful later.

### Cache Key Design

Cache keys must include every factor that changes the output.

Common key inputs include resource ID, user ID, workspace ID, tenant ID, organization ID, role, permission scope, locale, query filters, pagination, sort order, feature flags, and version.

Do not use broad global keys for user-specific or permission-sensitive data.

### TTL and Freshness

Every cache must define a TTL or an explicit reason why expiry is not required.

Shorter TTLs are safer for frequently changing or permission-sensitive data.

Longer TTLs are safer for static assets, public content, reference data, or expensive computations where stale data is acceptable.

### Invalidation

Cache invalidation should be tied to the operation that changes the underlying data whenever practical.

If event-driven invalidation is not available, use conservative TTLs and document the stale-data behavior.

Manual cache clearing should not be the primary invalidation strategy for normal product behavior.

### Stale Data Behavior

Stale data must be acceptable for the use case.

Stale data is usually acceptable for static content, public marketing content, non-critical analytics, and read-only reference data.

Stale data is usually not acceptable for authorization, billing state, subscription access, payment status, security-sensitive settings, or critical workflow state.

### Permission-Sensitive Data

Security owns the canonical rule that protected data must not cross access scopes.

Caching implementation must preserve the same access boundaries as the uncached query or computation.

If the output differs by user, role, permission, workspace, tenant, organization, or plan, the cache key must reflect that difference.

### Negative Caching

Caching empty, not-found, or failed results can be useful, but it must be done carefully.

Use short TTLs for negative cache entries unless the absence of data is stable and safe to cache.

Do not negative-cache authorization failures in ways that block newly granted access longer than acceptable.

### External Data and API Responses

Caching owns cache mechanics for external data: key design, TTL, invalidation, scope, stale behavior, and safe storage.

External integrations owns provider-specific protocol behavior.

Do not cache provider responses containing secrets, raw tokens, or sensitive payloads unless the project has explicit safe storage rules.

---

## Patterns

### Pattern: Key Includes Scope

A cache key must include the full access and variation scope of the cached output.

If two requests should not see identical data, they should not share the same cache key.

### Pattern: Invalidate Where Data Changes

The best place to invalidate a cache is usually the same workflow that changes the underlying data.

Cache invalidation should be part of the write path when stale data would be harmful.

### Pattern: TTL Is a Product Decision

TTL is not only a technical number.

It defines how stale the product is allowed to be, so it must match the business impact of stale data.

### Pattern: Cache After Correctness

Caching should improve a correct system, not compensate for a broken query, missing index, unsafe permission check, or unclear data model.

Fix correctness first, then cache.

### Pattern: Stale Must Be Safe

Serving stale data is acceptable only when the user, business, and security impact is understood.

If stale data can grant access, hide payment changes, misrepresent subscription state, or expose private data, do not cache without explicit design.

---

## Common Mistakes

* Caching user-specific data with a global key.
* Forgetting to include workspace, tenant, role, plan, or permission scope in the cache key.
* Caching authorization decisions without safe expiry or invalidation.
* Using caching to hide N+1 queries or missing indexes.
* Setting long TTLs on frequently changing business data.
* Forgetting to invalidate cache after updates, deletes, approvals, or subscription changes.
* Serving stale paid-feature access after a subscription expires or downgrades.
* Caching payment status or callback results without idempotency and freshness rules.
* Caching not-found results too long and hiding newly created records.
* Caching failed external API responses too long.
* Storing secrets, tokens, or sensitive provider payloads in cache.
* Letting CDN or browser cache private responses.
* Forgetting cache variation by locale, filters, pagination, or sort order.
* Adding caching without logs, metrics, or a way to diagnose stale behavior.
* Clearing cache manually as the normal invalidation strategy.

---

## Stop and Ask If

Stop and ask before proceeding if:

* the cache key scope is unclear
* the TTL or acceptable staleness is unclear
* invalidation behavior is unclear
* the data is permission-sensitive and scope rules are unclear
* stale data could affect billing, payment, subscription, authorization, or admin behavior
* stale data could cause incorrect permissions, payments, subscriptions, or data exposure
* cache behavior differs by user, role, workspace, tenant, organization, plan, locale, or feature flag and the variation is unclear
* the cache may store sensitive data or provider payloads
* negative caching could hide newly created or newly accessible data
* caching is being used to mask an inefficient query or missing index
* a CDN, browser, or public cache may store private data
* cache behavior may break existing consumers or product expectations

When stopping, explain the caching risk and ask the smallest necessary clarification.

---

## Related Skills

* `security.md`
* `performance.md`
* `database.md`
* `observability.md`
