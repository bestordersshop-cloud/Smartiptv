import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Tv, 
  Smartphone, 
  ShieldCheck, 
  Smartphone as Device, 
  Zap, 
  Monitor, 
  Headphones, 
  RefreshCw,
  Plus,
  Minus,
  Check,
  ChevronRight,
  Play,
  Star,
  Quote
} from 'lucide-react';
import PaymentMethods from '../components/PaymentMethods';
import MovieShowcase from '../components/MovieShowcase';
import CheckoutModal from '../components/CheckoutModal';

// Types
type PlanDeviceCount = '1' | '2' | '3';

interface PricingCard {
  duration: string;
  price: string;
  originalPrice: string;
  isPopular?: boolean;
  checkoutUrl: string;
}

const PRICING_DATA: Record<PlanDeviceCount, PricingCard[]> = {
  '1': [
    { duration: '1 Month', price: '13', originalPrice: '19', checkoutUrl: 'https://khaliderraissi.gumroad.com/l/1Month1DEVICE' },
    { duration: '3 Months', price: '26', originalPrice: '39', checkoutUrl: 'https://khaliderraissi.gumroad.com/l/3Month1DEVICE' },
    { duration: '6 Months', price: '36', originalPrice: '59', isPopular: true, checkoutUrl: 'https://khaliderraissi.gumroad.com/l/6Month1DEVICE' },
    { duration: '1 Year', price: '56', originalPrice: '99', checkoutUrl: 'https://khaliderraissi.gumroad.com/l/12Month1DEVICE' },
  ],
  '2': [
    { duration: '1 Month', price: '19', originalPrice: '29', checkoutUrl: 'https://khaliderraissi.gumroad.com/l/1Month2DEVICES' },
    { duration: '3 Months', price: '39', originalPrice: '59', checkoutUrl: 'https://khaliderraissi.gumroad.com/l/3Month2DEVICES' },
    { duration: '6 Months', price: '59', originalPrice: '89', isPopular: true, checkoutUrl: 'https://khaliderraissi.gumroad.com/l/6Month2DEVICES' },
    { duration: '1 Year', price: '89', originalPrice: '149', checkoutUrl: 'https://khaliderraissi.gumroad.com/l/12Month2DEVICES' },
  ],
  '3': [
    { duration: '1 Month', price: '25', originalPrice: '39', checkoutUrl: 'https://khaliderraissi.gumroad.com/l/1Month3DEVICES' },
    { duration: '3 Months', price: '49', originalPrice: '79', checkoutUrl: 'https://khaliderraissi.gumroad.com/l/3Month3DEVICES' },
    { duration: '6 Months', price: '79', originalPrice: '119', isPopular: true, checkoutUrl: 'https://khaliderraissi.gumroad.com/l/6Month3DEVICES' },
    { duration: '1 Year', price: '119', originalPrice: '199', checkoutUrl: 'https://khaliderraissi.gumroad.com/l/12Month3DEVICES' },
  ],
};

