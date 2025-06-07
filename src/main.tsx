import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { ShareProvider } from './contexts/ShareContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ShareProvider>
          <App />
        </ShareProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);