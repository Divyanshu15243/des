import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import HowItWorks from "@/components/HowItWorks";
import FeaturedListings from "@/components/FeaturedListings";
import CitiesSection from "@/components/CitiesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CategorySection />
      <HowItWorks />
      <FeaturedListings />
      <CitiesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
