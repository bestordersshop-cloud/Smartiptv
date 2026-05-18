import { motion } from 'motion/react';
import { Shield, Zap, Globe, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl md:text-7xl font-bebas mb-6">About <span className="text-brand">StreamVault</span></h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto">
          We are the world's leading premium IPTV provider, dedicated to bringing high-quality entertainment to every corner of the globe.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <div className="bg-card-dark p-10 rounded-3xl border border-white/5">
          <Globe className="w-12 h-12 text-brand mb-6" />
          <h2 className="text-3xl font-bebas mb-4">Global Reach</h2>
          <p className="text-white/50 leading-relaxed">
            Founded in 2018, StreamVault started with a simple mission: break the limits of traditional cable TV. Today, we serve over 500,000 active subscribers across 120 countries, utilizing a state-of-the-art CDN infrastructure that ensures 99.9% uptime.
          </p>
        </div>
        <div className="bg-card-dark p-10 rounded-3xl border border-white/5">
          <Zap className="w-12 h-12 text-brand mb-6" />
          <h2 className="text-3xl font-bebas mb-4">The Technology</h2>
          <p className="text-white/50 leading-relaxed">
            We don't just "stream" content; we engineer it. By leveraging H.264 encoding and advanced anti-freeze technology, we deliver 4K Ultra HD quality even on moderate internet speeds. Our daily auto-updates mean you always have the latest movies and shows at your fingertips.
          </p>
        </div>
      </div>

      <div className="bg-brand/5 border border-brand/20 p-12 rounded-3xl text-center">
        <Users className="w-16 h-16 text-brand mx-auto mb-6" />
        <h2 className="text-4xl font-bebas mb-4">Our Commitment</h2>
        <p className="text-white/60 max-w-3xl mx-auto text-lg leading-relaxed mb-8">
          At StreamVault, we believe that entertainment should be accessible, affordable, and high-quality. Our team of 50+ support experts works 24/7 to ensure that your experience is seamless from the moment you hit "Play".
        </p>
        <button className="bg-brand text-white px-10 py-4 rounded-full font-bebas text-2xl tracking-wide">
          JOIN THE REVOLUTION
        </button>
      </div>
    </div>
  );
}
