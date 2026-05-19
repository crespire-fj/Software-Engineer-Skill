# Skill: Brand Identity

## When this applies

Load this skill when a task creates or changes brand direction, visual identity, tone, design tokens, product naming, logo direction, color system, typography, icon style, chart style, or brand kit documentation.

This skill applies before UI mock approval for new products, major redesigns, marketing surfaces, customer-facing applications, or any UI work where brand direction is not already defined.

---

## Non-Negotiables

Violating these rules blocks completion.

1. Do not generate high-fidelity UI mocks for approval before brand direction is defined or explicitly skipped.
2. Do not treat generated brand options as approved without user approval.
3. Do not choose colors, typography, tone, imagery, or visual motifs that conflict with existing brand guidance.
4. Brand assets must not include third-party trademarks, copyrighted images, or real logos unless the project has rights to use them.
5. Brand decisions that affect reusable UI tokens or public product identity must be documented.
6. Accessibility requirements, including contrast expectations, must be considered in the brand kit.

---

## Defaults

### Brand Kit Output

A brand identity kit should define:

* product or brand name
* positioning statement
* personality and tone
* voice guidance for UI copy
* color palette with usage roles
* typography direction
* spacing, radius, and density preferences
* icon and illustration style
* chart and data visualization style
* imagery guidance
* accessibility notes
* examples of do and do-not usage
* approval status

### Approval Before Design

For new products or major visual changes, get user approval of the brand kit before creating high-fidelity UI mocks.

If the user asks to skip brand development, record that assumption and keep UI work conservative, using existing project styles where available.

### Documentation Home

Durable brand decisions should live in project documentation, a design-system README, or another project-approved documentation home.

Do not store long-lived brand decisions only in chat.

---

## Patterns

### Pattern: Brand Serves the Product

Brand choices should fit the product domain, audience, and use frequency.

Operational tools should usually favor clarity, density, and calm repetition. Consumer or editorial surfaces can carry more expressive visual identity when appropriate.

### Pattern: Tokens Before Screens

Define reusable color, type, spacing, and component styling direction before high-fidelity screen design.

This reduces inconsistent one-off UI decisions during implementation.

### Pattern: Approval Creates Constraints

Once approved, the brand kit becomes a constraint for UI mockups and implementation.

Changes to approved brand direction should be explicit rather than accidental.

---

## Common Mistakes

* Skipping brand direction and inventing UI styling during implementation.
* Creating a one-color visual system with poor contrast.
* Treating a moodboard or generated image as a complete brand kit.
* Choosing decorative assets that do not fit the product's actual workflows.
* Forgetting chart, data, empty-state, and error-state visual guidance.
* Letting generated imagery define brand without user approval.

---

## Stop and Ask If

Stop and ask before proceeding if:

* brand direction is required but missing
* multiple brand directions are plausible and the choice affects UI implementation
* accessibility expectations conflict with proposed brand choices
* requested visual assets may use protected marks or copyrighted material without rights
* the user has not approved the brand kit and the next step is high-fidelity mock design

When stopping, explain the brand decision risk and ask the smallest necessary clarification.

---

## Related Skills

* `ux-design.md`
* `ui-mock-approval.md`
* `ui-components.md`
* `documentation.md`
