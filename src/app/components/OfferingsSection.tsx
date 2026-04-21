import { motion } from "motion/react";
import { useState } from "react";

// Use the standard Jags Dark for this section

interface OfferingCardProps {
  image: string;
  title: string;
  index: number;
}

function OfferingCard({ image, title, index }: OfferingCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative overflow-hidden rounded-xl cursor-pointer group shadow-2xl"
      style={{ aspectRatio: index === 3 ? "16/7" : "1/1" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      {/* Dynamic Overlay: Darker on hover to make text pop */}
      <div
        className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-500"
      />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <h3 className="text-3xl md:text-4xl font-heading text-white mb-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          {title}
        </h3>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          className="h-1 w-20 bg-gradient-to-r from-[#2ECC71] via-[#F1C40F] to-[#E74C3C] origin-left"
        />
      </div>
    </motion.div>
  );
}

export function OfferingsSection() {
  const offerings = [
    { image: "https://res.cloudinary.com/dnsi6uiof/image/upload/q_auto/f_auto/v1776721548/jags-outdoor-grill_ujjejf.jpg", title: "Outdoor Grill" },
    { image: "https://res.cloudinary.com/dnsi6uiof/image/upload/q_auto/f_auto/v1776721559/jags-swimming-pool_bxplvi.jpg", title: "Swimming Pool" },
    { image: "https://res.cloudinary.com/dnsi6uiof/image/upload/q_auto/f_auto/v1776721555/jags-snooker-board_eqrik4.jpg", title: "Snooker Board" },
    { image: "https://res.cloudinary.com/dnsi6uiof/image/upload/q_auto/f_auto/v1776721555/jags-special-seating_xfbzlz.jpg", title: "Cozy Lounge" },
  ];

  return (
    <section className="relative z-30 py-32 px-4 md:px-12 lg:px-24">
      <h2
            className="text-5xl md:text-6xl mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: "#EAEAEA" }}
          >
            What we Offer
            <div
            className="h-1 w-32 mx-auto rounded-full mt-4 mb-16 ml-6"
            style={{
              background: "linear-gradient(to right, #2ECC71, #F1C40F, #E74C3C)",
            }}
          />
          </h2>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offerings.map((item, i) => (
            <div key={i} className={i === 3 ? "md:col-span-2" : ""}>
              <OfferingCard {...item} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}