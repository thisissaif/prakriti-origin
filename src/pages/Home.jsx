import HeroSection from '../components/HeroSection';
import ProductsSection from '../components/ProductsSection';
import AboutSection from '../components/AboutSection';
import BenefitsSection from '../components/BenefitsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';

const Home = () => {
  return (
    <div className="page-transition">
      <HeroSection />
      <ProductsSection />
      <AboutSection />
      <BenefitsSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
};

export default Home;
