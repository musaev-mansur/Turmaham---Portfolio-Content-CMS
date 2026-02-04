import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blocksAPI } from '../utils/api';
import { blocksToItems } from '../utils/dataTransform';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const Films: React.FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang];
  const navigate = useNavigate();
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setError(null);
      try {
        const raw = await blocksAPI.getBySection('films');
        setBlocks(blocksToItems(raw, lang));
      } catch (e) {
        console.error('Error loading films:', e);
        setError(t.common.loadError);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [lang]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-6xl font-oswald uppercase tracking-tighter mb-16 text-center">{t.nav.films}</h1>
        <p className="text-center text-zinc-500">{t.common.loading}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-6xl font-oswald uppercase tracking-tighter mb-16 text-center">{t.nav.films}</h1>
        <p className="text-center text-red-400/80">{error}</p>
      </div>
    );
  }

  if (blocks.length === 0) {
    return (
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-6xl font-oswald uppercase tracking-tighter mb-16 text-center">{t.nav.films}</h1>
        <p className="text-center text-zinc-500 uppercase tracking-widest text-sm">
          {t.common.noContent}
        </p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <h1 className="text-6xl font-oswald uppercase tracking-tighter mb-16 text-center">{t.nav.films}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blocks.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => navigate(`/films/${item.id}`)}
            className="cursor-pointer group"
          >
            <div className="aspect-[4/5] bg-zinc-900 relative overflow-hidden border border-white/5 group-hover:border-white/20 transition-all">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title[lang]}
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-600 text-sm uppercase tracking-widest" />
              )}
              <div className="absolute inset-x-0 bottom-0 pt-16 pb-4 px-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <h3 className="text-lg font-oswald uppercase tracking-widest font-bold text-white whitespace-pre-wrap line-clamp-2">
                  {item.title[lang] || '—'}
                </h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Films;
