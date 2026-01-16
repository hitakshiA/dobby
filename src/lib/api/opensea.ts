
// OpenSea API - NFT Floor Prices (Free tier)
const BASE_URL = 'https://api.opensea.io/api/v2';

export async function getCollection(slug = 'boredapeyachtclub') {
    const response = await fetch(`${BASE_URL}/collections/${slug}`, {
        headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) throw new Error(`OpenSea API error: ${response.status}`);
    return response.json();
}

export async function testOpenSeaAPI() {
    try {
        const col = await getCollection();
        return { success: true, data: { name: col.name, floor: col.stats?.floor_price } };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
