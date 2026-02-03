
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Mail, MapPin, Twitter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Contact: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-6xl font-oswald uppercase tracking-tighter mb-8">
            {lang === 'en' ? 'Get in Touch' : 'Связаться с нами'}
          </h1>
          <p className="text-zinc-400 text-lg mb-12">
            {lang === 'en' 
              ? 'Whether it is a commercial commission or a fine art inquiry, we are open to collaboration worldwide.' 
              : 'Будь то коммерческий заказ или запрос на художественную съемку, мы открыты к сотрудничеству по всему миру.'}
          </p>

          <div className="space-y-8">
            <div className="flex items-center space-x-6 group">
              <div className="w-12 h-12 border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
                <Mail size={20} />
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-zinc-500">Email</span>
                <span className="text-lg font-bold">studio@turmaham.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-6 group">
              <div className="w-12 h-12 border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
                <MapPin size={20} />
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-zinc-500">Headquarters</span>
                <span className="text-lg font-bold">Friedrichstraße 12, Berlin</span>
              </div>
            </div>
          </div>

          <div className="mt-20 flex space-x-6">
            <a href="#" className="p-4 border border-white/10 hover:border-white transition-all"><Instagram size={24} /></a>
            <a href="#" className="p-4 border border-white/10 hover:border-white transition-all"><Twitter size={24} /></a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-zinc-900 border border-white/10 p-10"
        >
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Name</label>
                <input className="w-full bg-black border border-white/10 p-4 text-white focus:border-white outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Subject</label>
                <input className="w-full bg-black border border-white/10 p-4 text-white focus:border-white outline-none transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Message</label>
              <textarea rows={6} className="w-full bg-black border border-white/10 p-4 text-white focus:border-white outline-none transition-all" />
            </div>
            <button className="w-full bg-white text-black py-5 uppercase tracking-widest font-bold hover:bg-zinc-200 transition-all">
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
