---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-02b-vision
  - step-02c-executive-summary
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
  - step-12-complete
inputDocuments:
  - /Users/cavitertugrulsirt/dev/bmad-recover/_bmad-output/planning-artifacts/product-brief-kovi.md
documentCounts:
  productBriefs: 1
  research: 0
  brainstorming: 0
  projectDocs: 0
classification:
  projectType: desktop_app
  domain: general
  complexity: low
  projectContext: greenfield
discoveryNotes:
  - Fast navigation between subtitle boundaries is a key product requirement.
  - Next and previous subtitle jumps should feel almost instant.
visionDiscovery:
  vision: A fast, Mac-native local media player built for people who actively navigate video, not just passively watch it.
  differentiator: Dependable local playback combined with instant-feeling navigation and highly customizable shortcuts.
  coreInsight: Existing players optimize for compatibility or simplicity, but not for fast, keyboard-driven control.
  futureDirection: Expand to other desktop platforms after the macOS product is solid.
workflowType: 'prd'
releaseMode: single-release
---

# Product Requirements Document - Kovi

**Author:** kral
**Date:** 2026-05-07

## Executive Summary

Kovi is a greenfield macOS desktop media player focused on local playback for users who actively navigate long-form video rather than passively consume it. It is designed for people watching downloaded movies, lectures, interviews, course recordings, demos, screen captures, and other local media who need playback to be dependable, precise, and fast. The product addresses a gap between native-feeling but limited playback tools and highly compatible but heavier alternatives by combining reliable playback with a calmer, more controllable user experience.

The MVP prioritizes the actions that shape everyday playback quality: instant-feeling navigation, subtitle reliability, persistent playlists, per-file resume, and customizable shortcuts. Core navigation actions such as jumping forward or backward by 5 or 30 seconds, and moving to the next or previous subtitle boundary, are treated as first-class product behavior rather than convenience features. Kovi is intended to feel fast in the hands of keyboard-driven users, with minimal friction between user intent and playback response.

### What Makes This Special

Kovi differentiates by optimizing for playback control speed and control customization while maintaining a polished macOS-native experience. Existing players typically optimize for broad compatibility, basic simplicity, or dense utility workflows. Kovi instead targets active-navigation users who repeatedly seek, replay, compare, skip, and align playback using keyboard-driven controls.

The core product insight is that local playback quality is not only about whether a file opens, but also about how quickly and accurately a user can move through that file. Fast subtitle-boundary navigation, low-friction time jumps, and easily customizable shortcuts create a materially better experience for users who work through video deliberately. This allows Kovi to compete not only as a local player, but as a precision playback tool with a minimal interface.

## Project Classification

- **Project Type:** Desktop application
- **Domain:** General consumer/local media software
- **Complexity:** Low domain complexity
- **Project Context:** Greenfield product

## Success Criteria

### User Success

Users can move through video quickly enough that navigation feels immediate rather than interrupted by the player. The core success moment is repeated jumping through content without losing flow, especially for `+5s`, `-5s`, `+30s`, `-30s`, and next/previous subtitle navigation.

Users can customize shortcuts to match their own playback habits without friction. Shortcut customization should feel like a core control feature, not an advanced configuration path.

Users can rely on the player for long-form local playback with working subtitles, persistent playlists, and resume behavior, so they do not have to switch tools mid-session.

### Business Success

The initial business success criterion is direct product utility for the creator and primary user. The MVP is successful if it becomes the preferred daily-use local media player for its first user rather than an occasional experiment.

A secondary business signal is whether the product is compelling enough that its core workflow feels meaningfully better than existing alternatives such as VLC, QuickTime, or IINA for active-navigation use cases.

### Technical Success

Navigation latency for core jump actions should target `<= 100ms` perceived response time under normal playback conditions on supported macOS hardware. This applies especially to:
- `+5s`
- `-5s`
- `+30s`
- `-30s`
- next subtitle
- previous subtitle

