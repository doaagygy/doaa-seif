import React from 'react';
import { motion } from 'framer-motion';

const FloatingShapes: React.FC = () => {
  // Background breathing light effect
  const breathingLight = {
    animate: { opacity: [0.05, 0.08, 0.05] },
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {/* 1. NOISE TEXTURE OVERLAY - Adds a premium 'print' feel */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] z-0 mix-blend-overlay">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <filter id="noiseFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
            </svg>
        </div>

        {/* 2. DOT GRID PATTERN - Technical/Design Blueprint feel */}
        <div 
            className="absolute inset-0 z-0" 
            style={{ 
                backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', 
                backgroundSize: '40px 40px', 
                opacity: 0.03 
            }} 
        />

      {/* 3. ORGANIC GRADIENT SHAPES */}
      
      {/* Large Pink Blob - Top Left */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[60vh] h-[60vh] bg-gradient-to-br from-brand-pink/10 to-transparent rounded-full blur-[80px]"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Large Purple Blob - Bottom Right */}
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[70vh] h-[70vh] bg-gradient-to-tl from-brand-purple/10 to-transparent rounded-full blur-[100px]"
        animate={{
          x: [0, -40, 0],
          y: [0, -60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Global Lighting Pulse */}
      <motion.div 
         className="absolute inset-0 bg-white dark:bg-black mix-blend-overlay pointer-events-none"
         animate={breathingLight.animate}
         transition={breathingLight.transition}
      />

      {/* 4. GEOMETRIC ACCENTS */}
      
      {/* Floating Circle outline */}
      <motion.div
        className="absolute top-[20%] right-[10%] w-64 h-64 border border-brand-pink/5 dark:border-brand-pink/10 rounded-full"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Triangle (SVG) */}
      <motion.div
        className="absolute bottom-[30%] left-[5%] opacity-10 dark:opacity-20 text-brand-purple"
        animate={{ rotate: 360, y: [0, 30, 0] }}
        transition={{ rotate: { duration: 60, repeat: Infinity, ease: "linear" }, y: { duration: 15, repeat: Infinity, ease: "easeInOut" } }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M50 10 L90 90 L10 90 Z" />
        </svg>
      </motion.div>
    </div>
  );
};

export default FloatingShapes;