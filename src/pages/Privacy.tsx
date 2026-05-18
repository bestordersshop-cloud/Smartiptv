import { motion } from 'motion/react';

export default function Privacy() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card-dark p-12 rounded-3xl border border-white/5"
      >
        <h1 className="text-5xl font-bebas mb-8">Privacy <span className="text-brand">Policy</span></h1>
        
        <div className="space-y-8 text-white/60 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bebas mb-4 text-white">1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, such as when you create or modify your account, request support, or otherwise communicate with us. This information may include: name, email, phone number, and payment information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bebas mb-4 text-white">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, such as to process transactions, send technical notices, updates, security alerts, and support messages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bebas mb-4 text-white">3. Security</h2>
            <p>
              StreamVault takes reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction. We use advanced encryption protocols (SSL/TLS) for all data transfers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bebas mb-4 text-white">4. Cookies</h2>
            <p>
              Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove or reject browser cookies. Please note that if you choose to remove or reject cookies, this could affect the availability and functionality of our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bebas mb-4 text-white">5. Changes to the Policy</h2>
            <p>
              We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice.
            </p>
          </section>

          <div className="pt-8 border-t border-white/5 text-xs uppercase tracking-[0.2em] font-bold text-white/40">
            Last updated: May 18, 2026
          </div>
        </div>
      </motion.div>
    </div>
  );
}
