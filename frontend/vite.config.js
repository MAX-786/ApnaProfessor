import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        brotliSize: false,
        rollupOptions: {
            treeshake: true,
            output: {
                manualChunks: undefined,
            },
        },
        chunkSizeWarningLimit: 1500,
        terserOptions: {
            compress: {
                drop_console: true,
                ecma: 2015,
                keep_classnames: false,
                keep_fnames: false,
                module: false,
                pure_funcs: ['console.log'],
            },
        },
    },
})