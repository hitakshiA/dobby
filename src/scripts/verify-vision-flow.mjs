
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

const API_KEY = process.env.NEXT_PUBLIC_ONDEMAND_API_KEY;
const DOWNLOADS_PATH = '/Users/akshmnd/Downloads/Screenshot 2026-01-09 at 10.07.43 PM.png';

async function verifyFlow() {
    console.log('--- Verifying Vision Flow (Ignore 500 -> Fetch List -> Dual Plugins) ---');
    if (!fs.existsSync(DOWNLOADS_PATH)) {
        console.error('File not found:', DOWNLOADS_PATH);
        return;
    }
    console.log('File:', DOWNLOADS_PATH);

    try {
        // 1. Create Session
        console.log('\n1. Creating Session...');
        const sessionRes = await fetch('https://api.on-demand.io/chat/v1/sessions', {
            method: 'POST',
            headers: { 'apikey': API_KEY, 'Content-Type': 'application/json' },
            body: JSON.stringify({ externalUserId: 'script-tester-manual-fetch' })
        });
        const sessionJson = await sessionRes.json();
        const sessionId = sessionJson.data?.id;

        if (!sessionId) {
            console.error('Failed to create session:', sessionJson);
            return;
        }
        console.log('SUCCESS: Session ID:', sessionId);

        // 2. Upload File (Expect 500, Ignore it)
        console.log('\n2. Uploading File...');
        const fileBuffer = fs.readFileSync(DOWNLOADS_PATH);
        const fileName = path.basename(DOWNLOADS_PATH);
        const stats = fs.statSync(DOWNLOADS_PATH);

        const formData = new FormData();
        const blob = new Blob([fileBuffer], { type: 'image/png' });
        formData.append('file', blob, fileName);
        formData.append('createdBy', 'User');
        formData.append('updatedBy', 'User');
        formData.append('name', fileName);
        formData.append('source', 'image');
        formData.append('sessionId', sessionId);

        // Use the plugin ID from the user's latest prompt example
        formData.append('plugins', JSON.stringify(['plugin-1713954536']));

        formData.append('sizeBytes', stats.size.toString());
        formData.append('responseMode', 'sync');

        // Note: Using the non-raw endpoint as per last instruction, or should we go back to raw? 
        // The user's screenshot showed /media/v1/public/file in the "Fetch Media" section, 
        // but typically upload is POST /media/v1/public/file (or raw). 
        // I'll stick to POST /media/v1/public/file as per previous step.
        const uploadRes = await fetch('https://api.on-demand.io/media/v1/public/file', {
            method: 'POST',
            headers: { 'apikey': API_KEY },
            body: formData
        });

        console.log(`Upload Status: ${uploadRes.status} (Ignoring if 500)`);

        // 3. Fetch Media List to find what we just uploaded
        console.log('\n3. Fetching Recent Media...');
        // Wait a split second to ensure consistency?
        await new Promise(r => setTimeout(r, 1000));

        const listRes = await fetch('https://api.on-demand.io/media/v1/public/file?limit=5&page=1&sort=-createdAt', {
            method: 'GET',
            headers: { 'apikey': API_KEY }
        });

        const listJson = await listRes.json();

        let mediaId = null;
        if (listJson.data && listJson.data.length > 0) {
            const latest = listJson.data[0]; // Assuming the first one is ours due to sort=-createdAt
            console.log('Latest File Found:', latest.name, '| ID:', latest.id);
            mediaId = latest.id;
        } else {
            console.error('No files found in list.');
            return;
        }

        // 4. Chat
        console.log('\n4. Chatting with Context...');

        // Combine the requested plugin AND the media ID
        const pluginList = ['plugin-1713954536', mediaId];

        console.log('Using Plugins:', pluginList);

        const chatPayload = {
            endpointId: 'predefined-openai-gpt5.2',
            query: "What is in this image?",
            pluginIds: pluginList,
            responseMode: 'sync'
        };

        const chatRes = await fetch(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
            method: 'POST',
            headers: { 'apikey': API_KEY, 'Content-Type': 'application/json' },
            body: JSON.stringify(chatPayload)
        });

        console.log(`Chat Status: ${chatRes.status}`);
        const chatJson = await chatRes.json();

        if (chatRes.ok) {
            console.log('SUCCESS! Response:', chatJson.data?.answer || chatJson);
        } else {
            console.log('Failed:', JSON.stringify(chatJson, null, 2));
        }

    } catch (e) {
        console.error('Verification Failed:', e);
    }
}

verifyFlow();
