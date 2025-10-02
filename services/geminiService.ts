import { GoogleGenAI, Type } from '@google/genai';
import { Trailer } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getAITrailerRecommendations = async (prompt: string, allTrailers: Trailer[]): Promise<string[]> => {
  if (!process.env.API_KEY) {
    console.error("API_KEY is not set.");
    throw new Error("API key not configured.");
  }
  
  try {
    const simplifiedTrailers = allTrailers.map(({ id, name, description, type, capacity, size, dailyRate }) => ({
      id,
      name,
      description,
      type,
      capacity,
      size,
      dailyRate
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `User request: "${prompt}". Based on this, select the best matching trailers from this list: ${JSON.stringify(simplifiedTrailers)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommended_trailer_ids: {
              type: Type.ARRAY,
              description: "An array of string IDs for the recommended trailers, matching the user's hauling needs.",
              items: { type: Type.STRING },
            },
          },
          required: ["recommended_trailer_ids"],
        },
        systemInstruction: "You are an expert Idaho trailer rental assistant. Your task is to analyze a user's request for a trailer and a list of available trailers. You must identify the trailers that best fit the user's hauling criteria (e.g., what they are moving, size, weight) and return their IDs in a JSON object. Only return the IDs of trailers from the provided list.",
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);

    if (result && Array.isArray(result.recommended_trailer_ids)) {
      return result.recommended_trailer_ids;
    }
    return [];
  } catch (error) {
    console.error("Error fetching AI recommendations:", error);
    throw new Error("Failed to get recommendations from AI. Please try again.");
  }
};
