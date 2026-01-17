
async function testParallel() {
    const apiKey = process.env.PARALLEL_API_KEY;
    if (!apiKey) {
        console.error('Error: PARALLEL_API_KEY not provided');
        process.exit(1);
    }

    console.log('🚀 Testing Parallel AI API...');
    console.log('Endpoint: https://api.parallel.ai/chat/completions');
    console.log('Model: speed');

    try {
        const response = await fetch('https://api.parallel.ai/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'speed',
                messages: [
                    { role: 'user', content: 'Hello, are you working?' }
                ],
                stream: false
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ API Request Failed: ${response.status} ${response.statusText}`);
            console.error('Response Body:', errorText);
            process.exit(1);
        }

        const data = await response.json();
        console.log('✅ API Request Successful!');
        console.log('Response:', JSON.stringify(data, null, 2));

    } catch (error) {
        console.error('❌ Network or Script Error:', error);
        process.exit(1);
    }
}

testParallel();
