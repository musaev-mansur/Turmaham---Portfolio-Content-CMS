import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { authorsAPI, blocksAPI } from '../utils/api';
import { blocksToItems, truncateTitle } from '../utils/dataTransform';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const AuthorDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { lang } = useLanguage();
  const t = translations[lang];
  const [author, setAuthor] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const [a, blocks] = await Promise.all([authorsAPI.getById(id), blocksAPI.getAll()]);
        setAuthor(a);
        setItems(blocksToItems(blocks.filter((b) => b.authorId === id), lang));
      } catch (e) {
        console.error('Failed to load author page', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, lang]);

  if (loading) {
    return <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto text-zinc-500">{t.common.loading}</div>;
  }

  if (!author) {
    return <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto text-zinc-500">Not found</div>;
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 uppercase tracking-widest text-xs font-bold"
      >
        <ArrowLeft size={16} />
        <span>{t.common.back}</span>
      </Link>

      <h1 className="text-5xl font-oswald uppercase tracking-widest font-bold mb-4">{author.name}</h1>
      {author.bio && <p className="text-zinc-400 leading-relaxed mb-10 whitespace-pre-wrap">{author.bio}</p>}

      {items.length === 0 ? (
        <p className="text-zinc-500 uppercase tracking-widest text-sm">{t.common.noContent}</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="border-b border-white/10 py-4">
              <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-500 mb-2">{item.section}</p>
              <Link
                to={`/${item.section}/${item.id}`}
                className="text-2xl font-oswald uppercase tracking-widest text-zinc-300 hover:text-white transition-colors"
              >
                {truncateTitle(item.title[lang], 80)}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthorDetail;
