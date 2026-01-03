import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['sounds/**/*'],
            manifest: {
                name: 'Volleyball DJ Soundboard',
                short_name: 'VB DJ',
                description: 'Soundboard app for Volleyball DJs',
                theme_color: '#1a1a2e',
                background_color: '#1a1a2e',
                display: 'standalone',
                icons: [
                    {
                        src: '/icon-192.svg',
                        sizes: '192x192',
                        type: 'image/svg+xml'
                    },
                    {
                        src: '/icon-512.svg',
                        sizes: '512x512',
                        type: 'image/svg+xml'
                    }
                ]
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,svg,mp3,wav}'],
                runtimeCaching: [
                    {
                        urlPattern: /\.(?:mp3|wav)$/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'audio-cache',
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
                            }
                        }
                    }
                ]
            }
        })
    ]
})
