# Apex Classes Instructions

Follow the repository, Salesforce source, and `force-app/main/default/AGENTS.md` instructions.

## Layer Responsibilities

### Selector Classes

- SOQL belongs in Selector classes.
- Selectors are responsible for data access.
- Keep selectors focused on retrieval and query composition.
- Do not place business rules in Selectors.

### Service Classes

- Services orchestrate application and business operations.
- Services may coordinate multiple Domains and Selectors.
- Keep data-access queries in Selectors.
- Use native Salesforce DML and transaction semantics.
- Do not introduce UnitOfWork.

### Domain Classes

- Domain classes contain SObject-specific business rules and behavior.
- Keep data-access responsibilities in Selectors.
- Keep broad application orchestration in Services.

### Controller Classes

- Controllers should orchestrate UI/application interactions.
- Controllers should not contain business logic.
- Delegate business operations to Services.

## Tests

- Add or update tests when behavior changes.
- Prefer meaningful assertions.
- Follow existing test factories and test-data patterns.
- Keep tests focused on observable behavior.