const NetworkLogos = {
  Netflix: () => (
    <div className="font-bebas text-[#E50914] font-[900] text-[32px] tracking-[4px]">NETFLIX</div>
  ),
  BeIN: () => (
    <div className="flex flex-col items-center bg-[#C8102E] px-4 py-1 rounded-full shadow-lg">
      <div className="flex items-center">
        <span className="text-white font-black text-xl">be</span>
        <span className="text-[#E50914] font-black text-xl italic ml-0.5">IN</span>
      </div>
      <span className="text-white font-bold text-[8px] tracking-[2px] -mt-1">SPORTS</span>
    </div>
  ),
  ESPN: () => (
    <div className="bg-[#CC0000] px-6 py-2 rounded-full shadow-lg">
      <span className="text-white font-black italic text-3xl tracking-tighter">ESPN</span>
    </div>
  ),
  HBO: () => (
    <div className="flex flex-col items-center">
      <span className="text-white font-serif font-bold text-3xl tracking-tighter leading-none">HBO</span>
      <span className="text-[#9B59B6] font-bold text-[10px] uppercase tracking-widest mt-0.5">max</span>
    </div>
  ),
  CanalPlus: () => (
    <div className="flex items-center gap-1">
      <span className="text-white font-[900] text-3xl tracking-tighter">CANAL</span>
      <span className="text-[#E50914] font-[900] text-4xl">+</span>
    </div>
  ),
  DAZN: () => (
    <div className="flex flex-col items-center">
      <span className="text-white font-black italic text-3xl tracking-tighter">DAZN</span>
      <div className="w-12 h-1 bg-[#E50914] -mt-1"></div>
    </div>
  ),
  DisneyPlus: () => (
    <div className="flex items-center gap-1">
      <span className="text-white font-serif italic font-bold text-3xl lowercase">Disney</span>
      <span className="text-[#113CCF] font-[900] text-4xl translate-y-[-2px]">+</span>
    </div>
  ),
  AppleTV: () => (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 text-white fill-current">
        <svg viewBox="0 0 24 24"><path d="M17.05 20.28c-.96.95-2.04 1.9-3.4 1.9-1.31 0-1.74-.8-3.27-.8-1.54 0-2.02.77-3.27.82-1.31.05-2.52-1.04-3.5-2.43-2-2.85-2.26-6.69-.96-9.14 1-1.88 2.92-3.07 4.96-3.1 1.54-.03 3 .85 3.84.85.84 0 2.58-1 4.38-.82 1.34.05 2.54.44 3.4 1.48-2.65 1.57-2.2 5.3 1 6.55-.7 2.12-2.58 4.74-3.18 5.69zm-3.33-16.7c1.1-1.2 1.74-2.88 1.54-4.58-1.54.06-3.27.97-4.24 2.22-1.01 1.25-1.7 3.26-1.31 4.84 1.64.12 3.3-.8 4-2.5z"/></svg>
      </div>
      <span className="text-white font-light text-3xl lowercase leading-none">tv</span>
    </div>
  ),
  AmazonPrime: () => (
    <div className="flex flex-col items-center translate-y-1">
      <div className="flex flex-col items-start leading-none gap-0.5">
        <span className="text-[#00A8E1] font-bold text-2xl lowercase tracking-tight">prime</span>
        <span className="text-white/40 font-bold text-[10px] uppercase tracking-widest">video</span>
      </div>
      <div className="w-16 h-2 text-[#FF9900] fill-current">
        <svg viewBox="0 0 100 20"><path d="M5,5 Q50,25 95,5 L90,15 Q50,30 10,15 Z"/></svg>
      </div>
    </div>
  ),
  SkyNews: () => (
    <div className="flex">
      <div className="bg-[#003C8F] px-4 py-1 text-white font-bold text-xl italic shadow-md">sky</div>
      <div className="bg-[#CC0000] px-4 py-1 text-white font-bold text-xl uppercase tracking-wider shadow-md">news</div>
    </div>
  ),
  DiscoveryPlus: () => (
    <div className="flex items-center gap-0.5">
      <span className="text-white font-semibold italic text-2xl lowercase">discovery</span>
      <span className="text-[#00A8E1] font-black text-2xl">+</span>
    </div>
  ),
  MTV: () => (
    <div className="flex items-center">
      <span className="text-[#FFCC00] font-black italic text-[44px] leading-none drop-shadow-md">M</span>
      <div className="bg-white text-[#0A0A0F] font-black text-center px-1 rounded-sm rotate-[-10deg] translate-x-[-15px] translate-y-[-5px]">
        <div className="text-[12px] leading-none">TV</div>
      </div>
    </div>
  ),
};

const LOGO_LIST = [
  NetworkLogos.Netflix,
  NetworkLogos.BeIN,
  NetworkLogos.ESPN,
  NetworkLogos.HBO,
  NetworkLogos.CanalPlus,
  NetworkLogos.DAZN,
  NetworkLogos.DisneyPlus,
  NetworkLogos.AppleTV,
  NetworkLogos.AmazonPrime,
  NetworkLogos.SkyNews,
  NetworkLogos.DiscoveryPlus,
  NetworkLogos.MTV,
];

