import { motion } from 'motion/react';

const mediaItems = [
  {
    id: 1,
    url: 'https://res.cloudinary.com/dnsi6uiof/image/upload/q_auto/f_auto/v1776721553/jags-grilled-croaker-fish_adxh67.jpg',
    alt: 'Gourmet food plating'
  },
  {
    id: 2,
    url: 'https://res.cloudinary.com/dnsi6uiof/video/upload/q_auto/f_auto/v1776721558/jags-playing-snooker_aovzmu.mp4',
    alt: 'Playing snooker at Jags'
  },
  {
    id: 3,
    url: 'https://res.cloudinary.com/dnsi6uiof/video/upload/q_auto/f_auto/v1776775140/IMG_2332_brcw0t.mp4',
    alt: 'Karaoke night at Jags'
  },
  {
    id: 4,
    url: 'https://res.cloudinary.com/dnsi6uiof/image/upload/q_auto/f_auto/v1776721549/jags-bar-area_w3maow.jpg',
    alt: 'Bar Area with Television at Jags'
  },
  {
    id: 5,
    url: 'https://res.cloudinary.com/dnsi6uiof/video/upload/q_auto/f_auto/v1776721630/jags-flaming-shots_wurgox.mp4',
    alt: 'Flaming Shots at Jags'
  },
  {
    id: 6,
    url: 'https://res.cloudinary.com/dnsi6uiof/image/upload/q_auto/f_auto/v1776775941/jags-cocktail-drink_m5hru4.jpg',
    alt: 'Tropical cocktail at Jags'
  }
];

export function GallerySection() {
  return (
    <section className="relative z-20 py-24 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            className="text-5xl md:text-6xl mb-4 text-[#EAEAEA]" 
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Reset Gallery
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[#2ECC71] via-[#F1C40F] to-[#E74C3C] mx-auto" />
        </div>

        {/* TAILWIND MASONRY MAGIC 
          columns-2: 2 columns on mobile
          md:columns-3: 3 columns on tablets
          lg:columns-4: 4 columns on large screens
          gap-4: spacing between columns
        */}
        <div className="columns-2 md:columns-2 lg:columns-3 gap-4">
          {mediaItems.map((item) => {
            const isVideo = item.url.includes('/video/') || item.url.endsWith('.mp4');

            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                /* break-inside-avoid: Stops images/videos from being sliced in half across columns
                  mb-4: Adds spacing to the bottom of each item
                */
                className="break-inside-avoid mb-4 overflow-hidden rounded-md cursor-pointer block"
              >
                {isVideo ? (
                  <video 
                    src={item.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto object-cover hover:brightness-110 transition-all duration-500 rounded-md"
                  />
                ) : (
                  <img 
                    src={item.url} 
                    alt={item.alt} 
                    className="w-full h-auto object-cover hover:brightness-110 transition-all duration-500 rounded-md" 
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}