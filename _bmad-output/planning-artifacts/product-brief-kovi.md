---
title: "Product Brief: Kovi"
status: "complete"
created: "2026-05-07T16:22:47Z"
updated: "2026-05-07T16:27:45Z"
inputs:
  - "User conversation in current session"
  - "Competitive context synthesized from macOS media player research"
---

# Product Brief: Kovi

## Executive Summary

`Kovi` is a macOS-only desktop video player built for people who regularly open local media files and want the reliability associated with VLC without the visual and interaction weight that often comes with it. The product solves a simple but persistent problem: Mac users can usually choose between a native-feeling player that breaks down on real-world files and a highly compatible player that feels cluttered, dated, or overbuilt for everyday playback.

The MVP focuses on the local playback experience that matters most in practice: fast file opening, strong support for common video and audio formats, subtitle handling that works without friction, playlists that persist between sessions, and automatic resume for long-form content. The product wins not by matching every edge-case capability on day one, but by becoming the most pleasant and dependable way to watch local media on macOS.

The opportunity is strengthened by a mismatch in today's Mac playback tools. Users now expect native-feeling interfaces, polished keyboard and fullscreen behavior, and sensible continuity features like recent files and resume playback, but they still fall back to more utilitarian players when local files become unpredictable. A focused media player that combines those expectations with solid format support can occupy a clear position between QuickTime's simplicity and VLC's universal-but-utilitarian footprint.

## The Problem

Mac users who play local video files still face a frustrating tradeoff. QuickTime Player and similar lightweight apps feel native and simple, but they are not the tool users trust for mixed real-world files, especially when subtitles, MKV containers, or less common audio/video combinations appear. VLC is the fallback because users believe it will probably play the file, but its interface and settings can feel heavy for everyday use.

That tradeoff creates repeated friction. People lose time testing multiple apps to find one that opens a file correctly. Subtitle workflows are inconsistent, especially when switching between embedded subtitle tracks and external `.srt` files. Playlist handling is often either absent or buried in a more library-oriented model than users need. Long-form viewers lose their place when playback state is not remembered reliably. For users who just want to open a local file and watch it comfortably, with their files remaining local and untouched by broader library workflows, the status quo is more awkward than it should be.

## The Solution

`Kovi` will provide a focused macOS media player for local playback with a minimalist interface and a strong reliability baseline for common formats. The MVP experience centers on a single-player window with a clean control bar and playlist sidebar, optimized for fast open-and-play behavior rather than media library management. It is intentionally local-first: users open files directly, keep their media private on-device, and avoid the overhead of cloud, streaming, or library-scanning features.

The first version includes support for local playback of `mp4`, `mkv`, `mov`, and `mp3`, with the MVP compatibility target centered on `H.264` and `H.265/HEVC` video plus `AAC` and `AC3` audio on supported macOS hardware. Core playback controls include play, pause, seek, volume, mute, fullscreen, and keyboard shortcuts. Users can drag and drop files into the app, build and reorder playlists, and return later to the same persisted current queue across launches. The player will auto-load matching external `.srt` subtitle files when present, allow manual subtitle file selection, support embedded subtitle track switching, and include subtitle delay adjustment plus subtitle font styling controls in v1. It will also remember playback position per file, reducing friction for longer content.

The product experience should feel calm and intentional. The goal is not a stripped-down toy player, but a calm-power default local player for Mac users who value both compatibility and polish.

## What Makes This Different

The product's differentiation is not based on claiming broader compatibility than VLC in the MVP. Instead, it combines three advantages that existing choices rarely deliver together:

- A Mac-native, minimalist user experience rather than a dense utility interface.
- A focused local-playback feature set that includes subtitle reliability, playlists, and resume behavior from day one.
- A clear product boundary: local media first, without the distraction of streaming, casting, server features, or media-library complexity in the initial release.

This positioning creates a strong alternative for users who want something more capable than QuickTime but more elegant and less intimidating than VLC.

## Who This Serves

The primary user is a Mac user in a long-form local viewing workflow: someone opening downloaded or transferred movies, lectures, interviews, course recordings, or screen captures and wanting playback to work immediately without giving up a polished interface.

A secondary user is a knowledge worker, reviewer, or creator opening exported recordings, demos, client deliverables, or reference videos who specifically cares about subtitle availability, track switching, playlist continuity, and reliable resume behavior but does not need a full media-center product.

For both groups, success means they stop thinking about which app to use for local playback and simply reach for `Kovi` first.

## Success Criteria

The MVP will be successful if it demonstrates both trust and repeat use among early adopters.

- The agreed MVP compatibility suite for `mp4`, `mkv`, `mov`, and `mp3`, centered on `H.264`, `H.265/HEVC`, `AAC`, and `AC3`, plays successfully without blocking issues on supported macOS hardware.
- Subtitle loading, embedded subtitle switching, subtitle delay adjustment, and subtitle font styling work reliably on the core test set.
- Playlist persistence and per-file resume playback complete successfully across app restarts in end-to-end testing.
- Early users can complete core tasks - open a file, manage a playlist, enable subtitles, and resume playback - without assistance.
- Early user feedback indicates the app is preferred over their current local playback option for the target long-form viewing workflow.

## Scope

### In Scope for MVP

- macOS desktop app only
- Local file playback only
- Support for `mp4`, `mkv`, `mov`, and `mp3`, with the initial compatibility target centered on `H.264`, `H.265/HEVC`, `AAC`, and `AC3`
- Play, pause, seek, volume, mute, fullscreen, and keyboard shortcuts
- Drag-and-drop file opening
- Playlists with add, remove, reorder, auto-advance, and persistence of the current queue across launches
- Recent files
- External `.srt` subtitle loading
- Automatic matching `.srt` subtitle discovery and manual subtitle file selection
- Embedded subtitle track switching
- Subtitle delay adjustment
- Subtitle font styling controls
- Per-file playback position memory

### Explicitly Out of Scope for MVP

- Streaming and network playback
- Casting or AirPlay-style target-device control
- Media library scanning and organization
- Audio equalizer and advanced tuning panels
- Plugin architecture
- Multi-platform support outside macOS

## Vision

If the MVP succeeds, `Kovi` can grow into the default modern local media player for Mac: a product known for dependable playback, thoughtful subtitle and playlist behavior, and a distinctly polished desktop experience. Over time, the product can expand into broader codec coverage, playback refinement, and richer subtitle controls without losing the clarity of its core promise.

The long-term opportunity is not to copy VLC feature-for-feature. It is to define a better macOS-native standard for local media playback: dependable enough to trust, focused enough to stay lightweight, and polished enough that users prefer it even when other options are already installed.