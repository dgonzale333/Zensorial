import Header from './Pages/Header.jsx';
import ContentSection from './Pages/ContentSection.jsx';
import CoffeeDetails from './Pages/CofeeDetails.jsx';
import MethodsDetails from './Pages/MethodsDetails.jsx';
import AboutUs from './Pages/AboutUs.jsx';
import CoffeeOriginStory from './Pages/CofeeOriginHistory.jsx';
import Testimonials from './Pages/Testimonials.jsx';
import FAQ from './Pages/FAQ.jsx';
import NewsletterSignup from './Pages/NewSletterSignUp.jsx';
import Footer from './Pages/Footer.jsx';

export default function App() {
  return (
    <>
      <Header />
      <ContentSection />
      <CoffeeOriginStory />
      <CoffeeDetails />
      <MethodsDetails />
      <AboutUs />
      <Testimonials />
      <FAQ />
      <NewsletterSignup />
      <Footer />
      {  }
    </>
  );
}
