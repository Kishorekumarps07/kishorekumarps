
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'ORIGIN', href: '#education' },
    { name: 'ARSENAL', href: '#abilities' },
    { name: 'MISSIONS', href: '#experience' },
    { name: 'SECRET-LAB', href: '#projects' },
    { name: 'SENSE', href: '#analyzer' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
          isScrolled ? 'py-3 bg-black/95 backdrop-blur-lg border-b border-red-600/20' : 'py-5 bg-transparent'
        } px-6 md:px-12 flex justify-between items-center`}
      >
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="relative">
            <div className="w-10 h-10 bg-red-600 flex items-center justify-center rounded-sm transform rotate-3 border-2 border-white shadow-[4px_4px_0px_#000] group-hover:rotate-0 group-hover:scale-110 transition-all">
              <span className="text-white font-bebas text-2xl">K</span>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-bebas text-2xl tracking-tighter text-white leading-none">KISHORE.DEV</span>
            <span className="font-mono text-[7px] text-red-500 tracking-[0.3em] uppercase opacity-60">Architect_v4.2</span>
          </div>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden lg:flex gap-12 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="relative group text-white/50 hover:text-white font-bebas text-xl tracking-widest transition-colors uppercase py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <button className="bg-red-600 text-white px-6 py-1.5 border-2 border-white shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all font-bebas text-xl tracking-widest">
            HOLOGRAPHIC_CONTACT
          </button>
        </div>
        
        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden h-12 w-12 border-2 border-white/10 flex items-center justify-center rounded text-white hover:bg-red-600 hover:border-red-600 transition-all"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[90] bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-center lg:hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
            <div className="flex flex-col gap-10 text-center">
              {navLinks.map((link, i) => (
                <motion.a 
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-bebas text-6xl text-white hover:text-red-600 transition-colors tracking-tighter"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.button 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10 bg-red-600 text-white font-bebas text-3xl px-12 py-4 border-2 border-white"
              >
                SWING NOW
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
