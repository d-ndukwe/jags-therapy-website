import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const highlights = [
  { name: "Signature Grilled Croaker", price: "₦30,000", desc: "" },
  { name: "Therapy Combo", price: "₦80,000", desc: "" },
  { name: "Bob Marley Cocktail", price: "₦8,000", desc: "" }
];

export function LoungeSection() {

  const navigate = useNavigate();


  return (
    <section className="relative z-20 py-16 px-4 md:px-12 lg:px-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Atmosphere & Vibes */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2
            className="text-5xl md:text-6xl mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: "#EAEAEA" }}
          >
            The Lounge
            <div
            className="h-1 w-32 mx-auto rounded-full mt-4 ml-6"
            style={{
              background: "linear-gradient(to right, #2ECC71, #F1C40F, #E74C3C)",
            }}
          />
          </h2>
          
          <p className="font-body text-gray-400 text-xl leading-relaxed">
            We're here to help you experience the perfect blend of enegy and calm.
            Whether you're here for the food or the therapy, we reset your mind.
          </p>
          
          <div className="pt-4">
            <button 
            onClick={() => navigate("/menu")}
            className="px-8 py-4 border border-[#2ECC71] text-[#2ECC71] font-bold rounded-full hover:bg-[#2ECC71] hover:text-black transition-all duration-300">
              Explore Full Menu
            </button>
          </div>
        </motion.div>

        {/* Right: Menu Highlights Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#0E0F10] p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl"
        >
          <h3 className="text-2xl font-heading mb-8 text-[#F1C40F] tracking-widest uppercase">
            Tonight's Highlights
          </h3>
          <div className="space-y-8">
            {highlights.map((item, i) => (
              <div key={i} className="flex justify-between items-start gap-4 border-b border-white/5 pb-4">
                <div className="flex-1">
                  <h4 className="text-xl font-body text-white">{item.name}</h4>
                  <p className="text-sm text-gray-500 italic mt-1">{item.desc}</p>
                </div>
                <span className="text-[#2ECC71] font-bold font-body whitespace-nowrap">{item.price}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}