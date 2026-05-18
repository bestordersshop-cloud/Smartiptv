import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 flex items-center justify-between ${
        scrolled || !isHome ? 'bg-bg-dark/95 backdrop-blur-md shadow-lg border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <Link to="/" className="text-2xl font-bebas tracking-wider uppercase">
        Stream<span className="text-brand">Vault</span>
      </Link>
      
      <div className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase tracking-widest text-white/70">
        <Link to="/#features" className="hover:text-brand transition-colors">Features</Link>
        <Link to="/#plans" className="hover:text-brand transition-colors">Plans</Link>
        <Link to="/faq" className="hover:text-brand transition-colors">FAQ</Link>
        <Link to="/contact" className="hover:text-brand transition-colors">Support</Link>
        <Link to="/about" className="hover:text-brand transition-colors">About</Link>
      </div>

      <button className="bg-brand hover:bg-brand/90 text-white px-6 py-2 rounded-full font-bold text-sm transition-transform active:scale-95 shadow-[0_0_20px_rgba(229,9,20,0.3)]">
        START FREE TRIAL
      </button>
    </nav>
  );
}
