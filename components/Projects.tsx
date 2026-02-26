
import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ExternalLink, Code2 } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-6 bg-black relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="font-bebas text-8xl text-white mb-4">THE <span className="text-red-600">SECRET LAB</span></h2>
          <p className="text-white/40 font-light tracking-widest uppercase text-sm">Experimental Prototypes & Field-Ready Applications</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#0F1115] border border-white/10 p-10 group hover:border-red-600 transition-all duration-500 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-red-600/5 border border-red-600/20 text-red-500 rounded-sm">
                    <Code2 size={24} />
                  </div>
                  <div className="text-[10px] font-mono text-white/10 tracking-widest uppercase">PROTOTYPE_v{idx + 1}.0</div>
                </div>
                
                <h3 className="font-bebas text-5xl text-white mb-4 leading-none group-hover:text-red-500 transition-colors">{project.title}</h3>
                <p className="text-red-500/80 font-mono text-xs uppercase mb-4 tracking-widest">{project.tech}</p>
                <p className="text-white/50 font-light leading-relaxed mb-8">
                  {project.description}
                </p>
              </div>
              
              <a 
                href={project.link} 
                className="inline-flex items-center gap-2 font-bebas text-2xl text-white group-hover:text-red-600 transition-colors"
              >
                ACCESS REPOSITORY <ExternalLink size={20} />
              </a>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 flex justify-center">
           <motion.a 
             href="https://github.com/KishoreKumarPS"
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="px-12 py-4 bg-red-600 text-white font-bebas text-3xl border-2 border-white shadow-[8px_8px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
           >
             VIEW FULL GITHUB ARSENAL
           </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
