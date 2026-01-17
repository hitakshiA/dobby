
import fs from 'fs';

const PUBLIC_APIS = [
    { name: 'FearGreed', url: 'https://api.alternative.me/fng/?limit=1' },
    { name: 'BinanceDepth', url: 'https://fapi.binance.com/fapi/v1/depth?symbol=BTCUSDT&limit=5' },
    { name: 'BinanceFunding', url: 'https://fapi.binance.com/fapi/v1/fundingRate?symbol=BTCUSDT&limit=1' },
    { name: 'CoinGeckoDominance', url: 'https://api.coingecko.com/api/v3/global' },
    { name: 'CoinGeckoTrending', url: 'https://api.coingecko.com/api/v3/search/trending' },
    { name: 'DeFiLlamaHacks', url: 'https://api.llama.fi/hacks' },
    { name: 'DeFiLlamaYields', url: 'https://yields.llama.fi/pools' },
    { name: 'DeFiLlamaStablecoins', url: 'https://stablecoins.llama.fi/stablecoins?includePrices=true' },
    { name: 'MempoolSpace', url: 'https://mempool.space/api/v1/fees/recommended' },
    { name: 'Midgard', url: 'https://midgard.thorchain.info/v2/network' },
    { name: 'Osmosis', url: 'https://api-osmosis.imperator.co/tokens/v2/all' },
    { name: 'GoPlus', url: 'https://api.gopluslabs.io/api/v1/rugpull_detecting/1?contract_addresses=0x1f9840a85d5af5bf1d1762f925bdaddc4201f984' },
    { name: 'Snapshot', url: 'https://hub.snapshot.org/graphql', method: 'POST', body: '{"query":"query { proposals (first: 1) { id title } }"}' }
];

async function validate() {
    console.log('🚀 Starting Batch API Validation...\n');
    const results = [];

    for (const api of PUBLIC_APIS) {
        try {
            const options: RequestInit = {
                method: api.method || 'GET',
                headers: { 'User-Agent': 'Mozilla/5.0' }
            };
            if (api.body) {
                options.body = api.body;
                options.headers = { ...options.headers, 'Content-Type': 'application/json' };
            }

            const start = Date.now();
            const res = await fetch(api.url, options);
            const duration = Date.now() - start;

            if (res.ok) {
                console.log(`✅ [PASS] ${api.name} (${res.status}) - ${duration}ms`);
                results.push({ name: api.name, status: 'PASS', code: res.status });
            } else {
                console.error(`❌ [FAIL] ${api.name} (${res.status})`);
                results.push({ name: api.name, status: 'FAIL', code: res.status });
            }
        } catch (error: any) {
            console.error(`❌ [ERROR] ${api.name}: ${error.message}`);
            results.push({ name: api.name, status: 'ERROR', error: error.message });
        }
    }

    // Write Report
    fs.writeFileSync('src/scripts/agent_tools_test/validation_report.json', JSON.stringify(results, null, 2));
    console.log('\n📝 Validation Report saved to src/scripts/agent_tools_test/validation_report.json');
}

validate();
