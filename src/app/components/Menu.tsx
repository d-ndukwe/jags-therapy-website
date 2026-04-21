import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
// Notice the 'Menu as MenuIcon' import to avoid conflicting with your component name
import { Wine, Utensils, Menu as MenuIcon, X } from "lucide-react";

// The Complete Menu Data
const menuData = {
  cellar: [
    {
      category: "Whisky Selection",
      items: [
        { name: "Glenfiddich (18yrs)", price: "₦300,000" },
        { name: "Glenfiddich VAT 01", price: "₦250,000" },
        { name: "Green Label", price: "₦200,000" },
        { name: "Glenfiddich (15yrs)", price: "₦180,000" },
        { name: "Glenfiddich (12yrs)", price: "₦150,000" },
        { name: "Gentleman Jack", price: "₦120,000" },
        { name: "Black Label / Balantine (1L)", price: "₦100,000" },
        { name: "Jameson Black Barrel", price: "₦95,000" },
        { name: "Balantine (70cl)", price: "₦70,000" },
        { name: "Tellings", price: "₦60,000" },
        { name: "Jameson Irish / American Honey", price: "₦55,000" },
        { name: "Jack Daniel / Devil's Cut", price: "₦50,000" },
        { name: "Red Label (70cl)", price: "₦45,000" },
        { name: "Bush Mill", price: "₦40,000" },
        { name: "Williams Lawson's / Glen Johnson", price: "₦35,000" },
      ],
    },
    {
      category: "Cognac & Brandy",
      items: [
        { name: "Remmy Martin (Club)", price: "₦700,000" },
        { name: "Remmy Martin XO", price: "₦370,000" },
        { name: "Hennessy X.O / VSOP (1L)", price: "₦350,000" },
        { name: "Remmy Martin VSOP (1L)", price: "₦300,000" },
        { name: "Chivas Regal (18yrs)", price: "₦270,000" },
        { name: "Hennessy VSOP / Courvoisier XO", price: "₦250,000" },
        { name: "Hennessy V.S (1L)", price: "₦170,000" },
        { name: "Martell Blue Swift / Courvoisier VS", price: "₦150,000" },
        { name: "Martell Caractere", price: "₦140,000" },
        { name: "Hennessy V.S / Martell VS", price: "₦130,000" },
        { name: "Barron De Otard VSOP (70cl)", price: "₦40,000" },
        { name: "Barron De Otard (33cl)", price: "₦35,000" },
      ],
    },
    {
      category: "Spirits, Tequila & Gin",
      items: [
        { name: "Casamigos Tequila", price: "₦250,000" },
        { name: "Salamca Tequila Blenco", price: "₦100,000" },
        { name: "Olmeca Tequila", price: "₦55,000" },
        { name: "Bombay Saphire / Baileys", price: "₦50,000" },
        { name: "Absolute Vodka / Escudo Rojo", price: "₦45,000" },
        { name: "Jagameister (1L) / Tequila Sierra", price: "₦40,000" },
        { name: "Amarula", price: "₦38,000" },
        { name: "Bacardi Rum / Jagameister (70cl)", price: "₦35,000" },
        { name: "Captain Morgan", price: "₦25,000" },
        { name: "Pravda Vodka / Gordon Gin", price: "₦20,000" },
      ],
    },
    {
      category: "Champagne & Wines",
      items: [
        { name: "Moe't Bruit", price: "₦145,000" },
        { name: "Moe't Rose", price: "₦130,000" },
        { name: "Portell (Bruit)", price: "₦125,000" },
        { name: "Louis Roederer (Bruit)", price: "₦120,000" },
        { name: "Rocca Dei Forti (Bruit)", price: "₦110,000" },
        { name: "Mood", price: "₦100,000" },
        { name: "Baglietti (Rose)", price: "₦65,000" },
        { name: "Andre Bruit", price: "₦55,000" },
        { name: "Red/White Wines (Large)", price: "₦20,000" },
        { name: "Red/White Wines (Small)", price: "₦10,000" },
      ],
    },
    {
      category: "Alcoholic Cocktails",
      items: [
        { name: "Bob Marley / Therapy Spl.", price: "₦8,500" },
        { name: "Long Island / African Zombies", price: "₦8,000" },
        { name: "Blue Lagoon / Pina Colada", price: "₦7,500" },
        { name: "Sex on the Beach / Margarita", price: "₦7,000" },
        { name: "Cosmopolitan / Take me up", price: "₦6,850" },
        { name: "Moscow Mule / Mai Tai", price: "₦6,500" },
        { name: "Trance / Pineapple Tate", price: "₦6,000" },
      ],
    },
    {
      category: "Beers & Soft Drinks",
      items: [
        { name: "Heineken / Tiger (Draft)", price: "₦3,500" },
        { name: "Red Bull / Kabisa", price: "₦3,500" },
        { name: "Budweiser / Heineken / Legend", price: "₦3,000" },
        { name: "Cranberry Juice", price: "₦10,000" },
        { name: "Orange / Apple Juice", price: "₦4,500" },
        { name: "Malta Guinness / Amstel", price: "₦1,500" },
        { name: "Eva / Aquafina Water", price: "₦700" },
      ],
    },
  ],
  kitchen: [
    {
      category: "The Platters",
      items: [
        { name: "Alfa Seafood Platter", price: "₦100,000" },
        { name: "Jag's Family Platter", price: "₦100,000" },
        { name: "Therapy Meat Platter", price: "₦90,000" },
        { name: "Therapy Combo", price: "₦80,000" },
        { name: "Full Goat-Lap Platter", price: "₦65,000" },
      ],
    },
    {
      category: "Native Soups & OKRA",
      items: [
        { name: "Seafood Okra / Afan / Eforiro", price: "₦35,000" },
        { name: "Fisherman Soup", price: "₦35,000" },
        { name: "Catfish Pepper Soup + Side", price: "₦30,000" },
        { name: "Oha / Banga / White Soup", price: "₦16,500" },
        { name: "Egusi / Vegetable / Ogbono", price: "₦15,000" },
        { name: "Goat Meat Pepper Soup", price: "₦12,000" },
      ],
    },
    {
      category: "Rice & Pasta",
      items: [
        { name: "Seafood / Pineapple Rice", price: "₦33,000" },
        { name: "Seafood Singapore Noodles", price: "₦30,000" },
        { name: "Jambalaya Rice", price: "₦27,000" },
        { name: "Chinese Rice (Mixed)", price: "₦25,000" },
        { name: "Pasta Alfredo", price: "₦15,000" },
        { name: "Ofada / Native Rice", price: "₦15,000" },
        { name: "Jollof / Fried / White Rice", price: "₦14,000" },
        { name: "Stir Fry Spaghetti", price: "₦13,000" },
      ],
    },
    {
      category: "From The Grill",
      items: [
        { name: "BBQ Grill Croaker Fish", price: "₦30,000" },
        { name: "Full BBQ Grill Chicken", price: "₦20,000" },
        { name: "Isi'Ewu", price: "₦17,000" },
        { name: "Nkwobi", price: "₦13,500" },
        { name: "Abacha", price: "₦12,500" },
        { name: "Ram / Beef / Tozo Suya", price: "₦3,500" },
        { name: "Chicken Suya", price: "₦3,000" },
      ],
    },
    {
      category: "Starters & Breakfast",
      items: [
        { name: "Chicken Wings & Chips", price: "₦17,500" },
        { name: "Jumbo Snail & Chips", price: "₦15,000" },
        { name: "Full Breakfast Platter", price: "₦13,500" },
        { name: "Chicken Fingers / Nuggets", price: "₦13,000" },
        { name: "Club Sandwich", price: "₦7,350" },
        { name: "Chicken / Beef Shawarma", price: "₦6,000 - ₦7,000" },
      ],
    },
    {
      category: "Extra Sides",
      items: [
        { name: "Extra Jollof / Fried Rice", price: "₦6,000" },
        { name: "Extra Basmati / Coconut Rice", price: "₦5,000" },
        { name: "Extra White Rice", price: "₦3,500" },
        { name: "Poundo / Semo / Wheat", price: "₦3,500" },
        { name: "Chips / Yam / Plantain", price: "₦3,000" },
        { name: "Extra Eba", price: "₦3,000" },
      ],
    },
  ],
};

