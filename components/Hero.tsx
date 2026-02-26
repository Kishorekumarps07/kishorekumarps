
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Dramatic transforms for a tighter 120vh section
  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.5]);
  const bgY = useTransform(smoothProgress, [0, 1], [0, -50]);
  const bgOpacity = useTransform(smoothProgress, [0.7, 1], [1, 0.5]);

  const spideyScale = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 1.1, 2]);
  const spideyY = useTransform(smoothProgress, [0, 1], [0, -200]);
  const spideyOpacity = useTransform(smoothProgress, [0, 0.9, 1], [1, 1, 0]);

  const textOpacity = useTransform(smoothProgress, [0, 0.6, 1], [1, 0.8, 0]);
  const textScale = useTransform(smoothProgress, [0, 0.7], [1, 1.2]);
  const textY = useTransform(smoothProgress, [0, 0.7], [0, -80]);

  // Web Layer Parallax
  const webScale = useTransform(smoothProgress, [0, 1], [0.7, 2.5]);
  const webRotate = useTransform(smoothProgress, [0, 1], [0, 15]);

  return (
    <section ref={containerRef} id="hero" className="h-[110vh] bg-black relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* Atmospheric Background Gradients */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/20 blur-[120px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full"></div>
        </div>

        {/* Halftone Overlay */}
        <div className="absolute inset-0 z-[1] halftone opacity-20 pointer-events-none"></div>
        <motion.div
          style={{ scale: bgScale, y: bgY, opacity: bgOpacity }}
          className="absolute inset-0 z-0 origin-center will-change-transform"
        >
          <img
            src="https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=2069&auto=format&fit=crop"
            alt="New York Background"
            className="w-full h-full object-cover filter brightness-[0.25] contrast-[1.4] grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black"></div>
        </motion.div>

        {/* Layer 2: Parallax Web Net */}
        <motion.div
          style={{ scale: webScale, rotate: webRotate, opacity: useTransform(smoothProgress, [0.1, 0.6], [0, 0.5]) }}
          className="absolute z-10 pointer-events-none flex items-center justify-center w-full h-full will-change-transform"
        >
          <svg width="120%" height="120%" viewBox="0 0 100 100" className="text-blue-500/20 stroke-current fill-none">
            <path d="M50 0 L50 100 M0 50 L100 50 M15 15 L85 85 M85 15 L15 85" strokeWidth="0.05" />
            <circle cx="50" cy="50" r="10" strokeWidth="0.05" />
            <circle cx="50" cy="50" r="25" strokeWidth="0.05" />
            <circle cx="50" cy="50" r="45" strokeWidth="0.05" />
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="50" y1="50"
                x2={50 + 50 * Math.cos((i * 30 * Math.PI) / 180)}
                y2={50 + 50 * Math.sin((i * 30 * Math.PI) / 180)}
                strokeWidth="0.05"
              />
            ))}
          </svg>
        </motion.div>

        {/* Layer 3: Hero Shadow Sequence */}
        <motion.div
          style={{
            scale: spideyScale,
            y: spideyY,
            opacity: spideyOpacity
          }}
          className="absolute z-20 w-[80%] md:w-[50%] pointer-events-none mix-blend-screen overflow-visible will-change-transform"
        >
          <img
            src="https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1974&auto=format&fit=crop"
            alt="Spiderman Silhouette"
            className="w-full drop-shadow-[0_0_30px_rgba(226,54,54,0.6)]"
          />
          {/* Trail Effect Simulation */}
          <motion.div
            style={{ opacity: useTransform(smoothProgress, [0.2, 0.5], [0, 0.3]), scale: 1.1 }}
            className="absolute inset-0 grayscale contrast-200 blur-md pointer-events-none will-change-[opacity,transform]"
          >
            <img src="https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-contain" />
          </motion.div>
        </motion.div>

        {/* Layer 4: Speed Lines (Appears on scroll) */}
        <motion.div
          style={{ opacity: useTransform(smoothProgress, [0.2, 0.8], [0, 0.2]) }}
          className="absolute inset-0 z-30 pointer-events-none will-change-opacity"
        >
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/30 h-px"
              animate={{
                x: [-500, 1500],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 0.5 + 0.2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear"
              }}
              style={{
                width: `${Math.random() * 300 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `-20%`,
                rotate: `${Math.random() * 10 - 5}deg`
              }}
            />
          ))}
        </motion.div>

        {/* Layer 5: Main Typography */}
        <motion.div
          style={{ opacity: textOpacity, scale: textScale, y: textY }}
          className="relative z-40 text-center px-4 md:mt-24 will-change-transform"
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-bebas text-white text-sm md:text-lg tracking-[1em] mb-2 opacity-60"
            >
              PROJECT: WEAVER
            </motion.div>
            <h1 className="font-bebas text-[18vw] md:text-[14rem] leading-[0.85] text-white drop-shadow-[8px_8px_0px_#E23636] select-none relative">
              <span className="relative z-10">KISHORE <br /> KUMAR</span>
              <motion.span
                animate={{ x: [-2, 2, -1], opacity: [0.3, 0.1, 0.4] }}
                transition={{ repeat: Infinity, duration: 0.2 }}
                className="absolute inset-0 z-0 text-red-600 blur-[2px] translate-x-1"
              >
                KISHORE <br /> KUMAR
              </motion.span>
            </h1>
            <div className="mt-8 flex flex-col items-center gap-4">
              <span className="bg-red-600 text-white font-bebas text-3xl md:text-5xl px-8 py-2 transform -rotate-2 border-4 border-white shadow-[10px_10px_0px_#000] hover:rotate-0 transition-transform cursor-default">
                AI & FULL STACK ARCHITECT
              </span>
              <p className="text-white/40 font-mono tracking-[0.4em] uppercase text-xs md:text-sm max-w-md text-center mt-4">
                WEAVING COMPLEX ALGORITHMS INTO SEAMLESS USER EXPERIENCES
              </p>
            </div>
          </div>
        </motion.div>

        {/* Scroll HUD */}
        <motion.div
          style={{ opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]) }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-4"
        >
          <div className="w-px h-24 bg-gradient-to-b from-red-600 to-transparent relative">
            <motion.div
              animate={{ top: ['0%', '80%', '0%'] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"
            />
          </div>
          <span className="font-bebas text-white/40 tracking-[0.5em] text-sm italic">SWING_DOWN</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
