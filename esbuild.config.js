const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['./src/renderer/index.tsx'],
  bundle: true,
  outfile: './dist/renderer/bundle.js',
  platform: 'browser',
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
}).catch(() => process.exit(1));
