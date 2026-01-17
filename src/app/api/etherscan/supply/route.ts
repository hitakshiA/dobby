import { NextResponse } from 'next/server';

// Proxy for Ethereum Supply & Price (Etherscan)
export async function GET() {
    const apiKey = process.env.ETHERSCAN_API_KEY || process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;

    try {
        if (!apiKey) throw new Error('Missing Etherscan Key');

        const [supplyRes, priceRes] = await Promise.all([
            fetch(`https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=${apiKey}`, { next: { revalidate: 300 } }),
            fetch(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${apiKey}`, { next: { revalidate: 60 } })
        ]);

        const supplyData = await supplyRes.json();
        const priceData = await priceRes.json();

        if (supplyData.status === '0' || priceData.status === '0') {
            throw new Error('Etherscan API returned error status');
        }

        // wei to eth
        const supply = supplyData.result ? parseFloat(supplyData.result) / 1e18 : 120450000;
        const price = priceData.result ? parseFloat(priceData.result.ethusd) : 3500;

        return NextResponse.json({
            supply: supply,
            price: price,
            marketCap: supply * price
        });

    } catch (error: any) {
        console.error('ETH Supply proxy error:', error);
        // Mock Data Fallback
        const mockSupply = 120_450_000;
        const mockPrice = 3450.00;
        return NextResponse.json({
            supply: mockSupply, // ~120M ETH
            price: mockPrice,
            marketCap: mockSupply * mockPrice,
            isMock: true
        });
    }
}
