# Salesforce Source Instructions

This directory contains the main Salesforce application source code.

## Architecture

This project uses a simplified fflib / Apex Enterprise Patterns architecture:

```text
Trigger
    ↓
Trigger Handler
    ↓
Domain
    ↓
Service
    ↓
Selector
```

`UnitOfWork` is intentionally outside the architectural scope of this project.

Do not introduce `fflib_SObjectUnitOfWork` unless the project architecture is explicitly changed to include it.

## General Salesforce Rules

- Preserve the standard Salesforce DX metadata structure.
- Follow existing project conventions before introducing new patterns.
- Prefer native Salesforce platform capabilities when they are sufficient.
- Avoid unrelated metadata changes.
- Keep Apex implementations bulkified.
- Consider Salesforce governor limits.
- Respect CRUD/FLS and sharing requirements.
- Prefer simple, maintainable implementations over unnecessary abstractions.

## Architectural Responsibilities

### Trigger

- Triggers are entry points only.
- Do not place business logic directly in triggers.
- Delegate trigger execution to a Trigger Handler.
- Avoid SOQL directly in triggers.
- Avoid DML directly in triggers unless there is an explicit architectural reason.

### Trigger Handler

- Coordinate trigger execution.
- Keep business rules out of the handler.
- Delegate SObject-specific behavior to the Domain layer.

### Domain

- Contain SObject-specific business rules and behavior.
- Keep data-access responsibilities in Selectors.
- Do not use Domain classes as general-purpose Service classes.

### Service

- Orchestrate application and business operations.
- Coordinate interactions between Domains and Selectors.
- Keep reusable data-access queries in Selectors.
- Use native Salesforce DML and transaction semantics by default.
- Do not introduce UnitOfWork.

### Selector

- Own SOQL and data-access concerns.
- Keep business rules out of Selectors.
- Reuse selectors instead of duplicating equivalent queries.
- Keep queries focused on the data required by the calling operation.

### Controller

- Orchestrate UI or application interactions.
- Do not contain business logic.
- Delegate business operations to Services.

## Transactions and Relationships

- Do not introduce UnitOfWork solely for transaction management.
- Do not introduce UnitOfWork to establish relationships between newly created records.
- Prefer native Salesforce DML and relationship mechanisms.
- Use relationship fields and in-memory SObject references where appropriate.
- Use External ID relationship resolution when the Salesforce operation specifically requires it.
- Do not introduce External IDs merely as a workaround for the absence of UnitOfWork.
- Use savepoints and rollback when explicit transaction control is required.

## Apex Quality

All Apex should:

- Be bulkified.
- Avoid SOQL inside loops.
- Avoid DML inside loops.
- Respect governor limits.
- Respect CRUD/FLS.
- Respect sharing behavior.
- Avoid unnecessary database operations.
- Follow the project's PMD ruleset:

```text
config/pmd/fflib-ruleset.xml
```

## Testing

When changing Apex behavior:

- Add or update relevant tests.
- Prefer meaningful assertions over coverage-only tests.
- Follow existing test factory and test-data patterns.
- Test bulk behavior when appropriate.

## Metadata

When modifying Salesforce metadata:

- Preserve existing metadata relationships.
- Avoid changing unrelated metadata.
- Follow existing naming and folder conventions.
- Keep metadata consistent with the source implementation.

## Tooling

For changes under this directory:

- Use Prettier according to the repository configuration.
- Use ESLint for JavaScript/LWC where applicable.
- Run PMD for Apex changes.
- Run relevant Salesforce or LWC tests.
- Use the SonarQube Skill when the task involves SonarQube analysis, issues, Quality Gates, or SonarQube MCP operations.

Consult the relevant subdirectory `AGENTS.md` for additional instructions when working specifically with:

```text
classes/
triggers/
lwc/
```
