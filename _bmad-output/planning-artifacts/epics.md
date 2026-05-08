---
stepsCompleted:
  - 1
  - 2
  - 3
inputDocuments:
  - /Users/cavitertugrulsirt/dev/bmad-recover/_bmad-output/planning-artifacts/prd.md
  - /Users/cavitertugrulsirt/dev/bmad-recover/_bmad-output/planning-artifacts/architecture.md
---

# Kovi - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Kovi, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Users can open local media files for playback from the file system.
FR2: Users can start playback of supported local media files.
FR3: Users can pause and resume media playback.
FR4: Users can seek to a different position within the current media item.
FR5: Users can skip forward by a configured short interval during playback.
FR6: Users can skip backward by a configured short interval during playback.
FR7: Users can skip forward by a configured long interval during playback.
FR8: Users can skip backward by a configured long interval during playback.
FR9: Users can move playback to the next subtitle boundary in the current media item.
FR10: Users can move playback to the previous subtitle boundary in the current media item.
FR11: Users can mute and unmute audio during playback.
FR12: Users can adjust playback volume.
FR13: Users can enter and exit fullscreen playback mode.
FR14: Users can resume playback of a media item from its last remembered position.
FR15: Users can restart playback of a media item from the beginning.
FR16: Users can load external subtitle files for the current media item.
FR17: Users can have matching external subtitle files associated with the current media item automatically when available.
FR18: Users can view available embedded subtitle tracks for the current media item.
FR19: Users can switch between embedded subtitle tracks during playback.
FR20: Users can disable subtitles during playback.
FR21: Users can adjust subtitle timing offset during playback.
FR22: Users can customize subtitle font styling for playback readability.
FR23: Users can persist subtitle display preferences for future playback sessions.
FR24: Users can control playback through keyboard shortcuts.
FR25: Users can customize keyboard shortcuts for playback actions.
FR26: Users can customize keyboard shortcuts for subtitle navigation actions.
FR27: Users can customize keyboard shortcuts for subtitle control actions.
FR28: Users can save customized shortcut mappings for future sessions.
FR29: Users can view when a shortcut assignment conflicts with an existing mapping.
FR30: Users can use updated shortcut mappings without restarting the application.
FR31: Users can add media items to a playlist.
FR32: Users can remove media items from a playlist.
FR33: Users can reorder media items within a playlist.
FR34: Users can play media items sequentially from a playlist.
FR35: Users can preserve the current playlist across application restarts.
FR36: Users can reopen the application and restore the previous playlist state.
FR37: Users can access a list of recent files opened in the application.
FR38: Users can reopen a recently used media item from within the application.
FR39: Users can have playback position remembered per media item across sessions.
FR40: Users can open media files through a standard macOS file selection flow.
FR41: Users can open media files by dragging and dropping them into the application.
FR42: Users can use the application without creating an account or connecting to an online service.
FR43: Users can access core playback functionality while fully offline.
FR44: Users can have playback preferences persisted locally across sessions.
FR45: Users can have shortcut preferences persisted locally across sessions.
FR46: Users can have subtitle preferences persisted locally across sessions.
FR47: The system can restore locally stored playback state when a user returns to previously viewed content.
FR48: Users can play supported local media content within the defined MVP compatibility scope.
FR49: Users can use the application for local playback without network-dependent features.
FR50: Users can use the MVP on macOS as the supported release platform.

### NonFunctional Requirements

NFR1: Core navigation actions for fixed time jumps and subtitle-boundary jumps must target `<= 100ms` perceived response time during normal playback on supported macOS hardware.
NFR2: Playback control interactions must remain responsive enough that active-navigation users can move through content without losing flow.
NFR3: Application launch and local file opening must be fast enough to avoid noticeable friction in normal use, but they are secondary to navigation responsiveness.
NFR4: The application must remain stable during extended playback sessions of long-form local media.
NFR5: The application must preserve playlist state, playback position state, and user preference state across normal application restarts.
NFR6: The application must handle supported subtitle and media workflows without forcing users to leave the current playback session to recover from common issues.
NFR7: The MVP must operate fully offline for all core playback, subtitle, playlist, and preference-management workflows.
NFR8: The MVP must avoid non-essential system complexity that does not improve playback responsiveness, subtitle control, or session continuity.

### Additional Requirements

