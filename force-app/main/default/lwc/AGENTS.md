# Lightning Web Components Instructions

Follow the repository and Salesforce source instructions.

## General

- Keep components focused on presentation and user interaction.
- Avoid duplicating business logic that belongs in Apex.
- Use the project's established Apex controller/service patterns.
- Follow the repository's Prettier and ESLint configuration.

## JavaScript

- Follow the project's ESLint configuration.
- Prefer small, focused methods.
- Handle asynchronous operations explicitly.
- Avoid unnecessary component state.

## HTML

- Keep templates declarative and readable.
- Avoid unnecessary template complexity.
- Follow standard LWC template syntax.

## Tests

When component behavior changes:

- Add or update Jest tests where appropriate.
- Use the existing `sfdx-lwc-jest` setup.
- Prefer focused tests for changed behavior.
