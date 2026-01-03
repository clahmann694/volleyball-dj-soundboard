import { useState, useEffect } from 'react';

/**
 * Hook for managing sound configuration with cue points
 * Stores user customizations in localStorage
 */
export function useSoundConfig(initialGroups) {
    const [soundConfig, setSoundConfig] = useState(() => {
        // Try to load saved cue points from localStorage
        const saved = localStorage.getItem('vb-dj-sound-config');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                return {};
            }
        }
        return {};
    });

    // Save to localStorage when config changes
    useEffect(() => {
        localStorage.setItem('vb-dj-sound-config', JSON.stringify(soundConfig));
    }, [soundConfig]);

    // Get cue point for a specific sound/file
    const getCuePoint = (soundId, filePath) => {
        const key = `${soundId}:${filePath}`;
        return soundConfig[key] || { startTime: 0, endTime: null };
    };

    // Set cue point for a specific sound/file
    const setCuePoint = (soundId, filePath, startTime, endTime) => {
        const key = `${soundId}:${filePath}`;
        setSoundConfig(prev => ({
            ...prev,
            [key]: { startTime, endTime }
        }));
    };

    // Clear cue point
    const clearCuePoint = (soundId, filePath) => {
        const key = `${soundId}:${filePath}`;
        setSoundConfig(prev => {
            const next = { ...prev };
            delete next[key];
            return next;
        });
    };

    return {
        getCuePoint,
        setCuePoint,
        clearCuePoint,
        soundConfig
    };
}
