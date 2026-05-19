# Skill: Project Planning

## When this applies

Load this skill when a task starts from a project idea, product brief, project context, roadmap item, milestone, MVP definition, or broad feature request that needs planning before implementation.

This skill applies before task breakdown, task assignment, UI mock approval, or implementation when the requested work is larger than a narrow code change.

---

## Non-Negotiables

Violating these rules blocks completion.

1. Do not begin implementation from a broad idea without a project plan or an explicit user decision to skip planning.
2. Do not invent business rules, target users, compliance needs, data ownership, or integration scope when they are unclear.
3. Do not treat a project plan as approved unless the user has approved it or explicitly asked to proceed without approval.
4. Planning must identify security, data, integration, performance, documentation, testing, and UX implications at a useful level.
5. MVP scope, out-of-scope items, assumptions, risks, and dependencies must be explicit.
6. If the plan requires a significant architecture, data, integration, or product-structure decision, document it with an ADR when appropriate.

---

## Defaults

### Planning Output

A project plan should define:

* product goal
* target users and primary jobs-to-be-done
* core user workflows
* MVP scope
* out-of-scope items
* assumptions
* risks
* dependencies
* architecture direction
* major modules
* data and privacy expectations
* integration expectations
* milestones
* success criteria
* open questions

Keep the plan practical. It should guide implementation rather than become a product encyclopedia.

### Approval Before Execution

For net-new products, major features, or meaningful product changes, ask for approval of the plan before task breakdown or implementation.

If the user explicitly asks to proceed without approval, record that assumption in the summary and keep the implementation conservative.

### Relationship to Project Context

`PROJECT_CONTEXT.md` remains the canonical high-level project context.

Use the project plan to turn that context into a delivery direction. Update `PROJECT_CONTEXT.md` only when durable product, business, architecture, integration, or constraint information changes.

---

## Patterns

### Pattern: Convert Ideas Into Boundaries

Translate broad ideas into clear scope boundaries before implementation.

Good planning answers what is in scope, what is out of scope, what must be decided later, and what would block safe work.

### Pattern: Plan Around User Workflows

Start from the user's real workflow rather than from tables, endpoints, or screens.

Implementation tasks should trace back to a workflow or system responsibility in the plan.

### Pattern: Surface Risks Early

Call out risks before work begins.

Examples include sensitive data, third-party API uncertainty, authentication requirements, migration risk, unclear permissions, unclear ownership, missing credentials, or vague acceptance criteria.

---

## Common Mistakes

* Jumping from idea directly to code.
* Treating a generated plan as user-approved.
* Hiding assumptions inside implementation details.
* Defining modules before understanding user workflows.
* Ignoring privacy, data ownership, and integration risks during planning.
* Letting MVP scope expand without calling out tradeoffs.
* Creating a plan with no acceptance or success criteria.

---

## Stop and Ask If

Stop and ask before proceeding if:

* the product goal is unclear
* the target users or primary workflows are unclear
* MVP scope cannot be separated from later scope
* privacy, data ownership, or permission expectations are unclear
* required integrations are unknown or materially affect architecture
* implementation would require choosing between multiple major approaches
* the user has not approved a plan and the next step would create broad implementation work

When stopping, explain the planning risk and ask the smallest necessary clarification.

---

## Related Skills

* `task-breakdown.md`
* `task-assignment.md`
* `ux-design.md`
* `brand-identity.md`
* `ui-mock-approval.md`
* `documentation.md`
* `modules.md`
