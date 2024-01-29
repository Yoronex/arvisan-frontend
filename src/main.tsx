import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import VisualizationContextProvider from './context/VisualizationContext';
import { OpenAPI } from './api';
import VisualizationLayoutContextProvider from './context/VisualizationLayoutContext';
import VisualizationHistoryProvider from './context/VisualizationHistory';
import DomainContextProvider from './context/DomainContext';

// HTTP Basic Auth is enforced on the backend
OpenAPI.WITH_CREDENTIALS = true;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DomainContextProvider>
      <VisualizationHistoryProvider>
        <VisualizationContextProvider>
          <VisualizationLayoutContextProvider>
            <App />
          </VisualizationLayoutContextProvider>
        </VisualizationContextProvider>
      </VisualizationHistoryProvider>
    </DomainContextProvider>
  </React.StrictMode>,
);
