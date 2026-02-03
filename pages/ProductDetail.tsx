
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { ArrowLeft, Check } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang, addToCart } = useLanguage();
  const t = translations[lang];

  const product = products.find(p => p.id === id);
  const [format, setFormat] = useState(product?.variations.format[0]?.id || '');
  const [res, setRes] = useState(product?.variations.resolution[0]?.id || '');
  const [license, setLicense] = useState(product?.variations.license[0]?.id || '');

  if (!product) return <div>Product not found</div>;

  const currentFormat = product.variations.format.find(f => f.id === format)!;
  const currentRes = product.variations.resolution.find(r => r.id === res)!;
  const currentLicense = product.variations.license.find(l => l.id === license)!;
  
  const totalPrice = currentFormat.price + currentRes.price + currentLicense.price;

  const handleAddToCart = () => {
    addToCart({
      cartId: Math.random().toString(36).substr(2, 9),
      productId: product.id,
      title: product.title[lang],
      price: totalPrice,
      variationDetails: {
        format: currentFormat.name[lang],
        resolution: currentRes.name[lang],
        license: currentLicense.name[lang]
      }
    });
    navigate('/cart');
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <button 
        onClick={() => navigate('/shop')}
        className="flex items-center space-x-2 text-zinc-500 hover:text-white transition-colors mb-12 uppercase tracking-widest text-xs font-bold"
      >
        <ArrowLeft size={16} />
        <span>{t.nav.shop}</span>
      </button>

      <div className="grid lg:grid-cols-2 gap-20">
        <div className="bg-zinc-900 aspect-[3/4] overflow-hidden sticky top-32">
          <img
            src={product.image}
            alt={product.title[lang]}
            className="w-full h-full object-cover grayscale brightness-75"
          />
        </div>

        <div className="space-y-12">
          <div>
            <h1 className="text-5xl font-oswald uppercase tracking-widest font-bold mb-4">{product.title[lang]}</h1>
            <p className="text-zinc-400 text-lg">{product.description[lang]}</p>
          </div>

          {/* Variations */}
          <div className="space-y-8">
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-zinc-500 mb-4">{t.shop.format}</label>
              <div className="flex flex-wrap gap-3">
                {product.variations.format.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setFormat(f.id)}
                    className={`px-4 py-2 border text-xs font-bold tracking-widest uppercase transition-all ${
                      format === f.id ? 'border-white bg-white text-black' : 'border-white/10 hover:border-white/40'
                    }`}
                  >
                    {f.name[lang]} {f.price > 0 && `(+$${f.price})`}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-zinc-500 mb-4">{t.shop.resolution}</label>
              <div className="flex flex-wrap gap-3">
                {product.variations.resolution.map(r => (
                  <button
                    key={r.id}
                    onClick={() => setRes(r.id)}
                    className={`px-4 py-2 border text-xs font-bold tracking-widest uppercase transition-all ${
                      res === r.id ? 'border-white bg-white text-black' : 'border-white/10 hover:border-white/40'
                    }`}
                  >
                    {r.name[lang]} {r.price > 0 && `(+$${r.price})`}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-zinc-500 mb-4">{t.shop.license}</label>
              <div className="flex flex-col space-y-2">
                {product.variations.license.map(l => (
                  <button
                    key={l.id}
                    onClick={() => setLicense(l.id)}
                    className={`w-full p-4 border text-left flex justify-between items-center transition-all ${
                      license === l.id ? 'border-white bg-zinc-800' : 'border-white/10 hover:border-white/40'
                    }`}
                  >
                    <span className="text-xs font-bold tracking-widest uppercase">{l.name[lang]}</span>
                    <span className="text-zinc-400 text-sm font-bold">${l.price}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10">
            <div className="flex justify-between items-center mb-8">
              <span className="text-sm uppercase tracking-widest font-bold text-zinc-500">{t.shop.total}</span>
              <span className="text-4xl font-oswald font-bold">${totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full bg-white text-black py-5 uppercase tracking-widest font-bold hover:bg-zinc-200 transition-all shadow-xl"
            >
              {t.shop.addToCart}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-[10px] uppercase tracking-tighter text-zinc-500">
            <div className="flex items-center space-x-2"><Check size={12}/> <span>Instant Digital Delivery</span></div>
            <div className="flex items-center space-x-2"><Check size={12}/> <span>Secure Payment</span></div>
            <div className="flex items-center space-x-2"><Check size={12}/> <span>High Res Guaranteed</span></div>
            <div className="flex items-center space-x-2"><Check size={12}/> <span>Verified License</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
