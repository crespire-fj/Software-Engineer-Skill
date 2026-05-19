# Skill: UI Mock Approval

## When this applies

Load this skill when a task creates, reviews, revises, or seeks approval for wireframes, screen mockups, visual concepts, prototypes, design comps, or implementation-ready UI designs.

This skill applies before implementing new UI screens, major UI changes, or design-sensitive user workflows.

---

## Non-Negotiables

Violating these rules blocks completion.

1. Do not implement high-impact UI from an unapproved mock unless the user explicitly asks to skip approval.
2. Do not create high-fidelity mockups before required brand identity and UX direction are approved or explicitly skipped.
3. Do not treat AI-generated mock images as implementation specifications unless they are translated into explicit layout, state, accessibility, and behavior requirements.
4. Mock approval must cover the relevant desktop and mobile layouts when both are in scope.
5. Mocks must account for empty, loading, error, validation, permission, and success states where relevant.
6. Approved mockups must not override server-side authorization, validation, data ownership, or API contract rules.

---

## Defaults

### Approval Stages

Use the lightest stage that fits the risk:

* low-fidelity wireframe for flow and layout
* high-fidelity mock for visual approval
* clickable or interactive prototype for complex workflows
* implementation-ready design notes for build handoff

For new products and major redesigns, get brand and UX approval before high-fidelity mock generation.

### Image Generation

After the brand identity kit is finalized, agents may use Image Gen skills or approved image-generation tooling to create mock design concepts, screen comps, visual references, or supporting bitmap assets.

Generated mock images are references for approval. They must be converted into explicit implementation requirements before code changes begin.

Do not use generated imagery that includes real third-party logos, protected marks, copyrighted characters, or assets the project does not have rights to use.

### Mock Approval Output

A mock approval artifact should define:

* screens or flows covered
* source brand kit or design system
* UX workflow reference
* desktop layout
* mobile layout when applicable
* interaction states
* empty, loading, error, validation, permission, and success states
* accessibility notes
* data shown in examples
* open questions
* approval status

---

## Patterns

### Pattern: Approve Decisions, Not Just Pictures

Approval should cover layout, hierarchy, interactions, states, and constraints.

A beautiful mock with unclear behavior is not implementation-ready.

### Pattern: Design States Before Code

State coverage prevents implementation from inventing important behavior late.

List the states that must be represented even if not every state needs a separate full-screen mock.

### Pattern: Use Generated Mocks as Conversation Artifacts

Generated images can accelerate visual exploration after brand direction exists.

Treat them as approval references and translate them into concrete UI requirements, tokens, components, layout rules, and state behavior.

---

## Common Mistakes

* Implementing UI from a vague visual idea.
* Skipping mobile layout decisions.
* Treating a single happy-path screen as complete design approval.
* Forgetting empty, loading, error, permission, and validation states.
* Letting generated images introduce brand drift.
* Building pixel details that conflict with existing components or accessibility requirements.
* Treating AI-generated images as licensed production assets without review.

---

## Stop and Ask If

Stop and ask before proceeding if:

* brand identity is required but not approved
* UX flow is required but not approved
* the user has not approved the mock and the next step is implementation
* the mock implies behavior that conflicts with API, data, security, or module rules
* accessibility or responsive behavior is unclear
* generated assets may include protected or unlicensed material

When stopping, explain the mock-approval risk and ask the smallest necessary clarification.

---

## Related Skills

* `brand-identity.md`
* `ux-design.md`
* `ui-components.md`
* `project-planning.md`
* `task-breakdown.md`
