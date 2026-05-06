# Skill: UI Components

## When this applies

Load this skill when a task creates, modifies, refactors, or reviews a UI screen, page, component, layout, form, navigation element, dashboard, admin view, public view, styling system, design token, or user-facing state.

Also load this skill when changing accessibility behavior, component reuse, responsive behavior, empty/loading/error states, branding, visual hierarchy, or frontend interaction patterns.

For API contracts and response shape, also load `api-design.md` and `data-modeling.md`.

For authorization or sensitive UI behavior, also load `security.md`.

---

## Non-Negotiables

Violating these rules blocks completion.

1. Frontend hiding is never authorization. Protected actions must be enforced server-side.
2. UI changes must not expose secrets, tokens, private configuration, internal error details, or sensitive data.
3. User-facing forms must not rely only on client-side validation.
4. Before modifying a shared component, identify its consumers and check whether the change affects them.
5. Do not introduce a second styling system unless explicitly required and justified.
6. Do not use the global stylesheet as a dumping ground for page-specific or component-specific styles.
7. Interactive elements must support keyboard navigation and screen-reader semantics. Exemptions require explicit product justification.
8. Every meaningful user-facing data state must handle loading, empty, error, and success behavior where applicable.
9. Do not silently change a shared component’s public props, behavior, layout contract, or styling contract.

---

## Defaults

### Existing UI Patterns First

Follow the project’s existing UI architecture, component library, styling approach, naming conventions, and layout patterns before introducing new ones.

Respect existing choices around page structure, shared components, form handling, state management, routing, responsiveness, and design system usage.

Do not redesign the whole UI system as part of a small feature task unless explicitly requested.

### Styling Scope

Global styling should be limited to foundations such as resets, design tokens, theme variables, typography foundations, spacing scale, and base accessibility defaults.

Component-specific and page-specific styles should live near the component, page, module, or feature that owns them.

Avoid hardcoded repeated colors, spacing, shadows, borders, typography, and breakpoints when design tokens or shared primitives exist.

### Design Tokens and Branding

Use project-approved design tokens for color, typography, spacing, radius, shadows, and motion where available.

Branding should remain consistent across all surfaces, including public pages, dashboards, admin screens, emails, reports, and generated assets.

Do not introduce new visual language unless the task is explicitly a redesign or brand update.

### Component Ownership

Shared components are contracts.

Before changing a shared component, identify where it is used and whether the change affects existing consumers.

Prefer local components for feature-specific behavior. Promote to shared only when the pattern is stable and used across multiple places.

### Reuse and Abstraction

Follow the AHA principle: Avoid Hasty Abstractions.

Do not create a generic component just because two screens look similar.

Abstract only when the interaction, visual structure, and data contract are stable enough that reuse reduces complexity instead of hiding differences behind flags.

### UI States

User-facing flows should handle relevant states intentionally:

* loading
* empty
* success
* error
* validation error
* unauthorized
* forbidden
* not found
* disabled or unavailable due to role, permission, plan, or feature state

Avoid blank screens, raw errors, and dead-end flows.

### Forms

Forms should provide clear labels, validation feedback, disabled/loading behavior during submission, and user-safe error messages.

Do not submit fields the user should not control. Do not rely on hidden inputs for trusted values such as ownership, role, price, plan, or permission state.

### Accessibility

UI should support basic accessibility by default.

Use semantic elements where practical, maintain visible focus states, associate labels with inputs, provide meaningful button text, avoid color-only meaning, and ensure interactive elements are keyboard accessible.

Meaningful images should have useful alternative text. Decorative images should not create screen-reader noise.

### Responsive Behavior

Screens should remain usable across expected device sizes.

Do not assume desktop-only behavior unless the product explicitly does.

Tables, cards, dashboards, dialogs, navigation, and forms should have intentional responsive behavior.

### Performance-Aware UI

UI rendering performance belongs here. Page-level, system-level, and scalability strategy belong in `performance.md`.

Avoid rendering very large lists or heavy components unnecessarily.

Use pagination, lazy loading, virtualization, or progressive disclosure when UI data can grow.

Do not repeatedly call APIs or recompute expensive UI state without reason.

---

## Patterns

### Pattern: Local First, Shared When Stable

Start with local UI ownership when a component is feature-specific.

Promote to shared only after the pattern is stable and reuse is clearly beneficial.

### Pattern: Tokens for Foundations, Local Styles for Ownership

Design tokens and global styles define foundations.

Component and page styles should stay close to the UI they own.

### Pattern: Every Flow Has States

A screen is incomplete if it only handles the happy path.

Loading, empty, error, success, and unavailable states are part of the component contract.

### Pattern: Shared Components Are Public Contracts

Changing a shared component means changing a contract used by other screens.

Check consumers before changing props, layout behavior, defaults, styling, or interaction behavior.

### Pattern: Accessible by Default

Accessibility is not a final polish step.

Semantic markup, labels, focus states, keyboard behavior, and meaningful messages should be considered while building the component.

### Pattern: UI Does Not Own Security

The UI may communicate permission state, but it must not be the only place where permission is enforced.

Protected behavior belongs behind server-side checks.

---

## Common Mistakes

* Treating hidden buttons or routes as security.
* Putting page-specific styles into the global stylesheet.
* Creating generic shared components too early.
* Adding many flags to a shared component instead of keeping variants clear.
* Changing shared component props without checking all consumers.
* Hardcoding colors, spacing, shadows, or typography when tokens exist.
* Building only the happy path and forgetting loading, empty, or error states.
* Showing raw backend errors to users.
* Submitting hidden trusted fields from the client.
* Using icons without labels or accessible names.
* Removing visible focus states.
* Relying only on color to show status or errors.
* Creating tables or dashboards that break on smaller screens.
* Rendering large lists without pagination, virtualization, or progressive loading.
* Triggering repeated API calls from uncontrolled effects or re-renders.
* Mixing business logic deeply into presentation components.
* Redesigning shared UI patterns during a small feature change.
* Creating inconsistent empty states, confirmation dialogs, or notification styles across modules.

---

## Stop and Ask If

Stop and ask before proceeding if:

* the component’s owner or intended reuse level is unclear
* a shared component contract may change and consumer impact is unclear
* the design system or styling convention is unclear
* the UI change could expose sensitive data
* the UI change depends on permission, role, plan, or feature-gating behavior that is unclear
* required loading, empty, error, or unavailable states are unclear
* accessibility requirements conflict with the requested design
* the screen is likely mobile-first or has known device-specific constraints that are not stated
* the task requires introducing a new styling system, component library, or design pattern
* the requested UI change appears to require a broader redesign than requested

When stopping, explain the UI risk and ask the smallest necessary clarification.

---

## Related Skills

* `security.md`
* `api-design.md`
* `data-modeling.md`
* `performance.md`
