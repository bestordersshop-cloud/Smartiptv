import { motion } from 'motion/react';

export default function Terms() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card-dark p-12 rounded-3xl border border-white/5"
      >
        <h1 className="text-5xl font-bebas mb-8">Terms of <span className="text-brand">Service</span></h1>
        
        <div className="space-y-8 text-white/60 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bebas mb-4 text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the services provided by StreamVault, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, you may not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bebas mb-4 text-white">2. Subscription and Billing</h2>
            <p>
              Subscription fees for StreamVault are billed in advance and are non-refundable, except as expressly provided in our refund policy (14-day money-back guarantee). You are responsible for all charges incurred under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bebas mb-4 text-white">3. Content and Usage</h2>
            <p>
              StreamVault provides access to digital content for personal, non-commercial use only. You may not re-stream, re-broadcast, or commercially exploit any content accessed through our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bebas mb-4 text-white">4. User Account</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bebas mb-4 text-white">5. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users of the service.
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
