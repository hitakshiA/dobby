
import fs from 'fs';

const CLEANUP_APIS = [
    { name: 'DeribitOI', url: 'https://www.deribit.com/api/v2/public/ticker?instrument_name=BTC-PERPETUAL' },
    { name: 'GeckoTerminal', url: 'https://api.geckoterminal.com/api/v2/networks' },
    { name: 'DeFiLlamaL2', url: 'https://api.llama.fi/v2/chains' },
    { name: 'DeFiLlamaTreasury', url: 'https://api.llama.fi/protocols' }, // Approx endpoint for protocols (often used for treasury filtering)
    { name: 'TokenUnlocks', url: 'https://api.tokenunlocks.app/v1/upcoming' }, // Often blocked/Keyed now, testing access.
    { name: 'MidgardRetry', url: 'https://midgard.ninerealms.com/v2/network' }, // Trying alternate Midgard URL
    { name: 'OsmosisRetry', url: 'https://lcd.osmosis.zone/cosmos/base/tendermint/v1beta1/node_info' } // Using official LCD
];

async function validate() {
    console.log('🚀 Starting Cleanup API Validation...\n');
    const results = [];

    for (const api of CLEANUP_APIS) {
        try {
            const options: RequestInit = {
                method: 'GET',
                headers: { 'User-Agent': 'Mozilla/5.0' }
            };

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

    // Append to report if exists, else create
    let existing = [];
    try {
        existing = JSON.parse(fs.readFileSync('src/scripts/agent_tools_test/validation_report_cleanup.json', 'utf-8'));
    } catch (e) { }

    fs.writeFileSync('src/scripts/agent_tools_test/validation_report_cleanup.json', JSON.stringify([...existing, ...results], null, 2));
}

validate();
