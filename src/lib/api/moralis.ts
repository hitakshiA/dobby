
// Moralis API - NFT & Wallet Data
const BASE_URL = 'https://deep-index.moralis.io/api/v2.2';
const API_KEY = process.env.NEXT_PUBLIC_MORALIS_API_KEY;

export async function getNFTs(address: string, chain = 'eth') {
    if (!API_KEY) throw new Error('Moralis API Key missing');
    const response = await fetch(`${BASE_URL}/${address}/nft?chain=${chain}&format=decimal&limit=5`, {
        headers: {
            'X-API-Key': API_KEY,
            'Accept': 'application/json'
        }
    });
    if (!response.ok) throw new Error(`Moralis API error: ${response.status}`);
    const data = await response.json();
    return data.result;
}

export async function testMoralisAPI(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
        if (!API_KEY) return { success: false, error: 'Missing API Key' };
        // Vitalik's address
        const nfts = await getNFTs('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', 'eth');
        return {
            success: true,
            data: {
                countHeader: nfts.length,
                firstNFT: nfts[0]?.name || 'Unknown'
            }
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
