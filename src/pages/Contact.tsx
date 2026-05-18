import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, MessageCircle, MapPin, Send, MessageSquare, Loader2, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Technical Support',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: 'Technical Support', message: '' });
      } else {
        throw new Error(data.error || 'Failed to submit message');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl md:text-7xl font-bebas mb-6">Contact <span className="text-brand">Support</span></h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto">
          Need help with your subscription? Our team is available 24/7 to assist you.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-card-dark p-8 rounded-3xl border border-white/5 flex items-start gap-6">
            <div className="bg-brand/10 p-4 rounded-2xl">
              <MessageCircle className="w-6 h-6 text-brand" />
            </div>
            <div>
              <h3 className="font-bebas text-xl mb-1 tracking-wide">WhatsApp Support</h3>
              <p className="text-white/40 text-sm mb-3">Fastest response time for setup help.</p>
              <a href="#" className="text-brand text-sm font-bold hover:underline">+1 (234) 567-890</a>
            </div>
          </div>

          <div className="bg-card-dark p-8 rounded-3xl border border-white/5 flex items-start gap-6">
            <div className="bg-brand/10 p-4 rounded-2xl">
              <Mail className="w-6 h-6 text-brand" />
            </div>
            <div>
              <h3 className="font-bebas text-xl mb-1 tracking-wide">Email Us</h3>
              <p className="text-white/40 text-sm mb-3">For billing or general inquiries.</p>
              <a href="mailto:support@streamvault.tv" className="text-brand text-sm font-bold hover:underline">support@streamvault.tv</a>
            </div>
          </div>

          <div className="bg-card-dark p-8 rounded-3xl border border-white/5 flex items-start gap-6">
            <div className="bg-brand/10 p-4 rounded-2xl">
              <MessageSquare className="w-6 h-6 text-brand" />
            </div>
            <div>
              <h3 className="font-bebas text-xl mb-1 tracking-wide">Live Chat</h3>
              <p className="text-white/40 text-sm mb-3">Chat with an agent directly in your browser.</p>
              <button className="text-brand text-sm font-bold hover:underline">Open Live Chat</button>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-card-dark p-10 rounded-3xl border border-white/10 relative">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-card-dark rounded-3xl z-10 p-10 text-center"
            >
              <div className="bg-brand/20 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-brand" />
              </div>
              <h2 className="text-4xl font-bebas mb-4">Message Sent!</h2>
              <p className="text-white/60 mb-8 max-w-md">
                Thank you for contacting us. Your message has been saved to our Google Sheet, and we will get back to you shortly.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-brand font-bold hover:underline"
              >
                Send another message
              </button>
            </motion.div>
          ) : null}

          <h2 className="text-3xl font-bebas mb-8 underline decoration-brand decoration-2 underline-offset-8">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-black text-white/40">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Carlos Mendoza"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-bg-dark border border-white/5 rounded-xl px-6 py-4 outline-none focus:border-brand transition-colors text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-black text-white/40">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="carlos@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-bg-dark border border-white/5 rounded-xl px-6 py-4 outline-none focus:border-brand transition-colors text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-black text-white/40">Subject</label>
              <select 
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-bg-dark border border-white/5 rounded-xl px-6 py-4 outline-none focus:border-brand transition-colors text-sm appearance-none"
              >
                <option>Technical Support</option>
                <option>Billing Inquiry</option>
                <option>Free Trial Request</option>
                <option>Channel Request</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-black text-white/40">Message</label>
              <textarea 
                rows={5}
                required
                placeholder="How can we help you today?"
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-bg-dark border border-white/5 rounded-xl px-6 py-4 outline-none focus:border-brand transition-colors text-sm resize-none"
              ></textarea>
            </div>
            
            {error && (
              <div className="text-red-500 text-sm font-bold bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                {error}
              </div>
            )}

            <button 
              disabled={isSubmitting}
              className="bg-brand text-white w-full py-4 rounded-xl font-bebas text-2xl tracking-widest flex items-center justify-center gap-3 group transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  SENDING... <Loader2 className="w-5 h-5 animate-spin" />
                </>
              ) : (
                <>
                  SEND MESSAGE <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
            <p className="text-center text-[10px] text-white/20 uppercase tracking-widest">
              Messages are saved to Google Sheets securely
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
