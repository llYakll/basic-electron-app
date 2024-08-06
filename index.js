const esbuild = require('esbuild');

esbuild.build({
  // Entry point for the application
  entryPoints: ['./src/renderer/index.tsx'],
  // bundle application into a single output file
  bundle: true,
  // file path and name
  outfile: './dist/renderer/bundle.js',
  // Platform target for the build
  platform: 'node',
  // JavaScript language target
  target: ['node14'],
  // Modules to exclude from the bundle
  external: ['electron'],
}).catch(() => process.exit(1));
