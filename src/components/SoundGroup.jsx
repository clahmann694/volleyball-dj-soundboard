import React from 'react';
import { SoundButton } from './SoundButton';

/**
 * SoundGroup Component
 * 
 * Container for a category of sounds with its own neon color theme.
 */
export function SoundGroup({ group, currentlyPlaying, onPlay, onOpenPanel }) {
    // Apply category color as CSS variable
    const groupStyle = {
        '--group-color': group.color || '#ffffff',
        '--group-glow': `${group.color}40` || 'rgba(255,255,255,0.25)',
    };

    return (
        <section
            className="sound-group"
            aria-labelledby={`group-${group.id}`}
            style={groupStyle}
        >
            <header className="sound-group__header">
                {group.icon && <span className="sound-group__icon">{group.icon}</span>}
                <h2 className="sound-group__title" id={`group-${group.id}`}>
                    {group.name}
                </h2>
            </header>
            <div className="sound-group__grid">
                {group.sounds.map((sound) => (
                    <SoundButton
                        key={sound.id}
                        sound={sound}
                        groupColor={group.color}
                        isPlaying={currentlyPlaying === sound.id}
                        onPlay={onPlay}
                        onOpenPanel={onOpenPanel}
                    />
                ))}
            </div>
        </section>
    );
}
