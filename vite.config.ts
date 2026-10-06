import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig, type ViteDevServer } from 'vite';

function I18nHotReload() {
    return {
        name: 'i18n-hot-reload',
        handleHotUpdate({ file, server }: { file: string; server: ViteDevServer }) {
			console.log(file);
			
            if (file.includes('locales') && file.endsWith('.json')) {
                console.log('Locale file updated');
                server.ws.send({
                    type: 'custom',
                    event: 'locales-update',
                });
            }
        },
    };
}


// Client-side rendered SPA: Vite serves index.html and bundles everything in src/.
// Files in /public (including /public/locales) are copied as-is and served from "/".
export default defineConfig({
    plugins: [react(), I18nHotReload()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        host: true,
        port: 3001,
        proxy: {
            // API
            '/api': {
                target: 'http://localhost:4000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },

            // WebSocket / Socket.IO
            '/ws': {
                target: 'http://localhost:4000',
                changeOrigin: true,
                ws: true,
            },

            // seaweed file hosting
            '/files': {
                target: 'http://localhost:8888',
                changeOrigin: true,
                rewrite: (path) => {
                    const _path = path.replace(/^\/files/, '');
                    return _path;
                },
            },
        },
    },
});
