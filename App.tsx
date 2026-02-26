import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Abilities from './components/Abilities';
import Experience from './components/Experience';
import OriginStory from './components/OriginStory';
import Projects from './components/Projects';
import SpiderSense from './components/SpiderSense';

const App: React.FC = () => {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(anchor.hash);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="relative min-h-screen bg-black selection:bg-red-600 selection:text-white overflow-x-hidden font-inter">
      {/* Cinematic Grain & Scanning Lines Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[60] opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="fixed inset-0 pointer-events-none z-[60] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%]"></div>
      
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Dynamic Warning Marquee - Overlapping for seamless transition */}
        <div className="relative z-20 bg-red-600 py-4 border-y-4 border-black -rotate-2 scale-105 shadow-[0_20px_50px_rgba(226,54,54,0.3)] -mt-10">
           <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite] gap-12">
             {[...Array(10)].map((_, i) => (
               <div key={i} className="flex items-center gap-12">
                 <span className="font-bebas text-3xl text-white tracking-[0.2em] italic">
                   KISHORE_SYSTEM_ACTIVE // AI_CORE_ONLINE // FULL_STACK_READY
                 </span>
                 <div className="w-4 h-4 bg-white rotate-45"></div>
               </div>
             ))}
           </div>
        </div>

        <div className="relative z-10 space-y-0">
          <OriginStory />
          <Abilities />
          
          {/* Transition Divider */}
          <div className="h-20 bg-gradient-to-b from-black to-[#0F1115] relative overflow-hidden">
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>
          </div>

          <Experience />
          <Projects />
          <SpiderSense />
        </div>
      </main>

      <footer className="bg-[#050505] pt-32 pb-12 px-6 border-t border-red-600/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="font-bebas text-[15vw] md:text-[10rem] text-white leading-[0.8] tracking-tighter mb-12 select-none"
              >
                KISHORE <br /> <span className="text-red-600 drop-shadow-[0_0_15px_rgba(226,54,54,0.5)]">KUMAR</span>
              </motion.div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { label: 'GITHUB', url: 'https://github.com/KishoreKumarPS' },
                  { label: 'LINKEDIN', url: 'https://linkedin.com/in/kishorekumarps' },
                  { label: 'LEETCODE', url: 'https://leetcode.com/kishorekumarps' },
                  { label: 'PORTFOLIO', url: '#' }
                ].map((item) => (
                  <a 
                    key={item.label} 
                    href={item.url} 
                    className="group flex flex-col gap-2"
                  >
                    <span className="text-[10px] font-mono text-white/20 group-hover:text-red-500 transition-colors">SECURE_LINK</span>
                    {/* Fix: Corrected mismatched closing tag from </a> to </span> to properly close the text span */}
                    <span className="font-bebas text-3xl text-white/60 group-hover:text-white group-hover:translate-x-2 transition-all">
                      {item.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-4 flex flex-col items-end gap-6 text-right">
               <div className="p-8 border border-white/5 bg-white/5 backdrop-blur-md relative group">
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-600"></div>
                  <p className="font-mono text-[10px] text-red-500 mb-2 tracking-[0.3em]">COMMUNICATION_PROTOCOL</p>
                  <p className="text-white font-bebas text-4xl mb-1">kishore3kumar4@gmail.com</p>
                  <p className="text-red-600 font-bebas text-3xl">+91 93424 60105</p>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-8 w-full bg-white text-black font-bebas text-2xl py-3 border-2 border-black hover:bg-red-600 hover:text-white transition-all shadow-[8px_8px_0px_#E23636] hover:shadow-none"
                  >
                    SWING TO INBOX
                  </motion.button>
               </div>
            </div>
          </div>
          
          <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col gap-1">
              <p className="text-[10px] text-white/20 font-mono tracking-widest uppercase">
                © 2025 KISHORE KUMAR P S // DATA_DRIVEN_DEVELOPER
              </p>
              <p className="text-[9px] text-white/10 font-mono italic">
                BUILT WITH GEMINI 2.5 FLASH, REACT, & SPIDER-SENSE
              </p>
            </div>
            
            <div className="flex gap-3">
               {[...Array(4)].map((_, i) => (
                 <div key={i} className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-red-600 animate-pulse' : 'bg-white/10'}`}></div>
               ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default App;