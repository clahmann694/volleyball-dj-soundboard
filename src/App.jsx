import React, { useState, useEffect, useCallback } from 'react';
import { SoundBoard } from './components/SoundBoard';
import { ThemeConfig } from './components/ThemeConfig';
import { SidePanel } from './components/SidePanel';
import { DeveloperView } from './components/DeveloperView';
import { useAudioEngine } from './hooks/useAudioEngine';
import { useSoundConfig } from './hooks/useSoundConfig';

/**
 * Main App Component
 * 
 * Volleyball DJ Soundboard
 * Two views:
 * - DJ View: Clean interface for game use
 * - Developer View: Edit cue points (start/end times)
 */
function App() {
    const { play, stopAll, currentlyPlaying, isPlaying } = useAudioEngine();
    const { getCuePoint, setCuePoint, clearCuePoint, soundConfig } = useSoundConfig();

    const [panelSound, setPanelSound] = useState(null);
    const [viewMode, setViewMode] = useState('dj'); // 'dj' or 'developer'
    const [editingSound, setEditingSound] = useState(null);

    // Spacebar to stop all audio, Escape to close panel
    const handleKeyDown = useCallback((event) => {
        if (event.code === 'Space' && !event.target.closest('input, textarea')) {
            event.preventDefault();
            stopAll();
        }
        if (event.code === 'Escape') {
            setPanelSound(null);
            setEditingSound(null);
        }
    }, [stopAll]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Play with cue point support
    const handlePlay = (soundId, filePath) => {
        const cuePoint = getCuePoint(soundId, filePath);
        play(soundId, filePath, cuePoint.startTime, cuePoint.endTime);
    };

    const handleOpenPanel = (sound) => {
        setPanelSound(sound);
    };

    const handleClosePanel = () => {
        setPanelSound(null);
    };

    const toggleViewMode = () => {
        setViewMode(prev => prev === 'dj' ? 'developer' : 'dj');
        setPanelSound(null);
    };

    const handleEditSound = (soundId, filePath) => {
        setEditingSound({ soundId, filePath });
    };

    const handleCloseEditor = () => {
        setEditingSound(null);
    };

    return (
        <div className={`app ${panelSound ? 'app--panel-open' : ''} app--${viewMode}`}>
            <header className="app-header">
                <h1 className="app-title">🏐 VB DJ Soundboard</h1>

                <div className="app-header__controls">
                    <button
                        className={`view-toggle ${viewMode === 'developer' ? 'view-toggle--active' : ''}`}
                        onClick={toggleViewMode}
                        title={viewMode === 'dj' ? 'Switch to Developer View' : 'Switch to DJ View'}
                    >
                        {viewMode === 'dj' ? '🛠️' : '🎧'}
                        <span>{viewMode === 'dj' ? 'Dev' : 'DJ'}</span>
                    </button>
                    <ThemeConfig />
                </div>
            </header>

            {viewMode === 'dj' ? (
                <>
                    <div className="app-body">
                        <main className="app-main">
                            <SoundBoard
                                currentlyPlaying={currentlyPlaying}
                                onPlay={handlePlay}
                                onOpenPanel={handleOpenPanel}
                                getCuePoint={getCuePoint}
                            />
                        </main>

                        {panelSound && (
                            <SidePanel
                                sound={panelSound}
                                onPlayFile={handlePlay}
                                onClose={handleClosePanel}
                                getCuePoint={getCuePoint}
                            />
                        )}
                    </div>
                </>
            ) : (
                <DeveloperView
                    soundConfig={soundConfig}
                    onSetCuePoint={setCuePoint}
                    onClearCuePoint={clearCuePoint}
                    editingSound={editingSound}
                    onEditSound={handleEditSound}
                    onCloseEditor={handleCloseEditor}
                />
            )}
        </div>
    );
}

export default App;
