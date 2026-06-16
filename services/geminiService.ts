
import { GoogleGenAI } from "@google/genai";

export interface ImageMetrics {
  brightness: number;
  dominantColor: string;
  edgeDensity: number;
  r: number;
  g: number;
  b: number;
}

const getAI = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("VITE_GEMINI_API_KEY is not defined. AI features will use Local Fallback.");
    return null;
  }
  try {
    return new GoogleGenAI({ apiKey });
  } catch (err) {
    console.error("Failed to initialize GoogleGenAI:", err);
    return null;
  }
};

const generateLocalCritique = (metrics?: ImageMetrics): string => {
  const defaultMetrics: ImageMetrics = {
    brightness: 120,
    dominantColor: 'neutral',
    edgeDensity: 15,
    r: 120,
    g: 120,
    b: 120
  };
  
  const m = metrics || defaultMetrics;
  
  const redResponses = [
    "Whoa! Dominant red signature detected. Are we looking at a fire extinguisher, or did someone borrow my spare suit? Threat Level: SAFE (but highly fashionable).",
    "Red alert! High concentration of crimson wavelengths. Looks like a server overheating, or maybe just a really clean Git commit status. Threat Level: LOW. Suggestion: Keep cooling fans at 100%."
  ];
  
  const blueResponses = [
    "Heavy blue readings. It's giving off serious Oscorp cooling grid energy, or maybe a nice clean CSS theme. Threat Level: SECURE. Suggestion: Kishore's React code is as structured as this layout.",
    "A strong blue signature. It reminds me of the skyline on a clear night, or a very cool console log. Threat Level: MINIMAL. AI diagnostics indicate peak operational efficiency."
  ];

  const greenResponses = [
    "Green signature detected! I hope it's not Oscorp's goblin glider fuel or Lizard's mutagenic serum. Threat Level: CAUTION. Suggestion: Kishore's AI firewall can neutralize any toxic scripting."
  ];

  const yellowResponses = [
    "High yellow/gold concentration. Feels like Electro's high-voltage discharges. Threat Level: ELEVATED. Suggestion: Ground the circuits immediately! Kishore's Node.js cluster is insulated against load surges."
  ];

  const darkResponses = [
    "Stealth mode detected. Total luminance is extremely low. Are we looking for Lizard in the sewers, or did someone forget to turn on the lights? Threat Level: UNKNOWN. Suggestion: Boot Kishore's night-vision filter script.",
    "Darkness signature. High stealth coefficient. This is ideal for sneaking up on Kingpin's goons, but not great for code reviews. Threat Level: NONE. Suggestion: Increase exposure or activate light grid."
  ];

  const highEdgeResponses = [
    "Visual complexity is off the charts! High edge density detected. This looks like a massive server rack wiring closet, or a very complex multi-layered architectural drawing. Threat Level: OPTIMIZABLE. Suggestion: Hand this over to Kishore—he'll refactor this tangled web of spaghetti in no time!"
  ];

  const brightResponses = [
    "Brilliant light signature! The screen brightness is higher than my web-shooter velocity. Threat Level: SAFE (but blinding). Recommendation: Kishore's dark mode theme would reduce this eye strain by 90%."
  ];

  const neutralResponses = [
    "Analysis: Neutral/Gray composition detected. Looks like a typical office environment or standard dev setup. Threat Level: STATIC. Critique: Standard design system detected. We need to inject some responsive full-stack flare here!",
    "Telemetry received. Balanced color spectrum with medium wire complexity. Typical full-stack node interface. Threat Level: SECURE. Kishore's systems are fully integrated."
  ];

  if (m.brightness < 45) {
    return darkResponses[Math.floor(Math.random() * darkResponses.length)];
  }
  if (m.brightness > 210) {
    return brightResponses[Math.floor(Math.random() * brightResponses.length)];
  }
  if (m.edgeDensity > 30) {
    return highEdgeResponses[Math.floor(Math.random() * highEdgeResponses.length)];
  }
  if (m.dominantColor === 'red') {
    return redResponses[Math.floor(Math.random() * redResponses.length)];
  }
  if (m.dominantColor === 'blue') {
    return blueResponses[Math.floor(Math.random() * blueResponses.length)];
  }
  if (m.dominantColor === 'green') {
    return greenResponses[Math.floor(Math.random() * greenResponses.length)];
  }
  if (m.dominantColor === 'yellow') {
    return yellowResponses[Math.floor(Math.random() * yellowResponses.length)];
  }
  
  return neutralResponses[Math.floor(Math.random() * neutralResponses.length)];
};

export const analyzeThreat = async (imageData: string, metrics?: ImageMetrics): Promise<string> => {
  const ai = getAI();
  if (!ai) {
    // Simulate neural parsing latency
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return generateLocalCritique(metrics);
  }

  try {
    console.log("Initiating AI threat analysis...");

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: imageData.split(',')[1],
              },
            },
            {
              text: "You are an AI Professional Agent representing Kishore Kumar P S, an AI & Full Stack Developer. Analyze the provided image. If it shows technology or architecture, provide a clever technical critique or insight in the voice of Spider-Man (heroic, witty, tech-savvy). If it shows a person or object, give them a 'Super-Hero Threat Level' and suggest how Kishore's AI skills could help them. Keep the tone heroic and highly technical.",
            },
          ],
        }
      ],
      config: {
        temperature: 0.8,
        topK: 64,
        topP: 0.95,
      },
    });

    if (!response || !response.text) {
      console.warn("AI response was empty or malformed. Falling back to local analysis.");
      return generateLocalCritique(metrics);
    }

    console.log("AI analysis complete.");
    return response.text;
  } catch (err: any) {
    console.error("AI Analysis Error (falling back to local analysis):", err);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return generateLocalCritique(metrics);
  }
};

