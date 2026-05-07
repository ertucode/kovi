use crate::models::playback::PlaybackBoundary;

pub type PlaybackBoundaryState = PlaybackBoundary;

impl PlaybackBoundaryState {
    pub fn foundation_ready() -> Self {
        Self {
            playback_boundary_ready: true,
        }
    }
}
