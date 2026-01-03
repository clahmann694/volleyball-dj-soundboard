import React from 'react';

/**
 * SidePanel Component
 * 
 * Right-side panel showing all songs for a selected button.
 * Slides in from the right side of the screen.
 */
export function SidePanel({ sound, onPlayFile, onClose }) {
    // Get the list of files
    const files = Array.isArray(sound.files) ? sound.files : [sound.file];

    // Extract filename from path for display
    const getDisplayName = (filepath) => {
        const filename = filepath.split('/').pop();
        return filename
            .replace(/\.[^/.]+$/, '')
            .replace(/-/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase());
    };

    const handlePlayFile = (file) => {
        onPlayFile(sound.id, file);
    };

    return (
        <aside className="side-panel">
            <div className="side-panel__header">
                <span className="side-panel__icon">{sound.icon}</span>
                <h3 className="side-panel__title">{sound.name}</h3>
                <button className="side-panel__close" onClick={onClose}>✕</button>
            </div>

            <div className="side-panel__list">
                {files.map((file, index) => (
                    <button
                        key={file}
                        className="side-panel__item"
                        onClick={() => handlePlayFile(file)}
                    >
                        <span className="side-panel__item-number">{index + 1}</span>
                        <span className="side-panel__item-name">{getDisplayName(file)}</span>
                        <span className="side-panel__item-play">▶</span>
                    </button>
                ))}
            </div>

            <div className="side-panel__footer">
                <button
                    className="side-panel__random"
                    onClick={() => {
                        const randomFile = files[Math.floor(Math.random() * files.length)];
                        handlePlayFile(randomFile);
                    }}
                >
                    🎲 Play Random
                </button>
            </div>
        </aside>
    );
}
