import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../components/LanguageContext';
import { TEXTS } from '../constants';
import SEO from '../components/SEO';
import { Language } from '../types';
import { Mail, Instagram, Linkedin, MessageCircle, ArrowUpRight, Send, CheckCircle, Loader2 } from 'lucide-react';

// Custom X (Twitter) Icon
const XIcon = ({ size = 24, className, ...props }: any) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    {...props}
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

// Ripple Illustration
const Ripples = () => (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-0 opacity-[0.03] dark:opacity-[0.05]">
        {[0, 1, 2].map((i) => (
            <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-current text-gray-900 dark:text-white"
                style={{ width: `${(i + 1) * 30}%`, height: `${(i + 1) * 30}%` }}
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i }}
            />
        ))}
    </div>
);

const Contact: React.FC = () => {
  const { language, dir } = useLanguage();
  const content = language === Language.EN ? TEXTS.en : TEXTS.ar;

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Auto hide success after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactMethods = [
    {
      id: 'email',
      icon: Mail,
      label: language === Language.EN ? 'Email' : 'البريد الإلكتروني',
      value: 'doaaseifofficial@gmail.com',
      href: 'mailto:doaaseifofficial@gmail.com',
      colorClass: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-blue-100 dark:border-blue-900',
      hoverClass: 'hover:border-blue-300 dark:hover:border-blue-700'
    },
    {
      id: 'whatsapp',
      icon: MessageCircle,
      label: language === Language.EN ? 'WhatsApp' : 'واتساب',
      value: '+966 55 623 8507', 
      href: 'https://wa.me/966556238507', 
      colorClass: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border-green-100 dark:border-green-900',
      hoverClass: 'hover:border-green-300 dark:hover:border-green-700'
    }
  ];

  const socialLinks = [
    { icon: Linkedin, link: '#', label: 'LinkedIn', color: 'hover:text-[#0077b5]' },
    { icon: Instagram, link: 'https://instagram.com/doaaseif_', label: 'Instagram', color: 'hover:text-[#E1306C]' },
    { icon: XIcon, link: 'https://x.com/doaaseif_', label: 'X', color: 'hover:text-black dark:hover:text-white' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative w-full py-16 md:py-24 px-6 container mx-auto flex flex-col items-center justify-center overflow-hidden"
    >
      <SEO 
          titleEn="Contact" 
          titleAr="تواصل معي"
          descriptionEn="Get in touch with Doaa Seif for collaborations, projects, or inquiries."
          descriptionAr="تواصل مع دعاء سيف للتعاون، المشاريع، أو الاستفسارات."
      />
      <Ripples />

      <div className="max-w-3xl w-full text-center space-y-16 relative z-10">
        
        {/* Header */}
        <div className="space-y-6">
            <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
            >
                {content.contactTitle}
            </motion.h1>
            
            <motion.p
                 initial={{ y: 20, opacity: 0 }}
                 whileInView={{ y: 0, opacity: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                 className="text-gray-600 dark:text-gray-300 text-lg max-w-xl mx-auto"
            >
                {language === Language.EN ? 
                    "Ready to start your next project? Get in touch via email or WhatsApp." : 
                    "جاهز لبدء مشروعك القادم؟ تواصل معي عبر البريد الإلكتروني أو الواتساب."
                }
            </motion.p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactMethods.map((method, index) => {
                // Ensure mailto links do not have target="_blank"
                const linkProps = method.id === 'email' 
                    ? {} 
                    : { target: "_blank", rel: "noopener noreferrer" };

                return (
                    <motion.a
                        key={method.id}
                        href={method.href}
                        {...linkProps}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + (index * 0.1) }}
                        className={`
                            group flex flex-col items-center justify-center p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer backdrop-blur-sm
                            ${method.colorClass} ${method.hoverClass} hover:shadow-xl hover:-translate-y-1
                        `}
                    >
                        <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-900 shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <method.icon size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-1 opacity-90">{method.label}</h3>
                        <div className="flex items-center gap-2 opacity-75 font-medium text-sm md:text-base dir-ltr">
                            <span>{method.value}</span>
                            <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </motion.a>
                );
            })}
        </div>

        {/* Contact Form */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-2xl mx-auto text-start"
        >
             <form onSubmit={handleSubmit} className="space-y-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-8 md:p-10 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm relative overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {content.contactName}
                        </label>
                        <input 
                            type="text" 
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all dark:text-white"
                            placeholder={language === Language.EN ? "John Doe" : "الاسم الكريم"}
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {content.contactEmail}
                        </label>
                        <input 
                            type="email" 
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all dark:text-white"
                            placeholder="john@example.com"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {content.contactMessage}
                    </label>
                    <textarea 
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all resize-none dark:text-white"
                        placeholder={language === Language.EN ? "Tell me about your project..." : "أخبرني عن مشروعك..."}
                    />
                </div>

                <div className="flex flex-col items-center gap-4">
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full md:w-auto px-8 py-3 bg-brand-purple hover:bg-brand-pink text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                <span>{language === Language.EN ? "Sending..." : "جاري الإرسال..."}</span>
                            </>
                        ) : (
                            <>
                                <span>{content.contactSend}</span>
                                <Send size={18} className={dir === 'rtl' ? 'rotate-180' : ''} />
                            </>
                        )}
                    </button>
                    
                    {/* Success Message */}
                    <AnimatePresence>
                        {isSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-lg"
                            >
                                <CheckCircle size={18} />
                                <span className="font-medium text-sm">{content.contactSuccess}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
             </form>
        </motion.div>

        {/* Social Links */}
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="pt-8 border-t border-gray-100 dark:border-gray-800"
        >
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">{content.socials}</h3>
            <div className="flex justify-center items-center gap-6">
                {socialLinks.map((social, idx) => (
                    <a 
                        key={idx}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                            p-4 bg-gray-50 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 
                            transition-all duration-300 hover:bg-white dark:hover:bg-gray-700 hover:shadow-lg hover:-translate-y-1
                            ${social.color}
                        `}
                        aria-label={social.label}
                    >
                        <social.icon size={24} />
                    </a>
                ))}
            </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Contact;