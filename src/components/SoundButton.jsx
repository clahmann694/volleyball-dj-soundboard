import React, { useRef } from 'react';

/**
 * SoundButton Component
 * 
 * Button with category neon color theme.
 * - Normal click: plays random song
 * - Click on playlist corner: opens side panel
 */
export function SoundButton({ sound, groupColor, isPlaying, onPlay, onOpenPanel }) {
    const buttonRef = useRef(null);

    const hasMultiple = Array.isArray(sound.files) && sound.files.length > 1;

    const handleClick = (e) => {
        if (hasMultiple) {
            const rect = buttonRef.current.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            const cornerSize = Math.min(rect.width, rect.height) * 0.45;

            if (clickX > rect.width - cornerSize && clickY < cornerSize) {
                onOpenPanel(sound);
                return;
            }

            const randomIndex = Math.floor(Math.random() * sound.files.length);
            onPlay(sound.id, sound.files[randomIndex]);
        } else {
            const fileToPlay = Array.isArray(sound.files) ? sound.files[0] : sound.file;
            onPlay(sound.id, fileToPlay);
        }
    };

    // Always apply category color to button
    const buttonStyle = {
        '--button-color': groupColor,
        '--button-glow': `${groupColor}60`,
    };

    return (
        <button
            ref={buttonRef}
            className={`sound-button ${isPlaying ? 'sound-button--playing' : ''}`}
            onClick={handleClick}
            aria-label={`Play ${sound.name}`}
            aria-pressed={isPlaying}
            style={buttonStyle}
        >
            {sound.icon && <span className="sound-button__icon">{sound.icon}</span>}
            <span className="sound-button__label">{sound.name}</span>
            {hasMultiple && <span className="sound-button__multi" title="Click to see all songs">📋</span>}
        </button>
    );
}
