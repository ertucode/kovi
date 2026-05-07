use crate::bridge::dto::CommandError;
use crate::playback::errors::PlaybackError;

pub fn map_playback_error(error: impl ToString) -> CommandError {
    let playback_error = PlaybackError::EventEmission(error.to_string());

    CommandError {
        code: "event_emission_failed".to_string(),
        message: "Failed to emit playback boundary event".to_string(),
        details: Some(playback_error.to_string()),
    }
}
