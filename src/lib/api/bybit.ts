
// Bybit API - Derivatives
const BASE_URL = 'https://api.bybit.com/v5/market';

export async function getTicker(symbol = 'BTCUSDT', category = 'linear') {
    const response = await fetch(`${BASE_URL}/tickers?category=${category}&symbol=${symbol}`);
    if (!response.ok) throw new Error(`Bybit API error: ${response.status}`);
    const data = await response.json();
    return data.result.list[0];
}

export async function testBybitAPI() {
    try {
        const ticker = await getTicker();
        return {
            success: true,
            data: {
                price: ticker.lastPrice,
                turnover: ticker.turnover24h
            }
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
