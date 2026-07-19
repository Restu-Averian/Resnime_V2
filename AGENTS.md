# Resnime Repository Guidelines

## 1. Project Overview

Resnime is a frontend-only, client-side anime discovery and streaming website. Primary user flows include browsing trending and popular anime, searching for titles, viewing anime details, and streaming episodes.

This is a legacy project currently undergoing gradual modernization. Dependency modernization and API migration are planned as separate milestones and should not be mixed with unrelated tasks.

## 2. Repository Scope

This `AGENTS.md` applies to the entire repository unless a more specific nested `AGENTS.md` is added later. Future agents must:

- Read this file before making changes.
- Follow the nearest applicable `AGENTS.md`.
- Prioritize explicit user instructions if a task intentionally overrides a repository default.

## 3. Technology Stack

- React
- React DOM
- Vite
- JavaScript and JSX
- Chakra UI
- React Router
- Axios
- HLS.js
- react-responsive-carousel
- ESLint
- npm and `package-lock.json`
- Vercel (for routing/hosting configuration)

## 4. Repository Structure

- `public/`: Static assets such as icons.
- `src/`: Main source code directory for the React application.
- `src/assets/`: Application-specific static assets like images.
- `src/components/`: Reusable React components, organized by domain.
- `src/constants/`: Shared constant values (e.g., API base URL).
- `src/helpers/`: Utility functions like `formatWord.js` and HLS integration (`videoHLS.js`).
- `src/hooks/`: Custom React hooks for data fetching and responsiveness.
- `src/pages/`: Main route components representing distinct application views.
- `src/style/`: Global CSS styles.
- `src/App.jsx`: Application entry point defining React Router paths.
- `src/main.jsx`: Root rendering setup, injecting Chakra theme and global providers.
- `src/theme.js`: Chakra UI theme configuration.
- `package.json`: Dependency definitions and npm scripts.
- `vite.config.js`: Vite build and development server configuration.
- `vercel.json`: Vercel deployment routing for the single-page application.

## 5. Application Architecture

Application entry begins in `src/main.jsx`, which sets up global providers (Chakra theme, Router, Error boundaries) and layouts. The router is defined in `src/App.jsx`, mapping URL paths to lazy-loaded pages in `src/pages/`. Pages use reusable layout and UI elements from `src/components/`.

Data fetching is handled via Axios inside `src/hooks/useFetchData.js`, fetching from endpoints built with variables from `src/constants/index.js`. Application state is largely hook-based and local to components. Video playback leverages `src/helpers/videoHLS.js` for HLS integration.

## 6. Available Commands

The following commands are available via `package.json`:

- `npm run start`: Starts the Vite development server.
- `npm run build`: Builds the application for production using Vite.
- `npm run lint`: Runs ESLint to find code quality issues.
- `npm run preview`: Locally previews the production build.

npm is the required package manager.

## 7. Package Management Rules

- Use npm.
- Keep `package-lock.json` synchronized with `package.json`.
- Do not create lockfiles for another package manager.
- Prefer stable package releases.
- Do not use alpha, beta, canary, next, or release-candidate versions unless explicitly requested.
- Review migration guides before major-version upgrades.
- Upgrade dependencies in controlled groups rather than blindly updating everything.
- Do not use `npm audit fix --force` without reviewing its impact.
- Do not silence peer-dependency conflicts without explaining and resolving them.
- Remove a package only after verifying that it is unused.
- Replace an abandoned package only when necessary and preserve existing behavior.
- Re-run lint and build after dependency changes.
- Do not mix dependency modernization with unrelated feature work.

## 8. API and Environment Rules

**Important:** The existing anime API is considered legacy and currently non-functional. A replacement API will be integrated in a separate task.

- Agents must not invent endpoints or response structures.
- Agents must inspect the replacement API documentation or sample payload before migration.
- API migration must preserve existing user-facing flows wherever practical.
- Do not hardcode secrets or deployment-specific values.
- Use Vite-compatible environment variables.
- Access frontend variables through `import.meta.env`.
- Never expose server-only credentials in frontend code.
- Handle request failure, empty data, malformed data, and loading states without crashing the UI.
- Do not treat API failures as permission to redesign unrelated components.

Documented environment variables: `VITE_BASE_API`.

## 9. Routing Rules

- Preserve existing route paths (e.g., `/`, `/trending`, `/popular`, `/upcoming`, `/search`, `/anime/:id/:anime_name`, `*`) unless route changes are explicitly requested.
- Check direct navigation and browser refresh behavior.
- Preserve route parameters and query parameters.
- Keep loading or lazy-loading behavior intact where applicable.
- Update every internal link when an intentional route change occurs.
- Avoid moving routing responsibilities without a clear task requirement.

## 10. UI and Styling Rules

