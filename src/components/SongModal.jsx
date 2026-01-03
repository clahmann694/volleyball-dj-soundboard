import React from 'react';

/**
 * SongModal Component
 * 
 * Modal overlay showing all songs for a button.
 * User can click to play a specific song or close the modal.
 */
export function SongModal({ sound, onPlayFile, onClose }) {
    // Get the list of files (handle both single file and array)
    const files = Array.isArray(sound.files) ? sound.files : [sound.file];

    // Extract filename from path for display
    const getDisplayName = (filepath) => {
        const filename = filepath.split('/').pop();
        // Remove extension and replace dashes with spaces
        return filename
            .replace(/\.[^/.]+$/, '')
            .replace(/-/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase()); // Capitalize words
    };

    const handlePlayFile = (file) => {
        onPlayFile(sound.id, file);
        onClose();
    };

    const handleOverlayClick = (e) => {
        // Close when clicking outside the modal content
        if (e.target.classList.contains('song-modal-overlay')) {
            onClose();
        }
    };

    return (
        <div className="song-modal-overlay" onClick={handleOverlayClick}>
            <div className="song-modal">
                <div className="song-modal__header">
                    <span className="song-modal__icon">{sound.icon}</span>
                    <h3 className="song-modal__title">{sound.name}</h3>
                    <button className="song-modal__close" onClick={onClose}>✕</button>
                </div>
                <div className="song-modal__list">
                    {files.map((file, index) => (
                        <button
                            key={file}
                            className="song-modal__item"
                            onClick={() => handlePlayFile(file)}
                        >
                            <span className="song-modal__item-number">{index + 1}</span>
                            <span className="song-modal__item-name">{getDisplayName(file)}</span>
                            <span className="song-modal__item-play">▶</span>
                        </button>
                    ))}
                </div>
                <div className="song-modal__footer">
                    <button className="song-modal__random" onClick={() => {
                        const randomFile = files[Math.floor(Math.random() * files.length)];
                        handlePlayFile(randomFile);
                    }}>
                        🎲 Play Random
                    </button>
                </div>
            </div>
        </div>
    );
}
