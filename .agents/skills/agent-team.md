# Skill: Agent Team

## When this applies

Load this skill when a task is broad, risky, cross-module, long-running, or likely to exceed the practical context of one agent.

This skill applies when the work benefits from a project manager agent coordinating specialist subagents for bounded analysis, implementation, review, testing, documentation, or verification.

Use this skill as an optional advanced workflow. It does not replace the default single-agent router-and-skills workflow in `/AGENTS.md`.

Examples:

* major feature work
* cross-module changes
* architecture or workflow decisions
* security-sensitive changes
* broad debugging or refactoring
* implementation that also needs review, tests, and documentation
* tasks where context load is too large for one agent to handle well

---

## Non-Negotiables

Violating these rules blocks completion.

1. The project manager agent remains responsible for the final outcome.
2. Subagents must follow `/AGENTS.md`, `/.agents/INDEX.md`, and all relevant skill files.
3. Delegation must be explicit, bounded, and tied to a clear output.
4. Do not delegate work that requires unclear permission, ownership, public contract, destructive data, or architecture decisions.
5. Do not let subagents bypass existing services, validation, permission checks, module boundaries, or documentation requirements.
6. Do not treat subagent output as automatically correct.
7. Do not split tightly coupled work in a way that creates duplicate implementations, conflicting edits, or unclear ownership.
8. The project manager must integrate, review, and verify subagent work before completion.

---

## Defaults

### Project Manager Agent

The project manager agent owns task intake, context loading, scope control, delegation, integration, final verification, and user communication.

The project manager should:

* read the required project guidance first
* identify task signals and required skills
* decide whether a team workflow is useful
* split only work that can be safely bounded
* give each subagent a specific concern or file boundary
* reconcile subagent outputs against project rules
* resolve conflicts before finalizing work
* run or request the appropriate verification
* summarize changes, checks, risks, and follow-up work

### Specialist Subagents

Specialist subagents handle bounded work under the project manager's direction.

Common specialist roles include:

* security reviewer
* database reviewer
* API design reviewer
* UI implementation specialist
* testing specialist
* documentation specialist
* performance reviewer
* integration reviewer

A specialist subagent should only work within its assigned concern or file boundary unless it must stop and report that the boundary is unsafe or incomplete.

### Delegation Brief

Every delegated task should include:

* goal
* assigned role or concern
* relevant files, modules, or boundaries
* required skill files
* explicit in-scope and out-of-scope work
* expected output
* verification expectations
* stop-and-ask conditions

### Integration

The project manager owns integration.

Before accepting subagent output, the project manager should check:

* whether the output follows the loaded skills
* whether module ownership and public contracts are preserved
* whether security, data, and configuration rules are respected
* whether outputs from different subagents conflict
* whether tests, docs, ADRs, templates, or README updates are required
* whether any risk or assumption needs to be reported

---

## Patterns

### Pattern: Coordinate Before Delegating

Do enough initial context gathering to understand the task shape before creating subagent work.

Delegation should reduce risk or context pressure. It should not happen before the project manager knows what decisions are needed and which work can be safely isolated.

### Pattern: Assign Concerns, Not Vague Ownership

Give subagents narrow responsibility.

Good examples:

* review authorization and ownership scope for the billing endpoint
* inspect query safety and migration impact for the reporting change
* update documentation for the new module contract
* add regression tests for the changed API behavior

Weak examples:

* fix the backend
* review everything
* implement the whole feature
* make the app better

### Pattern: Keep the Critical Path Local

The project manager should keep tightly coupled or decision-heavy work local unless the boundaries are clear.

Parallel work is useful for independent review, investigation, tests, documentation, and isolated implementation slices. It is risky when the same behavior, file, public contract, or module boundary is being changed by multiple agents at once.

### Pattern: Merge Findings Into One Decision

Subagents may produce recommendations, but the project manager makes the final integrated decision.

If specialists disagree, the project manager should resolve the conflict using `/AGENTS.md`, loaded skill files, existing implementation patterns, and user clarification when required.

### Pattern: Verify After Integration

Verification happens after integration, not only inside subagent work.

The project manager should run the relevant checks, inspect documentation impact, and confirm that the final state still satisfies the Definition of Done.

---

## Common Mistakes

* Creating subagents before understanding the task.
* Delegating vague work with no boundary or expected output.
* Splitting one tightly coupled change across multiple agents.
* Allowing duplicate implementations of the same behavior.
* Letting subagents skip required skills.
* Accepting subagent output without review.
* Treating specialist findings as final decisions.
* Forgetting that the project manager owns the final result.
* Parallelizing architecture, permission, or data-ownership decisions before they are clear.
* Updating docs, code, and tests independently without final reconciliation.
* Using the team workflow for small tasks where it adds coordination overhead without reducing risk.

---

## Stop and Ask If

Stop and ask before using or continuing a team workflow if:

* permission behavior is unclear
* module ownership is unclear
* public contracts may change and affected consumers are unclear
* destructive data changes may be required
* architecture direction is unclear
* the task requires choosing between multiple major approaches
* subagent boundaries would overlap heavily
* subagent outputs conflict and the correct resolution is not clear from existing guidance
* the team workflow would create more risk than a single integrated implementation

When stopping, explain the coordination or ownership risk and ask the smallest necessary clarification.

---

## Related Skills

* `security.md`
* `modules.md`
* `documentation.md`
* `testing.md`
* `api-design.md`
* `database.md`
* `performance.md`
