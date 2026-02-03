
import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { motion } from 'framer-motion';

const Shop: React.FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-oswald uppercase tracking-tighter mb-4">Digital Store</h1>
        <p className="text-zinc-500 uppercase tracking-widest text-sm">Exclusive high-resolution assets and licenses.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="group"
          >
            <Link to={`/product/${product.id}`}>
              <div className="aspect-[3/4] overflow-hidden bg-zinc-900 mb-6">
                <img
                  src={product.image}
                  alt={product.title[lang]}
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <h2 className="text-xl font-oswald uppercase tracking-widest font-bold mb-2">
                {product.title[lang]}
              </h2>
              <p className="text-zinc-500 text-sm mb-4">
                {lang === 'en' ? 'Starting at $10.00' : 'От 750 ₽'}
              </p>
              <button className="w-full border border-white/20 py-3 uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-black transition-all">
                {t.common.readMore}
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
