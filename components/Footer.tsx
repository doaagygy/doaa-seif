import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { NAV_ITEMS, TEXTS } from '../constants';
import { Language } from '../types';
import { Instagram, Linkedin, Mail } from 'lucide-react';

const XIcon = ({ size = 20, className }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const content = language === Language.EN ? TEXTS.en : TEXTS.ar;

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/doaaseif_', label: 'Instagram' },
    { icon: XIcon, href: 'https://x.com/doaaseif_', label: 'X' },
    { icon: Mail, href: 'mailto:doaaseifofficial@gmail.com', label: 'Email' }
  ];

  return (
    <footer className="w-full bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 pt-16 pb-8 px-6 transition-colors duration-300 relative z-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand Column */}
            <div className="space-y-4">
                <Link to="/" className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Doaa Seif<span className="text-brand-pink">.</span>
                </Link>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
                    {language === Language.EN 
                        ? "Graphic Designer specializing in visual identity and brand strategy." 
                        : "مصممة جرافيك متخصصة في الهوية البصرية واستراتيجية العلامة التجارية."}
                </p>
            </div>

            {/* Links Column */}
            <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-6">
                    {language === Language.EN ? "Menu" : "القائمة"}
                </h3>
                <ul className="space-y-3">
                    {NAV_ITEMS.map(item => (
                        <li key={item.id}>
                            <NavLink 
                                to={item.path} 
                                className="text-gray-500 dark:text-gray-400 hover:text-brand-purple dark:hover:text-brand-pink transition-colors text-sm"
                            >
                                {language === Language.EN ? item.labelEn : item.labelAr}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Socials Column */}
            <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-6">
                    {content.socials}
                </h3>
                <div className="flex gap-4">
                    {socialLinks.map((social, idx) => (
                        <a 
                            key={idx}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-brand-purple hover:text-white dark:hover:bg-brand-pink transition-all duration-300 shadow-sm"
                            aria-label={social.label}
                        >
                            <social.icon size={18} />
                        </a>
                    ))}
                </div>
                <div className="mt-6 text-gray-500 dark:text-gray-400 text-sm space-y-2">
                    <p className="flex items-center gap-2">
                        <span className="opacity-70">doaaseifofficial@gmail.com</span>
                    </p>
                    <p className="flex items-center gap-2 dir-ltr">
                        <span className="opacity-70">+966 55 623 8507</span>
                    </p>
                </div>
            </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <p>
                &copy; {new Date().getFullYear()} Doaa Seif. {language === Language.EN ? "All rights reserved." : "جميع الحقوق محفوظة."}
            </p>
            <p>
                {language === Language.EN ? "Designed & Developed with Passion." : "صمم وطور بشغف."}
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;