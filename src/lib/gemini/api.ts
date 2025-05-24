import {GoogleGenAI} from '@google/genai';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

export function complete(prompt: string, system: string, schema: any) {
    return ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            systemInstruction: system,
            responseSchema: schema
        }
    });
}