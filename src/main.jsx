import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div style={{
      height: '100vh',
      backgroundColor: '#111827',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '6rem',
      fontWeight: 'bold',
      textAlign: 'center',
      padding: '20px'
    }}>
      DZIAŁA MINIMALNA WERSJA NA VERCEL
    </div>
  </StrictMode>
);