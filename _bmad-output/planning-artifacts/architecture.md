---
stepsCompleted:
  - 1
  - 2
  - 3
  - 4
  - 5
  - 6
  - 7
  - 8
inputDocuments:
  - /Users/cavitertugrulsirt/dev/bmad-recover/_bmad-output/planning-artifacts/prd.md
  - /Users/cavitertugrulsirt/dev/bmad-recover/_bmad-output/planning-artifacts/product-brief-kovi.md
workflowType: 'architecture'
project_name: 'Kovi'
user_name: 'kral'
date: '2026-05-07'
initializedAt: '2026-05-07T17:42:19Z'
lastStep: 8
status: 'complete'
completedAt: '2026-05-07T17:57:50Z'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
Kovi defines 50 functional requirements across six capability areas: media playback, subtitle management, shortcut and control customization, playlist and session continuity, file access and desktop workflow, and playback state and preferences. Architecturally, this means the product is not just a file player. It requires coordinated handling of playback state, subtitle state, action dispatch, persistent preferences, and playlist/session restoration.

The functional surface is centered on active navigation. Fixed-interval jumps, subtitle-boundary jumps, and keyboard-driven controls are part of the core product contract, not secondary enhancements. Subtitle workflows are equally central: the architecture must support external subtitle association, embedded subtitle enumeration and switching, timing adjustment, and style preference persistence as first-class capabilities.

**Non-Functional Requirements:**
The strongest architectural NFR is navigation responsiveness. Core jump actions and subtitle-boundary jumps must target `<= 100ms` perceived response time during normal playback on supported macOS hardware. Reliability also matters strongly: the application must remain stable during extended playback sessions and preserve playlist state, playback position, and user preferences across restarts. The MVP must operate fully offline, which removes cloud complexity but makes local state integrity and dependency selection more important.

**Scale & Complexity:**
This is a medium-complexity desktop application. The product scope is intentionally narrow in platform and distribution model, but the playback-control experience is technically demanding because responsiveness is itself the differentiator.

- Primary domain: desktop media application
- Complexity level: medium
- Estimated architectural components: 6-8 major components

### Technical Constraints & Dependencies

The product is constrained to macOS for the MVP and must function fully offline. There is no account system, backend service, cloud synchronization, or online activation dependency. The architecture must support local media playback within the defined compatibility scope for `mp4`, `mkv`, `mov`, and `mp3`, centered on `H.264`, `H.265/HEVC`, `AAC`, and `AC3`.

The implementation must also preserve room for future desktop expansion without making the MVP more complex than necessary. Update infrastructure is explicitly out of scope for MVP, and non-essential desktop integrations such as media keys, Picture in Picture, menu bar integration, dock integration, global shortcuts, and automatic default-player registration should not shape the initial architecture.

### Cross-Cutting Concerns Identified

The main cross-cutting concern is low-latency control execution: playback navigation, subtitle-boundary jumps, and shortcut dispatch all depend on a control path with minimal overhead. Subtitle state management is another cross-cutting concern because subtitle source selection, track switching, timing offsets, and style preferences all intersect with playback state and user preferences.

Local persistence is a third cross-cutting concern. Playlist continuity, per-file resume, shortcut mappings, and subtitle preferences must survive app restarts predictably. Finally, the architecture must balance responsiveness and reliability for a solo-built product, which means minimizing accidental complexity while keeping playback, subtitle behavior, and persistent state clearly separated.

## Starter Template Evaluation

### Primary Technology Domain

Desktop application based on project requirements analysis.

### Starter Options Considered

**Option 1: Tauri starter**
- Current official project creation path supports `TypeScript / JavaScript` frontends and multiple UI templates.
- Strong fit for macOS-first desktop products that want a lightweight shell and native extension path.
- Better aligned with a split where UI stays in TypeScript and performance-critical playback logic stays native.

**Option 2: Electron Forge TypeScript starter**
- Current TypeScript starter remains available through Electron Forge.
- Mature tooling and broad ecosystem support.
- Higher shell overhead and weaker fit for a navigation-first media player where native control boundaries matter.

### Selected Starter: Tauri with React + TypeScript frontend

