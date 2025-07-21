import Header from './Pages/Header.jsx';
import ContentSection from './Pages/ContentSection.jsx';
import CoffeeDetails from './Pages/CofeeDetails.jsx';
import MethodsDetails from './Pages/MethodsDetails.jsx';
import AboutUs from './Pages/AboutUs.jsx';

export default function App() {
  return (
    <>
      <Header />
      <ContentSection />
      <CoffeeDetails />
      <MethodsDetails />
      <AboutUs />
      {/* Aquí puedes agregar más componentes o secciones según sea necesario */}
    </>
  );
}
