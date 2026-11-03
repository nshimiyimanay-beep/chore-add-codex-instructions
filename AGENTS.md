# ISO MEGA Website — Codex Project Instructions

> Status: Project operating rules · Version 1.0 · 2026-11-03
> Applies to: This repository, including the public website, administration interface, integrations, content, and deployment configuration.

## 1. Mission and hierarchy

Build and maintain a reliable, accessible, responsive, secure, professionally designed ISO MEGA website while preserving already-approved brand identity, design decisions, and working functionality.

Follow this order of authority:
1. Direct, current instructions from the authorized project owner.
2. Applicable security and platform rules.
3. This `AGENTS.md` and any more specific `AGENTS.md` files in relevant subdirectories.
4. Existing project documentation, approved design references, design tokens, and implementation conventions.

If instructions conflict or a required brand asset or approval cannot be verified, stop that affected change and report what needs a decision. Continue unrelated safe work where possible. Never invent an approval.

## 2. Non-negotiable preservation rules

- **Preserve approved branding.** Never redraw, reinterpret, recolor, stretch, distort, or replace official ISO MEGA logos or other approved identity assets. Use the existing source files without modification unless explicitly authorized.
- **Preserve approved UI.** Do not replace approved typography, color tokens, spacing, imagery, navigation, content structure, animation, or component appearance unless the task explicitly requires it.
- **No unrelated changes.** Limit edits to the requested feature and necessary dependencies. Do not refactor, rename, reformat, remove, or upgrade unrelated code as part of a small feature or bug fix.
- **Protect working functionality.** Maintain existing routes, CMS operations, forms, authentication, links, files, integrations, and mobile behavior unless a change is approved and tested.
- **Use real assets and content.** Never manufacture testimonials, client logos, credentials, statistics, or a person's identity. Mark unavailable content as a placeholder for review.
- **Keep edits reversible.** Work in a feature branch, make focused commits, and provide a straightforward rollback plan for risky changes.

## 3. First steps before every task

1. Read this file and any applicable nested project instructions.
2. Inspect the repository's README, package/lock files, framework configuration, routing, environment templates, existing tests, and design system. **Discover the actual stack; do not assume one.**
3. Review `docs/APPROVED-DESIGN.md` and `docs/PROJECT-DECISIONS.md` if present, together with supplied visual references.
4. Establish the current behavior and identify affected routes, components, data, API endpoints, and tests.
5. Run the existing baseline checks where feasible and record pre-existing failures separately from new ones.
6. Summarize the change's scope, affected files, risks, and acceptance criteria before implementation for any nontrivial task.

When requirements are ambiguous, choose the smallest change compatible with the approved design and existing system. Do not treat a reference screenshot as authorization to recreate unrelated sections.

## 4. Implementation discipline

- Respect established architecture, language, naming conventions, dependencies, design tokens, and linting rules.
- Prefer small, maintainable, accessible components; avoid duplication and unnecessary new packages.
- Protect existing database contracts and backwards compatibility; write and test migrations where needed.
- Keep credentials, tokens, and private data out of the repository, commits, screenshots, logs, and client-side bundles.
- Validate all inputs on the server; enforce authorization server-side and apply least-privilege permissions.
- Do not change environment variables, cloud infrastructure, production data, or third-party services without explicit authorization.
- Do not silently suppress errors, disable tests, or loosen security settings to pass a build.
- For CMS changes, verify the admin workflow and the public-facing rendering of the modified content.

## 5. Responsive and visual standards

- Maintain a consistent experience at approximately 320px, 375px, 768px, 1024px, and 1440px widths, plus relevant intermediate widths.
- Avoid horizontal overflow, overlapping elements, clipped labels, inaccessible menus, and poorly sized touch targets.
- Preserve legible type scaling, sensible image crops, layout hierarchy, keyboard navigation, focus indicators, and sufficient contrast.
- Prefer semantic HTML, meaningful alt text, accessible form labels, clear validation errors, and reduced-motion support where appropriate.
- Inspect screenshots before and after UI changes when browser tooling is available. Compare affected views against approved references; log intentional differences.
- Test functional UI interactions, not only static appearance.

## 6. Testing requirements

Discover the project's actual commands from its scripts and documentation. Do not invent a passing result or assume the commands below exist.

For every code change, run all applicable checks:
- Formatting/lint and static type checks.
- Unit/component tests for modified behavior.
- Integration tests for affected APIs, forms, CMS flows, and data operations.
- End-to-end smoke tests for affected user journeys.
- Production build or an equivalent compilation check.
- Accessibility checks for changed UI, plus keyboard and mobile checks.
- Visual regression or before/after screenshot review for UI changes.
- Security and dependency checks where relevant.

