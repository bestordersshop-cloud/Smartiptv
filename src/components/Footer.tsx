import { Link } from 'react-router-dom';
import PaymentMethods from './PaymentMethods';

export default function Footer() {
  return (
    <footer className="bg-bg-dark border-t border-white/5 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          <div className="lg:col-span-2">
            <Link to="/" className="text-3xl font-bebas tracking-wider uppercase mb-6 block">
              Stream<span className="text-brand">Vault</span>
            </Link>
            <p className="text-white/40 max-w-sm mb-8">
              The ultimate streaming experience. Access thousands of channels and movies globally on any device. Professional service, guaranteed quality.
            </p>
            <div className="flex gap-4">
              {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map(social => (
                <div key={social} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand hover:border-brand transition-all cursor-pointer">
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-white/20 rounded-sm" />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bebas text-xl mb-6 tracking-wide">Company</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><Link to="/about" className="hover:text-brand transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-brand transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-brand transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-brand transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bebas text-xl mb-6 tracking-wide">Support</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><Link to="/faq" className="hover:text-brand transition-colors">FAQ</Link></li>
              <li><Link to="/free-trial" className="hover:text-brand transition-colors">Free Trial</Link></li>
              <li><a href="#" className="hover:text-brand transition-colors">Setup Guides</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">WhatsApp Support</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">System Status</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bebas text-xl mb-6 tracking-wide">Newsletter</h4>
            <p className="text-xs text-white/40 mb-4 uppercase tracking-widest font-bold">Get updates & deals</p>
            <div className="flex p-1 bg-white/5 rounded-lg border border-white/10">
              <input 
                type="email" 
                placeholder="Email" 
                className="bg-transparent border-none outline-none px-4 py-2 text-sm w-full"
              />
              <button className="bg-brand text-white px-4 py-2 rounded-md text-xs font-bold uppercase tracking-widest">
                JOIN
              </button>
            </div>
          </div>
        </div>

        <PaymentMethods />
        <div className="text-center pt-12 border-t border-white/5">
          <p className="text-white/20 text-xs font-bold uppercase tracking-widest">
            © 2026 StreamVault. All rights reserved. Premium IPTV solutions.
          </p>
        </div>
      </div>
    </footer>
  );
}
