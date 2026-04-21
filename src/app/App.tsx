import { HeroSection } from "./components/HeroSection";
import { LoungeSection } from "./components/LoungeSection";
import { OfferingsSection } from "./components/OfferingsSection";
import { GallerySection } from "./components/GallerySection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";

export default function App() {
  return (
    <Router>
    <Routes>
    <Route path="/" element={
    <div className="w-full min-h-screen">
      <HeroSection /> {/* Fixed Background Reveal */}
      
      {/* LOUNGE: Darker Background */}
      <div className="relative z-30 bg-[#050505]/75">
        <LoungeSection /> 
      </div>

      {/* OFFERINGS: Back to Dark */}
      <div className="relative z-30 bg-[#0E0F10]">
        <OfferingsSection />
      </div>

      {/* GALLERY: Back to Darker */}
      <div className="relative z-30 bg-[#050505]/75">
        <GallerySection />
      </div>

      {/* CONTACT/FOOTER: Back to Dark */}
      <div className="relative z-30 bg-[#0E0F10]/75">
        <ContactSection />
        <Footer />
      </div>
    </div> 
  } />

    <Route path="/menu" element={<Menu />} />
    </Routes>
    </Router>
  );
}