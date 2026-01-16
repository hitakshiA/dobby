
// Jupiter API - Solana Aggregator
// Docs: https://station.jup.ag/docs/apis/quote-api

const BASE_URL = 'https://quote-api.jup.ag/v6';

export async function getQuote(
    inputMint = 'So11111111111111111111111111111111111111112', // SOL
    outputMint = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC
    amount = '100000000' // 0.1 SOL
) {
    const url = `${BASE_URL}/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=50`;
    // Verified: User-Agent required to avoid 403/Fetch Failed
    const response = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' }
    });
    if (!response.ok) throw new Error(`Jupiter API error: ${response.status}`);
    return response.json();
}

export async function testJupiterAPI(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
        const quote = await getQuote();
        return {
            success: true,
            data: {
                inAmount: quote.inAmount,
                outAmount: quote.outAmount,
                priceImpact: quote.priceImpactPct
            }
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
