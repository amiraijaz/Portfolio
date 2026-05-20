import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Optional: Include if you have global styles
import App from './App';

const rootElement = document.getElementById('root');

// react-snap pre-renders static HTML at build time. When that markup is present,
// hydrate it instead of throwing it away; otherwise mount fresh (dev / no prerender).
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
