import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useLanguage } from '../components/LanguageContext';
import { TEXTS, PROJECTS } from '../constants';
import SEO from '../components/SEO';
import { Language, Project } from '../types';
import { ArrowUpRight, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Flow Line Illustration
const FlowLine = () => (
    <div className="absolute top-1/2 left-0 w-full h-[500px] -translate-y-1/2 pointer-events-none z-0 opacity-[0.04] dark:opacity-[0.06] overflow-hidden">
        <svg width="100%" height="100%" preserveAspectRatio="none">
            <path 
                d="M0,250 C300,100 800,400 1200,250 S1800,100 2400,250" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                className="text-gray-900 dark:text-white"
            />
             <path 
                d="M0,280 C300,130 800,430 1200,280 S1800,130 2400,280" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1" 
                strokeDasharray="10 10"
                className="text-brand-pink"
            />
        </svg>
    </div>
);

const PortfolioItem: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const { language } = useLanguage();
  
  return (
    <div 
      className="group relative flex-shrink-0 w-[85vw] md:w-[600px] h-[60vh] md:h-[70vh] flex flex-col gap-6 snap-center z-10"
    >
      {/* Image Container (Cover) */}
      <div className="relative w-full h-full overflow-hidden rounded-[2rem] bg-gray-100 dark:bg-gray-800 shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
        
        {/* Main Clickable Area linked to Detail Page */}
        <Link to={`/portfolio/${project.id}`} className="absolute inset-0 block">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            
            {/* View Project Button (Center) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                    <ArrowUpRight size={32} />
                </div>
            </div>
        </Link>
        
        {/* Floating Category Tag */}
        <div className="absolute top-8 left-8 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest pointer-events-none">
           {project.category}
        </div>

        {/* Live Demo Button - Only if liveUrl exists */}
        {project.liveUrl && (
            <a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-8 right-8 z-20 flex items-center gap-2 bg-white/20 hover:bg-brand-pink backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105"
            >
                <span>{language === Language.EN ? 'Live Demo' : 'معاينة حية'}</span>
                <ArrowUpRight size={14} />
            </a>
        )}

        {/* Bottom Text Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none z-10">
            <div className="flex justify-between items-end">
                <div>
                     <h2 className="text-3xl md:text-5xl font-bold mb-3 leading-tight">
                        {project.title}
                     </h2>
                     <p className="text-white/80 max-w-sm text-sm md:text-base line-clamp-2">
                        {language === Language.EN ? project.descriptionEn : project.descriptionAr}
                     </p>
                </div>
                <span className="text-6xl font-sans font-light opacity-20 hidden md:block">
                    0{project.id}
                </span>
            </div>
        </div>
      </div>
    </div>
  );
};

const Portfolio: React.FC = () => {
  const { language, dir } = useLanguage();
  const content = language === Language.EN ? TEXTS.en : TEXTS.ar;
  const targetRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Smooth spring for the transform to avoid jitter
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Calculate horizontal scroll distance based on number of items
  // Adjust range based on direction (RTL vs LTR)
  // Range increased slightly to ensure visibility of last items
  const x = useTransform(smoothProgress, [0, 1], dir === 'rtl' ? ["1%", "55%"] : ["1%", "-55%"]);

  const scrollToProject = (direction: 'next' | 'prev') => {
    // Desktop Logic: Scroll Window relative to Sticky Section
    if (window.innerWidth >= 1024 && targetRef.current) {
        const element = targetRef.current;
        const sectionTop = element.offsetTop;
        const sectionHeight = element.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollableDistance = sectionHeight - windowHeight;
        
        // If not yet at the section, jump to it
        if (window.scrollY < sectionTop - 100) {
            window.scrollTo({ top: sectionTop, behavior: 'smooth' });
            return;
        }

        const currentScroll = window.scrollY;
        const relativeScroll = currentScroll - sectionTop;
        
        // Current progress (0 to 1)
        let progress = relativeScroll / scrollableDistance;
        progress = Math.max(0, Math.min(1, progress));
        
        const totalItems = PROJECTS.length;
        // Step size for each project
        const step = 1 / (totalItems - 1);
        
        // Find closest index
        let targetIndex = Math.round(progress / step);
        
        if (direction === 'next') targetIndex++;
        else targetIndex--;
        
        // Clamp
        targetIndex = Math.max(0, Math.min(totalItems - 1, targetIndex));
        
        const targetScroll = sectionTop + (targetIndex * step * scrollableDistance);
        
        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
    } 
    // Mobile Logic: Scroll Horizontal Container
    else if (mobileContainerRef.current) {
        const container = mobileContainerRef.current;
        const cardWidth = container.firstElementChild?.clientWidth || 300;
        const gap = 24; // gap-6 is 24px
        const scrollAmount = cardWidth + gap;
        const currentLeft = container.scrollLeft;
        
        const targetLeft = dir === 'rtl'
            ? (direction === 'next' ? currentLeft - scrollAmount : currentLeft + scrollAmount) // RTL logic might vary by browser implementation of scrollLeft, usually negative or increasing left. 
            // Safer to assume standard scrollLeft behavior for now or use scrollBy
            : (direction === 'next' ? currentLeft + scrollAmount : currentLeft - scrollAmount);
            
        // For RTL specific browser inconsistencies, scrollBy is often safer or checking normalized scroll
        // Simple approach:
        if (dir === 'rtl') {
             // In many modern browsers RTL scrollLeft is negative or starts at 0 and goes negative.
             // We'll use scrollBy for simplicity
             container.scrollBy({ left: direction === 'next' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        } else {
             container.scrollBy({ left: direction === 'next' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
        }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen relative overflow-hidden">
      <SEO 
          titleEn="Portfolio" 
          titleAr="أعمالي"
          descriptionEn="Explore a curated selection of branding, packaging, and visual identity projects."
          descriptionAr="استكشف مجموعة مختارة من مشاريع الهوية البصرية، التغليف، والعلامات التجارية."
      />
      {/* HEADER SECTION */}
      <div className="container mx-auto px-6 pt-20 md:pt-24 pb-10 relative z-10">
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
         >
            <h1 className="text-5xl md:text-8xl font-bold text-gray-900 dark:text-white mb-8">
                {content.portfolioTitle}
                <span className="text-brand-purple">.</span>
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
                {language === Language.EN 
                    ? "A curated selection of projects that define brands and drive results." 
                    : "مجموعة مختارة من المشاريع التي تحدد العلامات التجارية وتحقق النتائج."}
            </p>
            
            {/* Scroll Indicator Hint */}
            <div className="hidden lg:flex items-center gap-3 mt-12 text-gray-400 text-sm font-medium animate-pulse">
                {dir === 'rtl' ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                <span>{language === Language.EN ? "Scroll to explore" : "مرر للاستكشاف"}</span>
            </div>
         </motion.div>
      </div>

      {/* DESKTOP: STICKY HORIZONTAL SCROLL */}
      <section ref={targetRef} className="hidden lg:block relative h-[300vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            
           {/* Background Flow Line */}
           <FlowLine />

           <motion.div 
              style={{ x }}
              className="flex gap-12 w-max px-[5vw] relative z-10"
           >
              {PROJECTS.map((project, index) => (
                  <PortfolioItem key={project.id} project={project} index={index} />
              ))}
              {/* Extra space at the end to ensure full scroll visibility */}
              <div className="w-[20vw]" />
           </motion.div>

           {/* Desktop Navigation Arrows */}
           <div className="absolute bottom-12 right-12 z-20 flex gap-4 rtl:left-12 rtl:right-auto">
               <button 
                  onClick={() => scrollToProject('prev')}
                  className="w-14 h-14 rounded-full border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md flex items-center justify-center hover:bg-brand-pink hover:border-brand-pink hover:text-white transition-all duration-300 shadow-lg"
                  aria-label="Previous Project"
               >
                   <ChevronLeft size={24} className={dir === 'rtl' ? 'rotate-180' : ''} />
               </button>
               <button 
                  onClick={() => scrollToProject('next')}
                  className="w-14 h-14 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center hover:bg-brand-purple hover:text-white dark:hover:bg-brand-pink dark:hover:text-white transition-all duration-300 shadow-lg"
                  aria-label="Next Project"
               >
                   <ChevronRight size={24} className={dir === 'rtl' ? 'rotate-180' : ''} />
               </button>
           </div>
        </div>
      </section>

      {/* MOBILE: SNAP CAROUSEL */}
      <section className="lg:hidden pb-20 relative">
         <div 
            ref={mobileContainerRef}
            className="flex overflow-x-auto gap-6 px-6 pb-12 snap-x snap-mandatory scrollbar-hide relative z-10"
         >
            {PROJECTS.map((project, index) => (
                <PortfolioItem key={project.id} project={project} index={index} />
            ))}
         </div>
         
         {/* Mobile Navigation Controls */}
         <div className="container mx-auto px-6 flex items-center justify-between mt-4">
             {/* Pagination Dots */}
             <div className="flex gap-2">
                 {PROJECTS.map((_, i) => (
                     <div key={i} className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700" />
                 ))}
             </div>

             {/* Arrows */}
             <div className="flex gap-3">
                 <button 
                    onClick={() => scrollToProject('prev')}
                    className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm active:scale-95 transition-transform"
                 >
                     <ChevronLeft size={20} className={dir === 'rtl' ? 'rotate-180' : ''} />
                 </button>
                 <button 
                    onClick={() => scrollToProject('next')}
                    className="w-12 h-12 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center shadow-md active:scale-95 transition-transform"
                 >
                     <ChevronRight size={20} className={dir === 'rtl' ? 'rotate-180' : ''} />
                 </button>
             </div>
         </div>
      </section>

    </div>
  );
};

export default Portfolio;