**Rationale for Selection:**
This is the best balanced tradeoff for Kovi. It preserves TypeScript for fast solo development and maintainable UI work, while keeping the architecture open for native playback logic where responsiveness actually matters. It also keeps the MVP lightweight and macOS-focused without introducing unnecessary shell overhead.

TypeScript is not expected to be the bottleneck if playback decoding, seeking, subtitle timing, and navigation-critical operations are kept in the native layer. The frontend should orchestrate controls and presentation, not perform the heavy media work.

React is selected as the default UI framework because it is mature, well-supported, and practical for a solo project unless a different frontend preference is stated.

**Initialization Command:**

```bash
npm create tauri-app@latest
```

**Recommended template choices during setup:**
- Frontend language: `TypeScript / JavaScript`
- Package manager: `npm` or `pnpm`
- UI template: `React`
- UI flavor: `TypeScript`

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
- TypeScript for the frontend
- Rust-backed native application layer through Tauri

**Styling Solution:**
- Frontend-managed styling within the selected React template
- Final styling approach remains an architecture decision later

**Build Tooling:**
- Tauri project initialization with current official CLI flow
- Frontend bundling through the selected template toolchain

**Testing Framework:**
- No testing framework is required as part of the MVP architecture baseline
- Testing setup remains intentionally out of scope unless later planning adds it explicitly

**Code Organization:**
- Clear split between frontend application code and native application layer
- Good fit for separating playback engine concerns from UI concerns

**Development Experience:**
- Strong TypeScript ergonomics for UI development
- Native extensibility where performance-critical playback features require it
- Good balance between solo-project productivity and long-term structure

**Note:** Project initialization using this command should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Desktop shell: Tauri
- Frontend stack: React `19.2.6` with TypeScript
- Frontend state management: Zustand `5.0.13`
- UI/native bridge: Tauri commands and events
- Persistence model: hybrid local persistence
- Playback core structure: dedicated native playback module inside the app
- Distribution scope: local development and manual packaging for personal macOS use
- Tauri CLI baseline: `@tauri-apps/cli` `2.11.1`

**Important Decisions (Shape Architecture):**
- Keep playback-critical navigation and subtitle operations in the native layer
- Keep React focused on presentation, interaction orchestration, and settings flows
- Separate simple preference storage from richer playback/session state storage
- Avoid unnecessary process boundaries for MVP

**Deferred Decisions (Post-MVP):**
- Auto-update infrastructure
- Multi-platform packaging strategy
- Secondary desktop integrations beyond current MVP scope
- Testing infrastructure and CI pipeline

### Data Architecture

The architecture uses a hybrid local persistence model.

- **Preferences store:** local lightweight application store for user settings such as shortcut mappings, subtitle styling preferences, subtitle timing defaults if persisted globally, and other simple configuration values.
- **Structured playback/session store:** embedded SQLite for richer local state such as playlist persistence, per-file resume positions, recent files, and future playback metadata that benefits from querying and relational updates.

**Decision:** Hybrid persistence
**Rationale:** Preferences are simple key-value data, while playlist/session state is richer and more likely to evolve. This avoids overloading a flat store with relational playback state while keeping simple settings lightweight.
**Affects:** preferences management, playlist continuity, resume playback, recent-files model, future extensibility

### Authentication & Security

No authentication architecture is required for the MVP.

- No account system
- No online identity layer
- No backend authorization model
- No cloud sync trust boundary

Security scope is limited to safe local application behavior and dependency hygiene rather than user identity or remote data protection.

**Decision:** No authentication subsystem in MVP
**Rationale:** The application is fully offline and single-user on a personal machine. Adding auth would create unnecessary complexity with no product value for the current scope.
**Affects:** app startup flow, settings model, persistence model, offline architecture simplicity

### API & Communication Patterns

The application will use Tauri commands and events as the primary communication model between the React frontend and the native playback layer.

- **Commands** handle request/response flows such as open file, load subtitles, get playlist state, update preferences, or seek to a target location.
- **Events** handle playback-state broadcasting and asynchronous updates such as playback position changes, subtitle-track availability changes, current media changes, or error notifications.

**Decision:** Tauri command/event bridge
**Rationale:** This is the simplest architecture that matches the chosen shell, keeps the app offline, and avoids introducing a local HTTP layer or separate sidecar IPC surface before it is needed.
**Affects:** playback control flow, state synchronization, error propagation, UI/native contract design

