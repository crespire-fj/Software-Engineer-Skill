# Skill: Modules

## When this applies

Load this skill when a task creates, modifies, moves, splits, merges, or refactors a major module, feature area, business capability, or public contract.

A module may represent a capability such as authentication, users, workspaces, billing, payments, reports, catalogs, QR codes, campaigns, notifications, administration, settings, file uploads, or integrations.

This skill is a baseline skill and should be loaded for all non-trivial tasks.

---

## Non-Negotiables

Violating these rules blocks completion.

1. Do not silently change a module’s public contract.
2. Do not break documented module invariants.
3. Read the module README before modifying a module when it exists.
4. Update the module README after meaningful changes to behavior, contracts, dependencies, data ownership, security rules, or gotchas.
5. Do not introduce circular dependencies between modules.
6. Do not duplicate core business logic across unrelated modules.
7. Do not bypass an owning module’s service, API, or public contract to mutate its data directly.
8. If module ownership, public contract, or invariant behavior is unclear, stop and ask.

---

## Defaults

### Existing Module Structure First

Follow the project’s existing module structure and naming conventions before introducing new organization.

Respect existing choices around folder layout, service boundaries, API ownership, component ownership, data ownership, and documentation style.

Do not reorganize modules as part of a feature task unless the task explicitly requires it.

### Module Ownership

Each module should have a clear responsibility, usually owning some combination of business rules, services, APIs, UI components, data, jobs, events, configuration, public types, and documentation.

If a module owns a rule or data structure, other modules should interact with it through its approved public contract rather than reaching directly into its internals.

### Public Contracts

A public contract is anything other parts of the system rely on.

Examples include services, API endpoints, exported functions, events, jobs, DTOs, database-facing interfaces, configuration keys, and shared UI components.

Public contracts must be stable, documented, and changed intentionally.

Changing a public contract requires updating consumers, tests, and documentation.

### Invariants

An invariant is a rule that must always remain true.

Examples:

* a user must belong to a workspace before accessing workspace data
* a paid feature must not be available to a free plan unless explicitly allowed
* a payment callback must not activate the same transaction twice
* a soft-deleted record must not appear in normal user-facing lists
* a module-owned record must not be mutated outside the owning module’s service

Document important invariants in the module README.

### Module README

Each major module should have a `README.md`.

Use `/.agents/templates/module-readme.md` as the canonical module README template when available.

Do not allow module documentation to drift from implementation.

### Dependencies

Module dependencies should be intentional and directional.

Prefer clear dependency direction over circular references.

If two modules depend heavily on each other, consider whether the boundary is wrong, the shared behavior belongs in a lower-level service, or the modules should be merged.

Do not create a shared utility module as a dumping ground for unrelated logic.

### Reuse and Abstraction

Follow the AHA principle: Avoid Hasty Abstractions.

Do not abstract code just because two things look similar.

Prefer duplication until the repeated pattern is stable and the cost of maintaining duplication is higher than the cost of maintaining an abstraction.

Build it twice before abstracting. Consider abstraction on the third clear repetition, or earlier only when the shared boundary is obvious and stable.

### Cross-Module Changes

Cross-module changes are higher risk than single-module changes.

When a change touches multiple modules, identify which module owns the affected rule, which module owns the data, which public contracts are affected, and which consumers, tests, READMEs, or ADRs must change.

---

## Patterns

### Pattern: Own the Rule Where the Data Lives

Business rules should usually live in the module that owns the relevant data or state transition.

Other modules should call the owning module’s service, API, event, or public contract rather than duplicating the rule.

### Pattern: Public Contracts Are Intentional

Anything consumed outside a module is a contract.

Changing a contract requires updating documentation, consumers, and tests rather than only changing the implementation.

### Pattern: Invariants Before Implementation

Before changing a module, identify what must always remain true.

Implementation details may change, but documented invariants must be preserved unless the task explicitly changes them.

### Pattern: Prefer Directional Dependencies

Module dependencies should point in a clear direction.

Avoid circular dependencies, hidden imports, and shared utility dumping grounds that make ownership unclear.

### Pattern: Abstract Only After the Pattern Stabilizes

Reusable module-level services or shared components should be created only after the common behavior is stable.

Wrong abstractions create more long-term cost than temporary duplication.

---

## Common Mistakes

* Modifying a module without reading its README.
* Changing a service or API contract without updating consumers.
* Moving logic across modules without documenting why.
* Duplicating business rules in UI components, controllers, and services.
* Mutating another module’s data directly instead of using its public contract.
* Creating circular dependencies between modules.
* Creating a generic shared module too early.
* Turning shared utilities into a dumping ground.
* Treating a folder as a module without defining its responsibility.
* Updating implementation but leaving module README outdated.
* Adding a new module without documenting purpose, contracts, dependencies, and invariants.
* Ignoring security rules documented in the module README.
* Changing module behavior without updating tests.
* Spreading one feature across unrelated folders without clear ownership.
* Assuming existing duplication always means abstraction is required.

---

## Stop and Ask If

Stop and ask before proceeding if:

* module ownership is unclear
* the module README conflicts with implementation
* a public contract must change but consumer impact is unclear
* an invariant appears outdated or conflicts with the requested behavior
* the task requires moving responsibility across module boundaries
* the task introduces a dependency cycle
* the correct owner of a business rule is unclear
* the correct owner of data is unclear
* a new abstraction would affect multiple modules and the boundary is not stable
* the requested change appears to require a broader refactor than requested
* a module should be split, merged, or reorganized but the architectural direction is unclear

When stopping, explain the module-boundary risk and ask the smallest necessary clarification.

---

## Related Skills

* `documentation.md`
* `data-modeling.md`
* `api-design.md`
