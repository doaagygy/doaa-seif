import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { useLanguage } from '../components/LanguageContext';
import { TEXTS } from '../constants';
import SEO from '../components/SEO';
import { Language } from '../types';

// Illustration Component: Creative Spark
const CreativeSpark = () => (
    <motion.svg 
        viewBox="0 0 200 200" 
        className="absolute -top-20 -right-20 md:top-0 md:right-0 w-64 h-64 md:w-96 md:h-96 opacity-[0.04] dark:opacity-[0.06] text-gray-900 dark:text-white pointer-events-none z-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
    >
        <path fill="currentColor" d="M100 0 L112 88 L200 100 L112 112 L100 200 L88 112 L0 100 L88 88 Z" />
        <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" fill="none" />
    </motion.svg>
);

const Counter = ({ to, className }: { to: number; className: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-10%" });

  useEffect(() => {
    const node = nodeRef.current;
    if (inView && node) {
      const controls = animate(0, to, {
        duration: 2.5,
        ease: "circOut",
        onUpdate(value) {
          node.textContent = Math.round(value) + "+";
        },
      });
      return () => controls.stop();
    }
  }, [to, inView]);

  return <span ref={nodeRef} className={className}>0+</span>;
};

const About: React.FC = () => {
  const { language } = useLanguage();
  const content = language === Language.EN ? TEXTS.en : TEXTS.ar;

  // Section 1 Specs:
  const sectionBodyVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" }
    }
  };

  const sectionTitleVariant = {
      hidden: { opacity: 0, y: 15 },
      visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.3, delay: 0.1, ease: "easeOut" }
      }
  };

  const scrollRevealVariant = {
      hidden: { opacity: 0, y: 20 },
      visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.35, ease: "easeOut" }
      }
  };

  return (
    <div className="relative w-full py-16 md:py-24 px-6 container mx-auto flex flex-col justify-center overflow-hidden">
      <SEO 
          titleEn="About Me" 
          titleAr="من أنا"
          descriptionEn="Learn more about Doaa Seif, her experience, and her approach to graphic design and creative direction."
          descriptionAr="تعرف أكثر على دعاء سيف، خبرتها، ونهجها في تصميم الجرافيك والإخراج الإبداعي."
      />
      {/* Background Illustration */}
      <CreativeSpark />

      <div className="max-w-3xl mx-auto space-y-12 relative z-10">
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={sectionBodyVariant}
        >
          <motion.h1 
            variants={sectionTitleVariant}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8"
          >
            {content.aboutTitle}
            <span className="block w-20 h-1 bg-brand-pink mt-4 rounded-full"></span>
          </motion.h1>
        
          <div className="space-y-8 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            <motion.p variants={scrollRevealVariant}>
              {content.aboutText1}
            </motion.p>
            <motion.p
              variants={scrollRevealVariant}
              transition={{ delay: 0.1 }}
            >
              {content.aboutText2}
            </motion.p>
          </div>

          {/* Stats */}
          <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.2 } }
              }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-gray-100 dark:border-gray-800"
          >
            <motion.div variants={scrollRevealVariant} className="text-center md:text-start">
                <Counter to={5} className="block text-3xl font-bold text-brand-purple dark:text-brand-pink" />
                <span className="text-sm text-gray-500 dark:text-gray-400">{language === Language.EN ? 'Years Exp' : 'سنوات خبرة'}</span>
            </motion.div>
            <motion.div variants={scrollRevealVariant} className="text-center md:text-start">
                <Counter to={200} className="block text-3xl font-bold text-brand-pink" />
                <span className="text-sm text-gray-500 dark:text-gray-400">{language === Language.EN ? 'Projects' : 'مشروع'}</span>
            </motion.div>
            <motion.div variants={scrollRevealVariant} className="text-center md:text-start">
                <Counter to={70} className="block text-3xl font-bold text-brand-purple dark:text-brand-pink" />
                <span className="text-sm text-gray-500 dark:text-gray-400">{language === Language.EN ? 'Clients' : 'عميل'}</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;