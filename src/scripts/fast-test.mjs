
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = dotenv.config({ path: envPath }).parsed;
    if (envConfig) {
        for (const k in envConfig) process.env[k] = envConfig[k];
    }
}

const API_KEY = process.env.ONDEMAND_API_KEY;

async function test() {
    console.log('Testing Basic Chat (No Plugins)...');
    try {
        const sessionRes = await fetch('https://api.on-demand.io/chat/v1/sessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'apikey': API_KEY },
            body: JSON.stringify({ externalUserId: 'test-fast' })
        });
        const sessionData = await sessionRes.json();
        const sessionId = sessionData.data.id;
        console.log('Session:', sessionId);

        const queryRes = await fetch(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'apikey': API_KEY },
            body: JSON.stringify({
                endpointId: 'predefined-xai-grok4.1-fast',
                query: "Hello",
                responseMode: "sync",
                pluginIds: []
            })
        });

        const queryData = await queryRes.json();
        console.log('Response:', JSON.stringify(queryData).substring(0, 100));
    } catch (e) {
        console.error(e);
    }
}

test();
