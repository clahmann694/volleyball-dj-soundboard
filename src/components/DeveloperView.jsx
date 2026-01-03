import React from 'react';
import { soundGroups } from '../config/sounds';
import { CuePointEditor } from './CuePointEditor';

/**
 * DeveloperView Component
 * 
 * Edit mode for configuring sounds:
 * - Set cue points (start/end times) for each song
 * - View all songs in each category
 */
export function DeveloperView({ soundConfig, onSetCuePoint, onClearCuePoint, editingSound, onEditSound, onCloseEditor }) {

    // Get cue point for a file
    const getCuePoint = (soundId, filePath) => {
        const key = `${soundId}:${filePath}`;
        return soundConfig[key] || { startTime: 0, endTime: null };
    };

    // Extract filename for display
    const getDisplayName = (filepath) => {
        const filename = filepath.split('/').pop();
        return filename
            .replace(/\.[^/.]+$/, '')
            .replace(/-/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase());
    };

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="developer-view">
            <div className="developer-view__content">
                {soundGroups.map(group => (
                    <div
                        key={group.id}
                        className="developer-group"
                        style={{ '--group-color': group.color }}
                    >
                        <h3 className="developer-group__title">
                            <span>{group.icon}</span> {group.name}
                        </h3>

                        <div className="developer-group__sounds">
                            {group.sounds.map(sound => {
                                const files = Array.isArray(sound.files) ? sound.files : [sound.file];

                                return (
                                    <div key={sound.id} className="developer-sound">
                                        <div className="developer-sound__header">
                                            <span className="developer-sound__icon">{sound.icon}</span>
                                            <span className="developer-sound__name">{sound.name}</span>
                                        </div>

                                        <div className="developer-sound__files">
                                            {files.map((file, index) => {
                                                const cuePoint = getCuePoint(sound.id, file);
                                                const hasCue = cuePoint.startTime > 0 || cuePoint.endTime;

                                                return (
                                                    <div key={file} className="developer-file">
                                                        <span className="developer-file__number">{index + 1}</span>
                                                        <span className="developer-file__name">{getDisplayName(file)}</span>
                                                        {hasCue && (
                                                            <span className="developer-file__cue">
                                                                {formatTime(cuePoint.startTime)}
                                                                {cuePoint.endTime && ` - ${formatTime(cuePoint.endTime)}`}
                                                            </span>
                                                        )}
                                                        <button
                                                            className="developer-file__edit"
                                                            onClick={() => onEditSound(sound.id, file)}
                                                        >
                                                            ✏️ Edit
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Cue Point Editor Modal */}
            {editingSound && (
                <div className="developer-modal-overlay" onClick={onCloseEditor}>
                    <div onClick={e => e.stopPropagation()}>
                        <CuePointEditor
                            filePath={editingSound.filePath}
                            cuePoint={getCuePoint(editingSound.soundId, editingSound.filePath)}
                            onSave={(start, end) => onSetCuePoint(editingSound.soundId, editingSound.filePath, start, end)}
                            onClose={onCloseEditor}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
