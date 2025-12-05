import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Moon, Sun } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useTheme } from './ThemeContext';
import { NAV_ITEMS } from '../constants';
import { Language } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const { language, toggleLanguage, dir } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const ThemeToggle = () => (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
      }`}
      aria-label={language === Language.EN ? "Toggle theme" : "تبديل المظهر"}
    >
      <span
        className={`${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-300 ease-in-out flex items-center justify-center`}
      >
        {theme === 'dark' ? (
          <Moon size={12} className="text-brand-purple" />
        ) : (
          <Sun size={12} className="text-orange-400" />
        )}
      </span>
    </button>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 border-b border-gray-100 dark:border-gray-800 h-20 flex items-center transition-colors duration-300">
      <div className="container mx-auto px-6 flex justify-between items-center w-full">
        {/* Logo/Name */}
        <NavLink to="/" className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white z-50">
          Doaa Seif<span className="text-brand-pink">.</span>
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-brand-purple dark:hover:text-brand-pink ${
                  isActive ? 'text-brand-pink' : 'text-gray-600 dark:text-gray-300'
                }`
              }
            >
              {language === Language.EN ? item.labelEn : item.labelAr}
            </NavLink>
          ))}
          
          <div className="flex items-center gap-4 ml-4 rtl:mr-4 border-l rtl:border-l-0 rtl:border-r border-gray-200 dark:border-gray-700 pl-4 rtl:pr-4">
            <ThemeToggle />

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-brand-purple dark:hover:text-brand-pink transition-colors"
            >
              <Globe size={16} />
              <span>{language === Language.EN ? 'عربي' : 'EN'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center md:hidden z-50 gap-4">
           <ThemeToggle />
           <button
            onClick={toggleLanguage}
            className="text-gray-900 dark:text-white"
          >
             <span className="font-bold text-sm">{language === Language.EN ? 'AR' : 'EN'}</span>
          </button>
          <button onClick={toggleMenu} className="text-gray-900 dark:text-white focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: dir === 'rtl' ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: dir === 'rtl' ? '-100%' : '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className={`fixed inset-0 bg-white dark:bg-gray-900 z-40 flex flex-col justify-center items-center space-y-8 md:hidden`}
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `text-2xl font-semibold transition-colors ${
                    isActive ? 'text-brand-pink' : 'text-gray-800 dark:text-gray-200'
                  }`
                }
              >
                {language === Language.EN ? item.labelEn : item.labelAr}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;