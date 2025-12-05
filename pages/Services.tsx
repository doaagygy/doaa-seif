import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../components/LanguageContext';
import { TEXTS, SERVICES, PROJECTS } from '../constants';
import SEO from '../components/SEO';
import { Language } from '../types';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

// Geometric Illustrations
const GeometricShapes = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Wireframe Cube */}
        <motion.div 
            className="absolute top-20 left-10 opacity-[0.03] dark:opacity-[0.05] text-brand-purple"
            animate={{ rotate: 360, y: [0, 20, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
             <svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="20" y="20" width="60" height="60" />
                <rect x="30" y="10" width="60" height="60" strokeDasharray="4 4" />
             </svg>
        </motion.div>

        {/* Dashed Circle */}
        <motion.div 
            className="absolute bottom-40 right-10 opacity-[0.03] dark:opacity-[0.05] text-brand-pink"
            animate={{ rotate: -360, scale: [1, 1.1, 1] }}
            transition={{ rotate: { duration: 40, repeat: Infinity, ease: "linear" }, scale: { duration: 10, repeat: Infinity } }}
        >
             <svg width="250" height="250" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
                <circle cx="50" cy="50" r="40" strokeDasharray="8 8" />
                <circle cx="50" cy="50" r="20" />
             </svg>
        </motion.div>
    </div>
);

const Services: React.FC = () => {
  const { language } = useLanguage();
  const content = language === Language.EN ? TEXTS.en : TEXTS.ar;
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleService = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Section 2 Logic
  const sectionBodyVariant = {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
  };

  const listContainerVariant = {
      hidden: {},
      visible: {
          transition: { staggerChildren: 0.1 }
      }
  };

  const itemRevealVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } }
  };

  // Helper to find related projects
  const getRelatedProjects = (serviceId: number) => {
    switch(serviceId) {
        case 1: return PROJECTS.filter(p => p.category === 'Branding' || p.category === 'Visual Strategy');
        case 2: return PROJECTS.filter(p => p.category === 'Branding');
        case 3: return PROJECTS.filter(p => p.category === 'Visual Strategy' || p.category === 'Branding');
        case 4: return PROJECTS.filter(p => p.category === 'Packaging' || p.category === 'Visual Strategy');
        default: return PROJECTS.slice(0, 2);
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionBodyVariant}
      className="relative w-full py-16 md:py-24 px-6 container mx-auto flex flex-col justify-center"
    >
      <SEO 
          titleEn="Services" 
          titleAr="خدماتي"
          descriptionEn="Professional graphic design services including Logo Design, Visual Identity, Brand Strategy, and Visual Communication."
          descriptionAr="خدمات تصميم جرافيك احترافية تشمل تصميم الشعارات، الهوية البصرية، استراتيجية العلامة التجارية، والتواصل البصري."
      />
      <GeometricShapes />

      <div className="max-w-4xl mx-auto w-full z-10 relative">
        <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-16 text-center"
        >
          {content.servicesTitle}<span className="text-brand-purple">.</span>
        </motion.h1>

        <motion.div 
            variants={listContainerVariant}
            className="space-y-6"
        >
          {SERVICES.map((service) => {
            const isExpanded = expandedId === service.id;
            const relatedProjects = getRelatedProjects(service.id).slice(0, 2);

            return (
              <motion.div
                key={service.id}
                variants={itemRevealVariant}
                className={`
                  group relative
                  bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden
                  transition-all duration-300
                  ${isExpanded ? 'shadow-lg ring-1 ring-brand-purple/20' : 'hover:shadow-md'}
                `}
              >
                {/* Header / Trigger */}
                <div 
                  onClick={() => toggleService(service.id)}
                  className="flex items-center justify-between p-6 md:p-8 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-4 md:gap-6">
                      <span className="text-sm font-bold text-brand-pink/50">0{service.id}</span>
                      <h3 className={`text-xl md:text-3xl font-medium transition-colors duration-300 ${isExpanded ? 'text-brand-purple dark:text-brand-pink' : 'text-gray-800 dark:text-gray-100'}`}>
                        {language === Language.EN ? service.titleEn : service.titleAr}
                      </h3>
                      
                      {/* Animated Arrow on Hover */}
                      <ArrowUpRight 
                        className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:rotate-45 transition-all duration-300 text-brand-purple dark:text-brand-pink hidden md:block" 
                        size={28} 
                      />
                  </div>
                  
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300
                    ${isExpanded ? 'bg-brand-pink text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}
                  `}>
                     {isExpanded ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-8 border-t border-gray-100 dark:border-gray-700/50">
                        {/* Description */}
                        <div className="pt-6 mb-8">
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                                {language === Language.EN ? service.descriptionEn : service.descriptionAr}
                            </p>
                        </div>

                        {/* Related Work */}
                        {relatedProjects.length > 0 && (
                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                                    {language === Language.EN ? 'Related Work' : 'أعمال ذات صلة'}
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {relatedProjects.map((project) => (
                                        <Link 
                                            key={project.id} 
                                            to={`/portfolio/${project.id}`}
                                            className="group/item relative aspect-square rounded-xl overflow-hidden bg-gray-100"
                                        >
                                            <img 
                                                src={project.imageUrl} 
                                                alt={project.title} 
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center">
                                                <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 group-hover/item:scale-110 transition-transform duration-300">
                                                    <ArrowUpRight 
                                                        className="text-white transition-all duration-300 group-hover/item:rotate-45 group-hover/item:text-brand-pink" 
                                                        size={24} 
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Services;