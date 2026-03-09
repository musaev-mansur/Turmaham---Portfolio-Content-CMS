
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const Home: React.FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang];
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const brandName = "TSUGI";

  return (
    <main className="relative h-[150vh] w-full bg-black overflow-x-hidden">
      {/* Sticky Hero Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black z-10" />
          <img
            src="/img/slide.jpg"
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Content */}
        <motion.div style={{ opacity }} className="relative z-20 text-center px-6">
          <div className="flex justify-center space-x-1 mb-4 overflow-hidden">
            {brandName.split("").map((letter, idx) => (
              <motion.span
                key={idx}
                initial={{ y: 200 }}
                animate={{ y: 0 }}
                transition={{ 
                  duration: 1.5, 
                  delay: idx * 0.05, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="text-7xl md:text-[12rem] font-oswald font-black tracking-tighter leading-none"
              >
                {letter}
              </motion.span>
            ))}
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="text-zinc-400 font-oswald tracking-[0.5em] text-[10px] md:text-sm mb-12 max-w-xl mx-auto uppercase"
          >
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <button
              type="button"
              onClick={() => document.getElementById('the-unseen')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative inline-block px-12 py-5 border border-white/20 text-white uppercase font-bold tracking-widest overflow-hidden"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-500">{t.home.cta}</span>
              <motion.div 
                className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]"
              />
            </button>
          </motion.div>
        </motion.div>

        {/* Bottom Decoration */}
        <div className="absolute bottom-10 left-10 hidden md:block">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 2 }}
            className="flex space-x-4 items-center"
          >
            <span className="w-12 h-[1px] bg-white/30" />
            <span className="text-[10px] tracking-widest font-bold uppercase text-white/50">Digital Cinema Collective</span>
          </motion.div>
        </div>
      </div>

      {/* The Unseen — bio + photo */}
      <div id="the-unseen" className="relative z-30 min-h-screen bg-black flex items-center py-24 px-6">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-6 text-zinc-400 text-base md:text-lg leading-relaxed">
            <p>{t.home.bio1}</p>
            <p>{t.home.bio2}</p>
            <p>{t.home.bio3}</p>
            <p>{t.home.bio4}</p>
          </div>
          <div className="aspect-[4/5] bg-zinc-900/50 border border-white/10 min-h-[400px] md:min-h-0">         
             {/* Placeholder for photo card */}
             <img src="/img/avatar.png" alt="Photo" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
