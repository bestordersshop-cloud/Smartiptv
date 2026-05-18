import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Send, Loader2, CheckCircle2, Zap, ShieldCheck, Tv, Smartphone } from 'lucide-react';

export default function FreeTrial() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    device: 'Smart TV',
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
        body: JSON.stringify({
          ...formData,
          subject: 'Free Trial Request',
          message: `Device: ${formData.device}\n\nAdditional Message: ${formData.message}`
        })
      });

      const data = await response.json();
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', device: 'Smart TV', message: '' });
      } else {
        throw new Error(data.error || 'Failed to submit request');
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
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 text-brand rounded-full text-xs font-black tracking-widest uppercase mb-6">
          <Zap className="w-4 h-4 fill-current" /> 24-Hour Free Access
        </div>
        <h1 className="text-5xl md:text-7xl font-bebas mb-6">Get Your <span className="text-brand">Free Trial</span></h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto">
          Experience our premium channels and 4K streaming risk-free. No credit card required for the trial.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Why Trial Info */}
        <div className="space-y-8">
          <div className="bg-card-dark p-8 rounded-3xl border border-white/5 space-y-6">
            <h3 className="text-2xl font-bebas tracking-wide">What's included in the trial?</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-brand/10 p-2 rounded-lg shrink-0">
                  <Tv className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Full Channel List</h4>
                  <p className="text-white/40 text-xs mt-1">Access to all 18,000+ live premium channels including sports and movies.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-brand/10 p-2 rounded-lg shrink-0">
                  <Smartphone className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">All Devices Supported</h4>
                  <p className="text-white/40 text-xs mt-1">Test the trial on your Smart TV, Phone, PC or Tablet.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-brand/10 p-2 rounded-lg shrink-0">
                  <ShieldCheck className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">No Commitments</h4>
                  <p className="text-white/40 text-xs mt-1">The trial expires automatically after 24 hours. No strings attached.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-brand/20 to-transparent border border-brand/20">
            <h4 className="font-bebas text-xl mb-2 text-brand">Important Note</h4>
            <p className="text-sm text-white/60 leading-relaxed">
              Trials are processed manually by our support team to prevent abuse. You will receive your login credentials via email or WhatsApp within 1-2 hours of submission.
            </p>
          </div>
        </div>

        {/* Request Form */}
        <div className="bg-card-dark p-10 rounded-3xl border border-white/10 relative shadow-2xl">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-card-dark rounded-3xl z-10 p-10 text-center"
            >
              <div className="bg-brand/20 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-brand" />
              </div>
              <h2 className="text-4xl font-bebas mb-4">Request Received!</h2>
              <p className="text-white/60 mb-8 max-w-md">
                Your trial request has been submitted. Check your email or WhatsApp in a bit for your setup instructions.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-brand font-bold hover:underline"
              >
                Back to form
              </button>
            </motion.div>
          ) : null}

          <h2 className="text-3xl font-bebas mb-8 underline decoration-brand decoration-2 underline-offset-8">Request Trial</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
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
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-black text-white/40">Main Device for Trial</label>
              <select 
                value={formData.device}
                onChange={e => setFormData({ ...formData, device: e.target.value })}
                className="w-full bg-bg-dark border border-white/5 rounded-xl px-6 py-4 outline-none focus:border-brand transition-colors text-sm appearance-none"
              >
                <option>Smart TV (Samsung/LG)</option>
                <option>Android Box / Firestick</option>
                <option>Mag Device</option>
                <option>PC / Laptop</option>
                <option>Smartphone (iOS/Android)</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-black text-white/40">Additional Information (Optional)</label>
              <textarea 
                rows={3}
                placeholder="Any specific channels or apps you're interested in?"
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
                  PROCESSING... <Loader2 className="w-5 h-5 animate-spin" />
                </>
              ) : (
                <>
                  REQUEST TRIAL <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </>
              )}
            </button>
            <p className="text-center text-[10px] text-white/20 uppercase tracking-widest">
              Verified Requests are processed within 2 hours
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