- Reuse existing Chakra UI components and theme tokens.
- Preserve the current visual identity unless redesign is explicitly requested.
- Avoid introducing an additional UI framework without approval.
- Avoid mixing multiple styling strategies unnecessarily.
- Keep layouts responsive.
- Preserve dark-mode or color-mode behavior if currently implemented (default dark mode).
- Use semantic, accessible interactive elements.
- Provide accessible labels for icon-only buttons.
- Maintain usable focus states and keyboard interaction.
- Preserve loading, empty, error, and disabled states.
- Do not remove features merely to resolve styling or compatibility issues.

## 11. JavaScript and React Conventions

- Continue using JavaScript and JSX unless TypeScript migration is explicitly requested.
- Prefer functional React components and hooks.
- Follow the existing module format and import style.
- Keep components focused and avoid unnecessary abstractions.
- Reuse existing components, hooks, helpers, and constants before creating duplicates.
- Keep data fetching separate from purely presentational logic where practical.
- Avoid mutating state directly.
- Clean up subscriptions, HLS instances, listeners, timers, and asynchronous effects.
- Do not disable React Strict Mode merely to hide lifecycle issues.
- Do not suppress ESLint warnings without understanding their cause.
- Avoid broad refactors during narrowly scoped tasks.
- Do not add dependencies for behavior that can be implemented clearly with existing tools.

## 12. HLS and Video Playback Rules

- Preserve native HLS playback where supported.
- Use HLS.js only when required by browser compatibility.
- Check HLS.js support before initialization.
- Destroy HLS instances during cleanup.
- Prevent duplicate player initialization.
- Handle invalid or missing stream URLs gracefully.
- Avoid autoplay assumptions that violate browser policies.
- Preserve controls, fullscreen behavior, and playback usability.
- Avoid logging sensitive or excessively large media payloads.
- Keep video-player changes separate from API migration unless both are explicitly in scope.

## 13. Error Handling

- Avoid blank-screen crashes.
- Handle rejected API calls.
- Handle missing nested response properties safely.
- Provide stable loading, empty, and error states.
- Avoid showing stale content as newly loaded content.
- Keep console output intentional.
- Do not silently swallow errors that are useful for debugging.
- Avoid displaying raw technical errors or secret-bearing responses to users.

## 14. Validation Requirements

Unless a task explicitly states otherwise, agents must run:

```bash
npm run lint
npm run build
```

For dependency changes, also require:

```bash
npm install
npm dedupe
npm run lint
npm run build
```

When validating the lockfile in a clean environment, use:

```bash
npm ci
```

For UI or feature changes, require relevant manual smoke checks, including:

- Application startup.
- Homepage rendering.
- Navigation.
- Relevant route rendering.
- Loading state.
- Empty state.
- Failed-request state.
- Responsive behavior.
- Browser console errors.
- Video initialization when the task affects playback.

Existing API failures caused by the dead legacy endpoint must be reported separately from build or frontend runtime failures.
Do not claim a command passed unless it was actually executed successfully.

## 15. Change Discipline

- Inspect related files before editing.
- Keep changes scoped to the requested task.
- Avoid unrelated formatting churn.
- Preserve existing behavior unless change is requested.
- Avoid deleting code merely because its purpose is unclear.
- Search for all references before renaming or deleting.
- Update imports and consumers consistently.
- Prefer root-cause fixes over suppressions.
- Clearly distinguish pre-existing issues from newly introduced issues.
- Never overwrite user changes without inspecting `git diff`.
- Never discard unrelated uncommitted work.
- Never force-push.
- Never commit secrets.
- Do not create commits unless explicitly requested.
- Do not modify deployment configuration unless the task requires it.

## 16. Legacy Modernization Strategy

Resnime will be modernized incrementally. Follow this preferred milestone separation:

1. Establish repository instructions.
2. Audit and modernize dependencies.
3. Restore build, lint, and runtime compatibility.
4. Audit the replacement anime API.
5. Migrate API requests and response mapping.
6. Stabilize routing, error handling, and video playback.
7. Perform optional UI or UX improvements only when explicitly requested.
8. Improve tests and automation separately.

A single task must not casually combine all milestones.

## 17. Definition of Done

- Requested behavior is implemented.
- Changes remain within scope.
- Relevant existing behavior is preserved.
- Lint succeeds, or any failure is documented as pre-existing with evidence.
- Build succeeds, or any failure is documented as pre-existing with evidence.
- Relevant manual smoke checks are completed.
- No secrets are exposed.
- No unrelated files are modified.
- Final response summarizes changes, validation, and remaining issues.

## 18. Agent Final-Response Format

Future Codex agents must end implementation tasks with a concise report containing:

```text
Summary
- What changed

Files changed
- Important files and why

Validation
- Commands executed and results

Remaining issues
- Known limitations or pre-existing failures
```
