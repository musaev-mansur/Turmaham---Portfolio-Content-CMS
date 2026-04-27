import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blocksAPI } from '../utils/api';
import { blocksToItems, truncateTitle } from '../utils/dataTransform';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const Works: React.FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang];
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    const load = async () => {
      try {
        const raw = await blocksAPI.getBySection('works');
        setItems(blocksToItems(raw, lang));
      } catch (e) {
        console.error('Error loading works:', e);
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
        <h1 className="text-6xl font-oswald uppercase tracking-tighter mb-16 text-center">{t.nav.works}</h1>
        <p className="text-center text-zinc-500">{t.common.loading}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-6xl font-oswald uppercase tracking-tighter mb-16 text-center">{t.nav.works}</h1>
        <p className="text-center text-red-400/80">{error}</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <h1 className="text-6xl font-oswald uppercase tracking-tighter mb-16 text-center">{t.nav.works}</h1>
      {items.length === 0 ? (
        <p className="text-center text-zinc-500 uppercase tracking-widest text-sm">
          {t.common.noContent}
        </p>
      ) : (
      <div className="space-y-1">
        {items.map((item, idx) => {
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => navigate(`/works/${item.id}`)}
              className="w-full py-4 text-left border-b border-white/10 hover:text-white transition-colors"
            >
              <div className="flex justify-between items-center gap-4">
                <div className="flex items-center space-x-6 flex-1 min-w-0">
                  <div className="min-w-0">
                    <h2 className="text-2xl font-oswald uppercase tracking-widest font-bold whitespace-pre-wrap truncate text-zinc-300">
                      {truncateTitle(item.title[lang], 42)}
                    </h2>
                    {item.author && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/authors/${item.author.id}`);
                        }}
                        className="inline-block mt-1 text-[10px] uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors"
                      >
                        {item.author.name}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-[0.35em] text-zinc-500 whitespace-nowrap">
                  Open
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
      )}
    </div>
  );
};

export default Works;
