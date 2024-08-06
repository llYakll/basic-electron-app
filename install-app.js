const { exec, execFile } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to execute a shell command and print the output
const executeCommand = (command, description) => {
  return new Promise((resolve, reject) => {
    console.log(`========================================`);
    console.log(`Starting: ${description}`);
    console.log(`========================================`);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error during: ${description}`);
        console.error(error);
        reject(error);
        return;
      }
      console.log(stdout);
      console.error(stderr);
      console.log(`========================================`);
      console.log(`Completed: ${description}`);
      console.log(`========================================`);
      resolve();
    });
  });
};

// Function to run the .exe setup file
const runSetupExe = (exePath) => {
  return new Promise((resolve, reject) => {
    console.log(`Running setup file: ${exePath}`);
    execFile(exePath, (error) => {
      if (error) {
        console.error(`Error running setup file: ${exePath}`);
        console.error(error);
        reject(error);
        return;
      }
      console.log(`Setup file executed: ${exePath}`);
      resolve();
    });
  });
};

// Main function to run the setup
const runSetup = async () => {
  try {
    await executeCommand('npm install', 'Installing npm dependencies');
    await executeCommand('npm run compile', 'Compiling TypeScript to JavaScript');
    await executeCommand('npm run make', 'Packaging the Electron application');

    // Locate the .exe file in the out/make/squirrel.windows/x64 directory
    const exeDir = path.join(__dirname, 'out', 'make', 'squirrel.windows', 'x64');
    const exeFile = fs.readdirSync(exeDir).find(file => file.endsWith('.exe'));
    if (!exeFile) {
      throw new Error('Executable setup file not found.');
    }
    const exePath = path.join(exeDir, exeFile);

    // Run the .exe setup file
    await runSetupExe(exePath);

    console.log("Setup complete! Your Electron application is ready.");
  } catch (error) {
    console.error("Setup failed.", error);
  }
};

// Run the setup
runSetup();
