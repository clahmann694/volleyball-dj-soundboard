import React, { useState, useRef, useEffect } from 'react';

/**
 * CuePointEditor Component
 * 
 * Allows setting start/end positions for a song.
 * Shows waveform preview and allows clicking to set cue points.
 */
export function CuePointEditor({ filePath, cuePoint, onSave, onClose }) {
    const audioRef = useRef(null);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [startTime, setStartTime] = useState(cuePoint?.startTime || 0);
    const [endTime, setEndTime] = useState(cuePoint?.endTime || null);

    // Extract filename for display
    const fileName = filePath.split('/').pop().replace(/\.[^/.]+$/, '').replace(/-/g, ' ');

    // Load audio to get duration
    useEffect(() => {
        const audio = new Audio(filePath);
        audio.addEventListener('loadedmetadata', () => {
            setDuration(audio.duration);
            if (!endTime) setEndTime(audio.duration);
        });
        audio.addEventListener('timeupdate', () => {
            setCurrentTime(audio.currentTime);
        });
        audio.addEventListener('ended', () => {
            setIsPlaying(false);
        });
        audioRef.current = audio;

        return () => {
            audio.pause();
        };
    }, [filePath]);

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handlePlayPreview = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.currentTime = startTime;
            audioRef.current.play();
            setIsPlaying(true);

            // Stop at end time
            if (endTime && endTime < duration) {
                const stopAfter = (endTime - startTime) * 1000;
                setTimeout(() => {
                    if (audioRef.current) {
                        audioRef.current.pause();
                        setIsPlaying(false);
                    }
                }, stopAfter);
            }
        }
    };

    const handleTimelineClick = (e) => {
        if (!duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = x / rect.width;
        const time = percent * duration;

        // Set start time on click, end time on shift+click
        if (e.shiftKey) {
            setEndTime(Math.max(time, startTime));
        } else {
            setStartTime(Math.min(time, endTime || duration));
        }
    };

    const handleSave = () => {
        onSave(startTime, endTime === duration ? null : endTime);
        onClose();
    };

    const handleReset = () => {
        setStartTime(0);
        setEndTime(duration);
    };

    return (
        <div className="cue-editor">
            <div className="cue-editor__header">
                <h3 className="cue-editor__title">Set Cue Points</h3>
                <span className="cue-editor__filename">{fileName}</span>
                <button className="cue-editor__close" onClick={onClose}>✕</button>
            </div>

            <div className="cue-editor__content">
                {/* Timeline */}
                <div className="cue-editor__timeline" onClick={handleTimelineClick}>
                    <div
                        className="cue-editor__timeline-active"
                        style={{
                            left: `${(startTime / duration) * 100}%`,
                            width: `${((endTime || duration) - startTime) / duration * 100}%`
                        }}
                    />
                    <div
                        className="cue-editor__timeline-playhead"
                        style={{ left: `${(currentTime / duration) * 100}%` }}
                    />
                    <div
                        className="cue-editor__marker cue-editor__marker--start"
                        style={{ left: `${(startTime / duration) * 100}%` }}
                    />
                    {endTime && endTime < duration && (
                        <div
                            className="cue-editor__marker cue-editor__marker--end"
                            style={{ left: `${(endTime / duration) * 100}%` }}
                        />
                    )}
                </div>

                {/* Time Display */}
                <div className="cue-editor__times">
                    <span>Start: <strong>{formatTime(startTime)}</strong></span>
                    <span>Duration: <strong>{formatTime((endTime || duration) - startTime)}</strong></span>
                    <span>End: <strong>{formatTime(endTime || duration)}</strong></span>
                </div>

                <p className="cue-editor__hint">
                    Click to set start • Shift+Click to set end
                </p>

                {/* Input Fields */}
                <div className="cue-editor__inputs">
                    <label>
                        Start (seconds):
                        <input
                            type="number"
                            min="0"
                            max={duration}
                            step="0.1"
                            value={startTime.toFixed(1)}
                            onChange={(e) => setStartTime(parseFloat(e.target.value) || 0)}
                        />
                    </label>
                    <label>
                        End (seconds):
                        <input
                            type="number"
                            min={startTime}
                            max={duration}
                            step="0.1"
                            value={(endTime || duration).toFixed(1)}
                            onChange={(e) => setEndTime(parseFloat(e.target.value) || duration)}
                        />
                    </label>
                </div>
            </div>

            <div className="cue-editor__footer">
                <button className="cue-editor__btn cue-editor__btn--secondary" onClick={handleReset}>
                    Reset
                </button>
                <button className="cue-editor__btn cue-editor__btn--preview" onClick={handlePlayPreview}>
                    {isPlaying ? '⏸ Stop' : '▶ Preview'}
                </button>
                <button className="cue-editor__btn cue-editor__btn--primary" onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    );
}
