import { motion } from "motion/react";
import { Phone, Instagram, Clock } from "lucide-react"; // Ensure lucide-react is installed

export function ContactSection() {
  return (
    <section
      className="py-32 px-4 md:px-12 lg:px-24 relative z-20"
      style={{ backgroundColor: "#0E0F10" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2
            className="text-5xl md:text-6xl mb-6"
            style={{ fontFamily: "'Playfair Display', serif", color: "#EAEAEA" }}
          >
            Start Your Reset
          </h2>
          <div
            className="h-1 w-24 mx-auto rounded-full"
            style={{
              background: "linear-gradient(to right, #2ECC71, #F1C40F, #E74C3C)",
            }}
          />
        </motion.div>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left - Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <div className="aspect-square bg-[#16181A] flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15858.747514336217!2d3.666667!3d6.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf95c1b6eb063%3A0xc3f8b0e8957dc5b4!2sGbogije%2C%20Lekki!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng" // Placeholder embed link
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "450px", filter: "invert(90%) hue-rotate(180deg) contrast(85%)" }} // Dark mode map trick
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Jag's Therapy Location"
              />
            </div>
            {/* Location Label */}
            <div
              className="absolute bottom-0 left-0 right-0 p-8"
              style={{
                background: "linear-gradient(to top, rgba(14, 15, 16, 1), rgba(14, 15, 16, 0))",
              }}
            >
              <p
                className="text-lg font-bold tracking-wider"
                style={{ fontFamily: "'Poppins', sans-serif", color: "#EAEAEA" }}
              >
                📍 Gbogije-Ibeju, Lagos
              </p>
            </div>
          </motion.div>

          {/* Right - Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center space-y-10 pl-0 md:pl-10"
          >
            <div className="space-y-4">
              <h3 
                className="text-2xl tracking-widest uppercase mb-8"
                style={{ fontFamily: "'Playfair Display', serif", color: "#F1C40F" }}
              >
                Get In Touch
              </h3>
              <p 
                className="text-gray-400 leading-relaxed mb-10 text-lg"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Whether you're looking to book a VIP table, inquire about our event spaces, or just want to confirm tonight's rhythm, we're here for you.
              </p>
            </div>

            <div className="space-y-8">
              {/* Phone 1 */}
              <a 
                href="tel:+2348105933691" // Replace with actual number
                className="flex items-center gap-4 group"
              >
                <div className="p-4 rounded-full bg-[#16181A] border border-white/5 group-hover:border-[#2ECC71] transition-colors">
                  <Phone className="text-[#2ECC71]" size={20} />
                </div>
                <span className="text-md tracking-wider group-hover:text-[#2ECC71] transition-colors" style={{ fontFamily: "'Poppins', sans-serif", color: "#EAEAEA" }}>
                  +234 (0) 810 593 3691
                </span>
              </a>

              {/* Phone 2 */}
              <a 
                href="tel:+2348149258686" // Replace with actual number
                className="flex items-center gap-4 group"
              >
                <div className="p-4 rounded-full bg-[#16181A] border border-white/5 group-hover:border-[#2ECC71] transition-colors">
                  <Phone className="text-[#2ECC71]" size={20} />
                </div>
                <span className="text-md tracking-wider group-hover:text-[#2ECC71] transition-colors" style={{ fontFamily: "'Poppins', sans-serif", color: "#EAEAEA" }}>
                  +234 (0) 814 925 8686
                </span>
              </a>

              {/* Instagram */}
              <a 
                href="https://www.instagram.com/jags_therapy?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" // Replace with actual IG handle
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="p-4 rounded-full bg-[#16181A] border border-white/5 group-hover:border-[#F1C40F] transition-colors">
                  <Instagram className="text-[#F1C40F]" size={20} />
                </div>
                <span className="text-md tracking-wider group-hover:text-[#F1C40F] transition-colors" style={{ fontFamily: "'Poppins', sans-serif", color: "#EAEAEA" }}>
                  @jags_therapy
                </span>
              </a>

              {/* Hours */}
              <div className="flex items-center gap-4 mt-4">
                <div className="p-4 rounded-full bg-[#16181A] border border-white/5">
                  <Clock className="text-[#92e73c]" size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-md tracking-wide" style={{ fontFamily: "'Poppins', sans-serif", color: "#EAEAEA" }}>
                    Monday - Sunday
                    <br />
                    <span className="text-white font-semibold">10:00 AM till dawn</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}