import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Finds the HTML element with the ID 'root' where the React app will be mounted
const container = document.getElementById('root');

if (container) {
  // Creates a React root for managing the React component tree
  const root = createRoot(container); // Create a root

  // Renders the App component into the root container
  root.render(<App />); // Render the App component
}
