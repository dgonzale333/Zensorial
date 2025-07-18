import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';


import Header from './Pages/Header.jsx'; // Import Header component
import './index.css'; // 👈 Importa aquí Tailwind

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
  </React.StrictMode>
);
