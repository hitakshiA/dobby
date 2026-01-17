import { NextResponse } from 'next/server';

// Proxy for Binance Futures Funding Rates
export async function GET() {
    try {
        const response = await fetch('https://fapi.binance.com/fapi/v1/premiumIndex', {
            next: { revalidate: 30 } // Cache for 30 seconds
        });

        if (!response.ok) {
            throw new Error(`Binance API error: ${response.status}`);
        }

        const data = await response.json();

        // Filter for major tokens to keep payload small
        const targetSymbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'DOGEUSDT', 'AVAXUSDT', 'BNBUSDT', 'PEPEUSDT', 'XRPUSDT', 'ADAUSDT', 'LINKUSDT'];

        const rates = data
            .filter((p: any) => targetSymbols.includes(p.symbol))
            .map((p: any) => ({
                symbol: p.symbol.replace('USDT', ''), // Clean symbol
                price: parseFloat(p.markPrice),
                fundingRate: parseFloat(p.lastFundingRate),
                nextFundingTime: p.nextFundingTime
            }))
            .sort((a: any, b: any) => {
                // Sort by targetSymbols order
                return targetSymbols.indexOf(a.symbol + 'USDT') - targetSymbols.indexOf(b.symbol + 'USDT');
            });

        return NextResponse.json(rates);
    } catch (error: any) {
        console.error('Funding proxy error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
