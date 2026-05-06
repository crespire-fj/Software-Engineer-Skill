<!--
  Project Context Template

  Use this template for PROJECT_CONTEXT.md at the project root.

  This file should give developers and agents enough context to work safely on the project.

  Keep it concise, current, and high-signal. Do not turn it into a full product encyclopedia.

  Update this file when the project purpose, architecture, modules, constraints, integrations, deployment model, or important business rules change.
-->

# Project Context

## Project Summary

Project name:

Project owner or organization:

Primary users:

Current status:

Short description:

> Describe the project in one or two paragraphs.
>
> Explain what the system does, who it serves, and why it exists.

## Problem Statement

Describe the problem this project solves.

Include:

* the user or business pain point
* why the problem matters
* what current process or limitation the system improves

## Solution Overview

Describe the solution at a high level.

Include:

* core product or system capabilities
* main user workflows
* admin or operational workflows
* important differentiators
* known non-goals or out-of-scope areas

## Users and Roles

List the main user types and roles.

For each role, briefly describe what they can do.

Examples:

* public visitor
* registered user
* workspace member
* workspace admin
* system admin
* finance/admin reviewer
* support user

<!-- Document role or permission rules only at a high level here. Detailed rules should live in the relevant module README or security documentation. -->

## Core Modules

List the major modules or feature areas.

For each module, include:

* purpose
* owner or responsibility
* link to module README, if available

Example:

```txt
Module: Billing
Purpose: Handles plans, subscriptions, invoices, and payment activation.
README: /src/modules/billing/README.md
```

## Architecture Overview

Describe the system structure and patterns, including layers, services, data flow, and architectural decisions.

Include:

* frontend architecture
* backend architecture
* major services or layers
* data flow
* background jobs or scheduled tasks
* storage approach
* authentication approach
* authorization approach
* major architectural constraints or decisions

Do not include low-level implementation details unless they are necessary for safe changes.

## Technology Stack

List the specific tools, frameworks, and libraries used. Focus on choices that affect development, testing, and deployment.

Include where relevant:

* frontend
* backend
* database
* ORM or query builder
* authentication
* styling or component system
* hosting
* storage
* email provider
* payment provider
* analytics or logging
* testing tools
* build and deployment tools

## Key Business Rules

Document important business rules that affect development decisions.

Examples:

* subscription rules
* plan or feature gating rules
* workspace or tenant limits
* approval workflows
* payment activation rules
* public visibility rules
* data retention rules
* admin override rules

Keep this section high level. Detailed module-specific rules should live in module READMEs.

## Security and Access Model

Summarize the security model.

Include:

* authentication method
* role or permission model
* workspace, tenant, organization, or ownership boundaries
* admin access rules
* public endpoint considerations
* sensitive data handled by the system
* important security constraints

Detailed security implementation rules belong in `/.agents/skills/security.md` and relevant module READMEs.

## Data and Ownership Model

Summarize important data ownership rules.

Include:

* main entities or records
* who owns what data
* workspace, tenant, organization, or user scope
* important source-of-truth rules
* high-risk data areas

Detailed schema and modeling rules belong in database, migration, and data-modeling documentation.

## External Integrations

List important external systems and providers.

For each integration, include:

* provider name
* purpose
* environment mode, if relevant
* important callbacks or webhooks
* required configuration keys
* owner module
* link to module or integration documentation, if available

Do not include real secrets, credentials, tokens, or private keys.

## Deployment and Environments

Describe how and where the system runs.

Include:

* environments such as local, staging, production
* hosting provider or platform
* deployment method
* build command or process
* runtime requirements
* storage or upload locations
* scheduled tasks or workers
* important environment-specific behavior

Detailed setup instructions should live in README or deployment documentation.

## Configuration Overview

Summarize important configuration categories.

Examples:

* application
* database
* authentication
* email
* payments
* storage
* logging
* analytics
* external APIs

<!-- Do not include real values. Safe placeholder configuration belongs in .env.example. -->

## Operational Concerns

Document important production or support concerns.

Examples:

* known performance-sensitive areas
* high-volume pages or reports
* critical background jobs
* payment or webhook reconciliation
* logs or audit trails operators rely on
* manual review workflows
* backup or recovery expectations
* known hosting limits

## Current Constraints and Risks

List important constraints, risks, or known limitations.

Examples:

* hosting limits
* database connection limits
* incomplete modules
* manual operational steps
* fragile integrations
* performance risks
* security hardening still required
* missing test coverage

Do not hide known risks. Documenting them helps agents avoid unsafe assumptions.

## Roadmap and Planned Changes

List near-term planned work or known future changes.

Keep this section brief and current.

Move detailed planning to issues, project boards, or roadmap documents.

## Documentation Map

List the most important project documents.

Examples:

```txt
AGENTS.md: Agent operating guide
/.agents/INDEX.md: Agent skill index
PROJECT_CONTEXT.md: Project overview and constraints
README.md: Setup and developer workflow
/adr/: Architecture Decision Records
/.agents/templates/: Agent documentation templates
```

Add links to architecture, API, database, deployment, branding, or module docs where they exist.

## Last Updated

Date: YYYY-MM-DD

Summary:

* Short summary of the latest meaningful update to this context file.
* Include the reason if the update followed a major architecture, business rule, integration, deployment, or module change.

Update both the date and the summary when project purpose, architecture, modules, constraints, integrations, deployment, or key business rules change.
