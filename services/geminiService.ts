
import { GoogleGenAI } from "@google/genai";

const getAI = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.error("VITE_GEMINI_API_KEY is not defined. AI features will not work.");
    return null;
  }
  try {
    return new GoogleGenAI({ apiKey });
  } catch (err) {
    console.error("Failed to initialize GoogleGenAI:", err);
    return null;
  }
};

export const analyzeThreat = async (imageData: string): Promise<string> => {
  const ai = getAI();
  if (!ai) {
    throw new Error("AI_INITIALIZATION_FAILED: Check API Key configuration.");
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
      console.warn("AI response was empty or malformed.");
      return "Spider-sense is tingling... signal clear, but data is ambiguous. Try again!";
    }

    console.log("AI analysis complete.");
    return response.text;
  } catch (err: any) {
    console.error("AI Analysis Error:", err);
    // Provide more specific error feedback if possible
    if (err.message?.includes("API_KEY_INVALID")) {
      throw new Error("INVALID_API_KEY: Please verify your Gemini API key.");
    }
    throw err;
  }
};
