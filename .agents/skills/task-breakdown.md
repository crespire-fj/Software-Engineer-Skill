# Skill: Task Breakdown

## When this applies

Load this skill when converting an approved project plan, feature plan, design approval, bug scope, or roadmap item into implementation-ready tasks.

This skill applies before task assignment and implementation for multi-step work.

---

## Non-Negotiables

Violating these rules blocks completion.

1. Do not create implementation tasks that lack acceptance criteria.
2. Do not hide dependencies, blockers, security requirements, data impacts, or documentation expectations.
3. Do not split tasks in a way that causes unclear module ownership, duplicate work, or conflicting file edits.
4. Do not mark a task implementation-ready if required product, UX, API, data, permission, or integration decisions are still open.
5. Tests and verification expectations must be stated for each meaningful task.

---

## Defaults

### Task Shape

Each task should include:

* title
* objective
* module or ownership area
* required skill files
* dependencies and blockers
* in-scope work
* out-of-scope work
* affected contracts or data
* acceptance criteria
* test and verification expectations
* documentation impact
* risk level

### Granularity

Tasks should be small enough to implement and review safely, but large enough to deliver a coherent behavior.

Avoid tasks that are only technical fragments unless they are required dependencies for a larger user-facing task.

### Dependency Order

Order tasks so foundational decisions and shared contracts happen before dependent UI, integration, or automation work.

Typical order:

1. decisions and ADRs
2. module and data model foundations
3. API or service contracts
4. UI and workflow implementation
5. integrations and jobs
6. tests, documentation, and release checks

---

## Patterns

### Pattern: Acceptance Criteria Drive Scope

Write acceptance criteria that are observable and testable.

Good criteria describe behavior, permissions, validation, errors, and edge cases where relevant.

### Pattern: Tie Tasks Back to the Plan

Each task should trace to a project plan item, approved design, workflow, risk, or technical dependency.

If a task does not trace to one of these, question whether it belongs in the current scope.

### Pattern: Separate Decisions From Execution

Do not bury unresolved decisions inside implementation tasks.

Create explicit decision or ADR tasks when architecture, data ownership, integration, or product behavior needs approval.

---

## Common Mistakes

* Creating vague tasks such as "build dashboard" or "add backend".
* Splitting frontend and backend tasks without defining the contract between them.
* Missing ownership, permission, validation, or error criteria.
* Forgetting tests and documentation until the end.
* Creating overlapping tasks for multiple agents.
* Treating design exploration as implementation-ready work.

---

## Stop and Ask If

Stop and ask before proceeding if:

* the plan is not approved and the task breakdown would imply commitment to scope
* acceptance criteria cannot be written clearly
* module ownership is unclear
* dependencies between tasks cannot be ordered safely
* a task requires unresolved architecture, data, permission, UX, or integration decisions
* multiple agents or developers would need overlapping write access to the same behavior or files

When stopping, explain the task-shaping risk and ask the smallest necessary clarification.

---

## Related Skills

* `project-planning.md`
* `task-assignment.md`
* `modules.md`
* `testing.md`
* `documentation.md`
