import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, Search, HelpCircle } from 'lucide-react';

const FAQS = [
  { 
    category: 'General',
    questions: [
      { q: 'What is StreamVault?', a: 'StreamVault is a premium IPTV service that provides access to over 18,000 live TV channels and 80,000+ movies and TV shows on-demand. We use advanced streaming technology to ensure high-quality playback on almost any device.' },
      { q: 'Is it legal to use?', a: 'StreamVault provides access to publicly available streams and licensed content partners. Users are responsible for complying with local regulations regarding streaming in their specific jurisdictions.' },
      { q: 'Where can I use the service?', a: 'You can use StreamVault anywhere in the world as long as you have a stable internet connection (minimum 10 Mbps recommended for HD, 25 Mbps for 4K).' }
    ]
  },
  {
    category: 'Compatibility',
    questions: [
      { q: 'What devices are compatible with StreamVault?', a: 'StreamVault works on all major devices including Windows PCs, Android smartphones and tablets, iPhones, iPads, Samsung and LG Smart TVs, Roku, Amazon Fire Stick, Apple TV, and MAG boxes.' },
      { q: 'How many devices can I use at once?', a: 'Our plans support 1, 2, or 3 simultaneous connections depending on the subscription you choose. You can install the service on many devices but can only watch on the number of screens specified in your plan at the same time.' },
      { q: 'Do I need a VPN?', a: 'While not strictly required, we recommend using a VPN if your ISP (Internet Service Provider) throttles IPTV traffic. Our service works perfectly with all major VPN providers.' }
    ]
  },
  {
    category: 'Subscription & Payment',
    questions: [
      { q: 'Is there a free trial available?', a: 'Yes! We offer a 24-hour free trial for new users to test our service quality and channel selection before committing to a plan. Contact us on WhatsApp to request yours.' },
      { q: 'How quickly is my subscription activated?', a: 'Activation is nearly instant. After payment, you will receive your login credentials via email and WhatsApp within 5 to 15 minutes.' },
      { q: 'What payment methods do you accept?', a: 'We accept major Credit/Debit cards, PayPal, and various Cryptocurrencies (Bitcoin, Ethereum, etc.) for added privacy.' },
      { q: 'Can I cancel my subscription anytime?', a: 'Yes, you can cancel your subscription at any time. There are no long-term contracts unless you explicitly purchase a 6-month or 1-year plan.' }
    ]
  },
  {
    category: 'Technical Support',
    questions: [
      { q: 'What if I experience buffering?', a: 'Buffering is usually caused by slow internet or ISP throttling. Ensure you are using a wired connection if possible, restart your router, or try using a VPN. Our servers have 99.9% uptime.' },
      { q: 'How do I set up the service on my device?', a: 'We provide detailed setup guides for every supported device. Once you subscribe, you will receive a link to our knowledge base with step-by-step instructions and video tutorials.' },
      { q: 'What if I\'m not satisfied with the service?', a: 'We offer a 14-day money-back guarantee. If you are not satisfied with the service for any reason during the first 14 days, contact our support team for a full refund.' }
    ]
  }
];

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQS.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex p-3 bg-brand/10 rounded-2xl mb-6">
          <HelpCircle className="w-8 h-8 text-brand" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bebas mb-6 uppercase">Help Center & <span className="text-brand">FAQ</span></h1>
        <p className="text-xl text-white/50 max-w-2xl mx-auto">
          Everything you need to know about StreamVault. Can't find the answer? <a href="/contact" className="text-brand hover:underline">Contact our 24/7 support.</a>
        </p>
      </motion.div>

      {/* Search Bar */}
      <div className="relative mb-16">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search for questions (e.g. 'refund', 'setup', 'VPN')..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-card-dark border border-white/5 rounded-2xl pl-16 pr-6 py-6 outline-none focus:border-brand/40 transition-all text-lg"
        />
      </div>

      <div className="space-y-12">
        {filteredFaqs.map((category, catIdx) => (
          <div key={catIdx}>
            <h2 className="text-2xl font-bebas tracking-widest text-brand mb-6 uppercase">{category.category}</h2>
            <div className="space-y-4">
              {category.questions.map((faq, qIdx) => {
                const id = `${catIdx}-${qIdx}`;
                return (
                  <div key={id} className="bg-card-dark border border-white/5 rounded-2xl overflow-hidden transition-all hover:border-white/10">
                    <button 
                      onClick={() => toggleFaq(id)}
                      className="w-full p-6 flex items-center justify-between text-left"
                    >
                      <span className="font-bold text-white/90 pr-8">{faq.q}</span>
                      <div className={`p-1 rounded-full transition-transform duration-300 ${openFaq === id ? 'bg-brand text-white rotate-180' : 'bg-white/5 text-white/40'}`}>
                        {openFaq === id ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>
                    <AnimatePresence>
                      {openFaq === id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="px-6 pb-6 overflow-hidden"
                        >
                          <div className="pt-4 border-t border-white/5 text-white/50 leading-relaxed">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {filteredFaqs.length === 0 && (
          <div className="text-center py-20 bg-card-dark rounded-3xl border border-white/5">
            <p className="text-white/40 mb-4">No questions found matching your search.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="text-brand font-bold hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Support CTA */}
      <div className="mt-24 p-10 bg-brand/5 border border-brand/20 rounded-3xl text-center">
        <h3 className="text-3xl font-bebas mb-4">Still have questions?</h3>
        <p className="text-white/60 mb-8 max-w-xl mx-auto leading-relaxed">
          Our dedicated support team is available via email or WhatsApp to help you with anything from technical setup to billing inquiries.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/contact" className="w-full sm:w-auto bg-brand text-white px-10 py-4 rounded-full font-bebas text-2xl tracking-wide transition-transform active:scale-95">
            GET IN TOUCH
          </a>
          <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white px-10 py-4 rounded-full font-bebas text-2xl tracking-wide transition-all border border-white/10">
            WHATSAPP CHAT
          </button>
        </div>
      </div>
    </div>
  );
}
