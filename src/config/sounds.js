/**
 * Sound Configuration
 * 
 * Edit this file to customize the soundboard.
 * Each group has its own neon color theme.
 * 
 * Sound object structure:
 * - id: unique identifier
 * - name: display name on button
 * - icon: emoji icon (optional)
 * - file: path to single audio file
 * - files: array of paths for random selection
 */

// Base path for Vite - automatically handles dev vs production
const BASE = import.meta.env.BASE_URL;

export const soundGroups = [
    {
        id: 'scoring',
        name: 'Scoring',
        icon: '🏐',
        color: '#ff2d55', // Hot Pink/Magenta
        sounds: [
            { id: 'ace', name: 'Ace!', icon: '🎯', file: `${BASE}sounds/ace.mp3` },
            { id: 'block', name: 'Block!', icon: '🧱', files: [`${BASE}sounds/mein-block.mp3`, `${BASE}sounds/here-comes-the-boom.mp3`] },
            { id: 'kill', name: 'Kill!', icon: '💥', files: [`${BASE}sounds/here-comes-the-boom.mp3`] },
            { id: 'point', name: 'Point!', icon: '✨', file: `${BASE}sounds/point.mp3` },
            { id: 'set-point', name: 'Set Point', icon: '🔥', file: `${BASE}sounds/set-point.mp3` },
        ]
    },
    {
        id: 'momentum',
        name: 'Momentum',
        icon: '🔥',
        color: '#ff9500', // Orange
        sounds: [
            { id: 'lets-go', name: "Let's Go!", icon: '👏', file: `${BASE}sounds/lets-go.mp3` },
            { id: 'air-horn', name: 'Air Horn', icon: '📯', file: `${BASE}sounds/air-horn.mp3` },
            { id: 'drum-roll', name: 'Drum Roll', icon: '🥁', file: `${BASE}sounds/drum-roll.mp3` },
            { id: 'crowd-cheer', name: 'Crowd Cheer', icon: '👥', file: `${BASE}sounds/crowd-cheer.mp3` },
            { id: 'siren', name: 'Siren', icon: '🚨', file: `${BASE}sounds/siren.mp3` },
        ]
    },
    {
        id: 'timeouts',
        name: 'Timeouts & Breaks',
        icon: '⏱️',
        color: '#30d158', // Green
        sounds: [
            { id: 'timeout-beat', name: 'Timeout Beat', icon: '🎵', file: `${BASE}sounds/timeout-beat.mp3` },
            { id: 'hype-track', name: 'Hype Track', icon: '🎧', file: `${BASE}sounds/hype-track.mp3` },
            { id: 'walk-on', name: 'Walk-On', icon: '🚶', file: `${BASE}sounds/walk-on.mp3` },
            { id: 'halftime', name: 'Halftime', icon: '🌟', file: `${BASE}sounds/halftime.mp3` },
        ]
    },
    {
        id: 'fun',
        name: 'Fun & Interaction',
        icon: '🎉',
        color: '#bf5af2', // Purple
        sounds: [
            { id: 'buzzer', name: 'Buzzer', icon: '🔔', file: `${BASE}sounds/buzzer.mp3` },
            { id: 'fail', name: 'Wah Wah', icon: '😅', file: `${BASE}sounds/fail.mp3` },
            { id: 'applause', name: 'Applause', icon: '👏', file: `${BASE}sounds/applause.mp3` },
            { id: 'defense', name: 'Defense!', icon: '🛡️', file: `${BASE}sounds/defense.mp3` },
            { id: 'boo', name: 'Boo!', icon: '👻', file: `${BASE}sounds/boo.mp3` },
        ]
    },
    {
        id: 'events',
        name: 'Game Events',
        icon: '📋',
        color: '#0a84ff', // Blue
        sounds: [
            { id: 'whistle', name: 'Whistle', icon: '📣', file: `${BASE}sounds/whistle.mp3` },
            { id: 'substitution', name: 'Sub', icon: '🔄', file: `${BASE}sounds/substitution.mp3` },
            { id: 'challenge', name: 'Challenge', icon: '🏴', file: `${BASE}sounds/challenge.mp3` },
            { id: 'game-start', name: 'Game Start', icon: '🎬', file: `${BASE}sounds/game-start.mp3` },
        ]
    }
];

/**
 * Default theme configuration
 */
export const defaultTheme = {
    primaryColor: '#ffd60a',
    secondaryColor: '#0a84ff',
};
