import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { OpenAPI } from './api';
import { ContextProviders } from './context';

// HTTP Basic Auth is enforced on the backend
OpenAPI.WITH_CREDENTIALS = true;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextProviders>
      <App />
    </ContextProviders>
  </React.StrictMode>,
);
