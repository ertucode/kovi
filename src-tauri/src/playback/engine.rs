use crate::bridge::dto::PlaybackBoundaryStatusDto;
use crate::playback::state::PlaybackBoundaryState;

pub fn playback_boundary_status() -> PlaybackBoundaryStatusDto {
    let _boundary_modules = [
        crate::playback::navigation::module_name(),
        crate::playback::subtitle_navigation::module_name(),
        crate::playback::subtitle_tracks::module_name(),
        crate::persistence::layer_name(),
        crate::support::logging::subsystem_name(),
        crate::support::paths::subsystem_name(),
    ];

    let state = PlaybackBoundaryState::foundation_ready();

    PlaybackBoundaryStatusDto {
        status: "ready".to_string(),
        message: "Native playback boundary is wired and ready for follow-on stories.".to_string(),
        event_name: crate::playback::events::PLAYBACK_BOUNDARY_READY_EVENT.to_string(),
        playback_boundary_ready: state.playback_boundary_ready,
    }
}
