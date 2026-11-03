# ISO MEGA Multimedia Ltd. — Website

## Status
First public-facing **prototype**, awaiting owner visual/content review. **Not deployed**. This repository began with the Codex instructions in `AGENTS.md`; development is performed on scoped feature branches and merged only after review.

## Content and branding
The content is derived from the supplied **ISO MEGA Company Profile (2026)**, including six service areas, the five-step delivery approach, listed leadership, client names and contact details. The official logo is supplied as an optimized PNG under `assets/iso-mega-logo.png`; **do not redraw, recolor, distort or replace it without approval**. Preview images in services and the hero are externally hosted illustrative photography and must be licensed/verified or replaced with approved original imagery before publication.

## Run locally
No build system or third-party packages are needed. From the repository root, run:

```sh
python3 -m http.server 4173
```

Then open `http://localhost:4173`. (Alternatively use any static file server.) Fonts and illustrative photographs require an internet connection. There is **no active CMS, server backend, contact form submission, analytics or live production deployment** at this stage.

## Tests
With Node.js 22 or later:

```sh
npm test
npm run check
```

Automated tests are basic structural smoke checks, **not** browser visual, accessibility, performance, security or complete end-to-end verification. Those checks remain required before production deployment.

## Review before release
1. Approve the art direction and confirm the supplied logo's on-screen rendering.
2. Replace temporary external stock images with approved original production photographs.
3. Confirm leadership titles and client-publication permissions.
4. Confirm contact phone numbers, physical address and email.
5. Review the site at mobile, tablet and desktop sizes and keyboard-only navigation.
6. Decide whether a CMS, portfolio, quotation submission, multilingual support and hosting are needed for V2.
7. Run all applicable checks in `AGENTS.md` and approve the release explicitly.

## Deployment
This is a static site that can later be published via an approved host after review. No production or staging host has been configured. Do not deploy without project owner authorization. Rollback is via reverting the reviewed commit on the deployment branch.
