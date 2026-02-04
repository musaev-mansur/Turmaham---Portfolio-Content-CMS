
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Terms: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <h1 className="text-5xl font-oswald uppercase tracking-widest font-bold mb-12">
        {lang === 'en' ? 'Terms & Conditions' : 'Условия и положения'}
      </h1>
      
      <div className="space-y-8 text-zinc-400 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4">1. Digital Content</h2>
          <p>
            All digital products purchased on Tsugi are non-refundable once the download link has been accessed. 
            By purchasing, you agree that you are receiving a license to use the content, not ownership of the copyright.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4">2. Usage Licenses</h2>
          <p>
            <strong>Personal License:</strong> Suitable for personal use, social media (non-sponsored), and portfolio.
            <br />
            <strong>Commercial License:</strong> Required for advertising, paid promotions, and corporate distribution.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4">3. Delivery</h2>
          <p>
            Digital files are delivered instantly via email and on the checkout confirmation page. 
            Ensure your email address is correct to avoid delivery failure.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
