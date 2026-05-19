(() => {
  "use strict";

  const STORAGE_KEY = "software-engineering-governance-onboarding-v1";
  const TODAY = new Date().toISOString().slice(0, 10);

  const form = document.querySelector("#wizardForm");
  const panels = Array.from(document.querySelectorAll(".step-panel"));
  const stepTabs = Array.from(document.querySelectorAll(".step-tab"));
  const previewTabs = Array.from(document.querySelectorAll(".preview-tab"));
  const preview = document.querySelector("#markdownPreview");
  const completionLabel = document.querySelector("#completionLabel");
  const completionBar = document.querySelector("#completionBar");
  const autosaveStatus = document.querySelector("#autosaveStatus");
  const fileAccessStatus = document.querySelector("#fileAccessStatus");
  const actionStatus = document.querySelector("#actionStatus");
  const backButton = document.querySelector("#backButton");
  const nextButton = document.querySelector("#nextButton");
  const chooseFolderButton = document.querySelector("#chooseFolderButton");
  const writeFilesButton = document.querySelector("#writeFilesButton");
  const downloadFilesButton = document.querySelector("#downloadFilesButton");
  const copyPreviewButton = document.querySelector("#copyPreviewButton");
  const sourceDocsInput = document.querySelector("#sourceDocsInput");
  const sourceDocsList = document.querySelector("#sourceDocsList");
  const clearSourceDocsButton = document.querySelector("#clearSourceDocsButton");

  let currentStep = 0;
  let activePreview = "projectContext";
  let directoryHandle = null;
  let selectedSourceFiles = [];

  const MAX_SOURCE_DOC_BYTES = 50 * 1024 * 1024;
  const ALLOWED_SOURCE_DOC_EXTENSIONS = new Set([
    "csv",
    "doc",
    "docx",
    "jpeg",
    "jpg",
    "json",
    "markdown",
    "md",
    "pdf",
    "png",
    "ppt",
    "pptx",
    "txt",
    "webp",
    "xls",
    "xlsx",
    "yaml",
    "yml",
  ]);

  const outputOrder = [
    "projectContext",
    "projectPlan",
    "brandKit",
    "uxBrief",
    "uiMock",
    "taskBreakdown",
    "taskAssignment",
    "sourceDocs",
    "adr",
  ];

  const outputLabels = {
    projectContext: "PROJECT_CONTEXT.md",
    projectPlan: "ProjectDocs/project-plan.md",
    brandKit: "ProjectDocs/brand-identity-kit.md",
    uxBrief: "ProjectDocs/ux-design-brief.md",
    uiMock: "ProjectDocs/ui-mock-approval.md",
    taskBreakdown: "ProjectDocs/task-breakdown.md",
    taskAssignment: "ProjectDocs/task-assignment.md",
    sourceDocs: "ProjectDocs/Source/uploaded documents",
    adr: "adr/0001-use-agent-governance-pack.md",
  };

  function fieldValue(name) {
    const element = form.elements.namedItem(name);
    return element ? String(element.value || "").trim() : "";
  }

  function collectValues() {
    return Object.fromEntries(
      Array.from(form.elements)
        .filter((element) => element.name && element.type !== "checkbox")
        .map((element) => [element.name, String(element.value || "").trim()])
    );
  }

  function fallback(value, text = "TBD") {
    return value && value.trim() ? value.trim() : text;
  }

  function bullets(value) {
    const lines = String(value || "")
      .split(/\r?\n|,/)
      .map((line) => line.trim().replace(/^[-*]\s+/, ""))
      .filter(Boolean);

    if (!lines.length) {
      return "* TBD";
    }

    return lines.map((line) => `* ${line}`).join("\n");
  }

  function safeFileName(name) {
    return String(name || "document")
      .replace(/[<>:"/\\|?*\u0000-\u001f]/g, "-")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 180) || "document";
  }

  function fileExtension(name) {
    const parts = String(name || "").toLowerCase().split(".");
    return parts.length > 1 ? parts.pop() : "";
  }

  function isAllowedSourceFile(file) {
    const extension = fileExtension(file.name);
    return ALLOWED_SOURCE_DOC_EXTENSIONS.has(extension) && file.size <= MAX_SOURCE_DOC_BYTES;
  }

  function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes <= 0) {
      return "0 B";
    }

    const units = ["B", "KB", "MB", "GB"];
    const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    const value = bytes / 1024 ** index;
    return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)} ${units[index]}`;
  }

  function sourceDocEntries() {
    return selectedSourceFiles.map((file) => ({
      name: safeFileName(file.name),
      size: formatBytes(file.size),
      path: `ProjectDocs/Source/${safeFileName(file.name)}`,
    }));
  }

  function sourceDocBullets() {
    const entries = sourceDocEntries();
    if (!entries.length) {
      return "* No source documents uploaded through the wizard.";
    }

    return entries.map((entry) => `* ${entry.path} (${entry.size})`).join("\n");
  }

  function section(title, body) {
    return `## ${title}\n\n${fallback(body)}\n`;
  }

  function line(label, value) {
    return `${label}: ${fallback(value)}`;
  }

  function slugify(value) {
    const slug = String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return slug || "project";
  }

  function projectName(values) {
    return fallback(values.projectName, "Project Name");
  }

  function brandName(values) {
    return fallback(values.brandName || values.projectName, "Brand Name");
  }

  function buildProjectContext(values) {
    const modules = values.mvpScope || values.workflows || "TBD";

    return `# Project Context

## Project Summary

${line("Project name", projectName(values))}

${line("Project owner or organization", values.owner)}

${line("Primary users", values.users)}

${line("Current status", values.currentStatus)}

${line("Application type", values.appType)}

${fallback(values.summary)}

${section("Problem Statement", values.problem)}
${section("Solution Overview", values.solution || values.productGoal)}
## Users and Roles

${bullets(values.roles || values.users)}

## Core Modules

${bullets(modules)}

## Architecture Overview

${fallback(values.stack)}

## Technology Stack

${line("Primary stack", values.stack)}

${line("Database", values.database)}

${line("Authentication", values.authModel)}

## Key Business Rules

${bullets(values.successCriteria)}

## Security and Access Model

${line("Authentication model", values.authModel)}

${line("Data ownership", values.dataOwnership)}

Sensitive data:

${bullets(values.sensitiveData)}

Retention, export, and deletion:

${bullets(values.retention)}

## Data and Ownership Model

${fallback(values.dataOwnership)}

## External Integrations

${bullets(values.integrations)}

## Deployment and Environments

${fallback(values.deployment)}

## Configuration Overview

${bullets(values.configNeeds)}

## Operational Concerns

${bullets(values.risks)}

## Current Constraints and Risks

${bullets(values.risks || values.assumptions)}

## Roadmap and Planned Changes

${bullets(values.milestones || values.mvpScope)}

## Documentation Map

* AGENTS.md: root operating guide and non-negotiables
* /.agents/INDEX.md: skill manifest and routing guide
* PROJECT_CONTEXT.md: project context and constraints
* ProjectDocs/: project documents, source PRDs/specs, planning artifacts, and design approvals
* ProjectDocs/Source/: uploaded source documents for project-manager review
* ProjectDocs/project-plan.md: delivery plan
* ProjectDocs/brand-identity-kit.md: brand direction
* ProjectDocs/ux-design-brief.md: user experience direction
* ProjectDocs/ui-mock-approval.md: design approval record
* ProjectDocs/task-breakdown.md: implementation-ready tasks
* ProjectDocs/task-assignment.md: assigned work boundaries
* /adr/: project decision records

## Source Documents

Project manager agents must review source documents before creating project plans, task breakdowns, or task assignments.

${sourceDocBullets()}

Document review notes:

${fallback(values.documentNotes)}

## Last Updated

Date: ${TODAY}

Summary:

* Created with the governance onboarding wizard.
`;
  }

  function buildProjectPlan(values) {
    return `# Project Plan

## Status

Status: ${fallback(values.approvalStatus, "Draft")}

## Summary

${line("Project or feature", projectName(values))}

${line("Owner", values.owner)}

${line("Date", TODAY)}

## Source Documents

Review these source documents before treating this plan as approved:

${sourceDocBullets()}

Document review notes:

${fallback(values.documentNotes)}

## Product Goal

${fallback(values.productGoal || values.summary)}

## Target Users

${fallback(values.users)}

## Primary Workflows

${bullets(values.workflows || values.primaryJourney)}

## MVP Scope

${bullets(values.mvpScope)}

## Out of Scope

${bullets(values.outOfScope)}

## Assumptions

${bullets(values.assumptions)}

## Risks

${bullets(values.risks)}

## Architecture Direction

${fallback(values.stack)}

## Data and Privacy Expectations

${bullets([values.dataOwnership, values.sensitiveData, values.retention].filter(Boolean).join("\n"))}

## Integrations

${bullets(values.integrations)}

## Milestones

${bullets(values.milestones)}

## Success Criteria

${bullets(values.successCriteria)}

## Open Questions

${bullets(values.openQuestions)}
`;
  }

  function buildBrandKit(values) {
    return `# Brand Identity Kit

## Status

Status: ${fallback(values.approvalStatus, "Draft")}

## Product or Brand

${line("Name", brandName(values))}

${line("Date", TODAY)}

## Positioning

${fallback(values.productGoal || values.summary)}

## Personality and Tone

${fallback(values.tone)}

## Voice Guidance

${fallback(values.tone)}

## Color Palette

${fallback(values.colorDirection)}

## Typography

${fallback(values.typography)}

## Spacing, Radius, and Density

TBD

## Icon and Illustration Style

${fallback(values.imagery)}

## Imagery

${fallback(values.imagery)}

## Charts and Data Visualization

TBD

## Accessibility Notes

${fallback(values.accessibility)}

## Image Gen Readiness

${fallback(values.imageGenReadiness, "Brand kit must be approved before generated UI mock concepts.")}

## Do

* Follow the approved brand direction.
* Keep accessibility and contrast requirements visible during UI design.
* Use generated mock concepts only after brand approval.

## Do Not

* Use real third-party marks or copyrighted assets without rights.
* Treat generated mock images as implementation requirements without translating them into concrete UI specs.
* Store long-lived brand decisions only in chat.

## Open Questions

${bullets(values.openQuestions)}
`;
  }

  function buildUxBrief(values) {
    return `# UX Design Brief

## Status

Status: ${fallback(values.approvalStatus, "Draft")}

## Source

${line("Project plan", "ProjectDocs/project-plan.md")}

${line("Brand kit", "ProjectDocs/brand-identity-kit.md")}

${line("Date", TODAY)}

## Users and Jobs

${fallback(values.users)}

## Primary Workflows

${fallback(values.primaryJourney || values.workflows)}

## Secondary Workflows

${fallback(values.secondaryJourney)}

## Onboarding

TBD

## Navigation and Information Architecture

TBD

## Forms and Validation

Server-side validation is required for user-controlled data. Client-side validation is user experience only.

## States

${bullets(values.states)}

## Privacy and Trust Moments

${bullets([values.sensitiveData, values.retention, values.dataOwnership].filter(Boolean).join("\n"))}

## Notifications and Reminders

TBD

## Responsive Priority

${fallback(values.mobilePriority)}

## Accessibility

${fallback(values.accessibility)}

## Open Questions

${bullets(values.openQuestions)}
`;
  }

  function buildUiMockApproval(values) {
    return `# UI Mock Approval

## Status

Status: Draft

## Source

${line("Project plan", "ProjectDocs/project-plan.md")}

${line("Brand kit", "ProjectDocs/brand-identity-kit.md")}

${line("UX brief", "ProjectDocs/ux-design-brief.md")}

${line("Date", TODAY)}

## Screens or Flows Covered

${bullets(values.workflows || values.primaryJourney)}

## Mock Artifacts

TBD. After the brand identity kit is finalized, agents may use Image Gen skills or approved image-generation tooling to create mock design concepts, screen comps, visual references, or supporting bitmap assets.

## Desktop Layout

TBD

## Mobile Layout

${fallback(values.mobilePriority)}

## Interaction States

${bullets(values.states)}

## Data States

${bullets(values.states)}

## Accessibility Notes

${fallback(values.accessibility)}

## Implementation Notes

Generated mock images are references for approval. Translate approved visual decisions into explicit tokens, components, layout rules, copy, states, accessibility requirements, and behavior constraints before implementation.

## Approval Notes

${line("Approved by", "TBD")}

${line("Approval date", "TBD")}

Changes requested:

* TBD

Open questions:

${bullets(values.openQuestions)}
`;
  }

  function taskSections(values) {
    const taskLines = String(values.initialTasks || "")
      .split(/\r?\n/)
      .map((line) => line.trim().replace(/^[-*]\s+/, ""))
      .filter(Boolean);

    if (!taskLines.length) {
      return `### Task: Define first implementation slice

Objective: Convert the approved project plan, brand kit, UX brief, and mock approval into the first implementation task.

Module or ownership area: TBD

Required skills: security.md, modules.md, testing.md, documentation.md

Dependencies: Project manager review of ProjectDocs/Source, approved project plan, and required design artifacts.

In scope: TBD

Out of scope: TBD

Affected contracts or data: TBD

Acceptance criteria:

* TBD

Test and verification expectations:

* TBD

Documentation impact: TBD

Risk level: TBD

Open questions:

${bullets(values.openQuestions)}
`;
    }

    return taskLines
      .map((title, index) => `### Task ${index + 1}: ${title}

Objective: ${title}

Module or ownership area: TBD

Required skills: security.md, modules.md, testing.md, documentation.md

Dependencies: TBD

In scope: TBD

Out of scope: TBD

Affected contracts or data: TBD

Acceptance criteria:

* ${title} is implemented according to the approved plan.
* Server-side authorization and validation are handled where required.
* Relevant tests or checks are completed.

Test and verification expectations:

* Add or update tests appropriate to the risk.
* Run existing checks where available.

Documentation impact: Update relevant docs, module READMEs, or ADRs where required.

Risk level: TBD

Open questions:

${bullets(values.openQuestions)}
`)
      .join("\n");
  }

  function buildTaskBreakdown(values) {
    return `# Task Breakdown

## Status

Status: Draft

## Source

${line("Project plan", "ProjectDocs/project-plan.md")}

${line("Design approval", "ProjectDocs/ui-mock-approval.md")}

${line("Date", TODAY)}

## Tasks

${taskSections(values)}
`;
  }

  function assignmentSections(values) {
    const assignmentLines = String(values.assignments || "")
      .split(/\r?\n/)
      .map((line) => line.trim().replace(/^[-*]\s+/, ""))
      .filter(Boolean);

    if (!assignmentLines.length) {
      return `## Assignment Summary

Task: TBD

Owner or role: TBD

Date: ${TODAY}

## Goal

TBD

## Scope

Files, modules, or responsibilities in scope:

* TBD

Files, modules, or responsibilities out of scope:

* TBD

## Required Skills

* security.md
* modules.md
* testing.md
* documentation.md

## Dependencies

* Project manager review of source documents under ProjectDocs/Source.
* Approved task breakdown.

## Expected Output

TBD

## Coordination Notes

The integration owner remains responsible for final review, verification, and conflict resolution.

## Verification

* Run or document relevant checks.

## Stop-and-Ask Conditions

${bullets(values.openQuestions)}
`;
    }

    return assignmentLines
      .map((assignment, index) => `## Assignment ${index + 1}

Task: TBD

Owner or role: ${assignment}

Date: ${TODAY}

## Goal

TBD

## Scope

Files, modules, or responsibilities in scope:

* TBD

Files, modules, or responsibilities out of scope:

* TBD

## Required Skills

* security.md
* modules.md
* testing.md
* documentation.md

## Dependencies

* Project manager review of source documents under ProjectDocs/Source.
* Approved task breakdown.

## Expected Output

TBD

## Coordination Notes

The integration owner remains responsible for final review, verification, and conflict resolution.

## Verification

* Run or document relevant checks.

## Stop-and-Ask Conditions

${bullets(values.openQuestions)}
`)
      .join("\n");
  }

  function buildTaskAssignment(values) {
    return `# Task Assignment

## Status

Status: Draft

${assignmentSections(values)}
`;
  }

  function buildAdr(values, adrNumber = "0001") {
    const title = `Use Agent Governance Pack for ${projectName(values)}`;

    return `# ADR ${adrNumber}: ${title}

## Status

Status: Proposed

## Date

${TODAY}

## Context

${projectName(values)} needs a shared operating model for human developers and AI agents. The project context, planning artifacts, implementation tasks, task assignments, skill routing, stop conditions, and decision records should be visible in the repository before implementation proceeds.

## Decision

Use the Software Engineering Agent Governance Pack in this repository.

The project will keep root-level context in \`PROJECT_CONTEXT.md\`, reusable agent rules under \`/.agents/\`, project-specific source documents and planning artifacts under \`/ProjectDocs/\`, and decision records under \`/adr/\`.

## Consequences

* Agents and contributors have a shared workflow for planning, implementation, review, testing, and documentation.
* Project manager agents must review relevant source documents in \`ProjectDocs/Source/\` before creating or assigning tasks.
* Broad ideas should move through project planning, brand identity, UX design, UI mock approval, task breakdown, and task assignment before implementation.
* Project artifacts must stay current as the product, architecture, and delivery plan evolve.

## Alternatives Considered

No repository-level governance pack.

This was not selected because it leaves project context, safety rules, and implementation workflow implicit.

## Implementation Notes

This ADR was generated as a draft by the local onboarding wizard. Review and update it before marking it accepted.

## Related

* \`AGENTS.md\`
* \`PROJECT_CONTEXT.md\`
* \`/.agents/INDEX.md\`
* \`ProjectDocs/project-plan.md\`
* \`ProjectDocs/Source/\`

## Supersedes

None.

## Superseded By

`;
  }

  function buildOutputs(options = {}) {
    const values = collectValues();
    const adrNumber = options.adrNumber || "0001";

    return {
      projectContext: {
        path: "PROJECT_CONTEXT.md",
        content: buildProjectContext(values),
      },
      projectPlan: {
        path: "ProjectDocs/project-plan.md",
        content: buildProjectPlan(values),
      },
      brandKit: {
        path: "ProjectDocs/brand-identity-kit.md",
        content: buildBrandKit(values),
      },
      uxBrief: {
        path: "ProjectDocs/ux-design-brief.md",
        content: buildUxBrief(values),
      },
      uiMock: {
        path: "ProjectDocs/ui-mock-approval.md",
        content: buildUiMockApproval(values),
      },
      taskBreakdown: {
        path: "ProjectDocs/task-breakdown.md",
        content: buildTaskBreakdown(values),
      },
      taskAssignment: {
        path: "ProjectDocs/task-assignment.md",
        content: buildTaskAssignment(values),
      },
      sourceDocs: {
        path: "ProjectDocs/Source/",
        files: selectedSourceFiles,
      },
      adr: {
        path: `adr/${adrNumber}-use-agent-governance-pack.md`,
        content: buildAdr(values, adrNumber),
      },
    };
  }

  function selectedOutputIds() {
    return Array.from(document.querySelectorAll('input[name="output"]:checked')).map((box) => box.value);
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collectValues()));
    autosaveStatus.textContent = "Draft saved locally";
  }

  function restoreState() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }

    try {
      const data = JSON.parse(raw);
      Object.entries(data).forEach(([name, value]) => {
        const element = form.elements.namedItem(name);
        if (element) {
          element.value = value;
        }
      });
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  function updateCompletion() {
    const tracked = [
      "projectName",
      "owner",
      "summary",
      "documentNotes",
      "problem",
      "productGoal",
      "workflows",
      "mvpScope",
      "stack",
      "authModel",
      "dataOwnership",
      "tone",
      "primaryJourney",
      "milestones",
      "initialTasks",
      "openQuestions",
    ];

    const completed = tracked.filter((name) => fieldValue(name)).length + (selectedSourceFiles.length ? 1 : 0);
    const total = tracked.length + 1;
    const percent = Math.round((completed / total) * 100);
    completionLabel.textContent = `${percent}%`;
    completionBar.style.width = `${percent}%`;
  }

  function updateStepState() {
    panels.forEach((panel, index) => {
      panel.classList.toggle("is-active", index === currentStep);
    });

    stepTabs.forEach((tab, index) => {
      tab.classList.toggle("is-active", index === currentStep);
      tab.classList.toggle("is-complete", index < currentStep);
    });

    backButton.disabled = currentStep === 0;
    nextButton.textContent = currentStep === panels.length - 1 ? "Preview" : "Next";
  }

  function setStep(index) {
    currentStep = Math.max(0, Math.min(index, panels.length - 1));
    updateStepState();
    updatePreview();
  }

  function updatePreview() {
    const outputs = buildOutputs();
    preview.textContent = outputs[activePreview]?.content || "";
  }

  function setActivePreview(id) {
    activePreview = id;
    previewTabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.preview === id));
    updatePreview();
  }

  function downloadFile(path, content) {
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = path.split("/").pop();
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  function downloadBlob(path, blob) {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = path.split("/").pop();
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  function renderSourceDocs() {
    sourceDocsList.innerHTML = "";

    if (!selectedSourceFiles.length) {
      const emptyItem = document.createElement("li");
      emptyItem.textContent = "No source documents selected.";
      sourceDocsList.append(emptyItem);
      return;
    }

    sourceDocEntries().forEach((entry) => {
      const item = document.createElement("li");
      const name = document.createElement("strong");
      const meta = document.createElement("span");
      name.textContent = entry.name;
      meta.textContent = `${entry.size} -> ${entry.path}`;
      item.append(name, meta);
      sourceDocsList.append(item);
    });
  }

  async function getDirectoryForPath(root, pathParts) {
    let current = root;
    for (const part of pathParts) {
      current = await current.getDirectoryHandle(part, { create: true });
    }
    return current;
  }

  async function fileExists(root, path) {
    const parts = path.split("/");
    const filename = parts.pop();
    let current = root;

    try {
      for (const part of parts) {
        current = await current.getDirectoryHandle(part);
      }
      await current.getFileHandle(filename);
      return true;
    } catch {
      return false;
    }
  }

  async function writeFile(root, path, content) {
    const parts = path.split("/");
    const filename = parts.pop();
    const directory = await getDirectoryForPath(root, parts);
    const exists = await fileExists(root, path);

    if (exists) {
      const shouldOverwrite = window.confirm(`${path} already exists. Overwrite it?`);
      if (!shouldOverwrite) {
        return "skipped";
      }
    }

    const handle = await directory.getFileHandle(filename, { create: true });
    const writable = await handle.createWritable();
    await writable.write(content);
    await writable.close();
    return exists ? "updated" : "created";
  }

  async function writeSourceDocument(root, file) {
    const path = `ProjectDocs/Source/${safeFileName(file.name)}`;
    const parts = path.split("/");
    const filename = parts.pop();
    const directory = await getDirectoryForPath(root, parts);
    const exists = await fileExists(root, path);

    if (exists) {
      const shouldOverwrite = window.confirm(`${path} already exists. Overwrite it?`);
      if (!shouldOverwrite) {
        return { result: "skipped", path };
      }
    }

    const handle = await directory.getFileHandle(filename, { create: true });
    const writable = await handle.createWritable();
    await writable.write(file);
    await writable.close();
    return { result: exists ? "updated" : "created", path };
  }

  async function nextAdrNumber(root) {
    let adrDir;
    try {
      adrDir = await root.getDirectoryHandle("adr", { create: true });
    } catch {
      return "0001";
    }

    let max = 0;
    for await (const [name, handle] of adrDir.entries()) {
      if (handle.kind !== "file") {
        continue;
      }
      const match = name.match(/^(\d{4})-/);
      if (match) {
        max = Math.max(max, Number(match[1]));
      }
    }

    return String(max + 1).padStart(4, "0");
  }

  async function chooseFolder() {
    if (!("showDirectoryPicker" in window)) {
      actionStatus.textContent = "Folder writing is not available in this browser. Use downloads instead.";
      return;
    }

    try {
      directoryHandle = await window.showDirectoryPicker({ mode: "readwrite" });
      fileAccessStatus.textContent = `Folder selected: ${directoryHandle.name}`;
      actionStatus.textContent = "Folder access ready.";
    } catch (error) {
      if (error.name !== "AbortError") {
        actionStatus.textContent = "Folder selection failed.";
      }
    }
  }

  async function writeSelectedFiles() {
    if (!directoryHandle) {
      await chooseFolder();
      if (!directoryHandle) {
        return;
      }
    }

    const ids = selectedOutputIds();
    if (!ids.length) {
      actionStatus.textContent = "No files selected.";
      return;
    }

    try {
      const adrNumber = ids.includes("adr") ? await nextAdrNumber(directoryHandle) : "0001";
      const outputs = buildOutputs({ adrNumber });
      const results = [];

      for (const id of ids) {
        if (id === "sourceDocs") {
          if (!selectedSourceFiles.length) {
            results.push("skipped: no source documents selected");
            continue;
          }

          for (const file of selectedSourceFiles) {
            const sourceResult = await writeSourceDocument(directoryHandle, file);
            results.push(`${sourceResult.result}: ${sourceResult.path}`);
          }
          continue;
        }

        const output = outputs[id];
        const result = await writeFile(directoryHandle, output.path, output.content);
        results.push(`${result}: ${output.path}`);
      }

      actionStatus.textContent = results.join(" | ");
    } catch {
      actionStatus.textContent = "Writing files failed. Check browser permissions and try again.";
    }
  }

  function downloadSelectedFiles() {
    const ids = selectedOutputIds();
    const outputs = buildOutputs();

    if (!ids.length) {
      actionStatus.textContent = "No files selected.";
      return;
    }

    ids.forEach((id, index) => {
      if (id === "sourceDocs") {
        selectedSourceFiles.forEach((file, fileIndex) => {
          window.setTimeout(
            () => downloadBlob(`ProjectDocs/Source/${safeFileName(file.name)}`, file),
            (index + fileIndex) * 120
          );
        });
        return;
      }

      const output = outputs[id];
      window.setTimeout(() => downloadFile(output.path, output.content), index * 120);
    });

    const fileCount = ids.reduce((count, id) => count + (id === "sourceDocs" ? selectedSourceFiles.length : 1), 0);
    if (!fileCount) {
      actionStatus.textContent = "No downloadable files selected.";
      return;
    }
    actionStatus.textContent = `Queued ${fileCount} download${fileCount === 1 ? "" : "s"}.`;
  }

  async function copyPreview() {
    try {
      await navigator.clipboard.writeText(preview.textContent);
      actionStatus.textContent = "Preview copied.";
    } catch {
      actionStatus.textContent = "Copy failed. Select the preview text manually.";
    }
  }

  form.addEventListener("input", () => {
    saveState();
    updateCompletion();
    updatePreview();
  });

  stepTabs.forEach((tab) => {
    tab.addEventListener("click", () => setStep(Number(tab.dataset.stepTarget)));
  });

  previewTabs.forEach((tab) => {
    tab.addEventListener("click", () => setActivePreview(tab.dataset.preview));
  });

  backButton.addEventListener("click", () => setStep(currentStep - 1));

  nextButton.addEventListener("click", () => {
    if (currentStep === panels.length - 1) {
      updatePreview();
      preview.focus();
      return;
    }
    setStep(currentStep + 1);
  });

  chooseFolderButton.addEventListener("click", chooseFolder);
  writeFilesButton.addEventListener("click", writeSelectedFiles);
  downloadFilesButton.addEventListener("click", downloadSelectedFiles);
  copyPreviewButton.addEventListener("click", copyPreview);

  document.querySelectorAll('input[name="output"]').forEach((box) => {
    box.addEventListener("change", () => {
      actionStatus.textContent = `${selectedOutputIds().length} file${selectedOutputIds().length === 1 ? "" : "s"} selected.`;
    });
  });

  sourceDocsInput.addEventListener("change", () => {
    const incoming = Array.from(sourceDocsInput.files || []);
    const accepted = [];
    const rejected = [];

    incoming.forEach((file) => {
      if (isAllowedSourceFile(file)) {
        accepted.push(file);
      } else {
        rejected.push(file.name);
      }
    });

    const existingKeys = new Set(selectedSourceFiles.map((file) => `${file.name}:${file.size}:${file.lastModified}`));
    accepted.forEach((file) => {
      const key = `${file.name}:${file.size}:${file.lastModified}`;
      if (!existingKeys.has(key)) {
        selectedSourceFiles.push(file);
        existingKeys.add(key);
      }
    });

    sourceDocsInput.value = "";
    renderSourceDocs();
    updateCompletion();
    updatePreview();

    if (rejected.length) {
      actionStatus.textContent = `Skipped unsupported or oversized files: ${rejected.map(safeFileName).join(", ")}.`;
    } else if (accepted.length) {
      actionStatus.textContent = `${accepted.length} source document${accepted.length === 1 ? "" : "s"} ready for ProjectDocs/Source.`;
    }
  });

  clearSourceDocsButton.addEventListener("click", () => {
    selectedSourceFiles = [];
    renderSourceDocs();
    updateCompletion();
    updatePreview();
    actionStatus.textContent = "Source documents cleared.";
  });

  restoreState();
  renderSourceDocs();
  updateCompletion();
  updateStepState();
  setActivePreview(activePreview);
})();
