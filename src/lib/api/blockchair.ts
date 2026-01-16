
// Blockchair API - Explorer
const BASE_URL = 'https://api.blockchair.com';

export async function getChainStats(chain = 'bitcoin') {
    const response = await fetch(`${BASE_URL}/${chain}/stats`);
    if (!response.ok) throw new Error(`Blockchair API error: ${response.status}`);
    const data = await response.json();
    return data.data;
}

export async function testBlockchairAPI() {
    try {
        const stats = await getChainStats();
        return {
            success: true,
            data: {
                blocks: stats.blocks,
                nodes: stats.nodes
            }
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
