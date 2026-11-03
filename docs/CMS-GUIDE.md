# ISO MEGA — Content Administration Guide

## Architecture
This website remains a static GitHub Pages project. The editor is **Pages CMS**, an independent GitHub-authenticated service that edits structured content files in the repository. No password, token or GitHub API access is built into the public website.

- Administrative overview: `/admin/`
- Authenticated editor: https://app.pagescms.org/
- Editor schema: `.pages.yml`
- Website data: `content/site.json`, `content/services.json`, `content/team.json`, `content/clients.json`, `content/projects.json`
- Uploaded content images: `assets/uploads/` (uploaded through Pages CMS)
- Public website read-only renderer: `content.js`

## One-time activation — owner must complete
1. Open https://app.pagescms.org/ and sign in using your GitHub account with repository access.
2. Install/authorize the Pages CMS GitHub App on **only** `nshimiyimanay-beep/chore-add-codex-instructions` where possible. Review the permissions before accepting.
3. Select the repository and branch that currently powers the website preview. During PR review the content is on `feat/admin-cms-v1`. After merging, switch to `feat/iso-mega-website-v1` if that is the configured preview branch.
4. The editor reads `.pages.yml` and exposes five editing areas: homepage/contact, services, team, clients, portfolio, plus the media library.
5. Change a harmless text item, save, verify GitHub's commit and automated checks, then refresh the preview link to confirm content changed.

**Important:** Saving through Pages CMS commits to the selected branch. If you select `main` and your production site uses `main`, this may publish content without a review gate. Always verify the selected branch before saving. Production release and branch merges require project-owner approval.

## Managing content
- **Homepage & contact:** Manage headings, introduction, background photo, phones, email and SEO. Supply an approved photo rather than replacing brand assets.
- **Services:** Edit text, reorder entries, add/remove entries and set `visible: false` to hide a service. Empty image fields use original service photographs as fallbacks.
- **Team:** Change titles and photos; `visible: false` hides a profile. Confirm details/consent before public launch.
- **Clients:** Only show authorized verified references. `visible: false` hides a name.
- **Portfolio:** Create rows inside the Portfolio projects editor. Each row has a title, category, summary, cover image, client and year; **set published to true only after approval**. Empty projects never create fake visible portfolio items.
- **Media:** Upload to the configured media folder; avoid extremely large files and upload only assets you have rights to use.

## Limitations and safety
- The `/admin/` page is a **public overview/launcher, not a password-protected admin application**. Actual editing requires successful login and repository permission in Pages CMS.
- The public website reads JSON files and does not contain a server or private API. There is no internal database, role-based user management, enquiry inbox or quotation system.
- The GitHub repository is public, so content committed to any public branch is visible in repository history even if hidden on the website; **do not store secrets, confidential drafts, personal records or unpublished sensitive data in it**.
- The CMS integration has not been authenticated by the repository owner at implementation time. Content publishing must be tested with a real authorized login before going live.
- If you open the site via `file://`, its original static fallback remains available; dynamic content loading generally needs an HTTP server or GitHub Pages.

## Publishing and rollback
1. Edit content on the review/preview branch using authenticated Pages CMS.
2. Inspect the GitHub commit and CI status.
3. Verify the actual preview site at mobile and desktop sizes.
4. Approve and merge only after checks pass; deployment is a separate controlled action.
5. Restore content from Git history by reverting the change if necessary.

## Future extensions
A secure authenticated custom admin API, quotation/enquiry storage, approval workflows, uploads outside public Git history and live analytics require a managed backend and separate infrastructure. They are not part of this first static-site CMS phase.