- Initialize the project with the official Tauri starter using `npm create tauri-app@latest`.
- Use Tauri as the desktop shell with React `19.2.6`, TypeScript, Zustand `5.0.13`, and `@tauri-apps/cli` `2.11.1` as the baseline stack.
- Keep playback-critical logic in a dedicated native playback module inside the Tauri app.
- Use Tauri commands and events as the only UI/native communication bridge.
- Organize frontend code by feature domain and native code by domain module boundaries.
- Use a hybrid persistence model with a lightweight local preferences store plus SQLite-backed structured session/playback storage.
- Keep playback runtime state in the native playback module as source of truth rather than in frontend state or SQLite.
- Use `snake_case` for Tauri command names and Rust/native persistence naming.
- Use dotted lowercase event names such as `playback.position-changed` and `subtitle.track-changed`.
- Expose frontend-facing bridge payload fields in `camelCase`.
- Show full structured error details to the user on failures because the expected user is power-user oriented.
- Keep loading states local to action/view scope and avoid app-wide loading overlays unless truly blocking.
- Support local development and manual macOS packaging only for MVP; no auto-update or CI/CD requirements are included.
- No authentication subsystem is required for MVP.
- No testing framework or test directory baseline is required in MVP architecture.
- Preserve explicit module boundaries for playback, subtitles, playlist/session continuity, preferences, bridge contracts, and persistence repositories.
- Begin implementation by establishing the Tauri project, UI/native bridge, and native playback module boundary before feature UI work.

### UX Design Requirements

No UX design document was provided for extraction.

### FR Coverage Map

FR1: Epic 1 - open local media files
FR2: Epic 1 - start playback
FR3: Epic 1 - pause and resume playback
FR4: Epic 1 - seek within current media
FR5: Epic 1 - short forward jump
FR6: Epic 1 - short backward jump
FR7: Epic 1 - long forward jump
FR8: Epic 1 - long backward jump
FR9: Epic 2 - next subtitle-boundary navigation
FR10: Epic 2 - previous subtitle-boundary navigation
FR11: Epic 1 - mute and unmute audio
FR12: Epic 1 - adjust volume
FR13: Epic 1 - fullscreen mode
FR14: Epic 3 - resume from last remembered position
FR15: Epic 1 - restart from beginning
FR16: Epic 2 - load external subtitle files
FR17: Epic 2 - auto-associate matching subtitle files
FR18: Epic 2 - view embedded subtitle tracks
FR19: Epic 2 - switch embedded subtitle tracks
FR20: Epic 2 - disable subtitles
FR21: Epic 2 - adjust subtitle timing offset
FR22: Epic 2 - customize subtitle font styling
FR23: Epic 2 - persist subtitle display preferences
FR24: Epic 2 - control playback through keyboard shortcuts
FR25: Epic 2 - customize playback shortcuts
FR26: Epic 2 - customize subtitle navigation shortcuts
FR27: Epic 2 - customize subtitle control shortcuts
FR28: Epic 2 - save customized shortcut mappings
FR29: Epic 2 - detect shortcut conflicts
FR30: Epic 2 - use updated shortcuts without restart
FR31: Epic 3 - add items to playlist
FR32: Epic 3 - remove items from playlist
FR33: Epic 3 - reorder playlist items
FR34: Epic 3 - sequential playlist playback
FR35: Epic 3 - preserve playlist across restarts
FR36: Epic 3 - restore previous playlist state
FR37: Epic 3 - access recent files
FR38: Epic 3 - reopen recent file
FR39: Epic 3 - remember playback position per media item
FR40: Epic 1 - standard macOS file open flow
FR41: Epic 1 - drag-and-drop file opening
FR42: Epic 1 - no account/online service required
FR43: Epic 1 - core playback fully offline
FR44: Epic 2 - persist playback preferences locally
FR45: Epic 2 - persist shortcut preferences locally
FR46: Epic 2 - persist subtitle preferences locally
FR47: Epic 3 - restore locally stored playback state
FR48: Epic 1 - supported MVP compatibility playback
FR49: Epic 1 - local playback without network features
FR50: Epic 1 - macOS as supported MVP platform

## Epic List

### Epic 1: Core Local Playback and Precision Navigation
Users can open local media and control playback with the fast, precise navigation that defines Kovi’s core value.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7, FR8, FR11, FR12, FR13, FR15, FR40, FR41, FR42, FR43, FR48, FR49, FR50

