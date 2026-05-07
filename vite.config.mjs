import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import path from 'path';

export default defineConfig(({ mode }) => ({
    root: '.',
    css: {
        preprocessorOptions: {
            scss: {
                includePaths: [path.resolve('node_modules')]
            }
        },
        postcss: {
            plugins: [
                autoprefixer({ overrideBrowserslist: ['last 2 versions', '> 2%'] }),
                cssnano({ preset: 'default' })
            ]
        }
    },
    build: {
        outDir: 'assets/build',
        emptyOutDir: false,
        minify: mode === 'production',
        cssMinify: true,
        sourcemap: mode !== 'production',
        watch: mode === 'development' ? {} : null,
        rollupOptions: {
            input: {
                app: 'assets/src/js/app.js',
                main: 'assets/src/scss/main.scss',
            },
            output: {
                entryFileNames: 'js/[name].js',
                assetFileNames: ({ name }) => {
                    if (/\.(css)$/.test(name ?? '')) return 'css/[name].min.[ext]';
                    if (/\.(png|jpe?g|gif|svg)$/.test(name ?? '')) return 'img/[name].[ext]';
                    return '[name].[ext]';
                }
            }
        }
    }
}));
