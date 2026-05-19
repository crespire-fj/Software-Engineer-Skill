# Project Onboarding Wizard

This is a dependency-free local HTML wizard for creating initial governance artifacts in a project that uses this pack.

Open `index.html` in a browser, complete the steps, preview the generated Markdown, then either download the selected files or write them into a selected project folder when the browser supports local folder access.

## Generated Files

The wizard can generate:

* `PROJECT_CONTEXT.md`
* `ProjectDocs/Source/<uploaded-files>`
* `ProjectDocs/project-plan.md`
* `ProjectDocs/brand-identity-kit.md`
* `ProjectDocs/ux-design-brief.md`
* `ProjectDocs/ui-mock-approval.md`
* `ProjectDocs/task-breakdown.md`
* `ProjectDocs/task-assignment.md`
* `adr/0001-use-agent-governance-pack.md` or the next available ADR number when writing to a selected folder

Generated planning, brand, UX, mock approval, task, and assignment files are project artifacts. Uploaded source documents such as PRDs, specs, briefs, and research notes are copied under `ProjectDocs/Source/`. These files should not be stored inside `/.agents/`, which is reserved for agent operating rules, skills, and reusable templates.

Project manager agents should review `ProjectDocs/Source/` before creating project plans, task breakdowns, or task assignments.

## Safety Notes

Do not enter or upload real secrets, production credentials, private keys, tokens, or sensitive operational details.

The wizard runs entirely in the browser. It uses `localStorage` for draft recovery and only writes files after the user chooses a folder and clicks the write action. Uploaded files are not persisted in `localStorage`; reselect them after a browser refresh.
