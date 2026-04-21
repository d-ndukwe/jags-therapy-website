import { useState, useMemo } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { Wine, Utensils, Search, Menu as MenuIcon, X, Dumbbell } from "lucide-react";

// --- THE COMPLETE RAW DATA ---
const rawMenuData = {
  cellar: [
    { category: "Whisky", items: [
      { name: "Jameson Black Barrel (70cl)", price: "₦100,000.00" }, { name: "Jameson Irish (70cl)", price: "₦55,000.00" },
      { name: "Glenfiddich (18yrs)", price: "₦300,000.00" }, { name: "Glenfiddich (15yrs)", price: "₦180,000.00" },
      { name: "Glenfiddich (12yrs)", price: "₦150,000.00" }, { name: "Jack Daniel (70cl)", price: "₦55,000.00" },
      { name: "Black Label (70cl)", price: "₦100,000.00" }, { name: "Gentleman Jack", price: "₦120,000.00" },
      { name: "Balantine (1ltr)", price: "₦100,000.00" }, { name: "Balantine", price: "₦70,000.00" },
      { name: "Williams Lawson's", price: "₦35,000.00" }, { name: "Red Label (70cl)", price: "₦45,000.00" },
      { name: "Glen Johnson (70cl)", price: "₦35,000.00" }, { name: "Bush Mill", price: "₦40,000.00" },
      { name: "Devil's Cut", price: "₦50,000.00" }, { name: "Campari (70cl)", price: "₦40,000.00" },
      { name: "Campari (1ltr)", price: "₦55,000.00" }, { name: "Captain Morgan", price: "₦25,000.00" },
      { name: "Tellings", price: "₦60,000.00" }, { name: "Green Label", price: "₦250,000.00" },
      { name: "Glenfiddich VAT 01", price: "₦250,000.00" }
    ]},
    { category: "Brandy", items: [
      { name: "Hennessy X.O", price: "₦350,000.00" }, { name: "Hennessy V.S.O.P (1L)", price: "₦350,000.00" },
      { name: "Hennessy V.S.O.P (70cl)", price: "₦250,000.00" }, { name: "Hennessy V.S (1L)", price: "₦170,000.00" },
      { name: "Hennessy V.S (70cl)", price: "₦150,000.00" }, { name: "Martell Blue Swift", price: "₦170,000.00" },
      { name: "Martell Caractere", price: "₦180,000.00" }, { name: "Martell V.S", price: "₦140,000.00" },
      { name: "Chivas Regal (18yrs)", price: "₦270,000.00" }, { name: "Courvoisier V.S", price: "₦150,000.00" },
      { name: "Courvoisier XO", price: "₦250,000.00" }, { name: "Remmy Martin XO", price: "₦370,000.00" },
      { name: "Remmy Martin VSOP (70cl)", price: "₦250,000.00" }, { name: "Remmy Martin VSOP (1ltr)", price: "₦300,000.00" },
      { name: "Barron De Otard VSOP (70cl)", price: "₦40,000.00" }, { name: "Double Black (1L)", price: "₦150,000.00" },
      { name: "Barron De Otard (33cl)", price: "₦35,000.00" }, { name: "Remmy Martin (Club)", price: "₦700,000.00" }
    ]},
    { category: "Spirit/Liquor", items: [
      { name: "Absolute Vodka (70cl)", price: "₦45,000.00" }, { name: "Pravda Vodka", price: "₦20,000.00" },
      { name: "Bacardi Rum (70cl)", price: "₦35,000.00" }, { name: "Gordon Gin", price: "₦20,000.00" },
      { name: "Jagameister (1L)", price: "₦40,000.00" }, { name: "Jagameister (70cl)", price: "₦35,000.00" },
      { name: "Bailey's", price: "₦50,000.00" }, { name: "Bombay Saphire", price: "₦50,000.00" },
      { name: "Tequila Sierra", price: "₦43,000.00" }, { name: "Olmeca Tequila", price: "₦55,000.00" },
      { name: "Amarula", price: "₦38,000.00" }, { name: "Casamigos Tequila", price: "₦250,000.00" },
      { name: "Salamca Tequila Blenco", price: "₦100,000.00" }, { name: "American Honey", price: "₦55,000.00" }
    ]},
    { category: "Red Wine", items: [
      { name: "Escudo Rojo", price: "₦55,000.00" }, { name: "Argo", price: "₦25,000.00" },
      { name: "Drostdy Hof", price: "₦20,000.00" }, { name: "Four Cousin", price: "₦20,000.00" },
      { name: "Carlo-Rossi", price: "₦25,000.00" }, { name: "Declan", price: "₦20,000.00" },
      { name: "Oreanda", price: "₦20,000.00" }, { name: "Expression", price: "₦20,000.00" },
      { name: "Declan (Small)", price: "₦10,000.00" }, { name: "Drostdy Hof (Small)", price: "₦10,000.00" },
      { name: "Carlo-Rossi (Small)", price: "₦10,000.00" }, { name: "Nederburg Wine", price: "₦50,000.00" },
      { name: "Rene Barbier Classic Medium Sweet", price: "₦35,000.00" }
    ]},
    { category: "White Wine", items: [
      { name: "Four Cousin", price: "₦20,000.00" }, { name: "Declan", price: "₦20,000.00" },
      { name: "Carlo-Rossi", price: "₦20,000.00" }, { name: "Drostdy Hof", price: "₦20,000.00" },
      { name: "Declan (Small)", price: "₦10,000.00" }, { name: "Carlo-Rossi (Small)", price: "₦10,000.00" },
      { name: "Drostdy Hof (Small)", price: "₦10,000.00" }
    ]},
    { category: "Sparkling/Champagne", items: [
      { name: "Moe't Rose", price: "₦130,000.00" }, { name: "Moe't Bruit", price: "₦145,000.00" },
      { name: "Mood", price: "₦100,000.00" }, { name: "Louis Roederer (Bruit)", price: "₦120,000.00" },
      { name: "Rocca Dei Forti (Bruit)", price: "₦110,000.00" }, { name: "Portell (Bruit)", price: "₦125,000.00" },
      { name: "Andre Bruit", price: "₦55,000.00" }, { name: "Andre Rose", price: "₦35,000.00" },
      { name: "Four Cousin", price: "₦30,000.00" }, { name: "Chamdor (Non-Alcoholic)", price: "₦17,000.00" },
      { name: "Baglietti (Rose)", price: "₦65,000.00" }
    ]},
    { category: "Whiskey/Spirit Shots", items: [
      { name: "Tequila Shot", price: "₦3,000.00" }, { name: "Hennessy Shot", price: "₦5,000.00" },
      { name: "Jack-Daniel Shot", price: "₦3,500.00" }, { name: "Jameson Shot", price: "₦3,500.00" },
      { name: "Black Label Shot", price: "₦4,500.00" }, { name: "Red Label Shot", price: "₦4,000.00" },
      { name: "Campari Shot", price: "₦3,500.00" }, { name: "Bombay Shot", price: "₦3,500.00" },
      { name: "Baileys Shot", price: "₦3,500.00" }, { name: "Amarula Shot", price: "₦3,000.00" },
      { name: "Shisha Smoke", price: "₦7,000.00" }, { name: "Cigarette Smoke", price: "₦2,500.00" },
      { name: "Jagameister", price: "₦2,500.00" }
    ]},
    { category: "Beers", items: [
      { name: "Heineken", price: "₦3,000.00" }, { name: "Heineken (Draft)", price: "₦3,500.00" },
      { name: "Tiger Draft", price: "₦3,500.00" }, { name: "Trophy", price: "₦1,800.00" },
      { name: "33 Beer", price: "₦1,800.00" }, { name: "Hero", price: "₦1,800.00" },
      { name: "Budweiser", price: "₦3,000.00" }, { name: "Goldberg", price: "₦1,800.00" },
      { name: "Desperado", price: "₦1,700.00" }, { name: "Legend Beer", price: "₦3,000.00" },
      { name: "Flying Fish Beer", price: "₦1,750.00" }, { name: "Star Beer", price: "₦1,800.00" },
      { name: "Orijin Beer", price: "₦2,000.00" }, { name: "Star Radler", price: "₦1,750.00" },
      { name: "Tiger Beer", price: "₦1,750.00" }, { name: "Smirnoff Ice (Big)", price: "₦3,000.00" },
      { name: "Guiness Stout (Big)", price: "₦3,000.00" }, { name: "Gulder", price: "₦1,850.00" },
      { name: "Life Beer", price: "₦1,750.00" }, { name: "Guiness Stout (Small)", price: "₦1,500.00" },
      { name: "Smirnoff Ice (Small)", price: "₦1,500.00" }, { name: "Medium Heineken", price: "₦2,000.00" },
      { name: "Castle Lite", price: "₦1,750.00" }
    ]},
    { category: "Bitters & Energy Drinks", items: [
      { name: "Orijin Bitters", price: "₦3,500.00" }, { name: "Odogwu Bitters", price: "₦3,500.00" },
      { name: "Roja Bitters", price: "₦3,000.00" }, { name: "Red Bull", price: "₦3,500.00" },
      { name: "Power Horse", price: "₦3,000.00" }, { name: "Climax", price: "₦3,000.00" },
      { name: "Lucozade Boost", price: "₦3,000.00" }, { name: "Zagg", price: "₦2,500.00" },
      { name: "Kabisa Party", price: "₦3,500.00" }, { name: "Kabisa Paradise", price: "₦3,500.00" }
    ]},
    { category: "Soft Drinks, Juice & Water", items: [
      { name: "Malta Guiness (Can)", price: "₦1,500.00" }, { name: "Maltina", price: "₦1,500.00" },
      { name: "Amstel", price: "₦1,500.00" }, { name: "Fanta / Coca-Cola / Sprite", price: "₦1,000.00" },
      { name: "Soda / Tonic / Bitter Lemon", price: "₦1,200.00" }, { name: "Fayrouz", price: "₦1,500.00" },
      { name: "Cranberry Flavoured", price: "₦2,000.00" }, { name: "Orange / Apple / Chi Exotic", price: "₦5,000.00" },
      { name: "Cranberry Juice", price: "₦10,000.00" }, { name: "Eva / Aquafina / Nestle Water", price: "₦700.00" },
      { name: "Hollandia / Peak-Yo Yoghurt", price: "₦5,000.00" }, { name: "Fresh-Yo", price: "₦4,000.00" },
      { name: "Vita Milk", price: "₦4,500.00" }
    ]},
    { category: "Cocktails & Shooters", items: [
      { name: "Long Island Ice Tea", price: "₦10,000.00" }, { name: "Lastman Standing / African Zombies / Bob Marley", price: "₦9,500.00" },
      { name: "Mojito", price: "₦8,500.00" }, { name: "Mother Fucker", price: "₦8,250.00" },
      { name: "Blue Lagoon / Margarita", price: "₦8,000.00" }, { name: "Fleming Lamborghini / Screaming Orgasm / Sex on the Beach", price: "₦7,850.00" },
      { name: "Between De Sheets / Take Me Up", price: "₦7,500.00" }, { name: "Kamikaze / Blue Tiffany's Angel / Black Russian / Cosmopolitan", price: "₦7,000.00" },
      { name: "Orgasm / Trance / Whisky Sour / Daiquiri", price: "₦6,500.00" }, { name: "B52 / Blow Job / Jagar Bomb", price: "₦4,750.00" }
    ]},
    { category: "Mocktails", items: [
      { name: "Virgin-Colada / Virgin Mojito", price: "₦7,500.00" }, { name: "Milk-Shake / Smoothie", price: "₦8,000.00" },
      { name: "Fruit Punch / Virgin Daiquiri", price: "₦7,500.00" }, { name: "Tropical Tropicana", price: "₦7,000.00" },
      { name: "Fruit-Fruit", price: "₦6,650.00" }, { name: "Road Runner", price: "₦5,500.00" }, { name: "Chapman", price: "₦5,000.00" }
    ]}
  ],
  kitchen: [
    { category: "Breakfast", items: [
      { name: "Full Breakfast", price: "₦15,000.00" }, { name: "Boil/Fried Yam & Egg Sauce", price: "₦9,000.00" },
      { name: "French Fries with Egg Sauce", price: "₦9,000.00" }, { name: "Fried Plantain with Egg Sauce", price: "₦9,000.00" },
      { name: "Spring Roll and Samosa", price: "₦7,500.00" }, { name: "Sausage with Egg Sauce", price: "₦6,500.00" },
      { name: "Coffee Tea", price: "₦3,000.00" }, { name: "Tea", price: "₦2,500.00" }
    ]},
    { category: "Sandwiches & Burgers", items: [
      { name: "Minute Steak", price: "₦15,000.00" }, { name: "Beef Kebab", price: "₦15,000.00" },
      { name: "Chicken Kebab", price: "₦14,000.00" }, { name: "Kafta", price: "₦13,000.00" },
      { name: "Chicken or Beef Burrito", price: "₦10,500.00" }, { name: "Club Sandwich / Chicken Satay / Peri-Peri Kebab", price: "₦10,000.00" },
      { name: "Chicken Burger", price: "₦9,500.00" }, { name: "Beef Burger", price: "₦9,000.00" },
      { name: "Beef Shawarma", price: "₦8,000.00" }, { name: "Philly Cheesesteak", price: "₦7,350.00" },
      { name: "Fleming Cheese Chicken Burger", price: "₦7,000.00" }, { name: "Chicken Shawarma", price: "₦7,000.00" }
    ]},
    { category: "Salads", items: [
      { name: "Prawn Salad", price: "₦20,000.00" }, { name: "Green Salad / Pasta and Tuna Salad", price: "₦15,000.00" },
      { name: "Chicken Sizzler Salad", price: "₦14,000.00" }, { name: "Greek Salad", price: "₦13,500.00" },
      { name: "Avocado Salad / Beef Salad", price: "₦10,000.00" }, { name: "Pasta Salad", price: "₦9,500.00" },
      { name: "Vegetable Salad", price: "₦9,000.00" }, { name: "Apple & Potato Salad", price: "₦7,500.00" },
      { name: "Cucumber Boat Salad", price: "₦5,750.00" }
    ]},
    { category: "Platters", items: [
      { name: "Alfa Seafood Platter", price: "₦150,000.00" }, { name: "Jag's Family Platter", price: "₦100,000.00" },
      { name: "Therapy Meat Platter", price: "₦100,000.00" }, { name: "Therapy Combo", price: "₦100,000.00" },
      { name: "Full Goat-Lap Platter with Steam Veggies & Gravy", price: "₦65,000.00" }
    ]},
    { category: "Starters / Appetizers", items: [
      { name: "Full Guinea Fowl Chicken", price: "₦25,000.00" }, { name: "Full Chicken Vegetables with Side", price: "₦24,500.00" },
      { name: "Jag's Jumbo Snail with Chips", price: "₦16,500.00" }, { name: "Chicken Nuggets / Fingers", price: "₦14,000.00" },
      { name: "Goat Meat & Chips or Yam", price: "₦13,000.00" }, { name: "Turkey & Chips or Yam", price: "₦12,700.00" },
      { name: "Pepper Snail with Chips or Yam", price: "₦12,500.00" }, { name: "Chicken / Gizzard / Wings & Chips", price: "₦12,500.00" },
      { name: "Asun & Chips or Yam", price: "₦11,500.00" }, { name: "Pepper Snail Appetizer", price: "₦9,000.00" },
      { name: "Pepper Goat Meat", price: "₦8,500.00" }, { name: "Pepper Beef / Turkey / Assorted", price: "₦8,000.00" },
      { name: "Chicken Lollipop / Pepper Gizzard / Pepper Chicken", price: "₦7,500.00" }
    ]},
    { category: "Soups & Native", items: [
      { name: "Seafood Okra / Veg / Afan / Eforiro", price: "₦35,000.00" }, { name: "Fisherman Soup", price: "₦35,000.00" },
      { name: "Catfish Pepper Soup (with side)", price: "₦30,000.00" }, { name: "Croaker Fish Pepper Soup (with side)", price: "₦25,000.00" },
      { name: "Afan / White / Banga / Oha Soup", price: "₦18,000.00" }, { name: "Ogbono Soup", price: "₦17,500.00" },
      { name: "Isi'Ewu", price: "₦17,000.00" }, { name: "Edikang Ikong Soup", price: "₦16,500.00" },
      { name: "Vegetable / Okra / Egusi Soup", price: "₦16,000.00" }, { name: "Special Dried Fish Veg (with side)", price: "₦14,500.00" },
      { name: "Nkwobi", price: "₦14,000.00" }, { name: "Goat Meat Pepper Soup", price: "₦13,500.00" },
      { name: "Abacha", price: "₦13,000.00" }, { name: "Chicken / Turkey / Assorted Pepper Soup", price: "₦12,500.00" }
    ]},
    { category: "Grilled & Suya", items: [
      { name: "BBQ Grill Catfish / Croaker Fish (with side)", price: "₦30,000.00" }, { name: "Full BBQ Grill Chicken (with side)", price: "₦20,000.00" },
      { name: "Grill Titus Fish with Side", price: "₦11,500.00" }, { name: "Ram / Beef / Tozo / Kidney / Liver / Shaki Suya / Kilishi", price: "₦3,500.00" },
      { name: "Chicken Suya", price: "₦3,000.00" }
    ]},
    { category: "Rice & Pasta", items: [
      { name: "Pineapple Seafood Rice", price: "₦37,000.00" }, { name: "Seafood Rice", price: "₦34,000.00" },
      { name: "Seafood Singapore Noodles", price: "₦33,500.00" }, { name: "Oriental Rice / Chinese Rice", price: "₦30,000.00" },
      { name: "Jambalaya Rice", price: "₦28,000.00" }, { name: "Pasta Alfredo / Normal Singapore Noodles", price: "₦18,000.00" },
      { name: "Ofada Rice / Basmatic Rice (with meat)", price: "₦17,000.00" }, { name: "Native Rice (with meat)", price: "₦16,500.00" },
      { name: "Spaghetti Bolognese", price: "₦15,000.00" }, { name: "Coconut Rice (with meat)", price: "₦15,000.00" },
      { name: "Jollof / Fried / White Rice (with meat)", price: "₦14,500.00" }, { name: "Stir Fry Spaghetti / Jollof Spaghetti", price: "₦14,000.00" },
      { name: "Spaghetti with Vegies", price: "₦10,000.00" }
    ]},
    { category: "Extras", items: [
      { name: "Extra Croaker Fish", price: "₦7,500.00" }, { name: "Extra Jollof Rice", price: "₦6,000.00" },
      { name: "Extra Spaghetti / Basmatic / Coconut / Semo / Poundo / Wheat", price: "₦5,000.00" }, { name: "Extra White Rice / Eba / Roasted Plantain", price: "₦4,000.00" },
      { name: "Extra Plantain / Yam", price: "₦3,500.00" }, { name: "Extra Chips / Salad", price: "₦3,000.00" },
      { name: "Extra Sausage", price: "₦700.00" }
    ]}
  ],
  sports: [
    { category: "Sports & Games", items: [
      { name: "Female Swimming Trunk", price: "₦7,000.00" }, { name: "Male Swimming Trunk", price: "₦5,000.00" },
      { name: "Swimming Adult", price: "₦3,000.00" }, { name: "Swimming Children", price: "₦2,500.00" },
      { name: "Snooker Big Board", price: "₦2,000.00" }, { name: "Snooker Small Board / Table Tennis", price: "₦1,000.00" }
    ]}
  ]
};