### Frontend Architecture

The frontend architecture will use React `19.2.6` with TypeScript and Zustand `5.0.13`.

- React owns the desktop UI, view composition, settings screens, playlist views, and interaction flows.
- Zustand owns application state that spans UI areas, especially playback UI state, playlist/session state mirrors, preferences state, and command results that need to be shared.
- Component design should remain feature-oriented rather than deeply abstracted, reflecting the solo-project scope.

**Decision:** React + TypeScript + Zustand
**Rationale:** This combination provides strong solo-developer ergonomics, low ceremony, and enough structure for shared playback/session state without the overhead of a heavier state architecture.
**Affects:** component structure, state boundaries, action dispatch, UI maintainability

### Playback Core

Playback logic will live in a dedicated native playback module inside the Tauri app rather than in the frontend and not as a separate sidecar process for MVP.

- The native playback module is responsible for media loading, timing-sensitive navigation, subtitle-boundary navigation, subtitle track/state coordination, and playback-state exposure.
- The frontend should never be responsible for timing-critical playback logic.
- The internal boundary should still be explicit so the playback module can evolve independently from the UI.

**Decision:** Dedicated native playback module inside the app
**Rationale:** This preserves a clean separation of concerns and supports the performance target without introducing the operational complexity of a separate playback process in the MVP.
**Affects:** module boundaries, bridge contract design, performance-critical execution path, future refactor options

### Infrastructure & Deployment

The MVP architecture targets local development and manual packaging for use on your own MacBook.

- Development should support running the app locally in a standard Tauri dev loop.
- Packaging should support creating a usable macOS application bundle manually.
- The architecture should not assume hosted infrastructure, CI/CD automation, or automatic update delivery.

**Decision:** local dev + manual packaging
**Rationale:** This matches the actual MVP goal and keeps infrastructure overhead out of the critical path while still producing a real desktop application you can build and use.
**Affects:** release flow, signing/distribution assumptions, deployment complexity

### Decision Impact Analysis

**Implementation Sequence:**
1. Initialize the Tauri + React + TypeScript project foundation
2. Establish the UI/native contract through Tauri commands and events
3. Build the native playback module boundary
4. Implement hybrid persistence boundaries
5. Add Zustand-based frontend state coordination
6. Layer playback UI, subtitle controls, playlist continuity, and preferences on top of these foundations
7. Package the app for manual macOS use

**Cross-Component Dependencies:**
- The command/event bridge depends on clear boundaries between React state and native playback state.
- Hybrid persistence affects playlist management, recent files, resume playback, and preferences flows across the UI.
- Zustand state shape depends on which playback and persistence events the native layer emits.
- The native playback module is the architectural center for performance-sensitive features and therefore constrains bridge design, state update strategy, and error handling patterns.

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
5 areas where AI agents could make different choices:
- UI/native bridge naming and payload shape
- feature/store organization
- local persistence boundaries
- error handling behavior
- loading-state handling

### Naming Patterns

**Database Naming Conventions:**
- SQLite tables use `snake_case` plural names, for example `recent_files`, `playback_positions`, `playlist_items`
- SQLite columns use `snake_case`
- Foreign keys use `<entity>_id`, for example `media_item_id`
- Index names use `idx_<table>_<column>`, for example `idx_recent_files_last_opened_at`

**API Naming Conventions:**
- Tauri commands use `snake_case`, for example `open_file`, `seek_by_seconds`, `jump_to_next_subtitle`
- Tauri event names use dotted lowercase names, for example `playback.position-changed`, `subtitle.track-changed`, `playlist.updated`
- Event payload fields exposed to the frontend use `camelCase`

**Code Naming Conventions:**
- React component files use `PascalCase`, for example `PlayerView.tsx`, `SubtitlePanel.tsx`
- Hooks, stores, utility files, and non-component TypeScript modules use `kebab-case`, for example `playback-store.ts`, `subtitle-utils.ts`
- TypeScript variables, functions, and object fields use `camelCase`
- Rust module and file names use Rust-standard `snake_case`

### Structure Patterns

