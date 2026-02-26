
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Scan, ShieldAlert, BrainCircuit, Terminal, Activity, Crosshair } from 'lucide-react';
import { analyzeThreat } from '../services/geminiService';

const SpiderSense: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hudStats, setHudStats] = useState({ cpu: 0, ram: 0, link: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setHudStats({
        cpu: Math.floor(Math.random() * 15 + 10),
        ram: Math.floor(Math.random() * 20 + 30),
        link: Math.floor(Math.random() * 10 + 90)
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Camera error:", err);
      alert("Spider-Sense requires optical access. Please enable camera permissions.");
    }
  };

  const handleScan = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setAnalyzing(true);
    setResult(null);

    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      
      try {
        const analysis = await analyzeThreat(imageData);
        setResult(analysis);
      } catch (err) {
        setResult("SYSTEM_ERROR: Neural-link synchronization failed. Check your web connection.");
      } finally {
        setAnalyzing(false);
      }
    }
  }, []);

  return (
    <section id="analyzer" className="py-24 px-6 bg-black relative overflow-hidden">
      {/* Halftone Background */}
      <div className="absolute inset-0 halftone opacity-5 pointer-events-none"></div>
      
      {/* Decorative Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10"></div>
      
      <div className="max-w-7xl mx-auto border-[1px] border-white/10 bg-[#0A0A0A] p-2 md:p-12 relative shadow-[0_0_100px_rgba(226,54,54,0.05)] overflow-hidden">
        
        {/* Animated Corner Brackets */}
        <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-red-600 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-red-600 animate-pulse"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch relative z-20">
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-red-600/20 text-red-600 rounded">
                <BrainCircuit size={40} className="animate-pulse" />
              </div>
              <div>
                <h2 className="font-bebas text-7xl text-white leading-none">NEURAL <span className="text-red-600">SENSE</span></h2>
                <div className="flex items-center gap-2 mt-2">
                   <div className="h-1 w-12 bg-red-600"></div>
                   <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.4em]">Integrated Gemini v2.5 Protocol</span>
                </div>
              </div>
            </div>
            
            <p className="text-white/50 font-light leading-relaxed mb-12 text-lg italic">
              "Kishore's Spider-Sense isn't just about danger—it's about technical clarity. Activate the optical sensors to analyze your environment through the lens of a Full-Stack Hero."
            </p>

            <div className="flex-1 relative aspect-video bg-black rounded border-2 border-white/5 overflow-hidden group mb-8">
               {!isCameraActive ? (
                 <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#111] to-black">
                    <Activity size={48} className="text-red-600/20 mb-6" />
                    <button 
                      onClick={startCamera}
                      className="group/btn relative px-10 py-4 bg-transparent border-2 border-red-600 text-red-600 font-bebas text-3xl hover:bg-red-600 hover:text-white transition-all overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-3"><Camera /> BOOT OPTICS</span>
                      <div className="absolute inset-0 bg-red-600/10 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300"></div>
                    </button>
                    <p className="mt-4 font-mono text-[10px] text-white/20">AWAITING_INPUT_SIGNAL...</p>
                 </div>
               ) : (
                 <div className="relative w-full h-full">
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover grayscale brightness-125 contrast-[1.2] opacity-80" />
                    
                    {/* HUD Advanced Overlay */}
                    <div className="absolute inset-0 pointer-events-none p-6">
                       {/* Top HUD */}
                       <div className="flex justify-between items-start">
                          <div className="font-mono text-[8px] text-red-500 space-y-1">
                             <div>SENS_MODE: INFRARED_TECH</div>
                             <div>RES: 1280X720_STABLE</div>
                             <div>BUFF: {hudStats.ram}MB_RESV</div>
                          </div>
                          <div className="w-12 h-12 border-t border-r border-red-600 opacity-50"></div>
                       </div>
                       
                       {/* Center HUD */}
                       <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative">
                             <Crosshair size={100} className="text-red-600/20 animate-[spin_8s_linear_infinite]" />
                             <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-1 h-1 bg-red-600 rounded-full animate-ping"></div>
                             </div>
                          </div>
                       </div>

                       {/* Bottom HUD */}
                       <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                          <div className="space-y-2">
                             <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                                <span className="font-mono text-[10px] text-red-500">LIVE_DATA_STREAM</span>
                             </div>
                             <div className="flex gap-1">
                                {[...Array(12)].map((_, i) => (
                                  <div key={i} className={`w-1 h-3 ${i < 8 ? 'bg-red-600' : 'bg-red-600/20'}`} style={{ height: `${Math.random() * 10 + 5}px` }}></div>
                                ))}
                             </div>
                          </div>
                          <div className="font-mono text-[10px] text-red-500 text-right">
                             <div>CPU_LOAD: {hudStats.cpu}%</div>
                             <div>LINK_QUAL: {hudStats.link}%</div>
                             <div>LATENCY: 12ms</div>
                          </div>
                       </div>
                    </div>
                 </div>
               )}
               <canvas ref={canvasRef} className="hidden" />
            </div>

            <motion.button 
               onClick={handleScan}
               disabled={!isCameraActive || analyzing}
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               className="w-full bg-red-600 text-white font-bebas text-4xl py-6 border-2 border-white shadow-[0_15px_40px_rgba(226,54,54,0.4)] disabled:opacity-50 disabled:grayscale transition-all flex items-center justify-center gap-4"
             >
               {analyzing ? (
                 <>
                   <Scan className="animate-[spin_2s_linear_infinite]" />
                   <span>PROCESSING_NEURAL_DATA...</span>
                 </>
               ) : (
                 <>
                   <ShieldAlert size={32} />
                   <span>INITIATE TECH_SCAN</span>
                 </>
               )}
             </motion.button>
          </div>

          <div className="h-full flex flex-col">
            <div className="flex-1 bg-black border border-white/5 p-1 relative flex flex-col shadow-inner">
              <div className="bg-[#111] px-6 py-3 flex justify-between items-center border-b border-white/5">
                <div className="flex items-center gap-3">
                   <Terminal size={16} className="text-red-600" />
                   <span className="font-mono text-xs text-white/50 tracking-widest uppercase">SYSLOG_OUTPUT.DAT</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 border border-white/10 rounded-full"></div>
                  <div className="w-3 h-3 border border-white/10 rounded-full bg-red-600"></div>
                </div>
              </div>
              
              <div className="flex-1 p-10 overflow-y-auto font-mono text-base leading-relaxed scrollbar-hide">
                <AnimatePresence mode="wait">
                  {result ? (
                    <motion.div 
                      key="result"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-white/80"
                    >
                      <div className="flex items-center gap-3 text-red-500 mb-8 font-bebas text-4xl tracking-widest border-b border-red-900/30 pb-4">
                        DATA_DECODED_SUCCESSFULLY
                      </div>
                      <div className="space-y-6 text-lg">
                        {result.split('\n').map((line, i) => (
                          <motion.p 
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            {line}
                          </motion.p>
                        ))}
                      </div>
                      <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between">
                         <span className="text-red-600 font-bebas text-3xl animate-pulse tracking-widest">THREAT_LEVEL: ARCHITECT_VERIFIED</span>
                         <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => <div key={i} className="w-4 h-1 bg-red-600"></div>)}
                         </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div key="placeholder" className="h-full flex flex-col items-center justify-center text-center opacity-10">
                      <div className="relative mb-12">
                         <BrainCircuit size={120} className="animate-[pulse_4s_ease-in-out_infinite]" />
                         <div className="absolute inset-0 flex items-center justify-center">
                            <Activity size={40} className="text-red-600" />
                         </div>
                      </div>
                      <p className="font-bebas text-5xl tracking-[0.2em] mb-4">AWAITING_NEURAL_LINK</p>
                      <p className="text-xs font-mono max-w-xs uppercase leading-loose">
                        Please provide optical verification via the sensor array to proceed with environmental tech-analysis.
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Bottom Console Line */}
              <div className="bg-[#050505] px-6 py-2 border-t border-white/5 font-mono text-[8px] text-white/20 flex justify-between">
                 <span>READY_FOR_INPUT_COMMAND</span>
                 <span>SECURE_ENCRYPTION_ENABLED_V4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpiderSense;
