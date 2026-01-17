import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.ONDEMAND_API_KEY;
const MODEL_ID = 'predefined-xai-grok4.1-fast';

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { messages, sessionId: clientSessionId } = reqBody;
        const lastMessage = messages[messages.length - 1];
        const userQuery = lastMessage.content;

        if (!API_KEY) {
            console.error('SERVER ERROR: ONDEMAND_API_KEY is missing.');
            throw new Error('ONDEMAND_API_KEY is not defined');
        }

        console.log(`[Chat API] Received Request. SessionID: ${clientSessionId}, Plugins: ${JSON.stringify(reqBody.pluginIds)}`);

        let sessionId = clientSessionId;

        // 1. Create Session if not provided
        if (!sessionId) {
            const sessionRes = await fetch('https://api.on-demand.io/chat/v1/sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': API_KEY
                },
                body: JSON.stringify({ externalUserId: 'dobby-user' })
            });

            if (!sessionRes.ok) {
                const err = await sessionRes.text();
                console.error('[Chat API] Session Creation Failed:', sessionRes.status, err);
                return NextResponse.json({ error: 'Failed to initialize chat session', details: err }, { status: 500 });
            }

            const sessionData = await sessionRes.json();
            sessionId = sessionData.data.id;
        }

        // 2. Submit Query (Streaming Mode)
        const queryRes = await fetch(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': API_KEY
            },
            body: JSON.stringify({
                endpointId: MODEL_ID,
                query: userQuery,
                responseMode: "stream",
                pluginIds: reqBody.pluginIds || [] // Use dynamic IDs from client
            })
        });

        if (!queryRes.ok) {
            const errText = await queryRes.text();
            console.error('[Chat API] Query Submission Failed:', queryRes.status, errText);
            return NextResponse.json({ error: 'Failed to process query', details: errText }, { status: 500 });
        }

        // 3. Stream Proxying
        // We forward the OnDemand SSE stream directly to the client
        // creating a pass-through stream.
        const stream = new ReadableStream({
            async start(controller) {
                if (!queryRes.body) {
                    controller.close();
                    return;
                }
                const reader = queryRes.body.getReader();

                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        // Pass the raw chunk directly to the client
                        // The client will handle the specific SSE parsing logic
                        controller.enqueue(value);
                    }
                } catch (err) {
                    console.error('Stream proxy error:', err);
                    controller.error(err);
                } finally {
                    controller.close();
                }
            }
        });

        // Return connection information headers and the stream
        const response = new NextResponse(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });

        // Pass the sessionId back in a custom header so the client can cache it
        response.headers.set('X-OnDemand-Session-Id', sessionId);

        return response;

    } catch (error) {
        console.error('Chat Route Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
