
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

// Manual env loading if dotenv is weird in this env
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = dotenv.config({ path: envPath }).parsed;
    if (envConfig) {
        for (const k in envConfig) {
            process.env[k] = envConfig[k];
        }
    }
}

const API_KEY = process.env.ONDEMAND_API_KEY;
console.log('Testing OnDemand API...');
console.log('API Key present:', !!API_KEY);

if (!API_KEY) {
    console.error('ERROR: No API Key found in .env.local');
    process.exit(1);
}

async function test() {
    try {
        // 1. Create Session
        console.log('1. Creating Session...');
        const sessionRes = await fetch('https://api.on-demand.io/chat/v1/sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': API_KEY
            },
            body: JSON.stringify({ externalUserId: 'test-user-123' })
        });

        if (!sessionRes.ok) {
            console.error('Session API Failed:', sessionRes.status, await sessionRes.text());
            return;
        }

        const sessionData = await sessionRes.json();
        const sessionId = sessionData.data.id;
        console.log('SUCCESS: Session Created:', sessionId);

        // 2. Query
        console.log('2. Sending Query...');
        const queryRes = await fetch(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': API_KEY
            },
            body: JSON.stringify({
                endpointId: 'predefined-xai-grok4.1-fast',
                query: "Start web research on Ethereum.",
                responseMode: "sync", // Use sync for simple testing
                pluginIds: ['plugin-1768599793'] // The web/web-research-tool ID (or any other)
            })
        });

        if (!queryRes.ok) {
            console.error('Query API Failed:', queryRes.status, await queryRes.text());
            return;
        }

        const queryData = await queryRes.json();
        console.log('SUCCESS: Query Response:', JSON.stringify(queryData).substring(0, 200) + '...');

    } catch (e) {
        console.error('Test Script Error:', e);
    }
}

test();
