import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import EbookGrid from "@/components/EbookGrid";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { SAMPLE_EBOOKS } from "@/types/ebook";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <EbookGrid ebooks={SAMPLE_EBOOKS} />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