### Epic 2: Subtitle-Driven Playback Control and Personalization
Users can work with subtitles as a first-class playback tool, including subtitle-boundary navigation, subtitle source/track control, subtitle presentation settings, and customizable shortcuts that match their workflow.
**FRs covered:** FR9, FR10, FR16, FR17, FR18, FR19, FR20, FR21, FR22, FR23, FR24, FR25, FR26, FR27, FR28, FR29, FR30, FR44, FR45, FR46

### Epic 3: Playlist Continuity and Session Persistence
Users can manage playlists, recent files, and playback/session continuity so Kovi remains useful across longer viewing sessions and app restarts.
**FRs covered:** FR14, FR31, FR32, FR33, FR34, FR35, FR36, FR37, FR38, FR39, FR47

## Epic 1: Core Local Playback and Precision Navigation

Users can open local media and control playback with the fast, precise navigation that defines Kovi’s core value.

### Story 1.1: Initialize the Desktop App Foundation

As a developer,
I want a working Tauri + React + TypeScript application foundation with the native playback boundary stubbed,
So that all later playback features are built on the approved architecture.

**Acceptance Criteria:**

**Given** the repository does not yet contain the app foundation
**When** the project is initialized
**Then** the codebase uses the approved Tauri + React + TypeScript starter structure
**And** the project can run locally as a desktop app on macOS

**Given** the initial app foundation is created
**When** the native layer is wired to the frontend
**Then** a basic Tauri command/event bridge exists
**And** the frontend can invoke a native command and receive a typed response

**Given** the architecture requires a dedicated playback module
**When** the native source structure is created
**Then** the playback module boundary exists in the native layer
**And** later playback stories can build inside that boundary without restructuring the app

### Story 1.2: Open Local Media Files

As a user,
I want to open local media files from Finder or the standard file picker,
So that I can start using Kovi with my own local video and audio files.

**Acceptance Criteria:**

**Given** the app is running
**When** I choose a supported media file through the standard macOS file open flow
**Then** the app accepts the file
**And** passes it to the native playback layer for loading

**Given** the app is running
**When** I drag and drop a supported media file into the app
**Then** the app accepts the drop
**And** passes the file to the native playback layer for loading

**Given** I try to open an unsupported or invalid file
**When** loading fails
**Then** the app shows the full structured error details to me
**And** the app remains usable without restarting

### Story 1.3: Start, Pause, Resume, and Restart Playback

As a user,
I want to start, pause, resume, and restart playback,
So that I can control media playback in the basic ways I expect.

**Acceptance Criteria:**

**Given** a supported media file has been loaded
**When** playback is started
**Then** the media begins playing in the desktop player

**Given** media is currently playing
**When** I pause playback
**Then** playback stops at the current position
**And** I can later resume from that paused position

**Given** media is paused
**When** I resume playback
**Then** playback continues from the paused position

**Given** media has already progressed from the beginning
**When** I restart playback
**Then** playback returns to the beginning of the current media item
**And** begins or remains ready from the start according to the playback control used

### Story 1.4: Volume, Mute, and Fullscreen Controls

As a user,
I want to control volume, mute audio, and use fullscreen mode,
So that I can watch media comfortably in normal viewing scenarios.

**Acceptance Criteria:**

**Given** media is loaded in the player
**When** I adjust the volume
**Then** playback audio changes accordingly

**Given** media is playing or paused
**When** I mute audio
**Then** playback audio is silenced
**And** I can later unmute it

**Given** media is displayed in the player
**When** I enter fullscreen mode
**Then** the player switches to fullscreen presentation

**Given** the player is in fullscreen mode
**When** I exit fullscreen mode
**Then** the player returns to windowed mode

### Story 1.5: Precision Time Navigation Controls

As a user,
I want fast forward and backward jumps for short and long intervals,
So that I can navigate through media precisely without losing flow.

**Acceptance Criteria:**

**Given** media is loaded
**When** I trigger a short forward jump
**Then** playback advances by the configured short interval

**Given** media is loaded
**When** I trigger a short backward jump
**Then** playback moves backward by the configured short interval

**Given** media is loaded
**When** I trigger a long forward jump
**Then** playback advances by the configured long interval

