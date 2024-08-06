const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['./src/renderer/index.tsx'],
  bundle: true,
  outfile: './dist/renderer/bundle.js',
  platform: 'node',
  target: ['node14'],
  external: ['electron'],
}).catch(() => process.exit(1));
