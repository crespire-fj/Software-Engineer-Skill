#!/usr/bin/env python3
"""Validate the software engineering agent governance pack."""

from __future__ import annotations

import pathlib
import re
import sys
import tomllib


ROOT = pathlib.Path(__file__).resolve().parents[1]


def rel(path: pathlib.Path) -> str:
    return path.relative_to(ROOT).as_posix()


def read_text(path: pathlib.Path) -> str:
    return path.read_text(encoding="utf-8")


def add_error(errors: list[str], message: str) -> None:
    errors.append(message)


def validate_required_files(errors: list[str]) -> None:
    required = [
        "AGENTS.md",
        "README.md",
        "PROJECT_CONTEXT.md",
        ".agents/INDEX.md",
        ".agents/templates/adr.md",
        ".agents/templates/module-readme.md",
        ".agents/templates/project-context.md",
        ".agents/templates/codex-agent.toml",
        ".codex/config.example.toml",
        ".codex/agents/README.md",
    ]

    for item in required:
        path = ROOT / item
        if not path.exists():
            add_error(errors, f"Missing required file: {item}")
        elif path.is_file() and path.stat().st_size == 0:
            add_error(errors, f"Required file is empty: {item}")


def validate_skill_index(errors: list[str]) -> None:
    index_path = ROOT / ".agents" / "INDEX.md"
    agents_path = ROOT / "AGENTS.md"
    skills_dir = ROOT / ".agents" / "skills"

    if not index_path.exists() or not skills_dir.exists():
        return

    index_text = read_text(index_path)
    routing_text = read_text(agents_path) + "\n" + index_text if agents_path.exists() else index_text
    skill_files = sorted(path.name for path in skills_dir.glob("*.md"))

    if not skill_files:
        add_error(errors, "No skill files found under .agents/skills")
        return

    for skill_file in skill_files:
        expected_path = f"`/.agents/skills/{skill_file}`"
        if expected_path not in index_text:
            add_error(errors, f"Skill missing from .agents/INDEX.md available skills table: {skill_file}")

    known_non_skill_refs = {
        "AGENTS.md",
        "INDEX.md",
        "PROJECT_CONTEXT.md",
        "README.md",
        "adr.md",
        "module-readme.md",
        "project-context.md",
        "project-plan.md",
        "task-breakdown.md",
        "task-assignment.md",
        "brand-identity-kit.md",
        "ux-design-brief.md",
        "ui-mock-approval.md",
    }

    referenced_md = set(re.findall(r"`([A-Za-z0-9_.-]+\.md)`", routing_text))
    for ref in sorted(referenced_md):
        if ref in known_non_skill_refs:
            continue
        if ref.startswith("000"):
            continue
        if not (skills_dir / ref).exists():
            add_error(errors, f"Referenced skill file does not exist: {ref}")


def validate_codex_agents(errors: list[str]) -> None:
    agents_dir = ROOT / ".codex" / "agents"
    agents_readme = agents_dir / "README.md"

    if not agents_dir.exists():
        add_error(errors, "Missing .codex/agents directory")
        return

    agent_files = sorted(agents_dir.glob("*.toml"))
    if not agent_files:
        add_error(errors, "No Codex agent TOML files found under .codex/agents")
        return

    names: dict[str, pathlib.Path] = {}
    readme_text = read_text(agents_readme) if agents_readme.exists() else ""

    for path in agent_files:
        try:
            data = tomllib.loads(read_text(path))
        except tomllib.TOMLDecodeError as exc:
            add_error(errors, f"{rel(path)} is not valid TOML: {exc}")
            continue

        for field in ("name", "description", "developer_instructions", "model", "model_reasoning_effort", "sandbox_mode"):
            if not data.get(field):
                add_error(errors, f"{rel(path)} missing required field: {field}")

        name = data.get("name")
        if not isinstance(name, str):
            continue

        if path.stem != name:
            add_error(errors, f"{rel(path)} filename should match name field '{name}'")

        if name in names:
            add_error(errors, f"Duplicate agent name '{name}' in {rel(path)} and {rel(names[name])}")
        names[name] = path

        sandbox = data.get("sandbox_mode")
        if sandbox not in {"read-only", "workspace-write"}:
            add_error(errors, f"{rel(path)} has unsupported sandbox_mode: {sandbox!r}")

        if sandbox == "workspace-write":
            instructions = str(data.get("developer_instructions", "")).lower()
            if "assigned" not in instructions or "scope" not in instructions:
                add_error(errors, f"{rel(path)} is workspace-write but does not clearly limit assigned scope")

        description = data.get("description")
        if isinstance(description, str) and len(description) > 180:
            add_error(errors, f"{rel(path)} description is longer than 180 characters")

        if readme_text and f"`{name}`" not in readme_text:
            add_error(errors, f"{rel(path)} is missing from .codex/agents/README.md")


def validate_project_context(errors: list[str]) -> None:
    path = ROOT / "PROJECT_CONTEXT.md"
    if not path.exists():
        return

    text = read_text(path)
    if len(text.strip()) < 500:
        add_error(errors, "PROJECT_CONTEXT.md is too small to provide useful project context")

    placeholder_patterns = [
        re.compile(r"(?m)^Project name:\s*$"),
        re.compile(r"(?m)^Project owner or organization:\s*$"),
        re.compile(r"(?m)^Current status:\s*$"),
        re.compile(r"YYYY-MM-DD"),
        re.compile(r"> Describe the project"),
    ]
    for pattern in placeholder_patterns:
        if pattern.search(text):
            add_error(errors, f"PROJECT_CONTEXT.md still contains template placeholder matching: {pattern.pattern}")


def validate_secret_patterns(errors: list[str]) -> None:
    secret_patterns = [
        re.compile(r"sk-[A-Za-z0-9_-]{20,}"),
        re.compile(r"AKIA[0-9A-Z]{16}"),
        re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----"),
        re.compile(r"(?i)(password|secret|token|api[_-]?key)\s*=\s*['\"][^'\"\n]{12,}['\"]"),
    ]

    ignored_dirs = {".git"}
    text_suffixes = {".md", ".toml", ".txt", ".py", ".ps1", ".json", ".yml", ".yaml", ".html", ".css", ".js", ".example"}

    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        if any(part in ignored_dirs for part in path.parts):
            continue
        if path.suffix.lower() not in text_suffixes and path.name != ".env.example":
            continue

        try:
            text = read_text(path)
        except UnicodeDecodeError:
            continue

        for pattern in secret_patterns:
            if pattern.search(text):
                add_error(errors, f"Potential secret-like value found in {rel(path)}")
                break


def main() -> int:
    errors: list[str] = []

    validate_required_files(errors)
    validate_skill_index(errors)
    validate_codex_agents(errors)
    validate_project_context(errors)
    validate_secret_patterns(errors)

    if errors:
        print("Governance pack validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print("Governance pack validation passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
