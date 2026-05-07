use serde::Serialize;

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct PlaybackBoundaryStatusDto {
    pub status: String,
    pub message: String,
    pub event_name: String,
    pub playback_boundary_ready: bool,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CommandError {
    pub code: String,
    pub message: String,
    pub details: Option<String>,
}
