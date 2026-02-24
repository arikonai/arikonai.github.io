import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Zap, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Bot, 
  Menu, 
  X,
  Globe,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LegalPage, PRIVACY_POLICY, TERMS_OF_SERVICE, COOKIE_POLICY } from './Legal';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ViewState = 'home' | 'privacy' | 'terms' | 'cookies';

const Navbar = ({ setView }: { setView: (v: ViewState) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-white/80 backdrop-blur-lg border-b border-gray-100 py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
            <span className="text-white font-display font-bold text-xl">A</span>
          </div>
          <span className="font-display font-bold text-2xl tracking-tight">Arikon</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#solutions" onClick={() => setView('home')} className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Solutions</a>
          <a href="#features" onClick={() => setView('home')} className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Features</a>
          <a href="#how-it-works" onClick={() => setView('home')} className="text-sm font-medium text-gray-600 hover:text-black transition-colors">How it Works</a>
          <a href="#contact" onClick={() => setView('home')} className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition-all shadow-sm">
            Get Started
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            <a href="#solutions" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Solutions</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Features</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">How it Works</a>
            <button className="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold">
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HeroImage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="mt-20 relative max-w-5xl mx-auto group"
    >
      <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-white p-2 relative">
        <img 
          src="https://photos.fife.usercontent.google.com/pw/AP1GczNpGTFzrGW0MMrFDgNOGjqgVgpx43Txy4g6nfYJCUzjpe2Z_5YKlPkQ=w1059-h706-no?authuser=0" 
          alt="Arikon Platform" 
          className="w-full h-auto rounded-2xl object-cover aspect-[21/9]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-2xl" />
      </div>
      
      {/* Floating elements */}
      <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 hidden md:block z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
            <Zap size={20} />
          </div>
          <div className="text-left">
            <p className="text-xs text-gray-500 font-medium">Response Time</p>
            <p className="text-sm font-bold">Under 5 Seconds</p>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 hidden md:block z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <Phone size={20} />
          </div>
          <div className="text-left">
            <p className="text-xs text-gray-500 font-medium">Calls Handled</p>
            <p className="text-sm font-bold">24/7 Availability</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-indigo-50 rounded-full blur-[100px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-8">
            <Sparkles size={14} />
            AI-Powered Real Estate Solutions
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 max-w-4xl mx-auto leading-[1.1]">
            Intelligent Automation for <span className="animate-gradient">Australian Real Estate</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Arikon empowers agencies with state-of-the-art AI models to handle seller enquiries and voice interactions, ensuring you never miss an opportunity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="w-full sm:w-auto bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center gap-2 group">
              Book a Demo
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </a>
            <a href="#solutions" className="w-full sm:w-auto bg-white text-black border border-gray-200 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all shadow-sm text-center">
              View Solutions
            </a>
          </div>
        </motion.div>

        <HeroImage />
      </div>
    </section>
  );
};

const Solutions = () => {
  return (
    <section id="solutions" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 tracking-tight">Our Solutions</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-xl font-light leading-relaxed">
              State-of-the-art AI models specifically engineered to solve the most pressing challenges in Australian Real Estate.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Appraisal Accelerator */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bento-card flex flex-col h-full group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex items-start justify-between mb-10">
              <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-blue-200 group-hover:rotate-6 transition-transform duration-500">
                <Zap size={40} strokeWidth={1.5} />
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Automated</span>
              </div>
            </div>

            <h3 className="font-display text-4xl font-bold mb-6 text-gray-900">Appraisal Accelerator</h3>
            <p className="text-gray-500 mb-10 text-lg leading-relaxed font-light">
              The ultimate response engine for high-performing agencies. It ensures every seller enquiry is met with a professional, data-driven response within seconds—24/7.
            </p>
            
            <div className="space-y-5 mb-12 flex-grow">
              <div className="benefit-box benefit-box-light">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600 shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Instant Engagement</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">Capture leads when their intent is highest. Zero wait time means zero lost opportunities.</p>
                  </div>
                </div>
              </div>
              
              <div className="benefit-box benefit-box-light">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-indigo-600 shrink-0">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Intelligent Qualification</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">Automatically qualifies sellers and gathers critical property data before you even pick up the phone.</p>
                  </div>
                </div>
              </div>
            </div>

            <a href="#contact" className="w-full py-5 rounded-2xl bg-gray-900 text-white font-bold hover:bg-black transition-all flex items-center justify-center gap-3 shadow-2xl shadow-gray-200 group/btn">
              Get Started 
              <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Voice Agent */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bento-card flex flex-col h-full group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex items-start justify-between mb-10">
              <div className="w-20 h-20 bg-gray-900 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-gray-200 group-hover:-rotate-6 transition-transform duration-500">
                <Phone size={40} strokeWidth={1.5} />
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Voice AI</span>
              </div>
            </div>

            <h3 className="font-display text-4xl font-bold mb-6 text-gray-900">Arikon Voice Agent</h3>
            <p className="text-gray-500 mb-10 text-lg leading-relaxed font-light">
              A human-like AI voice assistant trained specifically for your agency. It manages your entire phone workflow with indistinguishable natural language.
            </p>
            
            <div className="space-y-5 mb-12 flex-grow">
              <div className="benefit-box benefit-box-light">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-indigo-600 shrink-0">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Automated Bookings</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">Directly integrates with your calendar to schedule appraisals and inspections without human intervention.</p>
                  </div>
                </div>
              </div>
              
              <div className="benefit-box benefit-box-light">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-purple-600 shrink-0">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Natural Conversations</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">Advanced speech synthesis that sounds indistinguishable from a local agent, maintaining your professional image.</p>
                  </div>
                </div>
              </div>
            </div>

            <a href="#contact" className="w-full py-5 rounded-2xl bg-gray-900 text-white font-bold hover:bg-black transition-all flex items-center justify-center gap-3 shadow-2xl shadow-gray-200 group/btn">
              Book a Demo 
              <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch('https://formspree.io/f/xgolzdag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-50/30 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-5xl md:text-6xl font-bold mb-8 tracking-tight leading-[1.1]">
                Let's talk about your agency's <span className="text-blue-600">future.</span>
              </h2>
              <p className="text-xl text-gray-500 mb-12 font-light leading-relaxed max-w-lg">
                Ready to automate your growth? Our team is here to help you find the perfect AI solution for your specific needs.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300">
                    <MessageSquare size={28} />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 text-lg">Email Us</h5>
                    <p className="text-gray-500">info@arikon.com.au</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-10 md:p-14 rounded-[3rem] border border-gray-100 shadow-[0_30px_80px_rgba(0,0,0,0.05)] relative"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="John Smith"
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all text-gray-900"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                  <input 
                    required
                    type="email" 
                    placeholder="john@agency.com.au"
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all text-gray-900"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                <input 
                  required
                  type="tel" 
                  placeholder="0400 000 000"
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all text-gray-900"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Message</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Tell us about your agency..."
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all resize-none text-gray-900"
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                />
              </div>
              
              <button 
                disabled={status === 'submitting'}
                className={cn(
                  "w-full py-5 rounded-2xl font-bold text-white transition-all shadow-2xl flex items-center justify-center gap-3",
                  status === 'submitting' ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98] shadow-blue-200"
                )}
              >
                {status === 'submitting' ? "Sending..." : "Send Message"}
                <ArrowRight size={20} />
              </button>

              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 text-green-700 rounded-2xl text-center font-medium border border-green-100"
                >
                  Message sent successfully! We'll be in touch.
                </motion.div>
              )}
              {status === 'error' && (
                <div className="p-4 bg-red-50 text-red-700 rounded-2xl text-center font-medium border border-red-100">
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Clock className="text-blue-600" />,
      title: "24/7 Availability",
      description: "Your agency never sleeps. Handle enquiries and calls at 2 AM or 2 PM with consistent quality."
    },
    {
      icon: <Calendar className="text-indigo-600" />,
      title: "Auto-Booking",
      description: "Automatically sync with your team's calendars to book appraisals and inspections without manual intervention."
    },
    {
      icon: <ShieldCheck className="text-emerald-600" />,
      title: "Local Expertise",
      description: "Trained on Australian real estate data and regulations to provide accurate, compliant information."
    },
    {
      icon: <Globe className="text-orange-600" />,
      title: "Scalable Growth",
      description: "Handle 10 or 1,000 enquiries simultaneously. Our AI infrastructure scales with your agency's success."
    }
  ];

  return (
    <section id="features" className="py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 tracking-tight">Built for the Modern Agency</h2>
            <p className="text-gray-500 text-xl font-light leading-relaxed">
              We combine cutting-edge LLMs with deep real estate domain knowledge to deliver results that matter.
            </p>
          </div>
          <a href="#contact" className="text-blue-600 font-bold flex items-center gap-2 hover:gap-4 transition-all group">
            Explore all features <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500 group"
            >
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-50 transition-all duration-500">
                {feature.icon}
              </div>
              <h4 className="font-display text-2xl font-bold mb-4 text-gray-900">{feature.title}</h4>
              <p className="text-gray-500 text-base leading-relaxed font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Connect Your CRM",
      description: "We securely integrate with your existing CRM, listings, and enquiry sources so Arikon understands your properties, vendors, and local market instantly."
    },
    {
      number: "02",
      title: "Tailored to Your Agency",
      description: "Your automation is configured to match your brand voice, suburb expertise, and appraisal strategy, ensuring every seller enquiry is handled professionally."
    },
    {
      number: "03",
      title: "Start Capturing More Listings",
      description: "Once activated, Arikon responds to seller enquiries across your website, portals, and phone lines, 24/7, so you never miss an opportunity."
    }
  ];

  return (
    <section id="how-it-works" className="py-32 bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark opacity-20" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 tracking-tight">Simple Implementation</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-xl font-light">
              Getting started with Arikon is simple and fully managed by our team. No complex setup. No disruption to your workflow.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              <div className="text-8xl font-display font-black text-white/5 absolute -top-10 -left-4 group-hover:text-blue-600/10 transition-colors duration-500">
                {step.number}
              </div>
              <div className="relative z-10 pt-10">
                <h4 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">
                    {step.number}
                  </span>
                  {step.title}
                </h4>
                <p className="text-gray-400 text-lg leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
              {i < 2 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-[1px] bg-white/10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-white rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-white rounded-full blur-[120px]" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Ready to transform your agency?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Join the leading Australian real estate agencies using Arikon to automate their growth.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="w-full sm:w-auto bg-white text-blue-600 px-10 py-4 rounded-full text-lg font-bold hover:bg-blue-50 transition-all shadow-lg">
              Book Your Free Demo
            </a>
            <a href="#contact" className="w-full sm:w-auto bg-blue-700 text-white border border-blue-500 px-10 py-4 rounded-full text-lg font-bold hover:bg-blue-800 transition-all">
              Contact Sales
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = ({ setView }: { setView: (v: ViewState) => void }) => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => setView('home')}>
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">A</span>
              </div>
              <span className="font-display font-bold text-xl tracking-tight">Arikon</span>
            </div>
            <p className="text-gray-500 max-w-xs mb-8">
              State-of-the-art AI solutions for the Australian Real Estate market.
            </p>
            <div className="flex gap-4">
              {/* Social icons placeholder */}
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-black transition-colors cursor-pointer">
                <Globe size={20} />
              </div>
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-black transition-colors cursor-pointer">
                <MessageSquare size={20} />
              </div>
            </div>
          </div>
          
          <div>
            <h5 className="font-bold mb-6">Solutions</h5>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#solutions" onClick={() => setView('home')} className="hover:text-black transition-colors">Appraisal Accelerator</a></li>
              <li><a href="#solutions" onClick={() => setView('home')} className="hover:text-black transition-colors">Voice Agent</a></li>
              <li><a href="#features" onClick={() => setView('home')} className="hover:text-black transition-colors">CRM Integration</a></li>
              <li><a href="#features" onClick={() => setView('home')} className="hover:text-black transition-colors">Custom AI Training</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6">Company</h5>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" onClick={(e) => { e.preventDefault(); setView('home'); }} className="hover:text-black transition-colors">About Us</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setView('home'); }} className="hover:text-black transition-colors">Case Studies</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setView('home'); }} className="hover:text-black transition-colors">Careers</a></li>
              <li><a href="#contact" onClick={() => setView('home')} className="hover:text-black transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6">Legal</h5>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><button onClick={() => setView('privacy')} className="hover:text-black transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => setView('terms')} className="hover:text-black transition-colors">Terms of Service</button></li>
              <li><button onClick={() => setView('cookies')} className="hover:text-black transition-colors">Cookie Policy</button></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-gray-100 text-gray-400 text-xs">
          <p>© 2026 Arikon. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <span>Built for Australian Real Estate</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [view, setView] = useState<ViewState>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="min-h-screen">
      <Navbar setView={setView} />
      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <main>
              <Hero />
              <Solutions />
              <Features />
              <HowItWorks />
              <ContactForm />
              <CTA />
            </main>
          </motion.div>
        ) : (
          <LegalPage 
            key={view}
            title={
              view === 'privacy' ? 'Privacy Policy' : 
              view === 'terms' ? 'Terms of Service' : 
              'Cookie Policy'
            }
            content={
              view === 'privacy' ? PRIVACY_POLICY : 
              view === 'terms' ? TERMS_OF_SERVICE : 
              COOKIE_POLICY
            }
            onBack={() => setView('home')}
          />
        )}
      </AnimatePresence>
      <Footer setView={setView} />
    </div>
  );
}
