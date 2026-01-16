
// Raydium API - Solana DEX
const BASE_URL = 'https://api.raydium.io/v2';

export async function getPairs() {
    const response = await fetch(`${BASE_URL}/main/pairs`);
    if (!response.ok) throw new Error(`Raydium API error: ${response.status}`);
    return response.json();
}

export async function testRaydiumAPI() {
    try {
        const pairs = await getPairs();
        return {
            success: true,
            data: { count: pairs.length, top: pairs[0]?.name || 'N/A' }
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
