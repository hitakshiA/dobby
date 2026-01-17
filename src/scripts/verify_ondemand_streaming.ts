
import fetch from 'node-fetch';

const API_KEY = process.env.ONDEMAND_API_KEY || 'DCaYJ9AqWDzlaAQYsRgWZOulxbTlXwrq';
const MODEL_ID = 'predefined-xai-grok4.1-fast';

async function verifyStreaming() {
    console.log('🚀 Verifying OnDemand Streaming Logic...');

    try {
        // 1. Session
        const sessionRes = await fetch('https://api.on-demand.io/chat/v1/sessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'apikey': API_KEY },
            body: JSON.stringify({ externalUserId: 'test-streamer' })
        });
        const sessionData = await sessionRes.json() as { data: { id: string } };
        const sessionId = sessionData.data.id;
        console.log('✅ Session:', sessionId);

        // 2. Query
        const queryRes = await fetch(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'apikey': API_KEY },
            body: JSON.stringify({
                endpointId: MODEL_ID,
                query: "Count from 1 to 5.", // Simple streaming test
                responseMode: "stream",
                pluginIds: []
            })
        });

        if (!queryRes.body) throw new Error('No body');

        // 3. Parse Stream (Node-fetch style)
        // Node-fetch body is a Node Stream, not Web Stream, but we can iterate it.
        console.log('⬇️ Received Stream. Parsing Data...');

        // Manual buffering for line splitting
        let buffer = '';
        for await (const chunk of queryRes.body) {
            buffer += chunk.toString();
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
                if (line.trim() === '') continue;
                if (line.startsWith('data:')) {
                    const dataStr = line.slice(5).trim();
                    if (dataStr === '[DONE]') {
                        console.log('\n✅ Stream Complete [DONE]');
                        continue;
                    }
                    try {
                        const data = JSON.parse(dataStr);
                        if (data.answer) {
                            process.stdout.write(data.answer);
                        }
                    } catch (e) { }
                }
            }
        }

    } catch (e) {
        console.error('❌ Error:', e);
    }
}

verifyStreaming();
