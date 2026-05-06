# Skill: Testing

## When this applies

Load this skill when a task adds, modifies, removes, reviews, or depends on tests.

This includes unit tests, integration tests, API tests, end-to-end tests, component tests, regression tests, contract tests, test data, mocks, fixtures, test utilities, and test strategy.

Also load this skill when changing business rules, authorization behavior, data models, API contracts, migrations, background jobs, integrations, caching, or performance-sensitive flows.

For API contract changes, also load `api-design.md`.

For database behavior and migrations, also load `database.md` and `migrations.md`.

For authorization and sensitive flows, also load `security.md`.

---

## Non-Negotiables

Violating these rules blocks completion.

1. Existing tests must pass where they can be run.
2. Do not delete, weaken, or skip tests to make a change pass unless explicitly approved and justified.
3. Business rule changes must add or update tests that prove the new behavior.
4. Authorization, ownership, role, permission, and tenant/workspace boundary changes must include negative tests where practical.
5. API contract changes must include tests for request shape, response shape, status behavior, and error behavior where practical.
6. Critical money, subscription, payment, authentication, authorization, import, export, and data-mutation flows must have regression coverage.
7. Tests must not depend on real production services, real credentials, or live payment/email/storage providers.
8. Test data must not contain real secrets, credentials, tokens, private keys, or sensitive personal data.
9. Do not add brittle tests that assert incidental implementation details instead of observable behavior.
10. If tests cannot be run, state why and identify the risk.

---

## Defaults

### Existing Test Pattern First

Follow the project’s existing test framework, naming conventions, file locations, fixtures, mocks, factories, and test utilities.

Do not introduce a second test framework unless explicitly required and justified.

Prefer improving existing coverage patterns over adding isolated one-off test styles.

### Test Pyramid

Use the lightest test type that gives reliable confidence.

Unit tests should cover pure business logic, validation, calculations, permission logic, state transitions, and utility behavior.

Integration tests should cover API boundaries, database workflows, service interactions, migrations, and external adapter behavior with fakes or controlled test doubles.

End-to-end tests should cover only critical user journeys where lower-level tests cannot provide enough confidence.

### Behavior Over Implementation

Tests should verify observable behavior and business outcomes.

Avoid asserting internal implementation details unless the implementation detail is itself the contract.

A test should usually survive safe refactoring.

### Positive and Negative Cases

Do not test only the happy path.

Important flows should include failure, validation, authorization, not-found, duplicate submission, empty state, and boundary cases where relevant.

### Contract Coverage

Contracts need tests when they are consumed by other modules, screens, jobs, integrations, or external clients.

Examples include API response shapes, DTO mapping, exported services, module public methods, events, job payloads, and provider adapter outputs.

### Security and Permission Tests

Permission-sensitive changes should test both allowed and denied behavior.

Include ownership-scope cases where one user, workspace, tenant, or organization must not access another’s data.

### Integration and External Service Tests

Tests should not call real providers unless explicitly marked and isolated as non-default integration tests.

Use fakes, mocks, stubs, sandbox providers, contract tests, or recorded fixtures according to project convention.

Provider payload fixtures must not include real secrets or sensitive data.

### Migration and Data Tests

Schema and data migrations should be tested against representative existing data where practical.

Required fields, backfills, constraints, field meaning changes, and seed/reference data should be tested for safe behavior.

### Test Data

Use minimal, intentional test data.

Avoid large fixtures unless the test is specifically about volume or performance.

Make test data clear enough that failures are easy to understand.

### Flaky Tests

Flaky tests should be fixed, isolated, or clearly marked according to project convention.

Do not ignore flaky tests without documenting the risk.

---

## Patterns

### Pattern: Test the Rule Where It Lives

Business rules should be tested near the layer that owns them.

Do not rely only on UI or end-to-end tests for rules owned by services, domain logic, or database constraints.

### Pattern: Prove Both Allowed and Denied

Security-sensitive behavior needs tests for success and rejection.

A permission test that only proves allowed access is incomplete.

### Pattern: Contract Tests Protect Consumers

When a contract changes, tests should protect the consumers that depend on it.

This applies to APIs, module services, job payloads, events, exports, and provider adapters.

### Pattern: Regression Tests Follow Bugs

When fixing a bug, add a test that would have failed before the fix where practical.

The test should describe the behavior that must not regress.

### Pattern: Small Tests First

Prefer focused unit or integration tests before broad end-to-end tests.

Use end-to-end tests for critical journeys, not every branch of business logic.

### Pattern: Tests Must Be Trustworthy

A test suite must be deterministic, safe, and meaningful.

Tests that rely on production services, real credentials, hidden timing assumptions, or incidental implementation details reduce trust.

---

## Common Mistakes

* Deleting tests instead of fixing the code or updating the test intentionally.
* Marking tests as skipped without documenting why.
* Testing only the happy path.
* Adding tests that mirror implementation instead of behavior.
* Relying only on end-to-end tests for business rules.
* Forgetting negative authorization tests.
* Forgetting tenant, workspace, or ownership boundary tests.
* Calling real payment, email, storage, AI, or external API providers in default test runs.
* Using real secrets or sensitive personal data in fixtures.
* Creating large fixtures that obscure the behavior being tested.
* Mocking so much that the test no longer verifies useful behavior.
* Adding fragile snapshot tests that fail on harmless UI changes.
* Ignoring flaky tests until the suite becomes untrusted.
* Updating API responses without updating contract tests.
* Changing migrations without testing existing-data scenarios.
* Testing local behavior only and ignoring production-like constraints.

---

## Stop and Ask If

Stop and ask before proceeding if:

* the expected behavior is unclear
* the business rule is unclear
* the correct test level is unclear and multiple approaches have different tradeoffs
* a critical flow has no test coverage and adding coverage is outside the requested scope
* existing tests fail and the failure cause is unclear
* the requested change requires deleting, weakening, or skipping tests
* authorization, ownership, or tenant boundary behavior is unclear
* a test would require real provider credentials or production services
* test data requirements include sensitive personal data or secrets
* API contract expectations are unclear
* migration behavior for existing data is unclear
* flaky tests block verification and the safe handling approach is unclear

When stopping, explain the testing risk and ask the smallest necessary clarification.

---

## Related Skills

* `api-design.md`
* `security.md`
* `database.md`
* `migrations.md`
* `external-integrations.md`
