# Salesforce Trigger Instructions

Triggers are thin entry points.

## Rules

- Do not implement business logic directly in triggers.
- Do not place SOQL in triggers.
- Avoid DML in triggers.
- Delegate trigger execution to the appropriate Trigger Handler.
- Keep trigger execution bulkified.
- Follow existing trigger-handler conventions.

Expected flow:

```text
Trigger
    ↓
Trigger Handler
    ↓
Domain
```