**Given** media is loaded
**When** I trigger a long backward jump
**Then** playback moves backward by the configured long interval

**Given** I use any of these jump actions during normal playback
**When** the jump completes
**Then** the interaction meets the intended low-latency navigation goal
**And** playback remains stable and usable afterward

### Story 1.6: Offline Playback Compatibility Baseline

As a user,
I want Kovi to play the supported MVP media formats fully offline,
So that I can rely on it as a local desktop media player without network dependencies.

**Acceptance Criteria:**

**Given** I am offline
**When** I open a supported local media file within the MVP compatibility scope
**Then** playback works without requiring any network connection or online service

**Given** the MVP compatibility scope includes the approved baseline formats/codecs
**When** I open supported local media content
**Then** the app loads and plays that content through the native playback layer

**Given** the app is used for local playback
**When** core playback actions are performed
**Then** they do not depend on account creation, remote APIs, or cloud services

## Epic 2: Subtitle-Driven Playback Control and Personalization

Users can work with subtitles as a first-class playback tool, including subtitle-boundary navigation, subtitle source/track control, subtitle presentation settings, and customizable shortcuts that match their workflow.

### Story 2.1: External Subtitle Loading and Automatic Matching

As a user,
I want Kovi to automatically detect matching subtitle files and let me load external subtitles manually,
So that I can quickly use local subtitle files with my media.

**Acceptance Criteria:**

**Given** a media file is opened
**When** a matching external subtitle file is present in the local file set
**Then** the app detects and associates the subtitle file with the current media item

**Given** a media file is loaded
**When** I manually choose an external subtitle file
**Then** the subtitle file is loaded for the current media item

**Given** subtitle loading fails
**When** the error occurs
**Then** the app shows the full structured error details to me
**And** playback remains usable

### Story 2.2: Embedded Subtitle Track Discovery and Switching

As a user,
I want to see available embedded subtitle tracks and switch between them,
So that I can choose the subtitle source I want during playback.

**Acceptance Criteria:**

**Given** the current media item contains embedded subtitle tracks
**When** the media is loaded
**Then** the app exposes the available subtitle tracks to the user

**Given** embedded subtitle tracks are available
**When** I select a different subtitle track
**Then** the selected track becomes the active subtitle source during playback

**Given** subtitles are currently active
**When** I disable subtitles
**Then** subtitles stop displaying for the current media item

### Story 2.3: Subtitle Timing and Font Styling Preferences

As a user,
I want to adjust subtitle timing and subtitle appearance,
So that subtitles remain readable and aligned with the content.

**Acceptance Criteria:**

**Given** subtitles are active during playback
**When** I adjust subtitle timing offset
**Then** subtitle display timing changes for the current playback session

**Given** subtitles are active
**When** I update subtitle font styling preferences
**Then** subtitle rendering reflects the updated styling choices

**Given** I save subtitle-related preferences
**When** I reopen the app later
**Then** the saved subtitle preferences are restored from local persistence

### Story 2.4: Next and Previous Subtitle-Boundary Navigation

As a user,
I want to jump directly to the next or previous subtitle boundary,
So that I can skim dialogue-heavy content quickly and precisely.

**Acceptance Criteria:**

**Given** a media item has subtitle timing information available
**When** I trigger next subtitle navigation
**Then** playback jumps to the next subtitle boundary

**Given** a media item has subtitle timing information available
**When** I trigger previous subtitle navigation
**Then** playback jumps to the previous subtitle boundary

**Given** I use subtitle-boundary navigation during normal playback
**When** the jump completes
**Then** the interaction meets the intended low-latency navigation goal
**And** playback remains stable and usable afterward

### Story 2.5: Default Keyboard Shortcut Playback Controls

As a user,
I want playback and subtitle control actions to be available through keyboard shortcuts,
So that I can control Kovi quickly without relying on pointer-driven UI actions.

**Acceptance Criteria:**

**Given** a supported media item is loaded
**When** I use the default keyboard shortcuts for playback controls
**Then** the mapped playback actions execute correctly

**Given** subtitle controls are available
**When** I use the default keyboard shortcuts for subtitle-related actions
**Then** the mapped subtitle actions execute correctly

**Given** a shortcut-driven action fails
**When** the failure occurs
**Then** the app surfaces the full structured error details to me
**And** the app remains usable

### Story 2.6: Customizable Shortcut Mappings with Conflict Detection