export default function Menu() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [isOpposing, setIsOpposing] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // NEW: Search State
  const [searchQuery, setSearchQuery] = useState("");

  // Dynamic Navbar Logic
  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY ? "down" : "up";
    
    if (direction === "up" && latest > 150) {
      setIsOpposing(true);
      setIsVisible(true);
    } else if (direction === "down" && latest > 150) {
      setIsVisible(false);
      setIsMobileMenuOpen(false);
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
    setIsMobileMenuOpen(false);
  };

  // NEW: Search Filter Logic
  const filterSection = (categories: {category: string, items: {name: string, price: string}[]}[]) => {
    if (!searchQuery) return categories;
    
    const lowerQuery = searchQuery.toLowerCase();
    
    return categories.map(cat => {
      // If the category name matches, show all items inside it
      const matchesCategory = cat.category.toLowerCase().includes(lowerQuery);
      
      // Otherwise, filter items by name
      const filteredItems = cat.items.filter(item => 
        item.name.toLowerCase().includes(lowerQuery)
      );

      return {
        ...cat,
        items: matchesCategory ? cat.items : filteredItems
      };
    }).filter(cat => cat.items.length > 0); // Only keep categories that have items left
  };

  const filteredCellar = filterSection(rawMenuData.cellar);
  const filteredKitchen = filterSection(rawMenuData.kitchen);
  const filteredSports = filterSection(rawMenuData.sports);

  return (
    <div className="min-h-screen bg-[#0E0F10] text-[#EAEAEA]" style={{ fontFamily: "'Poppins', sans-serif" }}>
      
      {/* DYNAMIC NAVBAR */}
      <motion.nav
        animate={{ y: isVisible ? 0 : -100 }}
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 flex flex-col ${
          isOpposing ? "bg-[#F4EFE6] shadow-xl" : "bg-[#0E0F10]/90 backdrop-blur-sm"
        }`}
      >
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
          
          <div className="hidden md:flex gap-8">
            {['Cellar', 'Kitchen', 'Games'].map((tab) => (
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
                {['Cellar', 'Kitchen', 'Games'].map((tab) => (
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

      {/* HEADER & SEARCH BAR */}
      <header className="pt-40 pb-16 text-center px-4 max-w-3xl mx-auto">
        
        <h1 
          className="text-5xl md:text-7xl mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          The Selection
        </h1>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block h-1 w-24 bg-gradient-to-r from-[#2ECC71] via-[#F1C40F] to-[#E74C3C] mb-8"
        />
        <p className="tracking-[0.5em] uppercase text-gray-500 text-sm mb-12">Rhythm & Reset</p>

        {/* SEARCH INPUT */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            placeholder="Search for Whisky, Seafood, Cocktails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#16181A] border border-white/10 text-white placeholder-gray-500 rounded-full py-4 pl-12 pr-6 focus:outline-none focus:border-[#2ECC71] transition-colors shadow-lg"
          />
        </div>
      </header>

      {/* MENU CONTENT */}
      <main className="max-w-7xl mx-auto px-6 pb-40 space-y-32">
        
        {/* THE CELLAR SECTION */}
        {filteredCellar.length > 0 && (
          <section id="cellar" className="space-y-16 pt-10">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <Wine className="text-[#2ECC71]" size={36} />
              <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                The Cellar
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
              {filteredCellar.map((cat, i) => (
                <div key={i} className="space-y-6">
                  <h3 className="text-[#F1C40F] uppercase tracking-widest text-sm font-bold border-b border-white/10 pb-2">
                    {cat.category}
                  </h3>
                  <div className="space-y-5">
                    {cat.items.map((item, j) => (
                      <div key={j} className="flex justify-between items-end group">
                        <div className="flex-1 border-b border-dotted border-white/20 pb-1 group-hover:border-[#2ECC71] transition-colors pr-2">
                          <span className="text-sm md:text-base text-gray-200">{item.name}</span>
                        </div>
                        <span className="font-bold text-[#2ECC71] text-sm whitespace-nowrap">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* THE KITCHEN SECTION */}
        {filteredKitchen.length > 0 && (
          <section id="kitchen" className="space-y-16 pt-10">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <Utensils className="text-[#2ECC71]" size={36} />
              <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                The Kitchen
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredKitchen.map((cat, i) => (
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
        )}

        {/* SPORTS & GAMES SECTION */}
        {filteredSports.length > 0 && (
          <section id="games" className="space-y-16 pt-10">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <Dumbbell className="text-[#2ECC71]" size={36} />
              <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                Sports & Games
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredSports.map((cat, i) => (
                <div key={i} className="bg-[#16181A] p-8 rounded-2xl border border-white/5 shadow-xl">
                    <h3 className="text-xl mb-6 text-[#F1C40F] tracking-wider uppercase text-center md:text-left font-semibold">
                      {cat.category}
                    </h3>
                    <div className="space-y-4">
                      {cat.items.map((item, j) => (
                        <div key={j} className="flex justify-between items-end gap-4 border-b border-white/5 pb-3">
                          <span className="text-gray-300 text-sm">{item.name}</span>
                          <span className="text-[#2ECC71] font-bold text-sm whitespace-nowrap">{item.price}</span>
                        </div>
                      ))}
                    </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* NO RESULTS MESSAGE */}
        {filteredCellar.length === 0 && filteredKitchen.length === 0 && filteredSports.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">No items found matching "{searchQuery}"</p>
          </div>
        )}

      </main>

      {/* FOOTER CTA */}
      <div className="bg-[#050505] py-20 text-center border-t border-white/5">
        <p className="text-gray-500 mb-6 text-md">Note: Prices are subject to change without notice.</p>
        
      </div>
    </div>
  );
}