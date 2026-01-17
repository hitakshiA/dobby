'use server';

import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;

export async function analyzeImage(base64Image: string, prompt: string) {
    if (!apiKey) {
        throw new Error('GEMINI_API_KEY is not defined');
    }

    try {
        const ai = new GoogleGenAI({ apiKey });

        // Prepare contents with inline image data
        const contents = [
            {
                role: 'user',
                parts: [
                    { text: prompt },
                    {
                        inlineData: {
                            mimeType: 'image/png', // Assuming PNG for simplicity, strictly should match input
                            data: base64Image
                        }
                    }
                ]
            }
        ];

        // Primary Model (Verified Available)
        const primaryModel = 'models/gemini-2.5-computer-use-preview-10-2025';

        try {
            const result = await ai.models.generateContent({
                model: primaryModel,
                contents: contents,
                config: {
                    thinkingConfig: {
                        thinkingBudget: 1024
                    }
                }
            });
            const text = result.text ?? result.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
            return { success: true, text };
        } catch (primaryError: any) {
            console.error('Vision model failed:', primaryError);
            if (primaryError.message?.includes('429') || primaryError.message?.includes('Quota')) {
                return { success: false, error: 'AI Traffic High (Rate Limit). Please wait 30s.' };
            }
            return { success: false, error: 'Failed to analyze image. Please try again.' };
        }

    } catch (error: any) {
        console.error('Gemini Vision Error:', error);
        return { success: false, error: error.message };
    }
}
