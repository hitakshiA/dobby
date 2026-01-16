
// Magic Eden API - Solana NFT
const BASE_URL = 'https://api-mainnet.magiceden.dev/v2';

export async function getPopularCollections() {
    const response = await fetch(`${BASE_URL}/collections?offset=0&limit=5`);
    if (!response.ok) throw new Error(`Magic Eden API error: ${response.status}`);
    return response.json();
}

export async function testMagicEdenAPI() {
    try {
        const cols = await getPopularCollections();
        return {
            success: true,
            data: cols.slice(0, 3).map((c: any) => c.name)
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
