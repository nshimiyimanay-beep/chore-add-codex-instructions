# ISO MEGA Website — Change Log

## 2026-11-03 · feat/admin-cms-v1 · GitHub-backed administration dashboard
- **Purpose:** Allow owner-managed updates to website content and uploaded media without requiring direct code editing for each change.
- **Added:** `admin/index.html`, `admin/admin.css`, `admin/admin.js`, `.pages.yml`, `content/site.json`, `content/services.json`, `content/team.json`, `content/clients.json`, `content/projects.json`, `content.js`, CMS tests and user guide.
- **Updated:** `index.html` now includes dynamic content bindings and a conditional published-project portfolio; `styles.css` includes responsive portfolio/team imagery; `package.json` checks all JS files.
- **Preservation:** Approved logo, favicon, color system, hero layout, navigation, existing text and direct email contact retained as static fallback. No new backend or client-side password.
- **Quality gate:** CI to check JS syntax and content structures; real Pages CMS GitHub sign-in, editor saves, browser responsiveness and production deployment **NOT TESTED** until authorized.
- **Risk:** Content is committed to a public GitHub repository, and the CMS requires external GitHub App permission. Avoid all secrets and confidential client data.
- **Deployment:** **NOT DEPLOYED** — changes remain on a review branch.
- **Rollback:** Close/unmerge this pull request; revert its merge commit if merged into a preview branch.


## 2026-11-03 · feat/iso-mega-website-v1 · Phase 1 photographic art direction
- **Purpose:** Bring the hero image closer to ISO MEGA's audiovisual-production positioning while preserving the approved layout and company brand.
- **Changed:** `styles.css` only; replaced landscape photographer with professional ARRI studio camera-operator image, refined navy legibility overlay, added restrained brand-colored service-card edges and responsive photo crop.
- **Source:** Unsplash photographer Cemrecan Yurtman, studio photograph `RFxerC6QJcc`, published June 10, 2026. Temporary illustrative image, not represented as ISO MEGA personnel or work.
- **Unchanged:** Official ISO MEGA logo, favicon, site structure, navigation, copy, contacts, and interactive behavior.
- **Verification:** Static source inspection completed. GitHub automated checks triggered; final result requires confirmation. Visual browser review, mobile screenshots, and performance checks **NOT RUN**.
- **Deployment:** **NOT DEPLOYED BY THIS CHANGE**; feature branch updated. GitHub Pages preview requires separate publication configuration.
- **Rollback:** Revert the corresponding `styles.css` commit or restore the preceding stylesheet.


## 2026-11-03 · feat/iso-mega-website-v1 · Initial website prototype
- **Purpose:** Create the first responsive public website using the supplied company profile and logo.
- **Changed:** `index.html`, `styles.css`, `script.js`, `assets/iso-mega-logo.png`, test/CI configuration, documentation.
- **User journeys:** Explore services, read about the company/team, review workflow/experience, make direct email or phone contact.
- **Testing:** Structural Node smoke tests added; GitHub Actions configured. CI result awaiting run. Browser screenshots, visual regression, accessibility audit and end-to-end checks **NOT RUN**.
- **Risks:** Unsplash photography is illustrative; verify image rights and suitability. Client/team/contact details need owner confirmation. No CMS or backend form yet.
- **Deployment:** **NOT DEPLOYED**. Feature branch only, awaiting review and approval.
- **Rollback:** Close the pull request or delete the feature branch; `main` is unchanged.
