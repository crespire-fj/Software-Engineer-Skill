# Skill: User Experience

## When this applies

Load this skill when a task creates or changes user journeys, onboarding, navigation, workflows, information architecture, forms, interaction patterns, notifications, empty states, error recovery, accessibility behavior, or user-facing product decisions.

This skill applies before UI mock approval and implementation for user-facing features.

---

## Non-Negotiables

Violating these rules blocks completion.

1. Do not implement user-facing flows when the primary user workflow is unclear.
2. Do not use UI mockups as a substitute for UX decisions about flow, states, permissions, and error recovery.
3. Do not hide security, privacy, validation, or data ownership rules behind UI behavior.
4. UX flows that collect, display, export, delete, or sync sensitive data must include privacy and trust considerations.
5. Accessibility expectations must be considered before implementation, not only after visual design.
6. User-facing copy and interaction behavior must not contradict server-side rules or API contracts.

---

## Defaults

### UX Output

A UX design pass should define:

* target users or personas
* jobs-to-be-done
* primary workflows
* secondary workflows
* onboarding path
* navigation and information architecture
* form and validation behavior
* empty, loading, success, error, and permission states
* mobile and desktop considerations
* accessibility expectations
* privacy and trust moments
* notification or reminder behavior
* data correction, export, and deletion flows where relevant
* open questions and approval status

### UX Before UI

For new user-facing products or major features, resolve UX flow before high-fidelity UI mock design.

UI mocks should visualize approved workflows rather than inventing them.

### Existing Patterns First

Follow existing navigation, form, validation, accessibility, and error-state patterns where available.

Introduce new patterns only when the existing ones do not fit the workflow.

---

## Patterns

### Pattern: Start With the Repeated Workflow

Design the workflow the user will repeat most often before edge screens or decorative moments.

For operational products, repeated-use efficiency usually matters more than novelty.

### Pattern: Model Every State

User experience includes what happens before, during, after, and when something fails.

Include empty states, loading states, validation errors, permission failures, sync failures, and destructive confirmation states when relevant.

### Pattern: Trust Is Part of UX

When the product handles sensitive, financial, personal, or health data, design for clear ownership, visibility, correction, export, deletion, and consent.

---

## Common Mistakes

* Designing screens without defining flows.
* Treating onboarding as an afterthought.
* Missing empty, error, permission, or loading states.
* Creating workflows that require users to understand internal implementation details.
* Letting UI labels imply behavior the backend does not enforce.
* Ignoring mobile or accessibility until the end.
* Forgetting user control over sensitive data.

---

## Stop and Ask If

Stop and ask before proceeding if:

* the primary workflow is unclear
* user roles, permissions, or data ownership affect the flow and are unresolved
* sensitive data is collected or displayed without clear privacy expectations
* notification, reminder, export, deletion, or correction behavior is required but undefined
* the requested UX conflicts with security, data, or API constraints
* UI mock approval would require making unresolved UX decisions

When stopping, explain the UX risk and ask the smallest necessary clarification.

---

## Related Skills

* `brand-identity.md`
* `ui-mock-approval.md`
* `ui-components.md`
* `api-design.md`
* `data-modeling.md`
* `security.md`
