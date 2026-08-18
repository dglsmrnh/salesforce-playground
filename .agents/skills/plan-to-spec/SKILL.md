---
name: plan-to-spec
description: Convert an approved Codex plan into a persistent project specification under docs/specs. Use after Plan Mode when the user wants the plan, technical decisions, requirements, acceptance criteria, and implementation scope preserved as a repository artifact.
---

# Plan to Spec

Convert an approved Codex plan into a durable specification stored in the repository.

This skill complements Codex Plan Mode. Do not replace or reproduce Plan Mode's planning behavior. The purpose of this skill is to persist the approved plan and its relevant technical context as a maintainable specification.

## When to Use

Use this skill when the user asks to:

- save the current plan as a spec;
- turn an approved plan into a specification;
- document the implementation plan for future work;
- persist the current task design under `docs/specs`.

Do not use it for trivial changes unless the user explicitly requests a spec.

## Output Location

Store specifications under:

```text
docs/specs/
```

Use a descriptive filename:

```text
docs/specs/<short-feature-name>.md
```

If the repository already has a naming convention under `docs/specs`, follow it.

Do not overwrite an existing specification unless the user explicitly asks to update it or the existing specification clearly represents the same work.

## Process

### 1. Confirm the Plan

Use the most recent approved Codex plan as the primary source.

Do not invent implementation decisions that are not supported by:

- the approved plan;
- the repository;
- applicable `AGENTS.md` files;
- existing project documentation;
- explicit user decisions.

If the plan is incomplete or materially ambiguous, ask for clarification rather than fabricating requirements.

### 2. Acquire Relevant Context

Before writing the spec:

1. Read the applicable `AGENTS.md` files.
2. Inspect relevant documentation under `docs/`.
3. Inspect the existing code and metadata referenced by the plan.
4. Identify affected Salesforce components.
5. Identify existing architectural patterns that constrain the implementation.

For Salesforce work, consider:

- Apex classes and their architectural layers.
- Triggers and Trigger Handlers.
- Domains, Services, and Selectors.
- LWC components.
- Salesforce metadata.
- Existing automation.
- Tests and test factories.
- Security requirements.
- Governor limits.
- Integrations and external dependencies.

Do not copy large amounts of source code into the specification.

### 3. Create the Specification

Use this structure unless the repository already defines a more specific format:

```markdown
# Feature: <name>

## Objective

<problem and desired outcome>

## Context

<relevant current behavior and technical context>

## Requirements

### FR-01

<functional requirement>

### FR-02

<functional requirement>

## Acceptance Criteria

- [ ] <criterion>
- [ ] <criterion>

## Technical Design

### Architecture

<affected components and responsibilities>

### Salesforce Changes

<classes, triggers, LWC, metadata, integrations, etc.>

### Data and Transactions

<relevant data flow and transaction behavior>

### Security

<CRUD/FLS, sharing, authentication, authorization, or other relevant considerations>

## Implementation Plan

1. <step>
2. <step>
3. <step>

## Validation

- [ ] Prettier
- [ ] ESLint
- [ ] PMD
- [ ] Apex tests
- [ ] Jest
- [ ] SonarQube, when applicable

## Decisions

### <decision>

<decision and rationale>

## Out of Scope

- <explicit non-goal>

## Status

- [ ] Specification approved
- [ ] Implementation complete
- [ ] Validation complete
```

Only include sections that are relevant. Do not add empty boilerplate.

### 4. Preserve the Plan

The implementation plan should remain recognizable after conversion.

Do not rewrite the plan into generic statements such as:

```text
Implement the feature.
Add tests.
Run validation.
```

Instead, preserve concrete implementation steps, affected components, dependencies, and important technical decisions from the approved plan.

### 5. Separate Requirements from Implementation

Requirements describe **what the system must do**.

Technical design and implementation plan describe **how the repository will implement it**.

Do not turn an implementation detail into a functional requirement unless the requirement itself depends on that detail.

### 6. Record Decisions

Capture important decisions made during planning, especially decisions that future developers or agents would otherwise have to rediscover.

Examples:

- why an existing architectural layer is used;
- why a native Salesforce capability is preferred over a custom abstraction;
- why a specific metadata approach was selected;
- important compatibility constraints;
- intentionally excluded approaches.

Keep decision rationale concise.

### 7. Review Before Saving

Before writing the file, verify:

```text
[ ] The spec reflects the approved plan.
[ ] Requirements are testable.
[ ] Acceptance criteria are concrete.
[ ] Affected components are identified.
[ ] Architectural constraints are documented.
[ ] Important decisions are preserved.
[ ] Out-of-scope items are explicit when useful.
[ ] No unsupported assumptions were introduced.
```

### 8. After Saving

Return the path of the created specification.

If implementation is going to continue immediately, use the saved specification as a persistent reference and keep implementation aligned with it.

If implementation later diverges from the approved design, update the specification only when the change represents an agreed change in scope, behavior, or architectural decision.

Do not update the specification merely to hide an implementation mistake.

## Naming

Prefer concise, stable names based on the feature or change:

```text
docs/specs/customer-contact-sync.md
docs/specs/case-routing-improvement.md
docs/specs/quote-generation.md
```

Avoid timestamps unless the repository already uses them.

## Relationship with AGENTS.md and Skills

- `AGENTS.md` defines durable repository and directory-specific rules.
- Codex Plan Mode creates the working plan.
- This skill persists an approved plan as a specification.
- Other Skills provide specialized workflows, such as SonarQube.
- The specification records the task-specific contract and decisions; it does not replace `AGENTS.md`.