As a user,
I want to customize shortcut mappings for playback and subtitle actions,
So that Kovi matches my personal navigation workflow.

**Acceptance Criteria:**

**Given** the app exposes shortcut settings
**When** I assign a new shortcut to a playback or subtitle action
**Then** the app stores the new shortcut mapping

**Given** a proposed shortcut conflicts with an existing mapping
**When** I attempt to save it
**Then** the app shows the conflict clearly
**And** I can resolve it before completing the change

**Given** I save updated shortcut mappings
**When** I continue using the app without restarting
**Then** the updated shortcuts are active immediately

**Given** I reopen the app later
**When** preferences are restored
**Then** the saved shortcut mappings are restored from local persistence

## Epic 3: Playlist Continuity and Session Persistence

Users can manage playlists, recent files, and playback/session continuity so Kovi remains useful across longer viewing sessions and app restarts.

### Story 3.1: Recent Files Tracking and Reopen Flow

As a user,
I want Kovi to remember recently opened media files and let me reopen them,
So that I can quickly get back to content I use often.

**Acceptance Criteria:**

**Given** I open a supported media file successfully
**When** the file is accepted by the app
**Then** the file is added to the recent files list

**Given** there are items in recent files
**When** I choose one from the recent files view
**Then** the app attempts to reopen that media item

**Given** reopening a recent file fails
**When** the failure occurs
**Then** the app shows the full structured error details to me
**And** the rest of the app remains usable

### Story 3.2: Playlist Creation and Item Management

As a user,
I want to build and maintain a playlist of media items,
So that I can watch multiple files in one continuous workflow.

**Acceptance Criteria:**

**Given** supported media files are available to the app
**When** I add one or more items to the playlist
**Then** those items appear in the playlist in the order added

**Given** a playlist contains items
**When** I remove a playlist item
**Then** that item is removed from the playlist

**Given** a playlist contains multiple items
**When** I reorder playlist items
**Then** the new order is reflected in the playlist state

### Story 3.3: Sequential Playlist Playback

As a user,
I want playlist items to play in sequence,
So that I can move through a set of files without manually reopening each one.

**Acceptance Criteria:**

**Given** a playlist contains multiple playable items
**When** the current item completes or I advance through the playlist flow
**Then** the next playlist item becomes the active media item

**Given** a playlist item becomes active
**When** playback begins for that item
**Then** the player updates the current playback context to the selected playlist item

**Given** an item in the playlist cannot be played
**When** playback reaches that item
**Then** the app surfaces the full structured error details to me
**And** the playlist state remains recoverable

### Story 3.4: Per-File Playback Position Memory

As a user,
I want Kovi to remember where I left off in each media file,
So that I can return to long-form content without manually finding my place again.

**Acceptance Criteria:**

**Given** I have played part of a media item
**When** playback state is persisted
**Then** the current playback position is stored for that media item

**Given** a media item has a remembered playback position
**When** I reopen that media item later
**Then** the app can restore playback from the last remembered position

**Given** a remembered playback position exists
**When** I choose to restart from the beginning instead
**Then** playback starts from the beginning of the media item

### Story 3.5: Playlist Persistence Across App Restarts

As a user,
I want my current playlist to persist across application restarts,
So that I can continue where I left off without rebuilding my queue.

**Acceptance Criteria:**

**Given** I have an active playlist in the app
**When** the application is closed normally
**Then** the current playlist state is stored locally

**Given** a stored playlist state exists
**When** I reopen the application
**Then** the app restores the previous playlist state

**Given** playlist restoration fails during startup
**When** the failure occurs
**Then** the app shows the full structured error details to me
**And** the app still opens in a usable state

### Story 3.6: Session Restoration for Playback Continuity

As a user,
I want Kovi to restore playback-related session state after restarting the app,
So that recent playback context remains consistent across sessions.

**Acceptance Criteria:**

**Given** persisted playback-related session state exists
**When** the application is reopened
**Then** the app restores the available playback continuity data for the relevant media item and playlist context

**Given** playback position, recent file history, and playlist state have all been stored locally
**When** the app restores session state
**Then** those persisted data sources remain internally consistent with one another

**Given** session restoration encounters recoverable issues
**When** the restoration process completes
**Then** the app remains usable
**And** the user receives the full structured error details for the issue