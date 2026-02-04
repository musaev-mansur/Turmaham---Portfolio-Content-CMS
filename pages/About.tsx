
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const About: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid lg:grid-cols-2 gap-20 items-center mb-32"
      >
        <div>
          <h2 className="text-5xl font-oswald uppercase tracking-widest font-bold mb-8">
            {lang === 'en' ? 'The Vision' : 'Видение'}
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-6">
            {lang === 'en' 
              ? 'Tsugi is more than a name; it is a philosophy of light. Founded in 2018, we have dedicated ourselves to capturing the fleeting moments of existence through high-contrast photography and cinematic motion.'
              : 'Tsugi — это не просто имя, это философия света. Основанная в 2018 году, наша студия посвятила себя фиксации мимолетных мгновений бытия через высококонтрастную фотографию и кинематографичное движение.'}
          </p>
          <p className="text-zinc-400 text-lg leading-relaxed">
            {lang === 'en'
              ? 'Our work bridges the gap between commercial perfection and raw, emotional storytelling. Every frame is curated with obsessive attention to detail.'
              : 'Наши работы стирают границы между коммерческим совершенством и искренним эмоциональным повествованием. Каждый кадр создается с одержимым вниманием к деталям.'}
          </p>
        </div>
        <div className="aspect-[4/5] bg-zinc-900 overflow-hidden">
          <img
            src="https://picsum.photos/id/105/800/1000"
            alt="Vision"
            className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid lg:grid-cols-2 gap-20 items-center"
      >
        <div className="order-2 lg:order-1 aspect-[16/9] bg-zinc-900 overflow-hidden">
          <img
            src="https://picsum.photos/id/106/1200/800"
            alt="Process"
            className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000"
          />
        </div>
        <div className="order-1 lg:order-2">
          <h2 className="text-5xl font-oswald uppercase tracking-widest font-bold mb-8">
            {lang === 'en' ? 'The Process' : 'Процесс'}
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-6">
            {lang === 'en'
              ? 'We operate at the intersection of technology and art. Utilizing the latest RED digital cinema cameras and Leica optics, we ensure that digital products retain a soul.'
              : 'Мы работаем на пересечении технологий и искусства. Используя новейшие цифровые кинокамеры RED и оптику Leica, мы гарантируем, что у цифровых продуктов остается душа.'}
          </p>
          <div className="space-y-4 pt-6">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="font-bold uppercase tracking-widest">Aesthetics</span>
              <span className="text-zinc-500">Minimalism / Dark</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="font-bold uppercase tracking-widest">Gear</span>
              <span className="text-zinc-500">RED V-Raptor / Leica M</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="font-bold uppercase tracking-widest">Location</span>
              <span className="text-zinc-500">Worldwide</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
