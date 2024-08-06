import { app, BrowserWindow } from 'electron';
import * as path from 'path';

/**
 * Creates the main application window.
 */
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  });

  /**
   * Loads the HTML file into the window.
   */
  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
}

/**
 * Event: Emitted when Electron has finished initialization.
 * Creates the main application window.
 */
app.on('ready', createWindow);

/**
 * Event: Emitted when all windows have been closed.
 * Quits the application, except on macOS where it is common for applications
 * to stay open until the user explicitly quits.
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/**
 * Event: Emitted when the application is activated.
 * Recreates a window if no windows are open (common behavior on macOS).
 */
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
