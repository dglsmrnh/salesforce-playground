---
name: lwc-slds
description: Create or modify Lightning Web Component interfaces by prioritizing lightning-* base components, SLDS utilities, and Salesforce Lightning Design System patterns. Use for LWC HTML, CSS, layout, visual states, accessibility, or responsiveness.
---

# LWC with SLDS

Build LWC interfaces aligned with the Lightning Design System while keeping the solution Salesforce-native and avoiding fragile CSS.

## Decision order

1. Check whether a suitable `lightning-*` base component exists for the interaction or control. Prefer it over recreating inputs, buttons, comboboxes, modals, toasts, tables, and other patterns.
2. For visual composition, use the corresponding SLDS blueprint and official utility classes for grid, flexbox, spacing, alignment, typography, visibility, and sizing.
3. If no suitable base component exists, implement the SLDS blueprint in the LWC markup and preserve keyboard, focus, semantic, and accessible-state requirements.
4. Write custom CSS only for visual behavior not covered by a base component, utility, or styling hook. Keep it scoped to the component.

## Implementation rules

- Consult the official documentation before choosing classes, blueprints, variants, or styling hooks: https://www.lightningdesignsystem.com/ and https://developer.salesforce.com/docs/platform/lwc/guide/create-components-css-custom-properties
- Do not directly override `.slds-*` classes, depend on base-component internal markup, or use selectors that cross the shadow DOM boundary.
- To customize base components, try a documented variant or prop first, then utilities, and then supported styling hooks. With SLDS 2, verify current compatibility: component hooks using `--slds-c-*` may not be supported; prefer global hooks or documented APIs where applicable.
- Prefer tokens and styling hooks over hard-coded values for color, spacing, typography, radius, shadow, and sizing. Check WCAG contrast when customizing colors.
- Do not introduce external visual frameworks, another icon library, or global CSS without an explicit request and a compatibility justification.
- Use `lightning-icon` and base feedback components when they fit the use case; provide `alternative-text`, labels, and error states according to the component API.
- Use a mobile-first layout and validate loading, empty, error, disabled, hover/focus, and long-content states when relevant to the flow.

## Verification

After the change, review the template for semantics and accessibility, the CSS for fragile overrides, and the result for SLDS alignment. Run the project tests and lint/format checks when code was changed.

For styling anti-patterns, see https://help.salesforce.com/s/articleView?id=001622575&language=en_US&type=1. For base components and their variants, see https://developer.salesforce.com/docs/platform/lightning-component-reference/guide/get-started.html.
