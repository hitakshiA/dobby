
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

const apiKey = process.env.GEMINI_API_KEY;
const DOWNLOADS_PATH = '/Users/akshmnd/Downloads/Screenshot 2026-01-09 at 10.07.43 PM.png';

async function verifyGemini() {
    console.log('--- Verifying Gemini Vision Flow ---');
    console.log(`API Key present: ${!!apiKey} (${apiKey?.substring(0, 5)}...)`);

    if (!fs.existsSync(DOWNLOADS_PATH)) {
        console.error('File not found:', DOWNLOADS_PATH);
        return;
    }

    try {
        const ai = new GoogleGenAI({ apiKey });

        // 0. List Available Models
        console.log('\n--- Listing Available Models ---');
        try {
            const listResp = await ai.models.list();
            // The SDK might return an async iterable or a response object depending on version
            // For @google/genai v0.1+, it's often an async iterable or .list() returns { models: [] }
            // Let's print whatever we get
            // console.log('List Response:', listResp); 

            // If it's iterable
            // for await (const m of listResp) console.log(m.name);

            // If it's a response object
            if (listResp.models) {
                console.log('Found ' + listResp.models.length + ' models.');
                const flashModels = listResp.models.filter(m => m.name.toLowerCase().includes('flash'));
                console.log('--- FLASH MODELS ---');
                flashModels.forEach(m => console.log(`ID: ${m.name}`));
                console.log('---------------------');
            } else {
                console.log("Structure unknown, printing raw:", JSON.stringify(listResp, null, 2));
            }

        } catch (listErr) {
            console.error('Failed to list models:', listErr.message);
        }

        // 1. Read and Convert Image
        const fileBuffer = fs.readFileSync(DOWNLOADS_PATH);
        const base64Image = fileBuffer.toString('base64');
        console.log(`\nImage loaded. Size: ${fileBuffer.length} bytes`);

        const prompt = "What is in this image?";

        // Models to Test
        const models = [
            'gemini-2.5-computer-use-preview-10-2025',
            'models/gemini-2.5-computer-use-preview-10-2025'
        ];

        for (const model of models) {
            console.log(`\nTesting Model: ${model}`);
            try {
                const contents = [
                    {
                        role: 'user',
                        parts: [
                            { text: prompt },
                            {
                                inlineData: {
                                    mimeType: 'image/png',
                                    data: base64Image
                                }
                            }
                        ]
                    }
                ];

                // Config (Trying with and without thinking first, or just raw)
                const config = {
                    // thinkingConfig: { thinkingLevel: 'HIGH' } // temporarily disabled to isolate model availability
                };

                const result = await ai.models.generateContent({
                    model: model,
                    contents: contents,
                    config: config
                });

                console.log(`SUCCESS [${model}]`);
                console.log('Response:', result.response?.text ? result.response.text() : JSON.stringify(result));
                // If one works, we might be good, but let's see which ones fail
            } catch (e) {
                console.error(`FAILED [${model}]:`, e.message);
                if (e.response) {
                    console.error('Error Details:', JSON.stringify(e.response, null, 2));
                }
            }
        }

    } catch (e) {
        console.error('Global Error:', e);
    }
}

verifyGemini();
