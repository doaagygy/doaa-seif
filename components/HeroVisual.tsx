import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Layers, Palette, Type } from 'lucide-react';

// Custom Adobe Icons to match Lucide style
const AdobeIcon = ({ text, size = 24 }: { text: string, size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className="lucide"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
    <text 
      x="12" 
      y="12" 
      dy=".35em" 
      textAnchor="middle" 
      fontSize="11" 
      fontWeight="bold" 
      fill="currentColor" 
      strokeWidth="0"
      style={{ fontFamily: 'sans-serif', pointerEvents: 'none' }}
    >
      {text}
    </text>
  </svg>
);

const IconPs = (props: any) => <AdobeIcon text="Ps" {...props} />;
const IconAi = (props: any) => <AdobeIcon text="Ai" {...props} />;
const IconId = (props: any) => <AdobeIcon text="Id" {...props} />;

const HeroVisual: React.FC = () => {
  // Config for orbiting icons - mixed standard tools with Adobe suite
  const icons = [
    { Icon: IconPs, delay: 0, radius: 145, speed: 20 },
    { Icon: IconAi, delay: 2, radius: 185, speed: 25 },
    { Icon: IconId, delay: 4, radius: 165, speed: 22 },
    { Icon: PenTool, delay: 1, radius: 125, speed: 18 },
    { Icon: Palette, delay: 3, radius: 175, speed: 28 },
    { Icon: Layers, delay: 5, radius: 150, speed: 24 },
    { Icon: Type, delay: 1.5, radius: 195, speed: 30 },
  ];

  // Generate Universe Stars
  const stars = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      top: Math.random() * 120 - 10, 
      left: Math.random() * 120 - 10,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.6 + 0.4,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
      color: Math.random() > 0.85 ? '#e82aa8' : (Math.random() > 0.9 ? '#6204ed' : '#ffffff') 
    }));
  }, []);

  // Specific Entry Animation: Scale 0.97 -> 1, Opacity 0.35 -> 1, Duration 0.6s, Starts at 0.2s
  const heroImageEntry = {
    hidden: { scale: 0.97, opacity: 0.35 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Specific Loop: X -6 to +6, 6s duration, back and forth (yoyo/mirror)
  const slowLoop = {
    animate: {
      x: [-6, 6, -6],
    },
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <motion.div 
        className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center perspective-1000 overflow-visible"
        variants={heroImageEntry}
        initial="hidden"
        animate="visible"
    >
      
      {/* Background Loop Wrapper */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        animate={slowLoop.animate}
        transition={slowLoop.transition}
      >
          {/* Universe Star Field with Soft Glow */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full"
                style={{
                  top: `${star.top}%`,
                  left: `${star.left}%`,
                  width: star.size,
                  height: star.size,
                  backgroundColor: star.color,
                  boxShadow: `0 0 ${star.size * 4}px ${star.color}`, 
                }}
                animate={{
                  opacity: [star.opacity, star.opacity * 0.3, star.opacity],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: star.duration,
                  repeat: Infinity,
                  delay: star.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
            
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] rounded-full bg-gradient-to-tr from-brand-purple/10 via-brand-pink/5 to-transparent blur-3xl -z-10"
            />
          </div>

          {/* Central 3D Ball */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              y: [-15, 15, -15], 
              rotateZ: [-2, 2, -2] 
            }}
            transition={{ 
              scale: { duration: 1.2, ease: "easeOut" },
              opacity: { duration: 1.2 },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              rotateZ: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative w-48 h-48 md:w-64 md:h-64 rounded-full z-10"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* ... (Planet visuals remain same) ... */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#e82aa8] via-[#a01a96] to-[#6204ed] shadow-[0_0_80px_-10px_rgba(232,42,168,0.6),_0_0_40px_0px_rgba(98,4,237,0.5)]">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/30 via-transparent to-white/20 mix-blend-multiply" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent rounded-full opacity-60 pointer-events-none" />
                <div className="absolute top-[15%] left-[15%] w-[40%] h-[30%] bg-gradient-to-b from-white to-transparent rounded-[100%] blur-[12px] opacity-80 rotate-[-45deg] pointer-events-none" />
                <div className="absolute top-[22%] left-[22%] w-[5%] h-[5%] bg-white rounded-full blur-[1px] shadow-[0_0_10px_white] opacity-100 pointer-events-none" />
                <div className="absolute bottom-[5%] right-[5%] w-[80%] h-[80%] bg-gradient-to-tl from-[#d8b4fe] to-transparent rounded-full blur-lg opacity-60 mix-blend-screen pointer-events-none" />
            </div>
            <div className="absolute -inset-8 rounded-full border border-white/10 opacity-30 blur-[2px]" />
            <div className="absolute -inset-16 rounded-full border border-brand-purple/20 opacity-20 blur-[4px] animate-pulse" />
          </motion.div>

          {/* Orbiting Elements Container */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
            {icons.map((item, index) => (
                <OrbitingIcon 
                    key={index} 
                    Icon={item.Icon} 
                    radius={item.radius} 
                    duration={item.speed} 
                    delay={item.delay} 
                />
            ))}
          </div>
      </motion.div>
    </motion.div>
  );
};

interface OrbitingIconProps {
    Icon: React.ElementType;
    radius: number;
    duration: number;
    delay: number;
}

const OrbitingIcon: React.FC<OrbitingIconProps> = ({ Icon, radius, duration, delay }) => {
    // Small icon shake/pulse every 6 seconds as requested: Scale 1->1.02->1
    const subtlePulse = {
        animate: { scale: [1, 1.02, 1] },
        transition: { duration: 1, repeat: Infinity, repeatDelay: 6, ease: "easeInOut" }
    };

    return (
        <motion.div
            className="absolute"
            animate={{ rotate: 360 }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                delay: -delay
            }}
            style={{
                width: radius * 2,
                height: radius * 2,
                transformOrigin: 'center center'
            }}
        >
            <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 
                           bg-white/90 dark:bg-gray-800/80 backdrop-blur-md
                           p-2.5 rounded-xl
                           shadow-[0_0_20px_rgba(232,42,168,0.4),inset_0_0_10px_rgba(255,255,255,0.6)]
                           dark:shadow-[0_0_25px_rgba(232,42,168,0.3),inset_0_0_10px_rgba(255,255,255,0.1)]
                           text-brand-purple dark:text-brand-pink 
                           border border-white/70 dark:border-gray-500/50"
                // Counter-rotate + Pulse
                animate={{ rotate: -360, ...subtlePulse.animate }}
                transition={{
                    rotate: { duration: duration, repeat: Infinity, ease: "linear", delay: -delay },
                    scale: subtlePulse.transition
                }}
            >
                <Icon size={22} strokeWidth={1.5} />
            </motion.div>
        </motion.div>
    );
};

export default HeroVisual;