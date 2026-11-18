# StarHub

StarHub is an experimental web project for browsing game-related listings and exploring related pages and API handlers.

## Project status

This project is under development. The presence of a page, API handler, configuration option, or feature flag does not by itself mean that the feature is complete, deployed, secure, or legally compliant. Test each feature in the intended hosting environment before relying on it.

## Current repository structure

- `index.html` — main web page
- `accounts/`, `settings/`, `search/`, `store/`, `watch/` — additional pages
- `api/` — serverless API handler files
- `components/` and `lib/` — shared application code
- `public/` — public assets and legal pages
- `vercel.json` — Vercel configuration
- `manifest.json` and `sw.js` — PWA-related files; confirm which copies are used by the deployed site

Some filenames and duplicate files may need cleanup. Verify all links and deployment routes before renaming or deleting files.

## Requirements and setup

The repository setup has not yet been verified as a reproducible build.

Before using npm commands:

1. Rename `package.josn` to `package.json`.
2. Make sure `package.json` lists the dependencies and scripts the project actually uses.
3. Generate and commit `package-lock.json`.
4. Run the documented install, test, and build commands locally and in CI.

The current `index.html` refers to `/config.js`, while the repository contains `cofing.js`. Make those names consistent before expecting the page configuration to load.

## Configuration and secrets

Use environment variables in the hosting provider for server-side credentials.

- Do not commit passwords, private keys, webhook secrets, or service-role credentials.
- Do not put server secrets in browser JavaScript or public files.
- Browser-visible Supabase configuration must use a publishable/anon key and appropriate Row Level Security policies.
- `.env.example` should contain only variable names the application actually uses, with placeholder values.

## API routes

API handler files are located in `api/`. Confirm each route’s deployed URL, allowed methods, input validation, error behavior, and authentication before documenting it as supported.

Unknown routes should return a not-found response. Do not claim that arbitrary future routes are automatically available.

## Security and privacy

Collect only the data the application needs. Validate untrusted input, keep secrets server-side, and review access-control policies for any connected database or storage service.

Security headers, hashes, environment flags, and health responses are not proof that the application is secure, anonymous, or legally compliant.

## Legal information

The pages in `public/legal/` should accurately describe the product’s real data collection, third-party services, cookies, retention, and user choices.

Legal requirements depend on the product, users, locations, and activities. This README is not legal advice and does not certify compliance. Get qualified advice before enabling payments, donations, affiliate programs, or other regulated features.

## Testing checklist

Before deploying a change:

- Confirm important pages load and links point to existing files.
- Test API routes with valid and invalid inputs.
- Verify authentication and database access policies.
- Check that no secrets are present in tracked files.
- Test the production build and deployment configuration.
- Test PWA/offline behavior only if those features are intentionally supported.

## Contributing

Make focused changes, run the project’s available checks, and describe what you tested in your pull request or commit.