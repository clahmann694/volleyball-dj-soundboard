import React from 'react';

/**
 * StopAllButton Component
 * 
 * Prominent panic button to stop all audio immediately.
 * Fixed at bottom of screen, always visible.
 */
export function StopAllButton({ onStopAll, isPlaying }) {
    return (
        <div className="stop-all-container">
            <button
                className="stop-all-button"
                onClick={onStopAll}
                aria-label="Stop all audio"
                style={{
                    opacity: isPlaying ? 1 : 0.6,
                    transform: isPlaying ? 'scale(1.05)' : 'scale(1)',
                }}
            >
                STOP
                <span className="shortcut">Space</span>
            </button>
        </div>
    );
}
