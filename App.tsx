
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import Films from './pages/Films';
import FilmDetail from './pages/FilmDetail';
import Projects from './pages/Projects';
import Works from './pages/Works';
import Admin from './pages/Admin';
import { AnimatePresence, motion } from 'framer-motion';

const MOBILE_BREAKPOINT = 768;

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  );
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);
  return isMobile;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppRoutes = () => {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col relative">
      {!isAdmin && !isMobile && <CustomCursor />}
      <Header />
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/films" element={<Films />} />
              <Route path="/films/:id" element={<FilmDetail />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/works" element={<Works />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <AppRoutes />
      </Router>
    </LanguageProvider>
  );
};

export default App;
