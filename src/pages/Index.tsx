import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import DiscountBanner from "@/components/DiscountBanner";
import TechBanner from "@/components/TechBanner";
import EbookGrid from "@/components/EbookGrid";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { SAMPLE_EBOOKS } from "@/types/ebook";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <DiscountBanner ebooks={SAMPLE_EBOOKS} />
      <StatsSection />
      <EbookGrid ebooks={SAMPLE_EBOOKS} />
      <TechBanner />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
