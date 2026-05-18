import { Lock } from 'lucide-react';

const PaymentLogos = {
  Skrill: () => (
    <div className="flex flex-col items-center leading-none">
      <span className="text-[#862165] font-bold text-[22px] tracking-tighter">Skrill</span>
      <div className="w-1.5 h-1.5 bg-[#862165] rounded-full mt-0.5"></div>
    </div>
  ),
  Crypto: () => (
    <div className="flex flex-col items-center gap-1">
      <div className="flex -space-x-1.5">
        <div className="w-7 h-7 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#F7931A] font-black text-sm shadow-sm relative z-30">₿</div>
        <div className="w-7 h-7 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#627EEA] font-black text-sm shadow-sm relative z-20">Ξ</div>
        <div className="w-7 h-7 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#BFBBBB] font-black text-sm shadow-sm relative z-10">Ł</div>
      </div>
      <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold">Crypto</span>
    </div>
  ),
  PayPal: () => (
    <div className="flex items-center italic font-black text-2xl tracking-tighter">
      <span className="text-[#003087]">Pay</span>
      <span className="text-[#009CDE]">Pal</span>
    </div>
  ),
  Mastercard: () => (
    <div className="flex flex-col items-center">
      <div className="flex h-7">
        <div className="w-7 h-7 rounded-full bg-[#EB001B] relative z-10"></div>
        <div className="w-7 h-7 rounded-full bg-[#F79E1B] -ml-3.5 relative z-0 mix-blend-screen opacity-90"></div>
      </div>
      <span className="text-[8px] uppercase tracking-widest text-white/30 font-black mt-1">mastercard</span>
    </div>
  ),
  Visa: () => (
    <span className="text-[#1A1F71] font-[900] italic text-2xl tracking-tight">VISA</span>
  ),
};

export default function PaymentMethods() {
  return (
    <div className="w-full flex flex-col items-center mt-16 px-6">
      <div className="text-[11px] tracking-[0.3em] font-black text-[#666666] uppercase mb-6">
        SECURE PAYMENT METHODS ACCEPTED
      </div>
      
      <div className="flex flex-wrap justify-center gap-3">
        {[
          PaymentLogos.Skrill,
          PaymentLogos.Crypto,
          PaymentLogos.PayPal,
          PaymentLogos.Mastercard,
          PaymentLogos.Visa
        ].map((Logo, i) => (
          <div 
            key={i} 
            className="w-[130px] h-[56px] bg-[#111111] border border-[#2A2A2A] rounded-xl flex items-center justify-center hover:border-brand transition-all duration-300 group cursor-default shadow-sm"
          >
            <Logo />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2 text-white/30 text-[12px] font-medium">
        <Lock className="w-3.5 h-3.5 text-brand/50" />
        <span>256-bit SSL Encrypted · Safe & Secure Checkout</span>
      </div>
    </div>
  );
}
