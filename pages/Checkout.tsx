
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { CreditCard, Download, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Checkout: React.FC = () => {
  const { lang, cart, clearCart } = useLanguage();
  const t = translations[lang];
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('processing');
    setTimeout(() => {
      setStatus('success');
      // In real scenario, clearCart would happen after webhooks
    }, 2000);
  };

  if (status === 'success') {
    return (
      <div className="pt-64 pb-32 px-6 text-center max-w-xl mx-auto">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <CheckCircle2 className="w-24 h-24 text-white mx-auto mb-8" />
          <h1 className="text-4xl font-oswald uppercase mb-4">{t.shop.thanks}</h1>
          <p className="text-zinc-500 mb-12">An email has been sent to {email} with your permanent access links.</p>
          
          <div className="space-y-4 text-left border border-white/10 p-6 bg-zinc-900 mb-8">
            <h3 className="font-bold uppercase tracking-widest text-xs border-b border-white/10 pb-2 mb-4">{t.shop.downloadLinks}</h3>
            {cart.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-sm font-oswald">{item.title} ({item.variationDetails.format})</span>
                <button className="flex items-center space-x-2 text-white hover:underline text-xs font-bold uppercase tracking-widest">
                  <Download size={14} /> <span>Download</span>
                </button>
              </div>
            ))}
          </div>

          <button onClick={() => { clearCart(); window.location.hash = '#/shop'; }} className="border border-white px-12 py-4 uppercase font-bold tracking-widest hover:bg-white hover:text-black">
             Back to Store
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto">
      <h1 className="text-5xl font-oswald uppercase tracking-widest mb-12">{t.shop.checkout}</h1>

      <div className="grid md:grid-cols-1 gap-12">
        <form onSubmit={handlePayment} className="space-y-8 bg-zinc-900 border border-white/10 p-8">
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-zinc-500 mb-4">{t.shop.emailRequired}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-black border border-white/20 p-4 text-white outline-none focus:border-white transition-colors"
            />
          </div>

          <div className="p-4 border border-zinc-800 bg-black/30 rounded flex items-center space-x-4">
            <CreditCard className="text-zinc-500" />
            <div className="flex-1 text-sm text-zinc-500 tracking-widest uppercase">
              Stripe Secure Payment Integration
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <div className="flex justify-between items-center mb-8">
              <span className="uppercase tracking-widest text-zinc-500 font-bold">Total to pay</span>
              <span className="text-3xl font-oswald font-bold">${subtotal.toFixed(2)}</span>
            </div>
            
            <button
              type="submit"
              disabled={status === 'processing'}
              className={`w-full bg-white text-black py-5 uppercase tracking-widest font-bold hover:bg-zinc-200 transition-all flex items-center justify-center space-x-4 ${status === 'processing' ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {status === 'processing' ? (
                <span className="animate-pulse">Processing...</span>
              ) : (
                <>
                   <CreditCard size={20} />
                   <span>{t.shop.completePayment}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
