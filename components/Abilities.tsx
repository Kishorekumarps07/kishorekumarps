
import React from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../constants';

const Abilities: React.FC = () => {
  return (
    <section id="abilities" className="py-24 px-6 bg-[#0F1115] relative overflow-hidden">
      {/* Background Comic Halftone Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="font-bebas text-7xl text-white mb-2"
          >
            THE <span className="text-red-600">ARSENAL</span> PROTOCOL
          </motion.h2>
          <div className="w-32 h-2 bg-red-600 mb-6"></div>
          <p className="text-white/40 max-w-xl font-light leading-relaxed">
            Every hero needs their tech. Here's a breakdown of the frameworks, languages, and AI modules I've mastered across the full-stack landscape.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-black/40 border border-white/5 p-8 group hover:border-red-600/50 transition-all duration-500 relative"
            >
              <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-red-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-red-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-600/10 rounded group-hover:bg-red-600 group-hover:text-white transition-all duration-500 text-red-500">
                  {category.icon}
                </div>
                <h3 className="font-bebas text-3xl text-white tracking-wide">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="px-3 py-1 bg-white/5 border border-white/10 text-white/60 text-xs font-mono rounded-sm group-hover:border-white/20 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Abilities;
