import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../components/LanguageContext';
import { PROJECTS, TEXTS } from '../constants';
import SEO from '../components/SEO';
import { Language, GalleryItem } from '../types';
import { ArrowLeft, ArrowRight, X, ChevronLeft, ChevronRight, Maximize2, Info } from 'lucide-react';

// Animation constants for swipe
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

// Continuous Parallax Image Component
const ParallaxImage: React.FC<{ 
  item: GalleryItem; 
  index: number; 
  onClick: () => void;
}> = ({ item, index, onClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const [showDetails, setShowDetails] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect: image moves slightly within its container
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  // Subtle scale effect for breathing room
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  const caption = language === Language.EN ? item.captionEn : item.captionAr;

  return (
    <div 
        ref={containerRef}
        className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden cursor-zoom-in group"
        onClick={onClick}
    >
        {/* Parallax Image Container */}
        <motion.div 
            style={{ y, scale }} 
            className="w-full h-[130%] -mt-[15%] relative will-change-transform"
        >
            <img 
                src={item.url} 
                alt={`Gallery ${index}`} 
                className="w-full h-full object-cover"
            />
        </motion.div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none z-10" />
        
        {/* Maximize Icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="bg-white/90 dark:bg-gray-900/90 p-4 rounded-full opacity-0 transform scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-lg">
                <Maximize2 size={24} className="text-gray-900 dark:text-white" />
            </div>
        </div>

        {/* Info Toggle Button */}
        {caption && (
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setShowDetails(!showDetails);
                }}
                className={`absolute top-6 right-6 z-30 p-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 border border-white/20 shadow-lg
                    ${showDetails ? 'bg-brand-pink text-white' : 'bg-black/20 hover:bg-black/40 text-white'}
                `}
                aria-label="Toggle details"
            >
                <Info size={20} />
            </button>
        )}

        {/* Caption Overlay */}
        <AnimatePresence>
            {showDetails && caption && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ type: "spring", damping: 20 }}
                    className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white z-20 text-start"
                >
                    <p className="text-xl md:text-2xl font-medium leading-relaxed max-w-4xl drop-shadow-lg">
                        {caption}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
};

