
// GeckoTerminal API - DEX Pools
const BASE_URL = 'https://api.geckoterminal.com/api/v2';

export async function getOHLCV(network = 'eth', pool = '0x60594a405d53811d3bc4766596efd80fd545a270') {
    const response = await fetch(`${BASE_URL}/networks/${network}/pools/${pool}/ohlcv/day`);
    if (!response.ok) throw new Error(`GeckoTerminal API error: ${response.status}`);
    const data = await response.json();
    return data.data.attributes.ohlcv_list;
}

export async function testGeckoTerminalAPI() {
    try {
        const ohlcv = await getOHLCV(); // ETH/USDC
        return {
            success: true,
            data: {
                candles: ohlcv.length,
                lastClose: ohlcv[0][4]
            }
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
