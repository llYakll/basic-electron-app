const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Copies specified files from source to destination directories
const copyFiles = () => {
  const filesToCopy = [
    { source: 'public/index.html', destination: 'dist/renderer/index.html' },
    { source: 'src/main/preload.js', destination: 'dist/main/preload.js' }
  ];

  filesToCopy.forEach(file => {
    const source = path.join(__dirname, file.source);
    const destination = path.join(__dirname, file.destination);

    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(source, destination);

    // Log the source and destination of each copied file (relative paths)
    console.log(`Copied ${file.source} to ${file.destination}`);
  });
};

// Executes the TypeScript compiler command
exec('tsc', (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(stdout);
  console.error(stderr);

  // Executes the esbuild bundling command
  exec('node esbuild.config.js', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(stdout);
    console.error(stderr);

    copyFiles();
  });
});
