# Story 1.1: Initialize the Desktop App Foundation

Status: ready-for-dev

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

- [ ] Initialize the approved Tauri starter and baseline dependencies (AC: 1)
  - [ ] Run `npm create tauri-app@latest` with the React + TypeScript template.
  - [ ] Keep the foundation aligned to the approved baseline stack: Tauri, React `19.2.6`, TypeScript, Zustand `5.0.13`, and `@tauri-apps/cli` `2.11.1`.
  - [ ] Confirm the generated app runs locally on macOS through the normal Tauri development loop.
- [ ] Reshape the starter into the approved project structure without adding feature scope yet (AC: 1, 3)
  - [ ] Establish the top-level frontend areas under `src/app`, `src/features`, `src/shared`, and `src/styles`.
  - [ ] Establish native module areas under `src-tauri/src/commands`, `src-tauri/src/playback`, `src-tauri/src/persistence`, `src-tauri/src/models`, `src-tauri/src/bridge`, and `src-tauri/src/support`.
  - [ ] Keep placeholder modules minimal; this story is only the foundation and boundary setup.
- [ ] Create the initial typed Tauri bridge skeleton (AC: 2)
  - [ ] Add one frontend bridge client path that invokes a native command and handles a typed success/error payload.
  - [ ] Add one native command exposed with `snake_case` naming and a direct typed response payload.
  - [ ] Define one event name using dotted lowercase naming and wire the shared bridge helpers needed for later event-driven playback updates.
- [ ] Stub the native playback module boundary (AC: 3)
  - [ ] Create the playback module entry points and placeholder files in `src-tauri/src/playback/`.
  - [ ] Ensure playback-critical logic remains on the native side; React should only orchestrate UI and bridge calls.
  - [ ] Keep the playback boundary explicit so later media loading, seek, subtitle, and event work can extend it without reorganizing the app.
- [ ] Verify the foundation is ready for follow-on stories (AC: 1, 2, 3)
  - [ ] Confirm the app starts locally on macOS.
  - [ ] Confirm the frontend can call the native command and receive a typed response.
  - [ ] Confirm the created folders and module names match the architecture naming and structure rules.

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

### Completion Notes List

- Story context created from epics, PRD, and architecture artifacts.
- No prior story file, project context file, or application source tree existed at creation time.
- No web research was required because the architecture already pins the key foundation versions and workflow choices for this story.

### File List

- `_bmad-output/implementation-artifacts/1-1-initialize-the-desktop-app-foundation.md`