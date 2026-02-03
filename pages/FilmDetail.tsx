import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blocksAPI, parseBlockData } from '../utils/api';
import { toEmbedUrl } from '../utils/youtube';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { ArrowLeft } from 'lucide-react';
import FlexibleFieldsRenderer from '../components/FlexibleFieldsRenderer';

const FilmDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = translations[lang];
  const [block, setBlock] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      try {
        const b = await blocksAPI.getById(id);
        setBlock(b);
      } catch (error) {
        console.error('Error loading block:', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <p className="text-center text-zinc-500">Loading...</p>
      </div>
    );
  }

  if (!block) {
    return (
      <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <p className="text-center text-zinc-500">Not found</p>
      </div>
    );
  }

  const data = parseBlockData(block);
  const hasFlexibleFields = data.fields && Array.isArray(data.fields) && data.fields.length > 0;

  if (hasFlexibleFields) {
    return (
      <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <button
          onClick={() => navigate('/films')}
          className="flex items-center space-x-2 text-zinc-500 hover:text-white transition-colors mb-8 uppercase tracking-widest text-xs font-bold"
        >
          <ArrowLeft size={16} />
          <span>{t.common.back}</span>
        </button>
        <FlexibleFieldsRenderer fields={data.fields as any} lang={lang} />
      </div>
    );
  }

  const title = lang === 'ru' ? (data.titleRus || data.titleEng) : (data.titleEng || data.titleRus);
  const description = lang === 'ru' ? (data.descriptionRus || data.descriptionEng) : (data.descriptionEng || data.descriptionRus);
  const image = lang === 'en' ? (data.imageEng || data.imageRus) : (data.imageRus || data.imageEng);
  const youtube1 = toEmbedUrl(data.youtubeUrl1 || data.youtubeUrl || '');
  const youtube2 = toEmbedUrl(data.youtubeUrl2 || '');

  return (
    <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <button
        onClick={() => navigate('/films')}
        className="flex items-center space-x-2 text-zinc-500 hover:text-white transition-colors mb-8 uppercase tracking-widest text-xs font-bold"
      >
        <ArrowLeft size={16} />
        <span>{t.common.back}</span>
      </button>

      <h1 className="text-5xl font-oswald uppercase tracking-widest font-bold mb-8 whitespace-pre-wrap">
        {title}
      </h1>

      {youtube1 && (
        <div className="aspect-video w-full bg-black mb-12 shadow-2xl">
          <iframe
            src={youtube1}
            className="w-full h-full"
            allow="autoplay; fullscreen"
            title={title}
          />
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <h3 className="text-xl font-oswald uppercase tracking-widest mb-4">Synopsis</h3>
          <p className="text-zinc-400 leading-relaxed text-lg whitespace-pre-wrap">
            {description}
          </p>
          {image && (
            <div className="mt-8 aspect-video w-full bg-zinc-900 overflow-hidden border border-white/5">
              <img
                src={image}
                alt=""
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          )}
        </div>
        {youtube2 && (
          <div>
            <h3 className="text-xl font-oswald uppercase tracking-widest mb-4">{t.films.versions}</h3>
            <div className="aspect-video w-full bg-black">
              <iframe
                src={youtube2}
                className="w-full h-full"
                allow="autoplay; fullscreen"
                title="Version 2"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilmDetail;
