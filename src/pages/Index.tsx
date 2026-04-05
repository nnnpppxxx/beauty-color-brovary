import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MastersSection from "@/components/MastersSection";
import PricesSection from "@/components/PricesSection";
import GallerySection from "@/components/GallerySection";

import ReviewsSection from "@/components/ReviewsSection";
import ContactsSection from "@/components/ContactsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <MastersSection />
      <PricesSection />
      <GallerySection />
      
      <ReviewsSection />
      <ContactsSection />
      <Footer />
    </div>
  );
};

export default Index;
