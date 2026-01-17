import { NextResponse } from 'next/server';

// Proxy for Etherscan Gas Tracker
// Fallback to Owl.to if no key or limit reached
export async function GET() {
    const apiKey = process.env.ETHERSCAN_API_KEY || process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;

    try {
        // 1. Try Etherscan
        if (apiKey) {
            const response = await fetch(
                `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${apiKey}`,
                { next: { revalidate: 15 } }
            );
            const data = await response.json();

            if (data.status === '1' && data.result) {
                return NextResponse.json({
                    source: 'Etherscan',
                    safe: data.result.SafeGasPrice,
                    propose: data.result.ProposeGasPrice,
                    fast: data.result.FastGasPrice,
                    base: data.result.suggestBaseFee,
                    ethPrice: data.result.UsdPrice // Sometimes included
                });
            }
        }

        // 2. Fallback to Owl.to (Public, no key needed)
        const owlResponse = await fetch('https://api.owl.to/v1/gas/now', {
            next: { revalidate: 15 }
        });
        const owlData = await owlResponse.json();

        if (owlData.code === 0 && owlData.data) {
            // Owl returns single gas price usually, or per chain
            // Helper to estimate tiers based on single value if needed
            const gas = owlData.data.gasPrice; // in gwei
            return NextResponse.json({
                source: 'Owl',
                safe: Math.floor(gas * 0.9),
                propose: gas,
                fast: Math.ceil(gas * 1.1),
                base: gas
            });
        }

        throw new Error('All gas providers failed');

    } catch (error: any) {
        console.error('Gas proxy error:', error);
        // Emergency fallback mock
        return NextResponse.json({
            source: 'Mock',
            safe: 15,
            propose: 18,
            fast: 22,
            base: 15
        });
    }
}
