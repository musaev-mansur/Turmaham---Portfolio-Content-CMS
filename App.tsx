
import React, { useEffect } from 'react';
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

  return (
    <div className="min-h-screen flex flex-col relative">
      {!isAdmin && <CustomCursor />}
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
