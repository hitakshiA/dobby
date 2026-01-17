
// Verification Script for ALL APIs (GOAT, Premium, Basic)
// Run with: npx tsx src/scripts/test-real-data.ts

import dotenv from 'dotenv';
import path from 'path';

// Force load .env.local
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

async function runTests() {
    console.log('🧪 STARTING FULL STACK VERIFICATION...');
    console.log('============================================');

    console.log('\n--- BATCH 1: CORE & NETWORK ---');
    await runTest('Mempool.space', '../lib/api/mempool', 'testMempoolAPI');
    await runTest('Blockchain.com', '../lib/api/blockchain', 'testBlockchainAPI');
    await runTest('Blockchair', '../lib/api/blockchair', 'testBlockchairAPI');
    await runTest('Etherscan', '../lib/api/etherscan', 'testEtherscanAPI');
    await runTest('GoPlus Security', '../lib/api/goplus', 'testGoPlusAPI');

    console.log('\n--- BATCH 2: MARKET DATA ---');
    await runTest('Coinbase', '../lib/api/coinbase', 'testCoinbaseAPI');
    await runTest('Gemini', '../lib/api/gemini', 'testGeminiAPI');
    await runTest('Kraken', '../lib/api/kraken', 'testKrakenAPI');
    await runTest('KuCoin', '../lib/api/kucoin', 'testKucoinAPI');
    await runTest('Bitfinex', '../lib/api/bitfinex', 'testBitfinexAPI');
    await runTest('CoinPaprika', '../lib/api/coinpaprika', 'testCoinPaprikaAPI');

    console.log('\n--- BATCH 3: DEFI & ECOSYSTEMS ---');
    await runTest('DeFiLlama', '../lib/api/defillama', 'testDeFiLlamaAPI');
    await runTest('GeckoTerminal', '../lib/api/geckoterminal', 'testGeckoTerminalAPI');
    await runTest('OpenOcean', '../lib/api/openocean', 'testOpenOceanAPI');
    await runTest('Thorchain', '../lib/api/thorchain', 'testThorchainAPI');
    await runTest('Osmosis', '../lib/api/osmosis', 'testOsmosisAPI');
    await runTest('Snapshot', '../lib/api/snapshot', 'testSnapshotAPI');

    console.log('\n--- BATCH 4: DERIVATIVES & SENTIMENT ---');
    await runTest('Binance Futures', '../lib/api/binance', 'testBinanceAPI');
    await runTest('Bybit', '../lib/api/bybit', 'testBybitAPI');
    await runTest('Deribit', '../lib/api/deribit', 'testDeribitAPI');
    await runTest('Fear & Greed', '../lib/api/alternative', 'testAlternativeAPI');

    console.log('\n--- BATCH 5: PREMIUM POWER-UPS 🌟 ---');
    await runTest('CoinMarketCap', '../lib/api/coinmarketcap', 'testCmcAPI');
    await runTest('Moralis', '../lib/api/moralis', 'testMoralisAPI');
    await runTest('Helius', '../lib/api/helius', 'testHeliusAPI');
    await runTest('Birdeye', '../lib/api/birdeye', 'testBirdeyeAPI');

    console.log('\n--- BATCH 6: THE GOAT COLLECTION 🐐 ---');
    await runTest('Polymarket', '../lib/api/polymarket', 'testPolymarketAPI');
    await runTest('Kalshi', '../lib/api/kalshi', 'testKalshiAPI');
    await runTest('DexScreener', '../lib/api/dexscreener', 'testDexScreenerAPI');
    await runTest('Jupiter', '../lib/api/jupiter', 'testJupiterAPI');
    await runTest('RugCheck', '../lib/api/rugcheck', 'testRugCheckAPI');
    await runTest('Pump.fun', '../lib/api/pumpfun', 'testPumpFunAPI');

    console.log('============================================');
    console.log('🏁 FULL STACK COMPLETE');
}

async function runTest(name: string, path: string, functionName: string) {
    console.log(`\n🔍 Testing ${name}...`);
    try {
        const module = await import(path);
        const result = await module[functionName]();
        if (result.success) {
            console.log('✅ SUCCESS');
            // console.log(JSON.stringify(result.data, null, 2)); // Keep output clean for full run
        } else {
            console.log('❌ FAILED:', result.error);
        }
    } catch (e: any) {
        console.log('⚠️ ERROR IMPORTING:', e.message);
    }
}

runTests();
