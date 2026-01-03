import React, { useState, useEffect } from 'react';
import { defaultTheme } from '../config/sounds';

/**
 * ThemeConfig Component
 * 
 * Simple color pickers to customize team colors.
 * Persists to localStorage.
 */
export function ThemeConfig() {
    const [primaryColor, setPrimaryColor] = useState(defaultTheme.primaryColor);
    const [secondaryColor, setSecondaryColor] = useState(defaultTheme.secondaryColor);

    // Load saved colors on mount
    useEffect(() => {
        const saved = localStorage.getItem('vb-dj-theme');
        if (saved) {
            try {
                const { primary, secondary } = JSON.parse(saved);
                setPrimaryColor(primary || defaultTheme.primaryColor);
                setSecondaryColor(secondary || defaultTheme.secondaryColor);
            } catch (e) {
                console.warn('Failed to load theme:', e);
            }
        }
    }, []);

    // Apply colors to CSS variables
    useEffect(() => {
        document.documentElement.style.setProperty('--color-team-primary', primaryColor);
        document.documentElement.style.setProperty('--color-team-secondary', secondaryColor);

        // Save to localStorage
        localStorage.setItem('vb-dj-theme', JSON.stringify({
            primary: primaryColor,
            secondary: secondaryColor
        }));
    }, [primaryColor, secondaryColor]);

    return (
        <div className="theme-config">
            <div className="color-picker-wrapper" style={{ backgroundColor: primaryColor }}>
                <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    aria-label="Primary team color"
                    title="Primary color"
                />
            </div>
            <div className="color-picker-wrapper" style={{ backgroundColor: secondaryColor }}>
                <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    aria-label="Secondary team color"
                    title="Secondary color"
                />
            </div>
        </div>
    );
}
