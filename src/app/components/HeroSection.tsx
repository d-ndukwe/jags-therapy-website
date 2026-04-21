import { motion, useScroll, useTransform } from "framer-motion";

export function HeroSection() {
  const { scrollY } = useScroll();
  // Gradually darkens the video to solid black as you scroll down
  const darkenOpacity = useTransform(scrollY, [0, 500], [0, 1]);

  return (
    <>
      {/* 1. FIXED VIDEO BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden bg-[#050505]">
        <video
          autoPlay
          loop
          muted
          playsInline // CRITICAL: This allows it to autoplay on iPhones
          className="absolute inset-0 h-full w-full object-cover object-center opacity-40 scale-105"
        >
          {/* Replace with your Cloudinary video link */}
          <source 
            src="https://res.cloudinary.com/dnsi6uiof/video/upload/f_auto,q_auto/v1776721630/jags-flaming-shots_wurgox.mp4" 
            type="video/mp4" 
          />
        </video>
        
        {/* Deep Gradient Overlays to hide the zoomed-in edges of the vertical video */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0E0F10_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E0F10]/80 via-transparent to-[#0E0F10]" />

        {/* Scroll-Fade Overlay */}
        <motion.div 
          style={{ opacity: darkenOpacity }}
          className="absolute inset-0 bg-[#050505] z-10" 
        />
      </div>

      {/* 2. TOP LEFT BRANDING */}
      <nav className="fixed top-0 left-0 w-full z-20 p-8 md:p-12">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="text-2xl md:text-3xl font-bold text-[#EAEAEA]"
        >
          JAG'S <span className="opacity-70">THERAPY</span>
        </motion.h2>
      </nav>

      {/* 3. CENTERPIECE FREQUENCY LINE */}
      <section className="relative z-20 flex h-screen w-full flex-col items-center justify-center px-4">
        <div className="w-full max-w-5xl space-y-12 text-center drop-shadow-2xl">
          <svg viewBox="0 0 200 60" className="w-full h-auto overflow-visible">
            <defs>
              <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2ECC71" />
                <stop offset="50%" stopColor="#F1C40F" />
                <stop offset="100%" stopColor="#E74C3C" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 0 30 L 40 30 L 50 18 L 60 42 L 70 30 L 85 30 L 100 2 L 115 58 L 130 30 L 145 30 L 155 15 L 165 45 L 175 30 L 200 30"
              stroke="url(#heroGradient)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: 1,
                filter: [
                  "drop-shadow(0 0 8px rgba(46, 204, 113, 0.2))", 
                  "drop-shadow(0 0 20px rgba(46, 204, 113, 0.6))", 
                  "drop-shadow(0 0 8px rgba(46, 204, 113, 0.2))"
                ]
              }}
              transition={{ 
                pathLength: { duration: 3, ease: "easeInOut" },
                filter: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2.5 }
              }}
            />
          </svg>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8 }}
            className="space-y-4"
          >
            <p className="text-xl md:text-2xl tracking-[0.4em] uppercase font-light text-[#EAEAEA]">
              Reset your mind
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}