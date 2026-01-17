import { NextResponse } from 'next/server';

export async function GET() {
    // Simulated Blue Chip Floor Prices (ETH)
    const collections = [
        { name: 'CryptoPunks', floor: 55.4, change: 2.1 },
        { name: 'Bored Ape', floor: 12.8, change: -1.5 },
        { name: 'Pudgy Penguins', floor: 14.2, change: 5.4 },
        { name: 'Azuki', floor: 4.5, change: 0.8 }
    ];

    return NextResponse.json(collections);
}
