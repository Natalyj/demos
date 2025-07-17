import { context } from 'esbuild';
import { htmlPlugin } from '@craftamap/esbuild-plugin-html';
import { commonConfig } from './esbuild.config.common.js';

context({
  ...commonConfig,
  plugins: [
    htmlPlugin({
      files: [
        {
          entryPoints: ['index.tsx'],
          filename: 'index.html',
          htmlTemplate: './src/app/index.html',
        },
      ],
    }),
  ],
  sourcemap: 'inline',
  define: {
    'process.env.NODE_ENV': '"development"',
    'import.meta.env': JSON.stringify({
      MODE: 'development'
    }),
  }
}).then(async (ctx) => {
  await ctx.watch();
  await ctx.serve({ port: 9090, servedir: 'dist' });

  console.log(`Dev server running at http://localhost:9090`);
});