Subtitle-boundary navigation must feel almost instant in normal use. Subtitle loading, subtitle switching, subtitle delay adjustment, and subtitle font styling must work reliably on the supported MVP test set.

The player must provide dependable local playback for the defined MVP compatibility target on supported macOS hardware, while maintaining stable playlist persistence and per-file resume across app restarts.

### Measurable Outcomes

- Core navigation actions respond within the target `<= 100ms` perceived latency goal on supported macOS hardware.
- Next and previous subtitle jumps feel almost instant during normal playback.
- The primary user prefers Kovi over their current local playback alternative for active video navigation workflows.
- Shortcut remapping is usable enough that the primary user can configure their preferred controls without external help.
- Playlist persistence and per-file resume work correctly across restart scenarios in test coverage.

## Product Scope

### MVP - Minimum Viable Product

- macOS desktop app
- Local file playback
- Support for `mp4`, `mkv`, `mov`, and `mp3`, with the initial compatibility target centered on `H.264`, `H.265/HEVC`, `AAC`, and `AC3`
- Play, pause, seek, volume, mute, fullscreen, and keyboard shortcuts
- Fast jump navigation for `+5s`, `-5s`, `+30s`, and `-30s`
- Near-instant next/previous subtitle navigation
- Highly customizable shortcuts
- Drag-and-drop file opening
- Playlist add, remove, reorder, auto-advance, and persistence across launches
- Recent files
- External `.srt` subtitle loading
- Automatic matching `.srt` discovery and manual subtitle selection
- Embedded subtitle track switching
- Subtitle delay adjustment
- Subtitle font styling controls
- Per-file playback position memory

### Growth Features (Post-MVP)

No post-MVP growth scope is defined yet because current planning is intentionally focused on the single-release MVP feature set.

### Vision (Future)

- Expansion to other desktop platforms after the macOS experience is solid
- Broader compatibility, deeper playback refinement, and additional desktop capabilities once the core navigation-first experience is proven

## User Journeys

### Journey 1: Primary User - Fast Movie Navigation Success Path

The primary user is a movie or TV viewer who opens a local video file because they want to watch, review, or skim through content with precise control. We meet them at the moment they have a file ready and expect the player to get out of the way immediately. They open the file, playback starts quickly, and if a matching subtitle file exists it is loaded automatically without extra work.

As they watch, they do not move through the video passively. They repeatedly jump `+5s`, `-5s`, `+30s`, `-30s`, and move between subtitle boundaries to skim scenes, replay lines, or move quickly through dialogue-heavy sections. The rising action of the journey is the repeated use of navigation controls without friction. The climax is the moment they realize they can move through the video at speed and still stay oriented because the player responds almost instantly.

The resolution is that the user finishes the session feeling that the player matches their pace of thought. Instead of fighting sluggish controls or losing context, they can skim, review, and watch fluidly. This journey reveals requirements for fast seek behavior, subtitle-boundary navigation, reliable subtitle loading, low-friction playback startup, and strong keyboard control.

### Journey 2: Primary User - Edge Case Shortcut Customization Path

The same user begins using Kovi and quickly notices that navigation speed matters most when the controls match their own habits. Their current shortcut layout does not feel natural, or they want dedicated keys for subtitle jumps and fixed time jumps. The obstacle is not whether the player supports navigation at all, but whether it can be shaped to the user’s workflow without effort.

They open settings, locate shortcut customization, and remap controls for `+5s`, `-5s`, `+30s`, `-30s`, next subtitle, and previous subtitle. The important emotional state here is impatience: this user wants control quickly and will be frustrated by buried menus, confusing conflicts, or unreliable saved settings. The climax is when they save the new shortcuts and immediately test them in playback, confirming that the controls now match their personal navigation style.

The resolution is that the product feels personal and efficient rather than rigid. This journey reveals requirements for discoverable shortcut settings, conflict handling, low-friction remapping, settings persistence, and immediate application of updated controls during playback.

