
import fetch from 'node-fetch';

const API_KEY = 'DCaYJ9AqWDzlaAQYsRgWZOulxbTlXwrq';
const MODEL_ID = 'ondemand-grok-4.1-fast'; // User requested model
// const MODEL_ID = 'predefined-openai-gpt4o'; // Fallback if above fails

async function testOnDemandChat() {
    console.log('🚀 Testing OnDemand Chat API...');

    // 1. Create Session
    console.log('1️⃣ Creating Chat Session...');
    const sessionRes = await fetch('https://api.on-demand.io/chat/v1/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': API_KEY
        },
        body: JSON.stringify({
            externalUserId: 'test-user-dobby'
        })
    });

    if (!sessionRes.ok) {
        console.error('❌ Failed to create session:', await sessionRes.text());
        return;
    }

    const sessionData = await sessionRes.json() as { data: { id: string } };
    const sessionId = sessionData.data.id;
    console.log('✅ Session Created ID:', sessionId);

    // 2. Submit Query
    console.log(`2️⃣ Submitting Query to model: ${MODEL_ID}...`);
    const queryRes = await fetch(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': API_KEY
        },
        body: JSON.stringify({
            endpointId: MODEL_ID,
            query: "Hello, tell me a one sentence joke about coding.",
            responseMode: "sync",
            pluginIds: []
        })
    });

    if (!queryRes.ok) {
        console.error('❌ Failed to submit query:', await queryRes.text());
        console.log('⚠️ Retrying with fallback model: predefined-openai-gpt4o');
        // Retry with fallback
        const retryRes = await fetch(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': API_KEY
            },
            body: JSON.stringify({
                endpointId: 'predefined-openai-gpt4o',
                query: "Hello, tell me a one sentence joke about coding.",
                responseMode: "sync",
                pluginIds: []
            })
        });

        if (!retryRes.ok) {
            console.error('❌ Fallback failed too:', await retryRes.text());
            return;
        }
        const retryData = await retryRes.json();
        console.log('✅ Fallback Query Success:', JSON.stringify(retryData, null, 2));
        return;
    }

    const queryData = await queryRes.json();
    console.log('✅ Query Success:', JSON.stringify(queryData, null, 2));
}

testOnDemandChat();
