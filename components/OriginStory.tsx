
import React from 'react';
import { motion } from 'framer-motion';
import { EDUCATION } from '../constants';
import { GraduationCap, MapPin } from 'lucide-react';

const OriginStory: React.FC = () => {
  return (
    <section id="education" className="py-24 px-6 bg-black border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="font-bebas text-7xl text-white mb-8">ORIGIN <span className="text-red-600">STORY</span></h2>
            <div className="space-y-12">
              {EDUCATION.map((edu, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="relative pl-8 border-l border-red-600/30"
                >
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-red-600"></div>
                  <div className="flex items-center gap-2 text-red-500 font-mono text-xs uppercase tracking-widest mb-2">
                    <GraduationCap size={14} />
                    {edu.graduation}
                  </div>
                  <h3 className="font-bebas text-4xl text-white mb-1 leading-none">{edu.degree}</h3>
                  <p className="text-red-600 font-bold text-sm mb-3 uppercase tracking-tighter">{edu.institution}</p>
                  <div className="flex items-center gap-1 text-white/30 text-xs font-mono">
                    <MapPin size={12} />
                    {edu.location}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-red-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative border-2 border-white/10 p-4 rotate-3 group-hover:rotate-0 transition-transform duration-700 bg-white/5 shadow-2xl overflow-hidden">
               <div className="absolute top-0 right-0 bg-red-600 text-white font-bebas px-4 py-1 text-xl z-20">ARCHIVE_DOC_42</div>
               <img 
                 src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop" 
                 alt="Library/University" 
                 className="w-full grayscale group-hover:grayscale-0 transition-all duration-1000"
               />
               <div className="mt-4 font-mono text-[10px] text-white/20">IDENTIFICATION: KISHORE_KUMAR_P_S // SECTOR_AI_RESEARCH</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OriginStory;
