---
name: sonarqube
description: Use SonarQube MCP to analyze code, inspect issues, work with project keys, and retrieve SonarQube quality information. Use when a task involves SonarQube analysis, code quality issues, quality gates, or SonarQube project context.
---

# SonarQube

Use this skill when working with SonarQube through the SonarQube MCP server.

## Workflow

### Starting a task

- If automatic SonarQube analysis is enabled, disable it using `toggle_automatic_analysis` when available.
- When a user mentions a SonarQube project key, use `search_my_sonarqube_projects` first.
- Never guess project keys.

### Analyzing modified files

After completing code changes:

1. Identify all files created or modified during the task.
2. Call `analyze_file_list` when available.
3. Use the analysis results to identify relevant issues.
4. Do not attempt to verify newly fixed issues through `search_sonar_issues_in_projects` immediately after modifying the files, because the server-side analysis may not yet reflect the changes.

### Branch context

If the user specifies a feature branch or another branch context, include the branch parameter when supported by the SonarQube MCP operation.

### Code analysis

- Detect the programming language from the source when required.
- For ambiguous snippets, determine the language from the surrounding project context.
- Remember that snippet analysis does not replace a complete project scan.

### Authentication

- SonarQube requires user tokens for MCP authentication.
- Never expose or hard-code SonarQube tokens.
- If authentication fails with `SonarQube answered with Not authorized`, verify that a user token is being used.

### Finishing a task

After all code changes and SonarQube analysis are complete:

- Re-enable automatic analysis using `toggle_automatic_analysis` when available.
- Report relevant SonarQube findings.
- Do not claim that server-side issues have been resolved unless the server-side analysis confirms them.
