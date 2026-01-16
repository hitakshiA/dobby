
// KuCoin API - Spot Market
const BASE_URL = 'https://api.kucoin.com/api/v1';

export async function get24hStats(symbol = 'BTC-USDT') {
    const response = await fetch(`${BASE_URL}/market/stats?symbol=${symbol}`);
    if (!response.ok) throw new Error(`KuCoin API error: ${response.status}`);
    const data = await response.json();
    return data.data;
}

export async function testKucoinAPI() {
    try {
        const stats = await get24hStats();
        return {
            success: true,
            data: {
                last: stats.last,
                vol: stats.vol
            }
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