### Journey 3: Primary User - Subtitle Recovery and Control Path

The user opens a movie or episode expecting subtitles to work, but the exact subtitle state is not ideal. A matching subtitle file may not have loaded, the embedded track may not be the correct one, or subtitle timing may need adjustment. The user’s goal is not advanced authoring; they simply want to recover quickly and get back to watching without leaving the player.

They inspect available subtitle options, switch to a different embedded track or manually select an external subtitle file, then adjust subtitle delay and font styling until the content is readable and aligned. The rising action is a short recovery flow in which the player must help the user regain confidence instead of creating more friction. The climax is the moment playback becomes comfortable again: correct subtitle track, readable text, proper timing.

The resolution is that subtitle handling feels dependable rather than fragile. This journey reveals requirements for embedded subtitle enumeration and switching, manual subtitle file selection, automatic matching subtitle discovery, subtitle delay controls, subtitle font styling, and clear playback-state feedback.

### Journey 4: Primary User - Resume and Playlist Continuity Path

The user is not always consuming media in a single sitting. They open one or more episodes, films, or related files and expect the player to remember context across sessions. We meet them returning to Kovi after previously watching part of a file or building a playlist. Their expectation is continuity, not rework.

They reopen the app and find that the current playlist is still present. A previously watched file resumes from the remembered playback position, letting them continue immediately. During the session they may reorder the playlist or move between files while expecting the player to preserve state correctly. The climax is the moment the user sees that Kovi remembers where they were and what they were watching, without manual reconstruction.

The resolution is that Kovi becomes trustworthy for long-form viewing over time, not just within a single launch. This journey reveals requirements for playlist persistence, per-file resume memory, recent files, correct state restoration across relaunch, and predictable playback continuation behavior.

### Journey Requirements Summary

These journeys reveal the following capability areas as core requirements:

- Fast local file opening and dependable playback startup
- Low-latency navigation for fixed time jumps
- Near-instant next/previous subtitle-boundary navigation
- Strong keyboard-first control model
- Highly customizable shortcuts with persistence
- Automatic subtitle discovery and manual subtitle selection
- Embedded subtitle track switching
- Subtitle delay adjustment and font styling controls
- Playlist persistence across launches
- Per-file resume playback memory
- Clear settings and recovery flows when playback preferences need adjustment

## Desktop Application Specific Requirements

### Project-Type Overview

Kovi is a macOS desktop application designed for fully offline local media playback. The MVP is intentionally focused on macOS, with possible expansion to other desktop platforms after the macOS experience is proven. The application is optimized for direct local use rather than cloud-connected workflows, browser distribution, or cross-device synchronization.

### Technical Architecture Considerations

The product must support a native-feeling desktop workflow centered on local files, keyboard-driven playback control, and reliable persistence of playback state. Core playback functionality must remain fully available without network access. The architecture should prioritize low-latency media navigation, especially for fixed time jumps and subtitle-boundary jumps, while preserving stable subtitle handling, playlist continuity, and per-file resume behavior.

The desktop application should be structured so platform-specific integrations are kept focused on macOS MVP needs while not blocking future expansion to other desktop platforms. Update infrastructure is not required for the MVP and should not shape early product complexity.

### Platform Requirements

- macOS only for MVP
- Future expansion to other desktop platforms is a later-phase direction, not an MVP requirement
- Fully offline core experience for playback, settings, playlists, subtitles, and resume state

### System Integration

- Standard macOS file open flow
- Drag-and-drop from Finder
- Recent files within the application
- No MVP requirement for media keys, Picture in Picture, menu bar integration, dock integration, global shortcuts, or automatic default-player registration

### Offline Capabilities

- Local playback must function without any network dependency
- Subtitle loading and switching must work offline
- Playlist persistence and resume state must be stored and restored locally
- Shortcut customization and subtitle preferences must persist locally
- No cloud account, sync, or online activation dependency for MVP

