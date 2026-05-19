# Project Onboarding Wizard

This is a dependency-free local HTML wizard for creating initial governance artifacts in a project that uses this pack.

Open `index.html` in a browser, complete the steps, preview the generated Markdown, then either download the selected files or write them into a selected project folder when the browser supports local folder access.

## Generated Files

The wizard can generate:

* `PROJECT_CONTEXT.md`
* `project-docs/project-plan.md`
* `project-docs/brand-identity-kit.md`
* `project-docs/ux-design-brief.md`
* `project-docs/ui-mock-approval.md`
* `project-docs/task-breakdown.md`
* `project-docs/task-assignment.md`
* `adr/0001-use-agent-governance-pack.md` or the next available ADR number when writing to a selected folder

Generated planning, brand, UX, mock approval, task, and assignment files are project artifacts. They should not be stored inside `/.agents/`, which is reserved for agent operating rules, skills, and reusable templates.

## Safety Notes

Do not enter real secrets, production credentials, private keys, tokens, or sensitive operational details.

The wizard runs entirely in the browser. It uses `localStorage` for draft recovery and only writes files after the user chooses a folder and clicks the write action.
