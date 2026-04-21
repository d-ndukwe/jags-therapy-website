import { motion } from "motion/react"

export function Footer() {
  return (
    <footer
      className="py-12 px-4 md:px-12 lg:px-24 border-t bg-transparent"
      style={{ backgroundColor: "#0E0F10", borderColor: "#16181A" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Text */}
          <div className="text-center md:text-left">
           <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="text-2xl md:text-3xl font-bold text-[#7ff320]"
        >
          JAG'S <span className="opacity-70 text-amber-300">THERAPY</span>
        </motion.h2>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-3">
            <svg width="60" height="20" viewBox="0 0 60 20">
              <defs>
                <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: "#2ECC71", stopOpacity: 0.7 }} />
                  <stop offset="50%" style={{ stopColor: "#F1C40F", stopOpacity: 0.7 }} />
                  <stop offset="100%" style={{ stopColor: "#E74C3C", stopOpacity: 0.7 }} />
                </linearGradient>
              </defs>
              <path
                d="M 5 10 L 10 3 L 13 17 L 16 2 L 19 18 L 22 5 L 25 15 L 28 8 L 31 10 L 34 6 L 37 13 L 40 5 L 43 17 L 46 3 L 49 15 L 52 8 L 55 10"
                stroke="url(#footerGradient)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className="text-sm"
              style={{ fontFamily: "'Poppins', sans-serif", color: "#EAEAEA", opacity: 0.7 }}
            >
              📍 Gbogije-Ibeju
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8">
          <p
            className="text-xs"
            style={{ fontFamily: "'Poppins', sans-serif", color: "#EAEAEA", opacity: 0.5 }}
          >
            © 2026 Jag's Therapy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
