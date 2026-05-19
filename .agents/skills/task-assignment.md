# Skill: Task Assignment

## When this applies

Load this skill when assigning tasks to agents, subagents, human contributors, or parallel workstreams.

This skill applies after task breakdown and before delegated implementation, review, documentation, testing, or design work.

---

## Non-Negotiables

Violating these rules blocks completion.

1. Every assignment must have a clear owner, scope, expected output, and stop condition.
2. Write-capable agents or contributors must receive narrow file, module, or responsibility boundaries.
3. Do not assign overlapping write scopes unless one owner is explicitly responsible for integration.
4. Do not assign work that requires unresolved product, permission, architecture, destructive data, or public contract decisions.
5. The parent or project manager agent remains responsible for integration and final verification.
6. Assigned workers must not revert or overwrite unrelated changes made by others.

---

## Defaults

### Assignment Brief

Each assignment should include:

* owner or role
* task reference
* goal
* files, modules, or responsibility scope
* required skill files
* in-scope work
* out-of-scope work
* expected output
* dependencies
* coordination notes
* verification expectations
* stop-and-ask conditions

### Parallel Work

Parallel work is appropriate when tasks have independent scopes, disjoint write sets, or read-only review concerns.

Keep tightly coupled decisions, shared contracts, and final integration under one owner.

### Review Roles

Prefer read-only assignment for review, mapping, security, performance, database, API contract, or testing strategy work.

Use write-capable assignment only when the work requires edits and the write scope can be bounded.

---

## Patterns

### Pattern: Assign Ownership, Not Just Activity

Good assignments make it clear who owns the outcome.

Weak assignment: "work on the frontend."

Strong assignment: "implement the workout logging form in the `Workouts` module using the approved DTO contract; do not modify API handlers."

### Pattern: Keep Integration Explicit

When multiple people or agents contribute, identify who integrates the result and resolves conflicts.

Integration includes checking contracts, tests, docs, security, and consistency with the approved plan.

### Pattern: Give Reviewers a Question

Review assignments should ask a concrete question.

Examples:

* "Check whether this endpoint enforces ownership scope."
* "Review whether the migration preserves existing data."
* "Identify missing tests for the approved acceptance criteria."

---

## Common Mistakes

* Assigning vague work with no boundary.
* Letting multiple workers edit the same files without coordination.
* Delegating unresolved decisions.
* Forgetting to tell workers what is out of scope.
* Treating review comments as automatically approved changes.
* Losing final ownership after parallel work completes.

---

## Stop and Ask If

Stop and ask before proceeding if:

* no clear owner can be assigned
* write scopes overlap heavily
* task dependencies are unresolved
* assignment would require a worker to make product, architecture, permission, or public contract decisions
* the integration owner is unclear
* the assignment could overwrite unrelated user or contributor changes

When stopping, explain the assignment risk and ask the smallest necessary clarification.

---

## Related Skills

* `task-breakdown.md`
* `agent-team.md`
* `modules.md`
* `testing.md`
* `documentation.md`