**Project Organization:**
- Frontend code is organized by feature domain rather than by technical layer alone
- Zustand stores are split by feature domain, not placed into one monolithic store
- Native playback logic lives in a dedicated playback module boundary inside the Tauri native layer
- Persistence logic is separated into lightweight preference persistence and structured SQLite-backed session persistence

**File Structure Patterns:**
- Frontend features should group related UI, state, and feature-specific helpers together where practical
- Shared utilities live in a dedicated shared utilities area rather than inside unrelated feature folders
- Bridge command/event contract definitions should be centralized and reusable
- Persistence-related schemas, queries, and storage adapters should be grouped by storage responsibility

### Format Patterns

**API Response Formats:**
- Successful Tauri command responses return direct typed payloads rather than wrapped `{ data: ... }` envelopes unless wrapping is required by a specific command contract
- Errors from native commands return structured error objects with `code`, `message`, and optional `details`
- Frontend error presentation should show the full returned error details to the user when an operation fails

**Data Exchange Formats:**
- Frontend-facing payload fields use `camelCase`
- Date/time values exchanged with the frontend use ISO 8601 strings unless a specific command requires another representation
- Boolean values remain standard `true` / `false`
- Nullability should be explicit in bridge payloads rather than inferred

### Communication Patterns

**Event System Patterns:**
- Playback and subtitle updates are emitted as named Tauri events
- Event names follow dotted lowercase conventions by domain
- Event payloads should be minimal, typed, and scoped to the event purpose
- Events communicate state changes; commands initiate actions

**State Management Patterns:**
- Zustand stores are organized by feature domain: playback, playlist, subtitles, preferences
- UI state and persisted state boundaries should remain explicit
- Store actions use verb-first `camelCase` names, for example `setVolume`, `loadPlaylist`, `applySubtitleOffset`
- Frontend stores mirror native playback state but do not replace the native layer as the source of truth for timing-critical playback behavior

### Process Patterns

**Error Handling Patterns:**
- Native command failures return structured errors with complete detail available to the frontend
- The frontend should present full error details to the user rather than aggressively simplifying or hiding them
- Logging and user-visible error presentation can share the same core error content for MVP
- Errors should remain structured even when fully displayed so the UI can present them consistently

**Loading State Patterns:**
- Loading states are local to the action or view by default
- No global loading overlay should be introduced unless an operation truly blocks the whole app
- Playback interactions should avoid unnecessary loading indicators when the operation is expected to feel immediate
- Long-running operations should surface explicit progress or busy state only where users need it

### Enforcement Guidelines

**All AI Agents MUST:**
- Keep playback-critical logic in the native layer and out of the React UI layer
- Follow the naming conventions for components, stores, commands, events, and persistence structures
- Preserve the separation between lightweight preferences and structured playback/session persistence
- Treat the native playback layer as the source of truth for playback timing and subtitle-boundary behavior
- Expose structured full-detail errors to the frontend on failures

**Pattern Enforcement:**
- New modules should match the naming and structure rules before merge
- Bridge contracts should be checked for command/event naming consistency and payload shape consistency
- Persistence additions should be classified explicitly as preferences-store data or SQLite-backed structured state
- Pattern changes should be documented by updating this architecture document rather than drifting through ad hoc implementation

### Pattern Examples

**Good Examples:**
- `PlayerView.tsx`
- `playback-store.ts`
- `open_file`
- `jump_to_next_subtitle`
- `playback.position-changed`
- SQLite table `playback_positions`
- Zustand action `setPlaybackRate`

**Anti-Patterns:**
- Mixing `camelCase`, `snake_case`, and `PascalCase` arbitrarily across bridge payloads
- Putting all app state into one large Zustand store
- Implementing timing-critical subtitle jump logic in React
- Returning raw unstructured string errors from native commands
- Hiding detailed errors behind generic messages when the native layer provided useful diagnostics

## Project Structure & Boundaries

### Complete Project Directory Structure

