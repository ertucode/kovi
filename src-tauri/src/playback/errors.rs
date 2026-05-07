use std::fmt::{Display, Formatter};

#[derive(Debug)]
pub enum PlaybackError {
    EventEmission(String),
}

impl Display for PlaybackError {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::EventEmission(message) => write!(f, "{message}"),
        }
    }
}

impl std::error::Error for PlaybackError {}
