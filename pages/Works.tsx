import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { blocksAPI } from '../utils/api';
import { blocksToItems } from '../utils/dataTransform';
import { toEmbedUrl } from '../utils/youtube';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { ChevronRight } from 'lucide-react';
import FlexibleFieldsRenderer from '../components/FlexibleFieldsRenderer';

const Works: React.FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang];
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

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
      <div className="space-y-2">
        {items.map((item, idx) => {
          const isOpen = openId === item.id;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="border border-white/10 overflow-hidden bg-zinc-900/50"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center space-x-6 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <motion.div
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight size={24} className="text-zinc-500 group-hover:text-white transition-colors" />
                    </motion.div>
                  </div>
                  <h2 className="text-2xl font-oswald uppercase tracking-widest font-bold whitespace-pre-wrap truncate">
                    {item.title[lang]}
                  </h2>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <div className="w-32 h-20 bg-zinc-800 overflow-hidden border border-white/5">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title[lang]}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-600 text-[10px]">—</div>
                    )}
                  </div>
                </div>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 flex flex-row flex-nowrap items-start gap-8 border-t border-white/10">
                      <div className="flex-shrink basis-[75%] space-y-4 min-w-0">
                        {item.fields && item.fields.length > 0 ? (
                          <FlexibleFieldsRenderer fields={item.fields} lang={lang} className="text-lg" />
                        ) : (
                          <>
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.title[lang]}
                                className="w-full max-h-[60vh] object-cover grayscale hover:grayscale-0 transition-all duration-700 border border-white/5"
                              />
                            )}
                            <h3 className="text-xl font-oswald uppercase tracking-widest font-bold whitespace-pre-wrap">
                              {item.title[lang]}
                            </h3>
                            <p className="text-zinc-400 leading-relaxed text-lg whitespace-pre-wrap">
                              {item.description[lang]}
                            </p>
                            {item.videoUrl && (
                              <div className="aspect-video w-full bg-black border border-white/5">
                                <iframe
                                  src={toEmbedUrl(item.videoUrl)}
                                  className="w-full h-full"
                                  allow="autoplay; fullscreen"
                                  title={item.title[lang]}
                                />
                              </div>
                            )}
                          </>
                        )}
                        <div className="w-20 h-px bg-white/20" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
      )}
    </div>
  );
};

export default Works;
