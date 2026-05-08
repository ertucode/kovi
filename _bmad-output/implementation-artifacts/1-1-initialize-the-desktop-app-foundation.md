# Story 1.1: Initialize the Desktop App Foundation

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want a working Tauri + React + TypeScript application foundation with the native playback boundary stubbed,
so that all later playback features are built on the approved architecture.

## Acceptance Criteria

1. Given the repository does not yet contain the app foundation, when the project is initialized, then the codebase uses the approved Tauri + React + TypeScript starter structure and the project can run locally as a desktop app on macOS.
2. Given the initial app foundation is created, when the native layer is wired to the frontend, then a basic Tauri command/event bridge exists and the frontend can invoke a native command and receive a typed response.
3. Given the architecture requires a dedicated playback module, when the native source structure is created, then the playback module boundary exists in the native layer and later playback stories can build inside that boundary without restructuring the app.

## Tasks / Subtasks

- [x] Initialize the approved Tauri starter and baseline dependencies (AC: 1)
  - [x] Run `npm create tauri-app@latest` with the React + TypeScript template.
  - [x] Keep the foundation aligned to the approved baseline stack: Tauri, React `19.2.6`, TypeScript, Zustand `5.0.13`, and `@tauri-apps/cli` `2.11.1`.
  - [x] Confirm the generated app runs locally on macOS through the normal Tauri development loop.
- [x] Reshape the starter into the approved project structure without adding feature scope yet (AC: 1, 3)
  - [x] Establish the top-level frontend areas under `src/app`, `src/features`, `src/shared`, and `src/styles`.
  - [x] Establish native module areas under `src-tauri/src/commands`, `src-tauri/src/playback`, `src-tauri/src/persistence`, `src-tauri/src/models`, `src-tauri/src/bridge`, and `src-tauri/src/support`.
  - [x] Keep placeholder modules minimal; this story is only the foundation and boundary setup.
- [x] Create the initial typed Tauri bridge skeleton (AC: 2)
  - [x] Add one frontend bridge client path that invokes a native command and handles a typed success/error payload.
  - [x] Add one native command exposed with `snake_case` naming and a direct typed response payload.
  - [x] Define one event name using dotted lowercase naming and wire the shared bridge helpers needed for later event-driven playback updates.
- [x] Stub the native playback module boundary (AC: 3)
  - [x] Create the playback module entry points and placeholder files in `src-tauri/src/playback/`.
  - [x] Ensure playback-critical logic remains on the native side; React should only orchestrate UI and bridge calls.
  - [x] Keep the playback boundary explicit so later media loading, seek, subtitle, and event work can extend it without reorganizing the app.
- [x] Verify the foundation is ready for follow-on stories (AC: 1, 2, 3)
  - [x] Confirm the app starts locally on macOS.
  - [x] Confirm the frontend can call the native command and receive a typed response.
  - [x] Confirm the created folders and module names match the architecture naming and structure rules.

## Dev Notes

- The repository currently contains only BMAD planning artifacts and no app source tree, so this story should create the initial application codebase rather than modify an existing implementation.
- This is the first implementation story in the architecture handoff and must establish the Tauri + React + TypeScript foundation before any feature UI work. [Source: `_bmad-output/planning-artifacts/architecture.md#Implementation Handoff`]
- Use Tauri commands and events as the only UI/native communication bridge. Do not introduce a local HTTP API, sidecar IPC layer, backend service, or cloud dependency. [Source: `_bmad-output/planning-artifacts/architecture.md#API & Communication Patterns`]
- Keep playback-critical logic in the native layer. The frontend is for presentation, interaction orchestration, settings, and state projection only. [Source: `_bmad-output/planning-artifacts/architecture.md#Playback Core`]
- The native playback module is a boundary story in this phase. Do not implement real playback features yet beyond the minimal stub needed to prove the contract and structure. This prevents scope creep into Story 1.2+.
- The MVP must remain fully offline and macOS-focused. Avoid adding auth, remote services, update infrastructure, CI/CD, or extra desktop integrations that are explicitly out of scope. [Source: `_bmad-output/planning-artifacts/prd.md#Desktop Application Specific Requirements`, `_bmad-output/planning-artifacts/architecture.md#Infrastructure & Deployment`]
- No testing framework is required by the MVP architecture baseline. Validation for this story should focus on successful local app startup and a working typed bridge proof rather than adding a new automated test stack. [Source: `_bmad-output/planning-artifacts/architecture.md#Selected Starter: Tauri with React + TypeScript frontend`, `_bmad-output/planning-artifacts/architecture.md#File Organization Patterns`]

### Project Structure Notes

- Follow the architecture's directory shape closely. The target structure already defines the expected root files, `src/` layout, and `src-tauri/` module boundaries; this story should establish that skeleton as early as possible. [Source: `_bmad-output/planning-artifacts/architecture.md#Complete Project Directory Structure`]
- Frontend code is feature-oriented, not separated only by technical layer. Native code is domain-oriented with explicit playback, persistence, commands, and bridge boundaries. [Source: `_bmad-output/planning-artifacts/architecture.md#Structure Patterns`, `_bmad-output/planning-artifacts/architecture.md#Architectural Boundaries`]
- Use `PascalCase` for React component files, `kebab-case` for non-component TypeScript modules, `snake_case` for Tauri command names and Rust files, dotted lowercase for event names, and `camelCase` for frontend-facing payload fields. [Source: `_bmad-output/planning-artifacts/architecture.md#Naming Patterns`]
- Centralize bridge contract definitions so command/event payloads do not drift between frontend and native code. [Source: `_bmad-output/planning-artifacts/architecture.md#Structure Patterns`, `_bmad-output/planning-artifacts/architecture.md#Communication Patterns`]

