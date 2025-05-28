import { GoogleGenAI } from '@google/genai';
import { EXTRACT_DETAILS_MODEL_ID } from '../../utils/consts';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export function complete(prompt: string, system: string, schema: any) {
    return ai.models.generateContent({
        model: EXTRACT_DETAILS_MODEL_ID,
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            systemInstruction: system,
            responseSchema: schema,
        },
    });
}