### Implementation Considerations

The implementation must keep the desktop feature set narrow enough to protect the core value proposition: fast navigation and dependable local playback. Desktop-specific work that does not directly improve playback speed, subtitle control, or local usability should be deprioritized in the MVP. The application should also preserve room for later platform expansion by avoiding unnecessary macOS-only assumptions in core playback, state, and shortcut-management logic where practical.

## Project Scoping

### Strategy & Philosophy

**Approach:** Single-release, navigation-first MVP for a solo-built macOS desktop app. The release is intentionally narrow in platform and product shape, but not feature-light: all currently defined capabilities are in scope because they directly support the core promise of fast, precise local video navigation.

**Resource Requirements:** Solo project. Scope decisions should prioritize implementation simplicity, reuse of strong playback foundations, and avoidance of non-essential platform integrations. Complexity should be spent on playback responsiveness, subtitle behavior, shortcut customization, and persistence rather than peripheral desktop features.

### Complete Feature Set

**Core User Journeys Supported:**
- Fast movie and TV navigation using low-latency time jumps and subtitle-boundary jumps
- Shortcut customization for users who want playback controls to match their habits
- Subtitle recovery and control through track switching, manual file selection, delay adjustment, and font styling
- Continuity across sessions through persistent playlists, recent files, and per-file resume

**Must-Have Capabilities:**
- macOS desktop application
- Fully offline local playback
- Support for `mp4`, `mkv`, `mov`, and `mp3`, with the initial compatibility target centered on `H.264`, `H.265/HEVC`, `AAC`, and `AC3`
- Play, pause, seek, volume, mute, fullscreen, and keyboard shortcuts
- Fast `+5s`, `-5s`, `+30s`, and `-30s` navigation
- Near-instant next and previous subtitle-boundary navigation
- Highly customizable shortcuts
- Drag-and-drop file opening
- Standard macOS file open flow
- Recent files
- Playlist add, remove, reorder, auto-advance, and persistence across launches
- Per-file playback position memory
- External `.srt` subtitle loading
- Automatic matching `.srt` subtitle discovery
- Manual subtitle file selection
- Embedded subtitle track switching
- Subtitle delay adjustment
- Subtitle font styling controls

**Nice-to-Have Capabilities:**
- No additional nice-to-have items are currently defined within this release. All discussed features are considered required for the first release.

### Risk Mitigation Strategy

**Technical Risks:**  
The highest technical risk is achieving the expected responsiveness for navigation-heavy playback, especially near-instant subtitle-boundary jumps and low-latency fixed time jumps. Risk should be reduced by choosing a playback foundation that supports efficient seeking, subtitle track access, and responsive keyboard-driven control. A second technical risk is keeping subtitle workflows reliable across embedded and external subtitle scenarios without bloating implementation complexity.

**Market Risks:**  
The main market risk is that the product may feel like only a marginal improvement over existing players instead of a clearly better tool for active-navigation users. The release addresses this by concentrating on a sharp differentiator: speed and control for local video navigation. Validation comes from whether the solo creator and comparable users consistently prefer Kovi over VLC, QuickTime, or IINA for movie and TV playback with frequent jumps and subtitle use.

**Resource Risks:**  
As a solo project, the primary resource risk is overloading the first release with implementation detail that does not strengthen the core promise. This is mitigated by limiting the release to macOS, requiring full offline operation, skipping update infrastructure, and excluding peripheral desktop integrations such as media keys, Picture in Picture, menu bar integration, dock integration, global shortcuts, and automatic default-player registration.

## Functional Requirements

### Media Playback

