import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import VisualizationContextProvider from './context/VisualizationContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <VisualizationContextProvider>
      <App />
    </VisualizationContextProvider>
  </React.StrictMode>,
);
