
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Always initialize using the required named parameter and obtain API key directly from process.env.API_KEY.
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeThreat = async (imageData: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
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
    },
    config: {
      temperature: 0.8,
      topK: 64,
      topP: 0.95,
    },
  });

  return response.text || "Spider-sense is tingling... signal clear, awaiting input!";
};
