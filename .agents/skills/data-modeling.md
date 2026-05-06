# Skill: Data Modeling

## When this applies

Load this skill when a task touches entities, DTOs, request models, response models, view models, mapping, serialization, validation shape, API contract shape, over-posting, data ownership, or how stored data is exposed to clients.

Also load this skill when adding fields, changing field meaning, reshaping responses, importing or exporting structured data, or deciding whether a value belongs in an entity, DTO, view model, configuration, or derived calculation.

For schema changes, also load `database.md` and `migrations.md`.

For endpoint request/response behavior, also load `api-design.md`.

---

## Non-Negotiables

Violating these rules blocks completion.

1. Do not expose database entities directly unless this is an intentional and documented project pattern.
2. Do not accept full entities from clients for create or update operations unless explicitly required and protected.
3. Request models must include only fields the client is allowed to provide.
4. Response models must include only fields the client is allowed to see.
5. Never expose secrets, tokens, password hashes, private keys, internal provider data, or sensitive internal fields in client-facing models.
6. Do not silently change the meaning of an existing field.
7. Do not silently change request or response model shapes used by existing consumers.
8. Do not duplicate the same business meaning across multiple fields without a clear source of truth.
9. Do not map client-provided values into ownership, role, permission, price, subscription, audit, or system-controlled fields unless explicitly authorized by business rules.

---

## Defaults

### Existing Model Conventions First

Follow the project’s existing model conventions before introducing new types or naming styles.

Respect existing distinctions between entities, DTOs, request models, response models, view models, commands, queries, domain models, and persistence models.

Do not rename or reorganize models as part of a feature task unless explicitly required.

### Entity vs Contract Shape

Database entities represent persistence or domain state.

Client-facing request and response models represent public contracts.

Do not let persistence shape become API shape by accident. Use explicit mapping where the project supports it.

### Request Models

Request models should accept the minimum fields needed for the operation.

Do not allow clients to submit system-controlled values such as IDs, ownership scope, roles, permissions, audit fields, status, prices, subscription limits, timestamps, or approval state unless the operation explicitly permits it.

### Response Models

Response models should be shaped for the caller’s use case.

Do not include internal, sensitive, unused, or misleading fields just because they exist in the database.

If different users or roles require different fields, shape the response according to authorization and product rules.

### Mapping

Mapping should be intentional, reviewable, and consistent with project conventions.

Use explicit mapping consistent with the project’s existing approach, such as mapping libraries, serializers, manual transformation functions, or framework-supported model binding.

Avoid broad automatic mapping when it can accidentally include sensitive or system-controlled fields.

### Field Meaning and Source of Truth

Every important field should have one clear meaning and one clear source of truth.

Derived values should usually be calculated from source fields rather than stored repeatedly, unless there is a performance, audit, reporting, or historical snapshot reason.

If stored and derived values coexist, document which one wins when they conflict.

### Nullability and Defaults

Nullability and defaults carry business meaning.

Do not add nullable fields, default values, optional request fields, or fallback behavior without understanding how existing records and consumers should behave.

### Status and State Models

Status fields and state transitions should be explicit.

Avoid ambiguous string values, undocumented states, and client-controlled status changes.

When a state transition affects business rules, validate it in the service or domain layer.

### Imports, Exports, and External Data

Data modeling owns the rule that external payload shape must not become internal model shape by accident. External integrations owns provider-specific protocol behavior.

External data should be mapped into internal models intentionally.

Validate, normalize, and document important external fields before storing or exposing them.

---

## Patterns

### Pattern: Explicit Public Shape

Every client-facing request or response should have an intentional shape.

The public model should reflect what the client may send or see, not whatever the database happens to store.

### Pattern: Protect System-Controlled Fields

Fields controlled by the system must not be writable by ordinary client input.

Ownership, roles, permissions, audit fields, payment state, subscription limits, and approval state should be set by trusted server-side logic.

### Pattern: One Meaning, One Source of Truth

A business value should have one clear meaning and one authoritative source.

Duplicate fields, derived values, cached values, and snapshots need documented rules for when they are created, refreshed, or trusted.

### Pattern: Map Across Boundaries

Crossing a boundary should usually involve mapping.

Examples of boundaries include database to API, API to UI, external provider to internal model, import file to database, and domain model to report.

### Pattern: Model State Transitions Explicitly

When a field represents state, define allowed states and transitions clearly.

Do not let arbitrary client updates move records between important states.

---

## Common Mistakes

* Returning database entities directly to clients by accident.
* Accepting full entity objects from clients and enabling over-posting.
* Letting clients set system-controlled fields such as user, workspace, or role IDs, status, price, plan, created-by markers, or similar values.
* Exposing password hashes, reset tokens, access tokens, provider secrets, or internal IDs unnecessarily.
* Adding a field without deciding whether it belongs in the entity, DTO, view model, or derived calculation.
* Duplicating the same business value across multiple fields without a source-of-truth rule.
* Changing a field’s meaning without updating documentation, migrations, consumers, and tests.
* Treating null as harmless when it changes business behavior.
* Adding default values that hide missing or invalid data.
* Using broad automatic mapping that exposes new fields accidentally.
* Returning internal status names that do not match user-facing product language.
* Allowing arbitrary status updates from the client.
* Storing external provider payloads as internal truth without normalization.
* Breaking exports or reports by changing model shape without checking consumers.
* Mixing presentation-only fields into persistence models.

---

## Stop and Ask If

Stop and ask before proceeding if:

* the source of truth, data owner, or public shape for a value is unclear
* the owner of a field or model is unclear
* a field’s meaning appears to be changing
* a request model could allow over-posting
* a response model may expose sensitive or internal fields
* different roles should see different model fields and the rule is unclear
* a client wants to set system-controlled fields
* nullability, defaults, or fallback behavior is unclear
* status values or allowed transitions are unclear
* external payload fields do not map cleanly to internal concepts
* a model change may break API consumers, reports, imports, exports, or background jobs
* a derived value may conflict with a stored value
* the data model conflicts with the requested behavior

When stopping, explain the data-modeling risk and ask the smallest necessary clarification.

---

## Related Skills

* `api-design.md`
* `database.md`
* `migrations.md`
