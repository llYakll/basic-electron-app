const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Copies specified files from source to destination directories
const copyFiles = () => {
  const filesToCopy = [
    { source: path.join(__dirname, '../public/index.html'), destination: path.join(__dirname, '../dist/renderer/index.html') },
    { source: path.join(__dirname, '../src/main/preload.js'), destination: path.join(__dirname, '../dist/main/preload.js') }
  ];

  filesToCopy.forEach(file => {
    const source = file.source;
    const destination = file.destination;

    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(source, destination);

    // Log the source and destination of each copied file (relative paths)
    console.log(`Copied ${source} to ${destination}`);
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
  exec('node scripts/esbuild.config.js', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(stdout);
    console.error(stderr);

    copyFiles();
  });
});