```text
kovi/
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── index.html
├── .gitignore
├── .env.example
├── src/
│   ├── main.tsx
│   ├── app/
│   │   ├── App.tsx
│   │   ├── providers/
│   │   │   └── AppProviders.tsx
│   │   ├── routes/
│   │   │   └── index.tsx
│   │   └── layout/
│   │       ├── AppShell.tsx
│   │       └── panels/
│   │           ├── PlayerPanel.tsx
│   │           ├── PlaylistPanel.tsx
│   │           └── SubtitlePanel.tsx
│   ├── features/
│   │   ├── playback/
│   │   │   ├── components/
│   │   │   │   ├── PlaybackControls.tsx
│   │   │   │   ├── SeekControls.tsx
│   │   │   │   └── PlaybackStatus.tsx
│   │   │   ├── hooks/
│   │   │   │   └── use-playback-events.ts
│   │   │   ├── store/
│   │   │   │   └── playback-store.ts
│   │   │   ├── bridge/
│   │   │   │   └── playback-commands.ts
│   │   │   └── types/
│   │   │       └── playback.ts
│   │   ├── subtitles/
│   │   │   ├── components/
│   │   │   │   ├── SubtitleTrackMenu.tsx
│   │   │   │   ├── SubtitleOffsetControls.tsx
│   │   │   │   └── SubtitleStyleControls.tsx
│   │   │   ├── hooks/
│   │   │   │   └── use-subtitle-events.ts
│   │   │   ├── store/
│   │   │   │   └── subtitle-store.ts
│   │   │   ├── bridge/
│   │   │   │   └── subtitle-commands.ts
│   │   │   └── types/
│   │   │       └── subtitles.ts
│   │   ├── playlist/
│   │   │   ├── components/
│   │   │   │   ├── PlaylistView.tsx
│   │   │   │   ├── PlaylistItem.tsx
│   │   │   │   └── RecentFilesView.tsx
│   │   │   ├── store/
│   │   │   │   └── playlist-store.ts
│   │   │   ├── bridge/
│   │   │   │   └── playlist-commands.ts
│   │   │   └── types/
│   │   │       └── playlist.ts
│   │   ├── preferences/
│   │   │   ├── components/
│   │   │   │   ├── ShortcutSettings.tsx
│   │   │   │   ├── PlaybackPreferences.tsx
│   │   │   │   └── SubtitlePreferences.tsx
│   │   │   ├── store/
│   │   │   │   └── preferences-store.ts
│   │   │   ├── bridge/
│   │   │   │   └── preference-commands.ts
│   │   │   └── types/
│   │   │       └── preferences.ts
│   │   └── file-open/
│   │       ├── components/
│   │       │   └── FileDropzone.tsx
│   │       └── bridge/
│   │           └── file-open-commands.ts
│   ├── shared/
│   │   ├── bridge/
│   │   │   ├── event-bus.ts
│   │   │   ├── tauri-client.ts
│   │   │   └── error-types.ts
│   │   ├── components/
│   │   │   ├── ErrorDialog.tsx
│   │   │   └── IconButton.tsx
│   │   ├── utils/
│   │   │   ├── time-format.ts
│   │   │   ├── file-format.ts
│   │   │   └── keyboard-shortcuts.ts
│   │   └── types/
│   │       └── common.ts
│   └── styles/
│       ├── globals.css
│       └── tokens.css
├── src-tauri/
│   ├── Cargo.toml
│   ├── tauri.conf.json
│   ├── capabilities/
│   ├── icons/
│   └── src/
│       ├── main.rs
│       ├── lib.rs
│       ├── commands/
│       │   ├── mod.rs
│       │   ├── playback_commands.rs
│       │   ├── subtitle_commands.rs
│       │   ├── playlist_commands.rs
│       │   └── preference_commands.rs
│       ├── playback/
│       │   ├── mod.rs
│       │   ├── engine.rs
│       │   ├── navigation.rs
│       │   ├── subtitle_navigation.rs
│       │   ├── subtitle_tracks.rs
│       │   ├── events.rs
│       │   ├── state.rs
│       │   └── errors.rs
│       ├── persistence/
│       │   ├── mod.rs
│       │   ├── preferences_store.rs
│       │   ├── sqlite.rs
│       │   ├── playlist_repository.rs
│       │   ├── playback_position_repository.rs
│       │   └── recent_files_repository.rs
│       ├── models/
│       │   ├── mod.rs
│       │   ├── playback.rs
│       │   ├── subtitles.rs
│       │   ├── playlist.rs
│       │   └── preferences.rs
│       ├── bridge/
│       │   ├── mod.rs
│       │   ├── dto.rs
│       │   └── error_mapping.rs
│       └── support/
│           ├── mod.rs
│           ├── logging.rs
│           └── paths.rs
└── docs/
    └── architecture-notes.md
```

