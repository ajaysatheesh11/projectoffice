import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const isProduction = mode === 'production';

    return {
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.jsx'],
                refresh: ['resources/views/**', 'resources/js/**', 'app/Http/**', 'routes/**'],
            }),
            tailwindcss(),
            react(),
        ],
        build: {
            target: 'es2020',
            cssCodeSplit: true,
            sourcemap: !isProduction && env.VITE_SOURCEMAP === 'true',
            reportCompressedSize: false,
            chunkSizeWarningLimit: 700,
        },
        resolve: {
            alias: {
                '@': '/resources/js',
            },
        },
        server: {
            watch: {
                ignored: ['**/storage/framework/views/**'],
            },
        },
    };
});
