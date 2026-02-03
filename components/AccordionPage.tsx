
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AccordionItem, Language } from '../types';
import { ChevronDown } from 'lucide-react';

interface Props {
  items: AccordionItem[];
  lang: Language;
}

const AccordionPage: React.FC<Props> = ({ items, lang }) => {
  const [openId, setOpenId] = React.useState<string | null>(items[0]?.id || null);

  return (
    <div className="flex flex-col space-y-2 max-w-5xl mx-auto py-12 px-6">
      {items.map((item) => (
        <div key={item.id} className="border border-white/10 overflow-hidden bg-zinc-900/50">
          <button
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
            className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors"
          >
            <h2 className="text-2xl font-oswald uppercase tracking-widest font-bold">
              {item.title[lang]}
            </h2>
            <motion.div
              animate={{ rotate: openId === item.id ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={24} />
            </motion.div>
          </button>
          
          <AnimatePresence initial={false}>
            {openId === item.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
              >
                <div className="p-6 grid md:grid-cols-2 gap-8 items-center border-t border-white/10">
                  <div className="aspect-[3/2] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title[lang]}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div className="space-y-4">
                    <p className="text-zinc-400 leading-relaxed text-lg">
                      {item.content[lang]}
                    </p>
                    <button className="border-b border-white text-white font-bold tracking-widest uppercase py-2 hover:opacity-70 transition-opacity">
                      See Project
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default AccordionPage;
