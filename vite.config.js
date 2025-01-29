import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    base: '/Commerce/',
    plugins: [react()],
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        sourcemap: true,
        chunkSizeWarningLimit: 800,
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html')
            },
            output: {
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        if (id.includes('react/') || id.includes('react-dom/') || id.includes('react-router-dom/')) {
                            return 'vendor';
                        }
                        if (id.includes('react-bootstrap/')) {
                            return 'bootstrap';
                        }
                        if (id.includes('yup/') || id.includes('react-toastify/') || id.includes('formik/')) {
                            return 'utils';
                        }
                    }
                }
            }
        }
    },
    optimizeDeps: {
        include: ['react', 'react-dom', 'yup', 'react-toastify', 'formik']
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
});