export default function Menu() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [isOpposing, setIsOpposing] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // New state for the mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dynamic Navbar Logic
  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY ? "down" : "up";
    
    if (direction === "up" && latest > 150) {
      setIsOpposing(true);
      setIsVisible(true);
    } else if (direction === "down" && latest > 150) {
      setIsVisible(false);
      setIsMobileMenuOpen(false); // Automatically close mobile menu when scrolling down
    } else if (latest < 150) {
      setIsOpposing(false);
      setIsVisible(true);
    }
    setLastScrollY(latest);
  });

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false); // Close the mobile menu after clicking a link
  };

  return (
    <div className="min-h-screen bg-[#0E0F10] text-[#EAEAEA]" style={{ fontFamily: "'Poppins', sans-serif" }}>
      
      {/* DYNAMIC NAVBAR */}
      <motion.nav
        animate={{ y: isVisible ? 0 : -100 }}
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 flex flex-col ${
          isOpposing ? "bg-[#F4EFE6] shadow-xl" : "bg-[#0E0F10]/90 backdrop-blur-sm"
        }`}
      >
        {/* Main Navbar Bar */}
        <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h2 
            className={`text-xl md:text-2xl font-bold tracking-tighter cursor-pointer ${
              isOpposing ? "text-[#0E0F10]" : "text-[#EAEAEA]"
            }`}
            style={{ fontFamily: "'Playfair Display', serif" }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            JAG'S <span className="opacity-60">MENU</span>
          </h2>
          
          {/* Desktop Subdivisions */}
          <div className="hidden md:flex gap-8">
            {['Cellar', 'Kitchen'].map((tab) => (
              <button
                key={tab}
                onClick={() => scrollToId(tab.toLowerCase())}
                className={`uppercase text-xs tracking-widest font-bold transition-all hover:scale-110 ${
                  isOpposing ? "text-[#0E0F10]" : "text-[#2ECC71]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={24} className={isOpposing ? "text-[#0E0F10]" : "text-[#EAEAEA]"} />
            ) : (
              <MenuIcon size={24} className={isOpposing ? "text-[#0E0F10]" : "text-[#EAEAEA]"} />
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={`md:hidden overflow-hidden border-t ${
                isOpposing ? "bg-[#F4EFE6] border-[#0E0F10]/10" : "bg-[#0E0F10] border-white/10"
              }`}
            >
              <div className="flex flex-col items-center gap-6 py-8">
                {['Cellar', 'Kitchen'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => scrollToId(tab.toLowerCase())}
                    className={`uppercase text-sm tracking-widest font-bold transition-all ${
                      isOpposing ? "text-[#0E0F10]" : "text-[#2ECC71]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* HEADER */}
      <header className="pt-40 pb-20 text-center px-4">
        <h1 
          className="text-6xl md:text-8xl mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          The Selection
        </h1>
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block h-1 w-24 bg-gradient-to-r from-[#2ECC71] via-[#F1C40F] to-[#E74C3C] mb-8"
        />

        <p className="tracking-[0.5em] uppercase text-gray-500 text-md">A curation of the finest <br /> dishes and drinks <br /> to keep your night enjoyable.</p>
      </header>

      {/* MENU CONTENT */}
      <main className="max-w-7xl mx-auto px-6 pb-40 space-y-32">
        
        {/* THE CELLAR SECTION */}
        <section id="cellar" className="space-y-16 pt-10">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <Wine className="text-[#2ECC71]" size={36} />
            <h2 
              className="text-4xl md:text-5xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The Cellar
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
            {menuData.cellar.map((cat, i) => (
              <div key={i} className="space-y-6">
                <h3 className="text-[#F1C40F] uppercase tracking-widest text-xl font-bold border-b border-white/10 pb-2">
                  {cat.category}
                </h3>
                <div className="space-y-5">
                  {cat.items.map((item, j) => (
                    <div key={j} className="flex justify-between items-end group">
                      <div className="flex-1 border-b border-dotted border-white/20 pb-1 group-hover:border-[#2ECC71] transition-colors">
                        <span className="text-sm md:text-base text-gray-200">{item.name}</span>
                      </div>
                      <span className="pl-4 font-bold text-[#2ECC71] text-sm whitespace-nowrap">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FREQUENCY DIVIDER */}
        <div className="flex justify-center opacity-20 py-10">
           <svg width="200" height="40" viewBox="0 0 200 40">
              <path d="M0 20 L40 20 L50 5 L60 35 L70 20 L130 20 L140 0 L150 40 L160 20 L200 20" stroke="#EAEAEA" strokeWidth="2" fill="none" />
           </svg>
        </div>

        {/* THE KITCHEN SECTION */}
        <section id="kitchen" className="space-y-16 pt-10">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <Utensils className="text-[#2ECC71]" size={36} />
            <h2 
              className="text-4xl md:text-5xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The Kitchen
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
             {menuData.kitchen.map((cat, i) => (
               <motion.div 
                whileHover={{ y: -5 }}
                key={i} 
                className="bg-[#16181A] p-8 rounded-2xl border border-white/5 shadow-xl"
               >
                  <h3 className="text-xl mb-6 text-[#F1C40F] tracking-wider uppercase text-center md:text-left font-semibold">
                    {cat.category}
                  </h3>
                  <div className="space-y-4">
                    {cat.items.map((item, j) => (
                      <div key={j} className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-1 sm:gap-4 border-b border-white/5 pb-3">
                        <span className="text-gray-300 text-sm">{item.name}</span>
                        <span className="text-[#2ECC71] font-bold text-sm whitespace-nowrap">{item.price}</span>
                      </div>
                    ))}
                  </div>
               </motion.div>
             ))}
          </div>
        </section>

      </main>

      {/* FOOTER CTA */}
      <div className="bg-[#050505] py-20 text-center border-t border-white/5">
        <p className="text-gray-500 mb-6 text-sm">Prices are subject to change without notice.</p><br />
         <p className="text-xs"
            style={{ fontFamily: "'Poppins', sans-serif", color: "#EAEAEA", opacity: 0.5 }}>
            © 2026 Jag's Therapy. All rights reserved.
          </p><br />
        <button 
          onClick={() => window.open(`https://wa.me/234XXXXXXXXXX?text=${encodeURIComponent("Hello Jag's Therapy, I'd like to request a table.")}`, '_blank')}
          className="px-12 py-4 bg-[#2ECC71] text-black font-bold rounded-full uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(46,204,113,0.3)]"
        >
           Reserve a Table
        </button>
      </div>
    </div>
  );
}