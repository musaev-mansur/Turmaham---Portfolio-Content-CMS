import React from 'react';
import { Language } from '../types';
import { FlexibleField } from '../utils/api';
import { toEmbedUrl } from '../utils/youtube';

interface Props {
  fields: FlexibleField[];
  lang: Language;
  className?: string;
}

const FlexibleFieldsRenderer: React.FC<Props> = ({ fields, lang, className = '' }) => {
  if (!fields || fields.length === 0) return null;

  return (
    <div className={`space-y-8 ${className}`}>
      {fields.map((field, idx) => {
        const value = field.value?.trim();
        if (!value) return null;

        switch (field.type) {
          case 'titleEn':
            if (lang !== 'en') return null;
            return (
              <h1 key={idx} className="text-5xl font-oswald uppercase tracking-widest font-bold whitespace-pre-wrap">
                {value}
              </h1>
            );
          case 'titleRu':
            if (lang !== 'ru') return null;
            return (
              <h1 key={idx} className="text-5xl font-oswald uppercase tracking-widest font-bold whitespace-pre-wrap">
                {value}
              </h1>
            );
          case 'descEn':
            if (lang !== 'en') return null;
            return (
              <p key={idx} className="text-zinc-400 leading-relaxed text-lg whitespace-pre-wrap">
                {value}
              </p>
            );
          case 'descRu':
            if (lang !== 'ru') return null;
            return (
              <p key={idx} className="text-zinc-400 leading-relaxed text-lg whitespace-pre-wrap">
                {value}
              </p>
            );
          case 'imageEn': {
            const showEn = lang === 'en' || !fields.some((f) => f.type === 'imageRu' && f.value?.trim());
            if (!showEn) return null;
            return (
              <div key={idx} className="aspect-video w-full bg-zinc-900 overflow-hidden border border-white/5">
                <img
                  src={value}
                  alt=""
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            );
          }
          case 'imageRu': {
            const showRu = lang === 'ru' || !fields.some((f) => f.type === 'imageEn' && f.value?.trim());
            if (!showRu) return null;
            return (
              <div key={idx} className="aspect-video w-full bg-zinc-900 overflow-hidden border border-white/5">
                <img
                  src={value}
                  alt=""
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            );
          }
          case 'youtube': {
            const embed = toEmbedUrl(value);
            if (!embed) return null;
            return (
              <div key={idx} className="aspect-video w-full bg-black">
                <iframe
                  src={embed}
                  className="w-full h-full"
                  allow="autoplay; fullscreen"
                  title="Video"
                />
              </div>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
};

export default FlexibleFieldsRenderer;
