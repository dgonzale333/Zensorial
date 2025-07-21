import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import RootLayout from './Layout.jsx'; // 👈 importa RootLayout
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootLayout>
      <App /> {/* Aquí va tu aplicación */}
    </RootLayout>
  </React.StrictMode>
);
