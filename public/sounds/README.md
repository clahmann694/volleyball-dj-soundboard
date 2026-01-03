# Placeholder Sounds

This directory contains placeholder audio files for testing.

## How to Add Real Sounds

1. Replace the `.mp3` files in this folder with your actual sound clips
2. Keep the same filenames, or update `src/config/sounds.js` with new names
3. Recommended format: MP3, 128-256kbps, mono or stereo

## File List

### Scoring
- ace.mp3
- block.mp3
- kill.mp3
- point.mp3
- set-point.mp3

### Momentum
- lets-go.mp3
- air-horn.mp3
- drum-roll.mp3
- crowd-cheer.mp3
- siren.mp3

### Timeouts & Breaks
- timeout-beat.mp3
- hype-track.mp3
- walk-on.mp3
- halftime.mp3

### Fun & Interaction
- buzzer.mp3
- fail.mp3
- applause.mp3
- defense.mp3
- boo.mp3

### Game Events
- whistle.mp3
- substitution.mp3
- challenge.mp3
- game-start.mp3

## Generating Test Sounds

For testing without real audio, you can generate simple beep sounds using online tools or command line:

```bash
# Using ffmpeg to generate a test tone
ffmpeg -f lavfi -i "sine=frequency=440:duration=1" ace.mp3
```

Or use free sound effect libraries:
- https://freesound.org
- https://pixabay.com/sound-effects/
- https://mixkit.co/free-sound-effects/