### Architectural Boundaries

**API Boundaries:**
- The React frontend communicates with native code only through Tauri commands and events.
- Playback actions such as file open, seek, subtitle jumps, subtitle loading, and playlist restoration cross the bridge through command modules.
- The frontend does not call persistence or playback internals directly.

**Component Boundaries:**
- `features/playback` owns playback UI and frontend playback state projection.
- `features/subtitles` owns subtitle controls and subtitle-related UI state.
- `features/playlist` owns playlist and recent-file user flows.
- `features/preferences` owns shortcut, subtitle, and playback preference editing.
- Shared UI and bridge helpers live under `shared/` and must stay generic.

**Service Boundaries:**
- `src-tauri/src/playback/` is the timing-critical playback domain.
- `src-tauri/src/persistence/` owns all local storage concerns.
- `src-tauri/src/commands/` is the only command-exposure layer to the frontend.
- `src-tauri/src/bridge/` owns payload mapping and structured error conversion.

**Data Boundaries:**
- Preferences store handles simple persistent settings only.
- SQLite-backed repositories handle playlist persistence, playback positions, and recent files.
- Playback runtime state is owned by the native playback module, not by SQLite and not by Zustand as source of truth.

### Requirements to Structure Mapping

**Feature Mapping:**
- Media Playback FRs → `src/features/playback/` and `src-tauri/src/playback/`
- Subtitle Management FRs → `src/features/subtitles/` and `src-tauri/src/playback/subtitle_*`
- Shortcut and Control Customization FRs → `src/features/preferences/` and `src/shared/utils/keyboard-shortcuts.ts`
- Playlist and Session Continuity FRs → `src/features/playlist/` and `src-tauri/src/persistence/`
- File Access and Desktop Workflow FRs → `src/features/file-open/` and Tauri command layer
- Playback State and Preferences FRs → `src/features/preferences/`, Zustand stores, and persistence modules

**Cross-Cutting Concerns:**
- Error handling → `src/shared/bridge/error-types.ts`, `src/shared/components/ErrorDialog.tsx`, `src-tauri/src/playback/errors.rs`, `src-tauri/src/bridge/error_mapping.rs`
- Event delivery → `src/shared/bridge/event-bus.ts`, `src-tauri/src/playback/events.rs`
- Data contracts → `src/shared/types/`, `src/features/*/types/`, `src-tauri/src/bridge/dto.rs`

### Integration Points

**Internal Communication:**
- React components communicate through feature stores and typed props.
- Feature stores call typed bridge command modules.
- Native commands delegate to playback or persistence modules.
- Native playback emits typed events back to the frontend.

**External Integrations:**
- Local media files from macOS file system
- External subtitle files from local file system
- `ffmpeg`-based playback implementation inside the native playback layer

**Data Flow:**
- User action in React UI
- Zustand action or bridge call
- Tauri command invocation
- Native playback/persistence module execution
- Command response and/or native event emission
- Frontend store update
- UI rerender

### File Organization Patterns

**Configuration Files:**
- Root JS/TS app config stays in the project root.
- Tauri/Rust config stays under `src-tauri/`.
- Environment examples stay at root and remain minimal for MVP.

**Source Organization:**
- Frontend source is feature-oriented.
- Native source is domain-oriented with explicit module boundaries.
- Shared bridge contracts stay centralized to avoid drift.

**Test Organization:**
- No testing structure is defined as part of the MVP architecture baseline.

**Asset Organization:**
- Frontend styling assets stay under `src/styles/`.
- Tauri app icons and bundle assets stay under `src-tauri/icons/`.

### Development Workflow Integration

**Development Server Structure:**
- Frontend runs through the Tauri development loop with the React toolchain.
- Native changes and frontend changes are both part of the local desktop dev workflow.

**Build Process Structure:**
- Frontend bundles into the Tauri application shell.
- Native playback and persistence modules compile as part of the Tauri app build.