// Enhanced Lightbox Component
const Lightbox: React.FC<{
  images: GalleryItem[];
  initialIndex: number;
  onClose: () => void;
}> = ({ images, initialIndex, onClose }) => {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0); // 0 for initial, -1 for prev, 1 for next
  const { language, dir } = useLanguage();

  const handleNext = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') dir === 'rtl' ? handlePrev() : handleNext();
      if (e.key === 'ArrowLeft') dir === 'rtl' ? handleNext() : handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, onClose, dir]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction === 0 ? 0 : (direction > 0 ? 500 : -500),
      opacity: 0,
      scale: direction === 0 ? 0.5 : 0.8,
      filter: "blur(8px)",
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction === 0 ? 0 : (direction < 0 ? 500 : -500),
      opacity: 0,
      scale: 0.8,
      filter: "blur(8px)",
    })
  };

  const currentImage = images[index];
  const currentCaption = language === Language.EN ? currentImage.captionEn : currentImage.captionAr;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center overflow-hidden"
      onClick={onClose}
    >
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-20"
      >
        <X size={32} />
      </button>

      {/* Navigation Buttons */}
      <button
        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
        className="absolute left-4 md:left-8 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-20 hidden md:block"
      >
        <ChevronLeft size={40} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); handleNext(); }}
        className="absolute right-4 md:right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-20 hidden md:block"
      >
        <ChevronRight size={40} />
      </button>

      {/* Main Image */}
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-20" onClick={(e) => e.stopPropagation()}>
        <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={index}
              src={currentImage.url}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.3 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  handleNext();
                } else if (swipe > swipeConfidenceThreshold) {
                  handlePrev();
                }
              }}
              alt={`Gallery view ${index}`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl cursor-grab active:cursor-grabbing"
            />
          </AnimatePresence>
        </div>
        
        {/* Caption & Counter */}
        <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4 z-20 pointer-events-none">
            <AnimatePresence mode="wait">
                {currentCaption && (
                    <motion.div 
                        key={`caption-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-black/40 backdrop-blur-md px-6 py-3 rounded-xl max-w-xl text-center"
                    >
                        <p className="text-white/90 font-medium text-lg leading-snug">
                            {currentCaption}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <div className="bg-black/50 px-4 py-1.5 rounded-full text-white/70 text-sm font-medium backdrop-blur-md">
                {index + 1} / {images.length}
            </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const { language, dir } = useLanguage();
  const content = language === Language.EN ? TEXTS.en : TEXTS.ar;
  
  const project = PROJECTS.find(p => p.id === Number(id));
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  if (!project) {
    return (
        <div className="min-h-screen flex items-center justify-center text-xl">
            Project not found
        </div>
    );
  }

  const currentIndex = PROJECTS.findIndex(p => p.id === project.id);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
      <SEO 
        titleEn={project.title} 
        titleAr={project.title}
        descriptionEn={project.descriptionEn}
        descriptionAr={project.descriptionAr}
      />
      
      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxOpen && project.gallery && (
          <Lightbox 
            images={project.gallery} 
            initialIndex={currentImageIndex} 
            onClose={() => setLightboxOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* HEADER / BACK */}
      <div className="pt-24 px-6 container mx-auto mb-12">
        <Link 
            to="/portfolio" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-purple transition-colors font-medium"
        >
            {dir === 'ltr' ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
            {content.back}
        </Link>
      </div>

      {/* HERO SECTION */}
      <div className="px-6 container mx-auto mb-20">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
         >
             <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[2px] bg-brand-pink"></span>
                <span className="text-brand-pink uppercase tracking-widest font-bold text-sm">
                    {project.category}
                </span>
             </div>
             
             <h1 className="text-5xl md:text-8xl font-bold text-gray-900 dark:text-white mb-12">
                {project.title}
             </h1>

             {/* Meta Data Grid */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 border-t border-gray-200 dark:border-gray-800 pt-8">
                 <div>
                    <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">{content.client}</h3>
                    <p className="text-xl font-medium text-gray-900 dark:text-white">{project.client || 'Confidential'}</p>
                 </div>
                 <div>
                    <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">{content.year}</h3>
                    <p className="text-xl font-medium text-gray-900 dark:text-white">{project.year || '2024'}</p>
                 </div>
                 <div>
                    <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">{content.services}</h3>
                    <p className="text-xl font-medium text-gray-900 dark:text-white">
                        {project.services?.join(', ') || project.category}
                    </p>
                 </div>
             </div>
         </motion.div>
      </div>

      {/* BRIEF DESCRIPTION */}
      <div className="bg-gray-50 dark:bg-gray-800/50 py-20">
          <div className="container mx-auto px-6">
              <motion.div 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 viewport={{ once: true }}
                 className="max-w-4xl"
              >
                  <p className="text-2xl md:text-3xl leading-relaxed text-gray-800 dark:text-gray-200 font-light whitespace-pre-line">
                      {language === Language.EN ? project.longDescriptionEn : project.longDescriptionAr}
                  </p>
              </motion.div>
          </div>
      </div>

      {/* CONTINUOUS PARALLAX GALLERY - FULL WIDTH */}
      <div ref={containerRef} className="py-20">
         <div className="container mx-auto px-6 mb-12 text-center md:text-start">
             <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                 {language === Language.EN ? "Project Gallery" : "معرض المشروع"}
             </h2>
             <p className="text-gray-500">
                 {language === Language.EN ? "Scroll to explore the visual story." : "قم بالتمرير لاستكشاف القصة البصرية."}
             </p>
         </div>

         {project.gallery && project.gallery.length > 0 ? (
             <div className="flex flex-col gap-0 w-full">
                 {project.gallery.map((item, index) => (
                     <ParallaxImage 
                        key={index} 
                        item={item}
                        index={index} 
                        onClick={() => openLightbox(index)}
                     />
                 ))}
             </div>
         ) : (
             // Fallback if no gallery, show main image
             <div 
                className="w-full aspect-video cursor-zoom-in relative group"
                onClick={() => openLightbox(0)}
             >
                 <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                    <Maximize2 className="text-white w-12 h-12 drop-shadow-lg" />
                 </div>
             </div>
         )}
      </div>

      {/* NEXT PROJECT NAVIGATION */}
      <Link to={`/portfolio/${nextProject.id}`} className="block group relative bg-black dark:bg-white overflow-hidden py-32 cursor-pointer">
          <div className="absolute inset-0 opacity-40">
             <img src={nextProject.imageUrl} className="w-full h-full object-cover blur-sm group-hover:scale-105 transition-transform duration-1000" alt="Next" />
             <div className="absolute inset-0 bg-black/60 dark:bg-white/80" />
          </div>
          
          <div className="relative container mx-auto px-6 text-center z-10">
              <p className="text-gray-300 dark:text-gray-600 uppercase tracking-widest text-sm mb-4">
                  {content.nextProject}
              </p>
              <h2 className="text-5xl md:text-7xl font-bold text-white dark:text-gray-900 group-hover:text-brand-pink transition-colors">
                  {nextProject.title}
              </h2>
          </div>
      </Link>

    </div>
  );
};

export default ProjectDetail;