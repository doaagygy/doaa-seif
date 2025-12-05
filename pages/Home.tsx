import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { TEXTS } from '../constants';
import HeroVisual from '../components/HeroVisual';
import SEO from '../components/SEO';
import { Language } from '../types';
import About from './About';
import Portfolio from './Portfolio';
import Services from './Services';
import Contact from './Contact';

const Home: React.FC = () => {
  const { language, dir } = useLanguage();
  const content = language === Language.EN ? TEXTS.en : TEXTS.ar;

  // Specific Hero Variants based on Motion Script
  const textVariant = {
    hidden: { opacity: 0, y: 15 },
    visible: (customDelay: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: customDelay, 
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  const buttonVariant = {
    hidden: { opacity: 0, y: 18 },
    visible: { 
      opacity: 1,
      y: 0, 
      transition: { 
        delay: 0.3, 
        duration: 0.25,
        ease: "easeOut"
      }
    },
    hover: { 
      scale: 1.04, 
      y: -4,
      transition: { duration: 0.18, ease: "easeOut" }
    },
    tap: { 
      scale: 0.96,
      transition: { duration: 0.08 }
    }
  };

  return (
    <div className="flex flex-col w-full overflow-hidden bg-white dark:bg-gray-900">
        <SEO 
            titleEn="Home"
            titleAr="الرئيسية"
            descriptionEn="Doaa Seif is a Graphic Designer specializing in brand strategy and visual identity design."
            descriptionAr="دعاء سيف هي مصممة جرافيك متخصصة في استراتيجية العلامة التجارية وتصميم الهوية البصرية."
        />
        
        {/* HERO SECTION */}
        <div className="min-h-screen pt-20 flex flex-col justify-center relative z-0">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full min-h-[calc(100vh-80px)]">
                {/* Text Section */}
                <div className={`order-2 lg:order-1 flex flex-col items-center ${dir === 'rtl' ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left'} text-center space-y-6`}>
                    <motion.h1
                        custom={0.1} // Delay 0.1s
                        variants={textVariant}
                        initial="hidden"
                        animate="visible"
                        className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white"
                    >
                        {content.name}
                    </motion.h1>
                    
                    <motion.h2
                        custom={0.2} // Delay 0.2s (0.1s after main text)
                        variants={textVariant}
                        initial="hidden"
                        animate="visible"
                        className="text-2xl md:text-3xl font-light text-brand-purple dark:text-brand-pink"
                    >
                        {content.role}
                    </motion.h2>

                    <motion.p
                        custom={0.25} 
                        variants={textVariant}
                        initial="hidden"
                        animate="visible"
                        className="text-gray-600 dark:text-gray-300 max-w-lg text-lg leading-relaxed"
                    >
                        {content.positioning}
                    </motion.p>
                    
                    <motion.div
                        variants={buttonVariant}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <Link 
                            to="/contact" 
                            className="inline-block px-8 py-3 bg-brand-purple text-white rounded-full font-medium shadow-lg hover:bg-brand-pink transition-colors duration-300"
                        >
                            {language === Language.EN ? "Let's Talk" : "تواصل معي"}
                        </Link>
                    </motion.div>
                </div>

                {/* Visual Section */}
                <div className="order-1 lg:order-2 flex justify-center items-center h-full max-h-[500px] w-full">
                    <HeroVisual />
                </div>
            </div>
        </div>

        {/* OTHER SECTIONS */}
        <About />
        <Portfolio />
        <Services />
        <Contact />
    </div>
  );
};

export default Home;