**Deployment Structure:**
- The structure supports local development and manual packaging into a usable macOS app bundle for personal use.

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
The chosen stack is coherent. Tauri, React `19.2.6`, TypeScript, and Zustand `5.0.13` work together as a lightweight desktop foundation. The command/event bridge matches the shell choice, and the dedicated native playback module aligns with the performance-sensitive navigation requirements.

**Pattern Consistency:**
The implementation patterns support the architectural decisions. Naming rules, state boundaries, bridge payload rules, persistence separation, and full-detail error handling all align with the chosen technologies and with the expected power-user workflow.

**Structure Alignment:**
The project structure supports the architecture cleanly. Frontend features are separated by domain, native playback logic is isolated from UI code, persistence is split by responsibility, and bridge boundaries are explicit.

### Requirements Coverage Validation ✅

**Epic/Feature Coverage:**
No epics were provided, so validation is based on functional requirement categories and user journeys. All major product capabilities map to architectural modules and directories.

**Functional Requirements Coverage:**
All FR categories are architecturally supported:
- Media playback is covered by the native playback module and playback UI/store boundaries
- Subtitle management is covered by subtitle bridge/state/native playback modules
- Shortcut customization is covered by preferences UI/state and lightweight persistence
- Playlist/session continuity is covered by SQLite-backed repositories plus frontend playlist state
- File access and desktop workflow are covered by Tauri commands and macOS file interactions
- Playback state and preferences are covered by the hybrid persistence model and typed bridge contracts

**Non-Functional Requirements Coverage:**
The strongest NFRs are addressed:
- Performance is addressed by keeping timing-critical logic in the native layer
- Reliability is addressed through local persistence boundaries and explicit playback/session state handling
- Offline operation is fully supported by the chosen shell and local-only architecture

### Implementation Readiness Validation ✅

**Decision Completeness:**
Critical implementation-blocking decisions are documented, including shell, frontend stack, state model, bridge model, persistence split, playback-core boundary, and packaging scope.

**Structure Completeness:**
The project tree is concrete and specific enough to guide implementation. Module boundaries, feature areas, bridge locations, and persistence locations are defined.

**Pattern Completeness:**
The main conflict points between future AI agents are covered: naming, structure, bridge payloads, state boundaries, persistence boundaries, loading patterns, and error-handling behavior.

### Gap Analysis Results

**Critical Gaps:**
- None

**Important Gaps:**
- Exact `ffmpeg` integration strategy is not yet pinned to a specific native Rust approach
- Exact SQLite library/crate choice is not yet pinned
- macOS packaging details beyond manual local packaging are not specified

**Nice-to-Have Gaps:**
- Future guidance for multi-platform expansion
- Future signing/notarization notes for wider macOS distribution
- Future test strategy if quality automation is introduced later

### Validation Issues Addressed

No blocking architectural conflicts were found. The current document is sufficient for implementation kickoff of the MVP foundation. Remaining gaps are technology-detail refinements that can be resolved during implementation setup without changing the architecture shape.

### Architecture Completeness Checklist

**Requirements Analysis**

- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**Architectural Decisions**

- [x] Critical decisions documented with versions
- [x] Technology stack fully specified
- [x] Integration patterns defined
- [x] Performance considerations addressed

**Implementation Patterns**

- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified
- [x] Process patterns documented

**Project Structure**

- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** high

**Key Strengths:**
- Strong alignment between architecture and the product differentiator
- Clear native/UI separation for performance-sensitive behavior
- Explicit hybrid persistence boundaries
- Concrete project structure suitable for solo implementation
- Consistency rules that reduce agent drift

**Areas for Future Enhancement:**
- Lock exact `ffmpeg` integration approach
- Lock exact SQLite crate choice
- Add distribution/signing guidance if the app moves beyond personal local use

### Implementation Handoff

**AI Agent Guidelines:**
- Follow all architectural decisions exactly as documented
- Use implementation patterns consistently across all components
- Respect project structure and boundaries
- Refer to this document for all architectural questions

**First Implementation Priority:**
Initialize the Tauri + React + TypeScript project using `npm create tauri-app@latest`, then establish the command/event bridge and native playback module boundary before building feature UI.