If a check cannot run, explain why, mark it **NOT RUN**, and identify the risk. Record baseline failures distinctly. A release is not approved merely because the code compiles.

### Minimum release acceptance criteria

- Requested behavior works and acceptance criteria are met.
- Previously working critical routes and interactions remain functional.
- No newly introduced critical or high-severity security issue is known.
- No unintended visual regression appears on tested desktop/tablet/mobile sizes.
- Database migration and rollback plans are verified if applicable.
- Test evidence and release notes are recorded.
- The project owner authorizes production release.

## 7. Agents and delegation

Use distinct responsibilities, which may be fulfilled by one Codex session or by available sub-agents:

- **Coordinator:** scope, plan, task boundaries, dependency review, final change summary.
- **Frontend:** UI implementation and responsive behavior within the approved design system.
- **Backend/CMS:** server logic, data contracts, integrations, admin operations.
- **Design Guardian:** approved asset fidelity, accessibility, visual and UX consistency.
- **QA/Security:** regression, functional, accessibility and security verification.
- **Release Manager:** staging checks, approvals, version notes, rollback readiness.

Do not allow parallel workers to modify the same files without coordination. Assign independent file ownership or consolidate changes sequentially. The Coordinator remains responsible for integration and final checks. Agents never self-authorize production deployment.

## 8. Skills and repeatable workflows

Use repository-specific skills when installed and relevant; prefer these proposed skill names if they are created:

- `brand-guardian`: verify official logos, tokens, visual references and approved layouts.
- `responsive-audit`: inspect mobile/tablet/desktop breakpoints, overflow and touch targets.
- `feature-change`: convert a request into scope, acceptance criteria, tests, and a minimal patch.
- `cms-check`: test editing, saving, publishing, permissions and public display.
- `release-readiness`: run quality gates, prepare a changelog, staging checklist and rollback plan.

Skills do not override these instructions or grant deployment authority. A skill that is not installed must not be represented as available.

## 9. Git, staging and production

**Preferred workflow:** issue/request → feature branch → scoped implementation → tests → pull request/review → staging preview → acceptance review → approved production release → monitoring.

- Never commit directly to protected `main`/production branches without an expressly approved emergency procedure.
- Never deploy an unreviewed feature branch directly to production.
- Require a human approval gate before production deployment and destructive migrations.
- Use staging or preview environments to verify forms, navigation, content, responsive UI, permissions, and external integrations.
- Back up applicable production data/assets before migrations; verify restoration capability rather than assuming backups work.
- Use secrets provided by the approved deployment platform only; never print or copy them into the chat.
- After deployment, perform health and critical-journey smoke checks and inspect error monitoring.
- If the release fails its acceptance checks, roll back using the documented procedure and report the incident.

The deployment provider, hosting stack, environments, and commands must be discovered from repository configuration and verified with the project owner. Do not invent a live URL or claim a deployment happened without evidence.

## 10. Change documentation (mandatory)

For every task, add a concise entry to `docs/CHANGELOG.md` (create it if absent) containing:

- Date (YYYY-MM-DD), change ID or branch, and short title.
- Request and business purpose.
- Changed files/routes/components and intentional design changes.
- Tests run and outcomes, including **NOT RUN** and pre-existing failures.
- Risks, migration considerations and known limitations.
- Deployment status: **NOT DEPLOYED**, **STAGING**, or **PRODUCTION** (with verified reference).
- Rollback instructions when applicable.

For substantive decisions, document the rationale in `docs/PROJECT-DECISIONS.md`. Update README or operational runbooks when commands, setup, integrations or architecture change.

## 11. Required completion report

Finish each task with the following short report:

1. **Requested change:** what was asked and what was implemented.
2. **Preservation:** what existing features and branding were deliberately left unchanged.
3. **Files changed:** paths, with any migrations or dependencies.
4. **Verification:** commands, test results, screen sizes, and outstanding checks.
5. **Deployment:** not deployed/staging/production; include a verified URL only if available.
6. **Risks & rollback:** remaining issues and how to revert safely.
7. **Approval needed:** any outstanding decisions before release.

Never say “fully tested,” “deployed,” “backed up,” or “unchanged” without corresponding evidence.

## 12. Definition of done

A task is complete only when the requested change is implemented, relevant checks have passed (or blockers are clearly reported), approved design and critical features are preserved, documentation is updated, and the deployment state is accurately stated. Production release is a separate, explicitly approved action.
