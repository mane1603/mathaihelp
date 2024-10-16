import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const math_help_ai__root = ReactDOM.createRoot(
  document.getElementById('math-help-ai__root') as HTMLElement
);

math_help_ai__root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