- FR1: Users can open local media files for playback from the file system.
- FR2: Users can start playback of supported local media files.
- FR3: Users can pause and resume media playback.
- FR4: Users can seek to a different position within the current media item.
- FR5: Users can skip forward by a configured short interval during playback.
- FR6: Users can skip backward by a configured short interval during playback.
- FR7: Users can skip forward by a configured long interval during playback.
- FR8: Users can skip backward by a configured long interval during playback.
- FR9: Users can move playback to the next subtitle boundary in the current media item.
- FR10: Users can move playback to the previous subtitle boundary in the current media item.
- FR11: Users can mute and unmute audio during playback.
- FR12: Users can adjust playback volume.
- FR13: Users can enter and exit fullscreen playback mode.
- FR14: Users can resume playback of a media item from its last remembered position.
- FR15: Users can restart playback of a media item from the beginning.

### Subtitle Management

- FR16: Users can load external subtitle files for the current media item.
- FR17: Users can have matching external subtitle files associated with the current media item automatically when available.
- FR18: Users can view available embedded subtitle tracks for the current media item.
- FR19: Users can switch between embedded subtitle tracks during playback.
- FR20: Users can disable subtitles during playback.
- FR21: Users can adjust subtitle timing offset during playback.
- FR22: Users can customize subtitle font styling for playback readability.
- FR23: Users can persist subtitle display preferences for future playback sessions.

### Shortcut and Control Customization

- FR24: Users can control playback through keyboard shortcuts.
- FR25: Users can customize keyboard shortcuts for playback actions.
- FR26: Users can customize keyboard shortcuts for subtitle navigation actions.
- FR27: Users can customize keyboard shortcuts for subtitle control actions.
- FR28: Users can save customized shortcut mappings for future sessions.
- FR29: Users can view when a shortcut assignment conflicts with an existing mapping.
- FR30: Users can use updated shortcut mappings without restarting the application.

### Playlist and Session Continuity

- FR31: Users can add media items to a playlist.
- FR32: Users can remove media items from a playlist.
- FR33: Users can reorder media items within a playlist.
- FR34: Users can play media items sequentially from a playlist.
- FR35: Users can preserve the current playlist across application restarts.
- FR36: Users can reopen the application and restore the previous playlist state.
- FR37: Users can access a list of recent files opened in the application.
- FR38: Users can reopen a recently used media item from within the application.
- FR39: Users can have playback position remembered per media item across sessions.

### File Access and Desktop Workflow

- FR40: Users can open media files through a standard macOS file selection flow.
- FR41: Users can open media files by dragging and dropping them into the application.
- FR42: Users can use the application without creating an account or connecting to an online service.
- FR43: Users can access core playback functionality while fully offline.

### Playback State and Preferences

- FR44: Users can have playback preferences persisted locally across sessions.
- FR45: Users can have shortcut preferences persisted locally across sessions.
- FR46: Users can have subtitle preferences persisted locally across sessions.
- FR47: The system can restore locally stored playback state when a user returns to previously viewed content.

### Compatibility and Capability Boundaries

- FR48: Users can play supported local media content within the defined MVP compatibility scope.
- FR49: Users can use the application for local playback without network-dependent features.
- FR50: Users can use the MVP on macOS as the supported release platform.

## Non-Functional Requirements

### Performance

- NFR1: Core navigation actions for fixed time jumps and subtitle-boundary jumps must target `<= 100ms` perceived response time during normal playback on supported macOS hardware.
- NFR2: Playback control interactions must remain responsive enough that active-navigation users can move through content without losing flow.
- NFR3: Application launch and local file opening must be fast enough to avoid noticeable friction in normal use, but they are secondary to navigation responsiveness.

### Reliability

- NFR4: The application must remain stable during extended playback sessions of long-form local media.
- NFR5: The application must preserve playlist state, playback position state, and user preference state across normal application restarts.
- NFR6: The application must handle supported subtitle and media workflows without forcing users to leave the current playback session to recover from common issues.

### Product Quality Boundaries

- NFR7: The MVP must operate fully offline for all core playback, subtitle, playlist, and preference-management workflows.
- NFR8: The MVP must avoid non-essential system complexity that does not improve playback responsiveness, subtitle control, or session continuity.