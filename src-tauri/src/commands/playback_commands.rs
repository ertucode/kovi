use tauri::{AppHandle, Emitter};

use crate::bridge::dto::{CommandError, PlaybackBoundaryStatusDto};
use crate::bridge::error_mapping::map_playback_error;
use crate::playback;

#[tauri::command]
pub fn get_playback_boundary_status(
    app: AppHandle,
) -> Result<PlaybackBoundaryStatusDto, CommandError> {
    let status = playback::engine::playback_boundary_status();
    let event_payload = playback::events::boundary_ready_event(&status);

    app.emit(playback::events::PLAYBACK_BOUNDARY_READY_EVENT, &event_payload)
        .map_err(map_playback_error)?;

    Ok(status)
}
