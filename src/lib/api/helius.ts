
// Helius API - Solana Data
const BASE_URL = 'https://api.helius.xyz/v0';
const API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY;

export async function getTPS() {
    if (!API_KEY) throw new Error('Helius API Key missing');
    const rpcUrl = `https://mainnet.helius-rpc.com/?api-key=${API_KEY}`;

    const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'my-id',
            method: 'getRecentPerformanceSamples',
            params: [1]
        })
    });

    if (!response.ok) throw new Error(`Helius RPC error: ${response.status}`);
    const data = await response.json();
    const sample = data.result[0];
    return sample.numTransactions / sample.samplePeriodSecs;
}

export async function testHeliusAPI(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
        if (!API_KEY) return { success: false, error: 'Missing API Key' };
        const tps = await getTPS();
        return {
            success: true,
            data: {
                currentTPS: tps.toFixed(2)
            }
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
