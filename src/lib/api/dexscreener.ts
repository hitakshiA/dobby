
// DexScreener API - Trending Pairs
// Docs: https://docs.dexscreener.com/api/reference

const BASE_URL = 'https://api.dexscreener.com/latest';

export async function getTopPairs(chain = 'solana') {
    // Verified: Search query works for gaining general pairs
    const response = await fetch(`${BASE_URL}/dex/search?q=${chain}`);
    if (!response.ok) throw new Error(`DexScreener API error: ${response.status}`);
    const data = await response.json();
    return data.pairs;
}

export async function testDexScreenerAPI(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
        const pairs = await getTopPairs('SOL/USDC');
        return {
            success: true,
            data: pairs.slice(0, 3).map((p: any) => ({
                pair: p.pairAddress,
                price: p.priceUsd,
                dex: p.dexId
            }))
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
