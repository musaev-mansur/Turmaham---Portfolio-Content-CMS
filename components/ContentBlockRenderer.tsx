import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../types';

interface ContentBlock {
  id: string;
  type: string;
  order: number;
  data: any;
}

interface Props {
  blocks: ContentBlock[];
  lang: Language;
}

const ContentBlockRenderer: React.FC<Props> = ({ blocks, lang }) => {
  if (!blocks || blocks.length === 0) return null;

  const renderBlock = (block: ContentBlock, index: number) => {
    const data = typeof block.data === 'string' ? JSON.parse(block.data) : block.data;

    switch (block.type) {
      case 'image':
        return (
          <motion.div
            key={block.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-12"
          >
            <div className="aspect-video w-full bg-zinc-900 overflow-hidden border border-white/5">
              <img
                src={data.url}
                alt={data.alt || ''}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {data.caption && (
              <p className="text-zinc-500 text-sm mt-4 text-center italic">{data.caption}</p>
            )}
          </motion.div>
        );

      case 'text':
        return (
          <motion.div
            key={block.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-12"
          >
            <p className="text-zinc-400 leading-relaxed text-lg whitespace-pre-wrap">
              {lang === 'ru' ? data.textRus : data.textEng}
            </p>
          </motion.div>
        );

      case 'youtube':
        return (
          <motion.div
            key={block.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-12"
          >
            <div className="aspect-video w-full bg-black">
              <iframe
                src={data.url}
                className="w-full h-full"
                allow="autoplay; fullscreen"
                title={data.title || 'Video'}
              />
            </div>
            {data.title && (
              <p className="text-zinc-500 text-sm mt-4 text-center">{data.title}</p>
            )}
          </motion.div>
        );

      case 'gallery':
        return (
          <motion.div
            key={block.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Array.isArray(data.images) && data.images.map((img: string, imgIndex: number) => (
                <div key={imgIndex} className="aspect-square bg-zinc-900 overflow-hidden border border-white/5">
                  <img
                    src={img}
                    alt={`Gallery image ${imgIndex + 1}`}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mt-12">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
};

export default ContentBlockRenderer;



