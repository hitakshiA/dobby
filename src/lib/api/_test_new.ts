
// Quick test for new APIs
import { testCoinGeckoAPI } from './coingecko';
import { testMagicEdenAPI } from './magiceden';
import { testEnsAPI } from './ens';
import { testLidoAPI } from './lido';
import { testUniswapAPI } from './uniswap';
import { testRaydiumAPI } from './raydium';
import { testCoinglassAPI } from './coinglass';

async function run() {
    console.log('CoinGecko:', await testCoinGeckoAPI());
    console.log('MagicEden:', await testMagicEdenAPI());
    console.log('ENS:', await testEnsAPI());
    console.log('Lido:', await testLidoAPI());
    console.log('Uniswap:', await testUniswapAPI());
    console.log('Raydium:', await testRaydiumAPI());
    console.log('Coinglass:', await testCoinglassAPI());
}
run();
