import React from 'react';
import { SoundGroup } from './SoundGroup';
import { soundGroups } from '../config/sounds';

/**
 * SoundBoard Component
 * 
 * Main soundboard layout containing all sound groups.
 */
export function SoundBoard({ currentlyPlaying, onPlay, onOpenPanel }) {
    return (
        <div className="sound-board">
            {soundGroups.map((group) => (
                <SoundGroup
                    key={group.id}
                    group={group}
                    currentlyPlaying={currentlyPlaying}
                    onPlay={onPlay}
                    onOpenPanel={onOpenPanel}
                />
            ))}
        </div>
    );
}
