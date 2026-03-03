import React from 'react';
import { motion } from 'framer-motion';
import { LIVE_DEPLOYMENTS } from '../constants';
import { ExternalLink, Globe } from 'lucide-react';

const LiveUI: React.FC = () => {
    return (
        <section id="live-deployments" className="py-24 px-6 bg-[#050505] relative overflow-hidden">
            {/* Background effect */}
            <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-16 text-center">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <Globe className="text-red-600" size={32} />
                        <span className="font-mono text-xs text-red-500 uppercase tracking-[0.5em]">Active Protocols</span>
                    </div>
                    <h2 className="font-bebas text-6xl sm:text-8xl text-white mb-4">LIVE <span className="text-red-600 block sm:inline">DEPLOYMENTS</span></h2>
                    <p className="text-white/40 font-light tracking-widest uppercase text-sm">Real-time interaction matrix</p>
                </div>

                <div className="space-y-24">
                    {LIVE_DEPLOYMENTS.map((deployment, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="bg-[#0A0A0A] border border-white/10 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
                        >
                            {/* Top Bar (Browser styling) */}
                            <div className="bg-[#111] px-4 py-3 flex items-center justify-between border-b border-white/5">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                </div>
                                <div className="flex-1 px-4 sm:px-8">
                                    <div className="bg-black/50 border border-white/10 rounded-md py-1 px-2 sm:px-3 text-center w-full max-w-md mx-auto text-[10px] sm:text-xs font-mono text-white/40 truncate">
                                        {deployment.url}
                                    </div>
                                </div>
                                <div className="hidden sm:block">
                                    <a
                                        href={deployment.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-white/40 hover:text-white transition-colors flex items-center gap-2 text-xs font-mono uppercase tracking-widest"
                                    >
                                        Open Tab <ExternalLink size={14} />
                                    </a>
                                </div>
                            </div>

                            {/* Title & Description Overlay */}
                            <div className="px-4 sm:px-6 py-4 border-b border-white/5 bg-[#0F1115] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                                <div className="flex-1">
                                    <h3 className="font-bebas text-2xl sm:text-3xl text-white group-hover:text-red-500 transition-colors leading-none mb-1 sm:mb-0">{deployment.title}</h3>
                                    <p className="text-white/50 text-[11px] sm:text-sm font-light mt-1">{deployment.description}</p>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t border-white/5 sm:border-t-0">
                                    <div className="text-[10px] font-mono text-red-500 uppercase tracking-widest px-2 py-1 border border-red-500/30 bg-red-500/5">
                                        CONNECTION_STABLE
                                    </div>
                                    <a
                                        href={deployment.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="sm:hidden text-white/40 hover:text-white transition-colors flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest bg-white/5 px-2 py-1"
                                    >
                                        Open Tab <ExternalLink size={12} />
                                    </a>
                                </div>
                            </div>

                            {/* Iframe Container */}
                            <div className="w-full h-[400px] sm:h-[600px] relative bg-black flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                                    <div className="flex items-center gap-2 sm:gap-3 animate-pulse opacity-50 px-4 text-center">
                                        <Globe className="text-white/20 shrink-0" size={24} />
                                        <span className="font-mono text-[10px] sm:text-xs text-white/20 uppercase tracking-widest">Establishing secure link...</span>
                                    </div>
                                </div>
                                <iframe
                                    src={deployment.url}
                                    title={`Live View: ${deployment.title}`}
                                    className="w-full h-full border-none relative z-10 opacity-0 animate-[fadeIn_0.5s_ease-out_1s_forwards]"
                                    loading="lazy"
                                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
        </section>
    );
};

export default LiveUI;
