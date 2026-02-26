
import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '../constants';
import { Briefcase, ChevronRight } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-6 bg-black relative">
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 bg-[radial-gradient(circle_at_right,#E23636_0%,transparent_70%)]"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          <div className="lg:w-1/3 lg:sticky lg:top-40">
            <div className="flex items-center gap-4 mb-8">
              <Briefcase className="text-red-600" size={32} />
              <span className="font-mono text-xs text-red-500 uppercase tracking-[0.5em]">Field Deployment Logs</span>
            </div>
            <h2 className="font-bebas text-8xl text-white leading-[0.85] mb-8">COMBAT <br/><span className="text-red-600 drop-shadow-[0_0_10px_rgba(226,54,54,0.3)]">RECORDS</span></h2>
            <p className="text-white/40 text-lg font-light leading-relaxed max-w-sm mb-12">
              Chronicles of engineering feats, architectural missions, and software solutions deployed across the tech landscape.
            </p>
            <div className="space-y-4">
               <div className="h-1 w-48 bg-red-600"></div>
               <div className="h-1 w-24 bg-white/10"></div>
            </div>
          </div>
          
          <div className="lg:w-2/3 space-y-24 relative">
            {/* Timeline Vertical Line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-red-600 via-red-600/20 to-transparent lg:left-0"></div>

            {EXPERIENCE.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-12 group"
              >
                {/* Timeline Node */}
                <div className="absolute -left-[10px] top-0 w-5 h-5 bg-black border-2 border-red-600 rotate-45 group-hover:bg-red-600 group-hover:scale-125 transition-all duration-300"></div>
                <div className="absolute -left-[5px] top-[24px] bottom-0 w-px bg-white/5"></div>
                
                <div className="bg-[#0A0A0A] border border-white/5 p-10 hover:border-red-600/30 transition-all duration-500 relative overflow-hidden group/card">
                  {/* Card Glow */}
                  <div className="absolute -right-20 -top-20 w-40 h-40 bg-red-600/5 blur-[80px] group-hover/card:bg-red-600/10 transition-all"></div>
                  
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-10">
                    <div>
                      <h3 className="font-bebas text-5xl text-white tracking-tight mb-2 group-hover/card:text-red-500 transition-colors">{exp.role}</h3>
                      <div className="flex items-center gap-3">
                         <span className="text-red-600 font-bold uppercase tracking-[0.2em] text-sm">{exp.company}</span>
                         <span className="w-1 h-1 rounded-full bg-white/20"></span>
                         <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest italic">MISSION_ACTIVE</span>
                      </div>
                    </div>
                    <div className="bg-white/5 px-4 py-2 border border-white/10 text-white/40 font-mono text-xs whitespace-nowrap">
                      {exp.period}
                    </div>
                  </div>
                  
                  <ul className="space-y-6">
                    {exp.points.map((point, pIdx) => (
                      <motion.li 
                        key={pIdx} 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 + pIdx * 0.1 }}
                        className="flex gap-4 items-start text-white/60 font-light text-lg leading-relaxed group/li"
                      >
                        <ChevronRight className="text-red-600 shrink-0 mt-1.5 group-hover/li:translate-x-1 transition-transform" size={18} />
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-12 flex items-center justify-between opacity-0 group-hover/card:opacity-100 transition-opacity">
                     <div className="flex gap-2">
                        {[...Array(3)].map((_, i) => <div key={i} className="h-1 w-6 bg-red-600/20"></div>)}
                     </div>
                     <span className="font-mono text-[8px] text-white/10 uppercase tracking-widest">ENCRYPTED_ENTRY_{idx}_v2</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