### References

- `_bmad-output/planning-artifacts/epics.md#Epic 1: Core Local Playback and Precision Navigation`
- `_bmad-output/planning-artifacts/epics.md#Story 1.1: Initialize the Desktop App Foundation`
- `_bmad-output/planning-artifacts/prd.md#Executive Summary`
- `_bmad-output/planning-artifacts/prd.md#Desktop Application Specific Requirements`
- `_bmad-output/planning-artifacts/prd.md#Project Scoping`
- `_bmad-output/planning-artifacts/prd.md#Non-Functional Requirements`
- `_bmad-output/planning-artifacts/architecture.md#Selected Starter: Tauri with React + TypeScript frontend`
- `_bmad-output/planning-artifacts/architecture.md#Decision Priority Analysis`
- `_bmad-output/planning-artifacts/architecture.md#API & Communication Patterns`
- `_bmad-output/planning-artifacts/architecture.md#Playback Core`
- `_bmad-output/planning-artifacts/architecture.md#Implementation Patterns & Consistency Rules`
- `_bmad-output/planning-artifacts/architecture.md#Complete Project Directory Structure`
- `_bmad-output/planning-artifacts/architecture.md#Architectural Boundaries`
- `_bmad-output/planning-artifacts/architecture.md#Implementation Handoff`

## Dev Agent Record

### Agent Model Used

openai/gpt-5.4

### Debug Log References

- No prior implementation logs exist for this first story.
- `npm install`
- `npm run build`
- `cargo check`
- `npm run tauri dev`

### Completion Notes List

- Story context created from epics, PRD, and architecture artifacts.
- No prior story file, project context file, or application source tree existed at creation time.
- No web research was required because the architecture already pins the key foundation versions and workflow choices for this story.
- Scaffolded the root Tauri 2 + React + TypeScript app, then aligned dependency versions to React `19.2.6`, Zustand `5.0.13`, and `@tauri-apps/cli` `2.11.1`.
- Replaced the starter demo UI with an architecture-aligned app shell under `src/app`, added shared bridge helpers, and introduced a Zustand-backed playback boundary store.
- Added the initial typed Tauri bridge with the `get_playback_boundary_status` command and `playback.boundary-ready` event, backed by explicit native `commands`, `bridge`, `playback`, `persistence`, `models`, and `support` modules.
- Validation focused on the architecture baseline: frontend production build passed, native Rust compilation passed, and `tauri dev` launched the desktop app through the normal macOS development loop.

### File List

- `_bmad-output/implementation-artifacts/1-1-initialize-the-desktop-app-foundation.md`
- `package.json`
- `package-lock.json`
- `src/main.tsx`
- `src/app/App.tsx`
- `src/app/providers/AppProviders.tsx`
- `src/app/routes/index.tsx`
- `src/app/layout/AppShell.tsx`
- `src/app/layout/panels/PlayerPanel.tsx`
- `src/app/layout/panels/PlaylistPanel.tsx`
- `src/app/layout/panels/SubtitlePanel.tsx`
- `src/features/playback/bridge/playback-commands.ts`
- `src/features/playback/hooks/use-playback-events.ts`
- `src/features/playback/store/playback-store.ts`
- `src/features/playback/types/playback.ts`
- `src/shared/bridge/error-types.ts`
- `src/shared/bridge/event-bus.ts`
- `src/shared/bridge/tauri-client.ts`
- `src/shared/types/common.ts`
- `src/styles/globals.css`
- `src/styles/tokens.css`
- `src-tauri/Cargo.lock`
- `src-tauri/tauri.conf.json`
- `src-tauri/src/lib.rs`
- `src-tauri/src/commands/mod.rs`
- `src-tauri/src/commands/playback_commands.rs`
- `src-tauri/src/bridge/mod.rs`
- `src-tauri/src/bridge/dto.rs`
- `src-tauri/src/bridge/error_mapping.rs`
- `src-tauri/src/models/mod.rs`
- `src-tauri/src/models/playback.rs`
- `src-tauri/src/persistence/mod.rs`
- `src-tauri/src/playback/mod.rs`
- `src-tauri/src/playback/engine.rs`
- `src-tauri/src/playback/errors.rs`
- `src-tauri/src/playback/events.rs`
- `src-tauri/src/playback/navigation.rs`
- `src-tauri/src/playback/state.rs`
- `src-tauri/src/playback/subtitle_navigation.rs`
- `src-tauri/src/playback/subtitle_tracks.rs`
- `src-tauri/src/support/mod.rs`
- `src-tauri/src/support/logging.rs`
- `src-tauri/src/support/paths.rs`

## Change Log

- 2026-05-08: Initialized the Tauri + React + TypeScript foundation, added the first typed command/event bridge, and established the native playback boundary skeleton for follow-on playback stories.
