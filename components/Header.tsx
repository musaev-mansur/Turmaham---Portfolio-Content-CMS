
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { Menu, X, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentLogo, setCurrentLogo] = useState(0);
  const location = useLocation();
  const t = translations[lang];
  
  const logos = ['/img/logo-white.png', '/img/logo-open.png'];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogo((prev) => (prev + 1) % logos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [logos.length]);

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.films, path: '/films' },
    { name: t.nav.projects, path: '/projects' },
    { name: t.nav.works, path: '/works' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
      scrolled ? 'bg-black/90 py-3 backdrop-blur-md border-b border-white/5' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-screen-2xl mx-auto px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img
            src={logos[currentLogo]}
            alt="TSUGI"
            className="h-8 md:h-10 object-contain"
          />
        </Link>

        <nav className="hidden lg:flex space-x-10 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[11px] uppercase tracking-[0.3em] font-bold transition-all hover:text-white ${
                location.pathname === link.path ? 'text-white' : 'text-zinc-500'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-8">
          <button
            onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}
            className="text-[10px] font-black tracking-widest uppercase px-3 py-1.5 border border-white/10 hover:border-white transition-all"
          >
            {lang === 'en' ? 'EN' : 'RU'}
          </button>
          
          <Link to="/admin" className="text-zinc-500 hover:text-white transition-colors">
            <Settings size={18} />
          </Link>

          <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 h-screen bg-black z-[100] flex flex-col p-12"
          >
            <div className="flex justify-between items-center mb-20">
              <span className="text-2xl font-oswald font-bold tracking-tighter">TSUGI</span>
              <button onClick={() => setIsOpen(false)}><X size={32} /></button>
            </div>
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl uppercase tracking-tighter font-oswald font-bold hover:translate-x-4 transition-transform"
                >
                  {link.name}
                </Link>
              ))}
              {/* <Link to="/admin" onClick={() => setIsOpen(false)} className="text-xl text-zinc-500 font-oswald uppercase pt-10">Admin Dashboard</Link> */}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
