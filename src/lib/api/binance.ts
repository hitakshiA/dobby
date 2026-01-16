
// Binance API - Futures/Spot
const BASE_URL = 'https://fapi.binance.com/fapi/v1'; // Futures

export async function getOrderBook(symbol = 'BTCUSDT') {
    const response = await fetch(`${BASE_URL}/depth?symbol=${symbol}&limit=5`);
    if (!response.ok) throw new Error(`Binance API error: ${response.status}`);
    return response.json();
}

export async function testBinanceAPI() {
    try {
        const depth = await getOrderBook();
        return {
            success: true,
            data: {
                topBid: depth.bids[0],
                topAsk: depth.asks[0]
            }
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