const FEATURES = [
  { icon: <Headphones className="w-6 h-6 text-brand" />, title: '24/7 Live Support', desc: 'Expert help via WhatsApp or Live Chat, any time of day.' },
  { icon: <ShieldCheck className="w-6 h-6 text-brand" />, title: '14-Day Money-Back', desc: 'Full refund, no questions asked, within 14 days.' },
  { icon: <Device className="w-6 h-6 text-brand" />, title: 'All Platforms Supported', desc: 'Windows, Android, iOS, Samsung Smart TV, Roku, Fire TV, Apple TV & more.' },
  { icon: <Monitor className="w-6 h-6 text-brand" />, title: '4K Ultra HD Streaming', desc: 'Crystal-clear picture quality with anti-freeze technology.' },
  { icon: <Zap className="w-6 h-6 text-brand" />, title: 'Zero Buffering', desc: 'H.264 encoding + lightning-fast CDN for seamless streaming.' },
  { icon: <RefreshCw className="w-6 h-6 text-brand" />, title: 'Daily Auto-Updates', desc: 'Fresh content added to your library every day, automatically.' },
];

const DEVICES = [
  { name: 'Windows', icon: <Monitor className="w-8 h-8" /> },
  { name: 'Android TV', icon: <Tv className="w-8 h-8" /> },
  { name: 'Samsung TV', icon: <Tv className="w-8 h-8" /> },
  { name: 'Roku', icon: <Tv className="w-8 h-8" /> },
  { name: 'Fire TV', icon: <Zap className="w-8 h-8" /> },
  { name: 'Apple TV', icon: <Monitor className="w-8 h-8" /> },
  { name: 'iOS', icon: <Smartphone className="w-8 h-8" /> },
  { name: 'Android', icon: <Smartphone className="w-8 h-8" /> },
  { name: 'MAG Box', icon: <Zap className="w-8 h-8" /> },
];

const TESTIMONIALS = [
  { 
    name: 'Ethan Whitfield', 
    avatar: '/src/assets/images/ethan_whitfield_avatar_1779112555252.png',
    text: 'Amazing value for the price. I get access to sports, movies, series, and live TV from different countries with almost no downtime. Definitely one of the best services I\'ve used.' 
  },
  { 
    name: 'Carlos Mendoza', 
    avatar: '/src/assets/images/carlos_mendoza_avatar_1779112573450.png',
    text: 'Excellent service and very stable channels. The quality is amazing, and I can watch all my favorite sports and movies without interruptions. Highly recommended for anyone looking for reliable streaming.' 
  },
  { 
    name: 'Omar Al-Rashid', 
    avatar: '/src/assets/images/omar_al_rashid_avatar_1779112594101.png',
    text: 'I\'ve tried several providers before, but this one is by far the best. Fast support, smooth streaming, and a huge selection of international channels and entertainment content every day.' 
  },
  { 
    name: 'Valentina Rios', 
    avatar: '/src/assets/images/valentina_rios_avatar_1779112611519.png',
    text: 'Very satisfied with the service so far. The setup was simple, the streaming quality is great, and everything works perfectly on my Smart TV and mobile devices without buffering.' 
  },
  { 
    name: 'Sophie Müller', 
    avatar: '/src/assets/images/sophie_muller_avatar_1779112632934.png',
    text: 'Great experience overall with this service provider. The channels load quickly, the picture quality is excellent, and customer support always responds fast whenever I need assistance.' 
  },
];

const FAQS = [
  { q: 'What devices are compatible with StreamVault?', a: 'StreamVault works on all major devices including Windows PCs, Android smartphones and tablets, iPhones, iPads, Samsung and LG Smart TVs, Roku, Amazon Fire Stick, Apple TV, and MAG boxes.' },
  { q: 'Is there a free trial available?', a: 'Yes! We offer a 24-hour free trial for new users to test our service quality and channel selection before committing to a plan.' },
  { q: 'How quickly is my subscription activated?', a: 'Activation is nearly instant. After payment, you will receive your login credentials via email and WhatsApp within 5 to 15 minutes.' },
  { q: 'Can I use one subscription on multiple devices?', a: 'Yes, depending on your plan. We offer subscriptions for 1, 2, or 3 simultaneous connections. You can use the same account on multiple devices, but the number of active streams is limited by your plan.' },
  { q: 'What if I am not satisfied with the service?', a: 'We offer a 14-day money-back guarantee. If you are not satisfied with the service for any reason during the first 14 days, contact us for a full refund.' },
];

