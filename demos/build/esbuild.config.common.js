export const commonConfig = {
  entryPoints: ['./src/app/index.tsx'],
  bundle: true,
  format: 'esm',
  target: 'esnext',
  platform: 'browser',
  metafile: true,
  outdir: 'dist',
  jsx: 'automatic',
  loader: { '.png': 'dataurl', '.svg': 'dataurl' },
};
