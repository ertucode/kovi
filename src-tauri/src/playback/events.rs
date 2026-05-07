use crate::bridge::dto::PlaybackBoundaryStatusDto;

pub const PLAYBACK_BOUNDARY_READY_EVENT: &str = "playback.boundary-ready";

pub fn boundary_ready_event(status: &PlaybackBoundaryStatusDto) -> PlaybackBoundaryStatusDto {
    PlaybackBoundaryStatusDto {
        status: status.status.clone(),
        message: status.message.clone(),
        event_name: status.event_name.clone(),
        playback_boundary_ready: status.playback_boundary_ready,
    }
}
