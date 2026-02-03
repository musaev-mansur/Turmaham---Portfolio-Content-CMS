
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { X, ArrowRight } from 'lucide-react';

const Cart: React.FC = () => {
  const { lang, cart, removeFromCart } = useLanguage();
  const t = translations[lang];

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);

  if (cart.length === 0) {
    return (
      <div className="pt-64 pb-32 px-6 text-center max-w-xl mx-auto">
        <h1 className="text-4xl font-oswald uppercase mb-8">{t.shop.emptyCart}</h1>
        <Link to="/shop" className="inline-block border border-white px-12 py-4 uppercase font-bold tracking-widest hover:bg-white hover:text-black transition-all">
          {t.nav.shop}
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <h1 className="text-5xl font-oswald uppercase tracking-widest mb-12">{t.shop.cart}</h1>

      <div className="space-y-8 mb-16">
        {cart.map((item) => (
          <div key={item.cartId} className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 border border-white/10 bg-zinc-900/50">
            <div>
              <h3 className="text-xl font-oswald uppercase tracking-widest font-bold mb-2">{item.title}</h3>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest space-x-4">
                <span>{item.variationDetails.format}</span>
                <span>{item.variationDetails.resolution}</span>
                <span>{item.variationDetails.license}</span>
              </div>
            </div>
            <div className="flex items-center space-x-8 mt-4 md:mt-0">
              <span className="text-xl font-bold font-oswald">${item.price}</span>
              <button onClick={() => removeFromCart(item.cartId)} className="text-zinc-500 hover:text-white">
                <X size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 pt-8 max-w-md ml-auto">
        <div className="flex justify-between items-center mb-8">
          <span className="uppercase tracking-widest text-zinc-500 font-bold">{t.shop.total}</span>
          <span className="text-3xl font-oswald font-bold">${subtotal.toFixed(2)}</span>
        </div>
        <Link
          to="/checkout"
          className="flex items-center justify-center space-x-4 w-full bg-white text-black py-5 uppercase tracking-widest font-bold hover:bg-zinc-200 transition-all"
        >
          <span>{t.shop.checkout}</span>
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Cart;
