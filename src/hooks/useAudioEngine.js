import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Audio Engine Hook
 * 
 * Manages audio playback with:
 * - Exclusive mode (new sound stops previous)
 * - Cue point support (start/end positions)
 * - Toggle to stop on same button click
 */
export function useAudioEngine() {
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
    const audioRef = useRef(null);
    const audioContextRef = useRef(null);

    // Initialize audio context on first user interaction
    const initAudioContext = useCallback(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
    }, []);

    // Play a sound with optional cue points (startTime, endTime in seconds)
    const play = useCallback((soundId, filePath, startTime = 0, endTime = null) => {
        initAudioContext();

        // If clicking the same sound that's playing, stop it
        if (currentlyPlaying === soundId) {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                audioRef.current = null;
            }
            setCurrentlyPlaying(null);
            return;
        }

        // Stop current sound if a different one is playing
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        // Create new audio element
        const audio = new Audio(filePath);
        audio.preload = 'auto';

        // Set start position (cue point)
        audio.currentTime = startTime || 0;

        // Handle end cue point if set
        let endTimeoutId = null;
        if (endTime && endTime > startTime) {
            const duration = (endTime - startTime) * 1000;
            endTimeoutId = setTimeout(() => {
                audio.pause();
                setCurrentlyPlaying(null);
            }, duration);
        }

        // Handle playback end
        audio.onended = () => {
            if (endTimeoutId) clearTimeout(endTimeoutId);
            setCurrentlyPlaying(null);
        };

        audio.onerror = (e) => {
            console.warn(`Failed to play sound: ${filePath}`, e);
            if (endTimeoutId) clearTimeout(endTimeoutId);
            setCurrentlyPlaying(null);
        };

        // Play the sound
        audio.play()
            .then(() => {
                audioRef.current = audio;
                audioRef.current._endTimeoutId = endTimeoutId;
                setCurrentlyPlaying(soundId);
            })
            .catch((err) => {
                console.warn('Playback failed:', err);
                if (endTimeoutId) clearTimeout(endTimeoutId);
                setCurrentlyPlaying(null);
            });
    }, [initAudioContext, currentlyPlaying]);

    // Stop all audio
    const stopAll = useCallback(() => {
        if (audioRef.current) {
            if (audioRef.current._endTimeoutId) {
                clearTimeout(audioRef.current._endTimeoutId);
            }
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current = null;
        }
        setCurrentlyPlaying(null);
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                if (audioRef.current._endTimeoutId) {
                    clearTimeout(audioRef.current._endTimeoutId);
                }
                audioRef.current.pause();
            }
        };
    }, []);

    return {
        play,
        stopAll,
        currentlyPlaying,
        isPlaying: currentlyPlaying !== null
    };
}
