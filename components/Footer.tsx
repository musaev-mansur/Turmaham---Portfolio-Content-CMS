
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 py-12 px-6 bg-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        <div className="text-xl font-oswald font-bold tracking-tighter">
          TSUGI
        </div>
        
        <div className="flex space-x-8 text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500">
          <Link to="/admin" className="hover:text-white transition-colors">Admin Access</Link>
          <span className="cursor-default">© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
        </div>

        <div className="flex flex-col items-center md:items-end gap-3 text-sm text-zinc-400">
          <a
            href="mailto:tsugivu@gmail.com"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Mail size={15} />
            <span>tsugivu@gmail.com</span>
          </a>
          <a
            href="https://instagram.com/tsugi.fr"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Instagram size={15} />
            <span>@tsugi.fr</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
