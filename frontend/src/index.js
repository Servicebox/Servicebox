import { createRoot } from 'react-dom';
import React from 'react';
import App from './components/App/App';

createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);