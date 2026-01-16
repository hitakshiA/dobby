
// CoinMarketCap API - Global Metrics
const BASE_URL = 'https://pro-api.coinmarketcap.com/v1';
const API_KEY = process.env.NEXT_PUBLIC_CMC_API_KEY;

export async function getGlobalMetrics() {
    if (!API_KEY) throw new Error('CMC API Key missing');
    const response = await fetch(`${BASE_URL}/global-metrics/quotes/latest`, {
        headers: {
            'X-CMC_PRO_API_KEY': API_KEY,
            'Accept': 'application/json'
        }
    });
    if (!response.ok) throw new Error(`CMC API error: ${response.status}`);
    const data = await response.json();
    return data.data;
}

export async function testCmcAPI(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
        if (!API_KEY) return { success: false, error: 'Missing API Key' };
        const metrics = await getGlobalMetrics();
        return {
            success: true,
            data: {
                btcDominance: `${metrics.btc_dominance.toFixed(2)}%`,
                ethDominance: `${metrics.eth_dominance.toFixed(2)}%`,
                totalMarketCap: `$${(metrics.quote.USD.total_market_cap / 1e12).toFixed(2)}T`
            }
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
