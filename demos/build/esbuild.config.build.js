import { build } from 'esbuild';
import { polyfillNode } from 'esbuild-plugin-polyfill-node';
import { htmlPlugin } from '@craftamap/esbuild-plugin-html';
import { commonConfig } from './esbuild.config.common.js';

build({
  ...commonConfig,
  plugins: [
    htmlPlugin({
      files: [
        {
          entryPoints: ['./src/app/index.tsx'],
          filename: 'index.html',
          htmlTemplate: './src/html/index.html',
        },
      ],
    }),
    polyfillNode()
  ],
  define: {
    'process.env.NODE_ENV': '"production"',
    'import.meta.env': JSON.stringify({
      MODE: 'production',
    }),
  },
  sourcemap: false,
  minify: true,
  splitting: true,
  logLevel: 'info'
}).catch(() => process.exit(1));
