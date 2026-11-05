import { Route, Routes } from 'react-router-dom';
import Header from './Pages/Header.jsx';
import ContentSection from './Pages/ContentSection.jsx';
import CoffeeDetails from './Pages/CofeeDetails.jsx';
import MethodsDetails from './Pages/MethodsDetails.jsx';
import AboutUs from './Pages/AboutUs.jsx';
import FAQ from './Pages/FAQ.jsx';
import Footer from './Pages/Footer.jsx';
import AuthPage from './Pages/AuthPage.jsx';
import AdminCoffeesPage from './Pages/AdminCoffeesPage.jsx';
import StorePage from './Pages/StorePage.jsx';
import CartPage from './Pages/CartPage.jsx';
import CheckoutPage from './Pages/CheckoutPage.jsx';

function HomePage() {
  return (
    <>
      <Header />
      <ContentSection />
      <CoffeeDetails />
      <MethodsDetails />
      <AboutUs />
      <FAQ />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/iniciar-sesion" element={<AuthPage mode="sign-in" />} />
      <Route path="/crear-cuenta" element={<AuthPage mode="sign-up" />} />
      <Route path="/admin" element={<AdminCoffeesPage />} />
      <Route path="/tienda" element={<StorePage />} />
      <Route path="/carrito" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="*" element={<main className="flex min-h-screen items-center justify-center bg-amber-50 px-4 pt-20"><p className="text-stone-700">No encontramos esta página.</p></main>} />
    </Routes>
  );
}