const BrandLogos = {
  Windows: () => (
    <div className="flex items-center gap-3">
      <div className="grid grid-cols-2 gap-1 scale-[1.8]">
        <div className="w-2.5 h-2.5 bg-[#00A4EF]"></div>
        <div className="w-2.5 h-2.5 bg-[#00A4EF]"></div>
        <div className="w-2.5 h-2.5 bg-[#00A4EF]"></div>
        <div className="w-2.5 h-2.5 bg-[#00A4EF]"></div>
      </div>
      <span className="text-[#00A4EF] font-bold text-3xl ml-2">Windows</span>
    </div>
  ),
  Samsung: () => (
    <div className="text-white font-black italic tracking-wider text-4xl">SAMSUNG</div>
  ),
  AndroidTV: () => (
    <div className="flex items-center gap-2">
      <div className="w-12 h-12 text-[#78C257] fill-current">
        <svg viewBox="0 0 24 24"><path d="M17.523 15.341c-.551 0-1-.449-1-1 0-.551.449-1 1-1s1 .449 1 1c0 .551-.449 1-1 1zm-11.046 0c-.551 0-1-.449-1-1 0-.551.449-1 1-1s1 .449 1 1c0 .551-.449 1-1 1zm11.423-4.843l1.884-3.263c.101-.174.041-.396-.134-.497-.174-.101-.396-.041-.497.134l-1.921 3.327c-1.551-.71-3.279-1.1-5.111-1.1-1.832 0-3.56.39-5.111 1.1l-1.921-3.327c-.101-.175-.323-.235-.497-.134-.175.101-.235.323-.134.497l1.884 3.263c-3.13 2.15-5.215 5.561-5.461 9.506h19.98c-.246-3.945-2.331-7.356-5.461-9.506z"/></svg>
      </div>
      <span className="text-[#78C257] font-medium text-3xl lowercase tracking-tighter">androidtv</span>
    </div>
  ),
  Roku: () => (
    <span className="text-[#6C2D91] font-black text-4xl tracking-tighter italic">Roku</span>
  ),
  SmartTV: () => (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 relative">
         <svg viewBox="0 0 60 60" fill="none">
            <path d="M30 0L56.5 15V45L30 60L3.5 45V15L30 0Z" fill="#F9D423"/>
            <path d="M30 0L56.5 15L30 30L3.5 15L30 0Z" fill="#FF4E50"/>
            <path d="M56.5 15V45L30 30L56.5 15Z" fill="#2980B9"/>
            <path d="M30 60L56.5 45L30 30L30 60Z" fill="#27AE60"/>
            <path d="M3.5 45L30 60L30 30L3.5 45Z" fill="#8E44AD"/>
            <path d="M3.5 15V45L30 30L3.5 15Z" fill="#E67E22"/>
         </svg>
      </div>
      <span className="text-white font-bold text-lg leading-tight uppercase">SMART<br />TV™</span>
    </div>
  ),
  Android: () => (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 text-[#78C257] fill-current">
        <svg viewBox="0 0 24 24"><path d="M17.523 15.341c-.551 0-1-.449-1-1 0-.551.449-1 1-1s1 .449 1 1c0 .551-.449 1-1 1zm-11.046 0c-.551 0-1-.449-1-1 0-.551.449-1 1-1s1 .449 1 1c0 .551-.449 1-1 1zm11.423-4.843l1.884-3.263c.101-.174.041-.396-.134-.497-.174-.101-.396-.041-.497.134l-1.921 3.327c-1.551-.71-3.279-1.1-5.111-1.1-1.832 0-3.56.39-5.111 1.1l-1.921-3.327c-.101-.175-.323-.235-.497-.134-.175.101-.235.323-.134.497l1.884 3.263c-3.13 2.15-5.215 5.561-5.461 9.506h19.98c-.246-3.945-2.331-7.356-5.461-9.506z"/></svg>
      </div>
      <span className="text-white font-bold text-3xl">Android</span>
    </div>
  ),
  Apple: () => (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 text-white fill-current">
        <svg viewBox="0 0 24 24"><path d="M17.05 20.28c-.96.95-2.04 1.9-3.4 1.9-1.31 0-1.74-.8-3.27-.8-1.54 0-2.02.77-3.27.82-1.31.05-2.52-1.04-3.5-2.43-2-2.85-2.26-6.69-.96-9.14 1-1.88 2.92-3.07 4.96-3.1 1.54-.03 3 .85 3.84.85.84 0 2.58-1 4.38-.82 1.34.05 2.54.44 3.4 1.48-2.65 1.57-2.2 5.3 1 6.55-.7 2.12-2.58 4.74-3.18 5.69zm-3.33-16.7c1.1-1.2 1.74-2.88 1.54-4.58-1.54.06-3.27.97-4.24 2.22-1.01 1.25-1.7 3.26-1.31 4.84 1.64.12 3.3-.8 4-2.5z"/></svg>
      </div>
      <span className="text-white font-bold text-3xl">Apple</span>
    </div>
  ),
  LG: ({ size = 'normal' }: { size?: 'normal' | 'small' }) => (
    <div className="flex items-center gap-4">
      <div className={`${size === 'small' ? 'w-10 h-10' : 'w-16 h-16'} bg-[#A50034] rounded-full flex items-center justify-center p-1 relative shadow-lg`}>
         <div className="border-2 border-white rounded-full w-full h-full flex items-center justify-center relative">
            <span className={`${size === 'small' ? 'text-lg' : 'text-2xl'} text-white font-black leading-none translate-x-[1px] translate-y-[1px]`}>LG</span>
         </div>
      </div>
      <span className={`${size === 'small' ? 'text-xl' : 'text-4xl'} text-white font-bold tracking-tighter`}>LG</span>
    </div>
  ),
  AppleTV: () => (
    <div className="flex items-center gap-2">
      <div className="w-12 h-12 text-white fill-current">
        <svg viewBox="0 0 24 24"><path d="M17.05 20.28c-.96.95-2.04 1.9-3.4 1.9-1.31 0-1.74-.8-3.27-.8-1.54 0-2.02.77-3.27.82-1.31.05-2.52-1.04-3.5-2.43-2-2.85-2.26-6.69-.96-9.14 1-1.88 2.92-3.07 4.96-3.1 1.54-.03 3 .85 3.84.85.84 0 2.58-1 4.38-.82 1.34.05 2.54.44 3.4 1.48-2.65 1.57-2.2 5.3 1 6.55-.7 2.12-2.58 4.74-3.18 5.69zm-3.33-16.7c1.1-1.2 1.74-2.88 1.54-4.58-1.54.06-3.27.97-4.24 2.22-1.01 1.25-1.7 3.26-1.31 4.84 1.64.12 3.3-.8 4-2.5z"/></svg>
      </div>
      <span className="text-white font-bold text-4xl leading-none">tv</span>
    </div>
  ),
  FireTV: () => (
    <div className="flex flex-col items-center">
      <span className="text-[#FF9900] font-black italic text-4xl tracking-tighter lowercase leading-tight">fire tv</span>
      <div className="w-24 h-3 text-[#FF9900] fill-current -mt-1 scale-x-125">
        <svg viewBox="0 0 100 20"><path d="M5,5 Q50,25 95,5 L90,15 Q50,30 10,15 Z"/></svg>
      </div>
    </div>
  ),
  PrimeVideo: () => (
    <div className="flex flex-col items-start translate-y-1">
      <span className="text-[#00A8E1] font-bold text-2xl lowercase leading-none tracking-tight">prime video</span>
      <div className="w-28 h-4 text-[#00A8E1] fill-current scale-x-110 -ml-1">
        <svg viewBox="0 0 100 20"><path d="M5,5 Q50,25 95,5 L90,15 Q50,30 10,15 Z"/></svg>
      </div>
    </div>
  ),
  SkyNews: () => (
    <div className="flex shadow-lg scale-125">
      <div className="bg-[#0072C6] px-4 py-2 text-white font-black text-xl italic">sky</div>
      <div className="bg-[#E50914] px-4 py-2 text-white font-black text-xl uppercase tracking-wider">news</div>
    </div>
  ),
  

};

export default function Home() {
  const [activePlanTab, setActivePlanTab] = useState<PlanDeviceCount>('1');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedCheckoutUrl, setSelectedCheckoutUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCheckout = (url: string) => {
    setSelectedCheckoutUrl(url);
    setIsModalOpen(true);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[url('/src/assets/images/iptv_hero_livingroom_v2_1779108438357.png')] bg-cover bg-center">
        {/* Layer 1: Dark Overlay - Adjusted for better image visibility */}
        <div className="absolute inset-0 z-[1] bg-black/75 lg:bg-[linear-gradient(to_right,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.85)_25%,rgba(0,0,0,0.2)_65%,transparent_100%)]" />

        {/* Layer 2: Red Atmospheric Glow */}
        <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_0%_100%,rgba(229,9,20,0.25)_0%,transparent_60%)]" />

        {/* Layer 3: Content */}
        <div className="relative z-[3] w-full max-w-7xl mx-auto px-6 lg:pl-20 py-32 lg:py-0">
          <div className="max-w-full lg:max-w-[55%] text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-[42px] lg:text-[64px] font-bebas font-black leading-none text-white uppercase mb-1">
                18,000+ LIVE CHANNELS.
              </h1>
              <h1 className="text-[42px] lg:text-[64px] font-bebas font-black leading-none text-brand uppercase mb-6">
                80,000+ MOVIES & SHOWS.
              </h1>
              
              <p className="text-[17px] text-[#CCCCCC] mb-10 max-w-2xl mx-auto lg:mx-0">
                Stream on any device, anywhere in the world — <br className="hidden sm:block" />
                starting at <span className="text-white font-bold">$13/month.</span>
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a href="#plans" className="w-full sm:w-auto bg-brand text-white px-9 py-4 rounded-[4px] font-bold text-[15px] tracking-[2px] hover:bg-brand/90 transition-all text-center">
                  SEE OUR PLANS
                </a>
                <button className="w-full sm:w-auto border-2 border-white text-white px-9 py-4 rounded-[4px] font-bold text-[15px] tracking-[1px] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2">
                  ▶ WATCH FREE DEMO
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Network Logo Strip */}
        <div className="absolute bottom-0 left-0 right-0 z-[10] border-t border-[#1E1E1E] bg-[#0A0A0F]">
          <div className="max-w-7xl mx-auto px-6 mt-4 text-center">
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20">AVAILABLE CHANNELS INCLUDE</span>
          </div>
          <div className="w-full overflow-hidden py-8 border-b border-[#1E1E1E] relative">
            {/* Fade Edges Mask */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(to_right,rgba(10,10,15,1)_0%,transparent_15%,transparent_85%,rgba(10,10,15,1)_100%)]" />
            
            <div className="flex animate-marquee whitespace-nowrap gap-1">
              {/* Double up for seamless loop */}
              {[...LOGO_LIST, ...LOGO_LIST].map((Logo, i) => (
                <div key={i} className="inline-flex items-center justify-center min-w-[200px] h-[90px] mx-8 bg-[#111111] rounded-xl border border-[#222222] px-8 py-3 shrink-0">
                  <Logo />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-bg-dark relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bebas mb-6">Why Choose StreamVault?</h2>
            <p className="text-white/40 max-w-xl mx-auto">Experience the next generation of entertainment with our premium infrastructure.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card-dark p-8 rounded-2xl border border-white/5 hover:border-brand/40 transition-all group"
              >
                <div className="mb-6 p-3 bg-brand/10 w-fit rounded-xl group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-white/50 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Devices Section */}
      <section id="devices" className="py-[100px] px-[40px] bg-[#0D0D0D] border-b border-brand/20">
        <div className="max-w-[1100px] mx-auto text-center">
          <h2 className="text-[48px] font-bebas mb-4">Watch on Any Device</h2>
          <p className="text-[18px] text-[#999] mb-16 max-w-2xl mx-auto">StreamVault works seamlessly across all your favorite platforms and devices</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[20px] items-center">
            {/* Row 1 */}
            <div className="min-w-[180px] min-h-[100px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-[16px] p-[24px_32px] flex items-center justify-center hover:border-[#E50914] transition-all duration-300 hover:shadow-[0_0_16px_rgba(229,9,20,0.3)] group">
              <BrandLogos.Windows />
            </div>
            <div className="min-w-[180px] min-h-[100px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-[16px] p-[24px_32px] flex items-center justify-center hover:border-[#E50914] transition-all duration-300 hover:shadow-[0_0_16px_rgba(229,9,20,0.3)] group">
              <BrandLogos.Samsung />
            </div>
            <div className="min-w-[180px] min-h-[100px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-[16px] p-[24px_32px] flex items-center justify-center hover:border-[#E50914] transition-all duration-300 hover:shadow-[0_0_16px_rgba(229,9,20,0.3)] group">
              <BrandLogos.AndroidTV />
            </div>
            <div className="min-w-[180px] min-h-[100px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-[16px] p-[24px_32px] flex items-center justify-center hover:border-[#E50914] transition-all duration-300 hover:shadow-[0_0_16px_rgba(229,9,20,0.3)] group">
              <BrandLogos.Roku />
            </div>
            
            {/* Row 2 */}
            <div className="min-w-[180px] min-h-[100px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-[16px] p-[24px_32px] flex items-center justify-center hover:border-[#E50914] transition-all duration-300 hover:shadow-[0_0_16px_rgba(229,9,20,0.3)] group">
              <BrandLogos.SmartTV />
            </div>
            <div className="min-w-[180px] min-h-[100px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-[16px] p-[24px_32px] flex items-center justify-center hover:border-[#E50914] transition-all duration-300 hover:shadow-[0_0_16px_rgba(229,9,20,0.3)] group">
              <BrandLogos.Android />
            </div>
            <div className="min-w-[180px] min-h-[100px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-[16px] p-[24px_32px] flex items-center justify-center hover:border-[#E50914] transition-all duration-300 hover:shadow-[0_0_16px_rgba(229,9,20,0.3)] group">
              <BrandLogos.Apple />
            </div>
            <div className="min-w-[180px] min-h-[100px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-[16px] p-[24px_32px] flex items-center justify-center hover:border-[#E50914] transition-all duration-300 hover:shadow-[0_0_16px_rgba(229,9,20,0.3)] group">
              <BrandLogos.LG />
            </div>

            {/* Row 3 */}
            <div className="min-w-[180px] min-h-[100px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-[16px] p-[24px_32px] flex items-center justify-center hover:border-[#E50914] transition-all duration-300 hover:shadow-[0_0_16px_rgba(229,9,20,0.3)] group">
              <BrandLogos.AppleTV />
            </div>
            <div className="min-w-[180px] min-h-[100px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-[16px] p-[24px_32px] flex items-center justify-center hover:border-[#E50914] transition-all duration-300 hover:shadow-[0_0_16px_rgba(229,9,20,0.3)] group">
              <BrandLogos.FireTV />
            </div>
            <div className="min-w-[180px] min-h-[100px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-[16px] p-[24px_32px] flex items-center justify-center hover:border-[#E50914] transition-all duration-300 hover:shadow-[0_0_16px_rgba(229,9,20,0.3)] group">
              <BrandLogos.LG size="small" />
            </div>
            <div className="min-w-[180px] min-h-[100px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-[16px] p-[24px_32px] flex items-center justify-center hover:border-[#E50914] transition-all duration-300 hover:shadow-[0_0_16px_rgba(229,9,20,0.3)] group">
              <BrandLogos.PrimeVideo />
            </div>

            {/* Row 4 (Extras) */}
            <div className="min-w-[180px] min-h-[100px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-[16px] p-[24px_32px] flex items-center justify-center hover:border-[#E50914] transition-all duration-300 hover:shadow-[0_0_16px_rgba(229,9,20,0.3)] group">
              <BrandLogos.SkyNews />
            </div>
          </div>
        </div>
      </section>

      <MovieShowcase />

      {/* Pricing Section */}
      <section id="plans" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bebas mb-6">Choose Your Plan</h2>
            <p className="text-xl text-white/50 mb-10">Flexible options for 1, 2, or 3 simultaneous connections</p>
            
            {/* Tabs */}
            <div className="inline-flex p-1 bg-white/5 rounded-full border border-white/10 mb-12">
              {(['1', '2', '3'] as PlanDeviceCount[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActivePlanTab(tab)}
                  className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${
                    activePlanTab === tab 
                      ? 'bg-brand text-white shadow-lg' 
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  {tab} DEVICE{Number(tab) > 1 && 'S'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="wait">
              {PRICING_DATA[activePlanTab].map((plan, i) => (
                <motion.div
                  key={`${activePlanTab}-${plan.duration}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`relative p-8 rounded-3xl border transition-all flex flex-col justify-between ${
                    plan.isPopular 
                      ? 'bg-brand/5 border-brand shadow-[0_0_30px_rgba(229,9,20,0.1)]' 
                      : 'bg-card-dark border-white/5 hover:border-white/20'
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand text-white text-[10px] uppercase font-black px-4 py-1.5 rounded-full tracking-widest shadow-lg">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-bold mb-4 opacity-50 uppercase tracking-widest">{plan.duration}</h3>
                    <div className="mb-8">
                      <span className="text-sm line-through text-white/30 block mb-1">${plan.originalPrice}</span>
                      <div className="flex items-baseline">
                        <span className="text-5xl font-bebas tracking-tighter">${plan.price}</span>
                        <span className="text-white/50 text-xs ml-2 uppercase font-bold tracking-widest">
                          / {plan.duration === '1 Month' ? 'mo' : plan.duration.replace('s', '').toLowerCase()}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {[
                        '21,000+ Live Channels',
                        'Movies & VOD On-Demand',
                        '4K / Full HD / HD / SD',
                        'Anti-Freeze Technology',
                        '24/7 Premium Support',
                        'TV Guide (EPG)'
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-white/70">
                          <Check className="w-4 h-4 text-brand shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <button 
                      onClick={() => openCheckout(plan.checkoutUrl)}
                      className={`w-full py-4 rounded-xl font-bebas text-2xl tracking-wider transition-all mb-4 ${
                        plan.isPopular ? 'bg-brand text-white hover:bg-brand/90' : 'bg-white/5 text-white hover:bg-white/10'
                      }`}
                    >
                      GET STARTED
                    </button>
                    <p className="text-center text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 flex items-center justify-center gap-2">
                       <Zap className="w-3 h-3 text-brand" /> Instant Activation
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <PaymentMethods />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-[60px] h-[60px] rounded-full overflow-hidden mb-8 border-2 border-transparent group-hover:border-brand transition-all duration-300">
                  <img 
                    src={t.avatar} 
                    alt={t.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-[17px] leading-[1.6] text-white italic mb-8 font-light tracking-wide min-h-[160px]">
                  "{t.text}"
                </p>
                <div className="mt-auto">
                  <h4 className="text-[15px] font-bold text-white tracking-wider">
                    {t.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bebas text-center mb-16 underline decoration-brand/30 decoration-4 underline-offset-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-card-dark border border-white/5 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-white/2 transition-colors"
                >
                  <span className="font-bold pr-8">{faq.q}</span>
                  {openFaq === i ? <Minus className="w-5 h-5 text-brand shrink-0" /> : <Plus className="w-5 h-5 text-brand shrink-0" />}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 overflow-hidden"
                    >
                      <p className="text-white/60 text-sm border-t border-white/5 pt-4">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>

      <CheckoutModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        checkoutUrl={selectedCheckoutUrl}
      />
    </div>
  );
}
