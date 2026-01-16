
// Blockchain.com API - Stats
const BASE_URL = 'https://api.blockchain.info';

export async function getStats() {
    const response = await fetch(`${BASE_URL}/stats`);
    if (!response.ok) throw new Error(`Blockchain.com API error: ${response.status}`);
    return response.json();
}

export async function testBlockchainAPI() {
    try {
        const stats = await getStats();
        return {
            success: true,
            data: {
                hashrate: `${stats.hash_rate.toFixed(2)} GH/s`,
                btcMined: stats.n_btc_mined
            }
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
