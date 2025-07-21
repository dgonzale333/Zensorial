import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Header from './Pages/Header.jsx'; // Import Header component
import ContentSection from './Pages/ContentSection.jsx';
import CoffeeDetails from './Pages/CofeeDetails.jsx';
import MethodsDetails from './Pages/MethodsDetails.jsx';
import './index.css'; // 👈 Importa aquí Tailwind

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <ContentSection />
    <CoffeeDetails />
    <MethodsDetails></MethodsDetails>
  </React.StrictMode>
);
