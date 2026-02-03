
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const Footer: React.FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <footer className="border-t border-white/10 py-12 px-6 bg-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        <div className="text-xl font-oswald font-bold tracking-tighter">
          TURMAHAM
        </div>
        
        <div className="flex space-x-8 text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500">
          <Link to="/admin" className="hover:text-white transition-colors">Admin Access</Link>
          <span className="cursor-default">© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
        </div>

        <div className="flex space-x-6 items-center">
          <span className="w-8 h-[1px] bg-white/20" />
          <span className="text-[10px] uppercase tracking-widest text-zinc-500">Curated in Berlin</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
