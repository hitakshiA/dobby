
// Uniswap Subgraph - DEX Analytics
const BASE_URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';

const QUERY = `{
  pools(first: 5, orderBy: totalValueLockedUSD, orderDirection: desc) {
    id
    token0 { symbol }
    token1 { symbol }
    totalValueLockedUSD
  }
}`;

export async function getTopPools() {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: QUERY })
    });
    if (!response.ok) throw new Error(`Uniswap API error: ${response.status}`);
    const data = await response.json();
    return data.data.pools;
}

export async function testUniswapAPI() {
    try {
        const pools = await getTopPools();
        return {
            success: true,
            data: pools.map((p: any) => `${p.token0.symbol}/${p.token1.symbol}`)
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
