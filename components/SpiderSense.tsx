import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Scan, ShieldAlert, BrainCircuit, Terminal, Activity, Crosshair, Upload } from 'lucide-react';
import { analyzeThreat, ImageMetrics } from '../services/geminiService';

const getImgMetrics = (ctx: CanvasRenderingContext2D, width: number, height: number): ImageMetrics => {
  const sampleW = 50;
  const sampleH = 50;
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  
  let totalBrightness = 0;
  let rSum = 0, gSum = 0, bSum = 0;
  let edgeDensity = 0;
  
  // Ensure we jump by multiples of 4 to stay aligned with [R,G,B,A] sequences
  const step = Math.max(4, Math.floor(data.length / (sampleW * sampleH * 4)) * 4);
  let count = 0;
  
  for (let i = 0; i < data.length; i += step) {
    if (i + 2 >= data.length) break;
    const r = data[i];
    const g = data[i+1];
    const b = data[i+2];
    
    rSum += r;
    gSum += g;
    bSum += b;
    
    const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
    totalBrightness += brightness;
    count++;
    
    if (i + 4 < data.length) {
      const nextR = data[i+4];
      const nextG = data[i+5];
      const nextB = data[i+6];
      const diff = Math.abs(r - nextR) + Math.abs(g - nextG) + Math.abs(b - nextB);
      if (diff > 90) {
        edgeDensity++;
      }
    }
  }
  
  const avgR = rSum / (count || 1);
  const avgG = gSum / (count || 1);
  const avgB = bSum / (count || 1);
  const avgBrightness = totalBrightness / (count || 1);
  
  let dominantColor = 'neutral';
  if (avgR > avgG + 15 && avgR > avgB + 15) dominantColor = 'red';
  else if (avgG > avgR + 15 && avgG > avgB + 15) dominantColor = 'green';
  else if (avgB > avgR + 15 && avgB > avgG + 15) dominantColor = 'blue';
  else if (avgR > 180 && avgG > 180 && avgB < 120) dominantColor = 'yellow';
  
  return {
    brightness: avgBrightness,
    dominantColor,
    edgeDensity: ((edgeDensity / (count || 1)) * 100),
    r: avgR,
    g: avgG,
    b: avgB
  };
};

const SpiderSense: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
    console.log("Attempting to start camera...");
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera API not supported in this browser.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }
      });

      console.log("Camera stream obtained:", stream.id);
      setUploadedImage(null);
      setResult(null);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        console.log("Camera active and video stream assigned.");
      }
    } catch (err) {
      console.error("Camera access failed:", err);
      alert("Spider-Sense requires optical access. Please ensure camera permissions are granted and you're on a secure connection (localhost or HTTPS).");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setUploadedImage(dataUrl);
      setIsCameraActive(false);
      setResult(null);
      
      // Release camera tracks if active
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    };
    reader.readAsDataURL(file);
  };

  const resetOptics = useCallback(() => {
    setUploadedImage(null);
    setResult(null);
    setIsCameraActive(false);
    
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  }, []);

  const handleScan = useCallback(async () => {
    setAnalyzing(true);
    setResult(null);

    const canvas = canvasRef.current;
    if (!canvas) {
      setAnalyzing(false);
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setAnalyzing(false);
      return;
    }

    try {
      if (uploadedImage) {
        // Load uploaded image onto the canvas to draw pixel metrics
        const img = new Image();
        img.src = uploadedImage;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        canvas.width = img.naturalWidth || 800;
        canvas.height = img.naturalHeight || 600;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const metrics = getImgMetrics(ctx, canvas.width, canvas.height);
        console.log("Uploaded Image metrics:", metrics);

        const analysis = await analyzeThreat(uploadedImage, metrics);
        setResult(analysis);
      } else if (videoRef.current) {
        const video = videoRef.current;
        canvas.width = video.videoWidth || 1280;
        canvas.height = video.videoHeight || 720;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        const metrics = getImgMetrics(ctx, canvas.width, canvas.height);
        console.log("Video Stream metrics:", metrics);

        const analysis = await analyzeThreat(imageData, metrics);
        setResult(analysis);
      }
    } catch (err: any) {
      console.error("Scan error:", err);
      setResult(`SYSTEM_ERROR: Neural-link synchronization failed.\n${err.message || "Unknown error occurred."}`);
    } finally {
      setAnalyzing(false);
    }
  }, [uploadedImage]);

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

            <div className="flex-1 relative aspect-video bg-black rounded border-2 border-white/5 overflow-hidden group mb-8 flex items-center justify-center">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
              />

              {isCameraActive && (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover opacity-100 transition-opacity duration-500"
                />
              )}

              {!isCameraActive && uploadedImage && (
                <img
                  src={uploadedImage}
                  alt="Static archive buffer"
                  className="w-full h-full object-cover opacity-100 transition-opacity duration-500"
                />
              )}

              {!isCameraActive && !uploadedImage && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#111] to-black">
                   <Activity size={48} className="text-red-600/20 mb-6" />
                   <div className="flex flex-col sm:flex-row gap-4 items-center justify-center z-10">
                     <button
                       onClick={startCamera}
                       className="group/btn relative px-8 py-4 bg-transparent border-2 border-red-600 text-red-600 font-bebas text-3xl hover:bg-red-600 hover:text-white transition-all overflow-hidden"
                     >
                       <span className="relative z-10 flex items-center gap-2"><Camera size={24} /> BOOT OPTICS</span>
                       <div className="absolute inset-0 bg-red-600/10 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300"></div>
                     </button>
                     <button
                       onClick={() => fileInputRef.current?.click()}
                       className="group/btn relative px-8 py-4 bg-transparent border-2 border-white/10 text-white/50 font-bebas text-3xl hover:border-red-600 hover:text-red-500 transition-all overflow-hidden"
                     >
                       <span className="relative z-10 flex items-center gap-2"><Upload size={24} /> UPLOAD FILE</span>
                       <div className="absolute inset-0 bg-white/5 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300"></div>
                     </button>
                   </div>
                   <p className="mt-6 font-mono text-[10px] text-white/20">AWAITING_INPUT_SIGNAL (CAMERA OR FILE)...</p>
                </div>
              )}

              {(isCameraActive || uploadedImage) && (
                <div className="absolute inset-0 pointer-events-none p-6 z-10">
                  {/* Top HUD */}
                  <div className="flex justify-between items-start pointer-events-auto">
                    <div className="font-mono text-[8px] text-red-500 space-y-1">
                      <div>SENS_MODE: {isCameraActive ? "INFRARED_TECH" : "FILE_ARCHIVE"}</div>
                      <div>RES: {isCameraActive ? "1280X720_STABLE" : "STATIC_BUFFER"}</div>
                      <div>BUFF: {hudStats.ram}MB_RESV</div>
                    </div>
                    <button
                      onClick={resetOptics}
                      className="px-3 py-1 bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white font-mono text-[8px] border border-red-600/40 rounded transition-all"
                    >
                      RESET_SENSORS
                    </button>
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
                        <span className="font-mono text-[10px] text-red-500">{isCameraActive ? "LIVE_DATA_STREAM" : "STATIC_BUFFER_LOADED"}</span>
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
                      <div>STATUS: READY</div>
                    </div>
                  </div>
                </div>
              )}
              <canvas ref={canvasRef} className="hidden" />
            </div>

            <motion.button
              onClick={handleScan}
              disabled={(!isCameraActive && !uploadedImage) || analyzing}
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
