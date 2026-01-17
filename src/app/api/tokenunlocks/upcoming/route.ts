import { NextResponse } from 'next/server';

export async function GET() {
    // Hardcoded Unlocks Mock (API usually requires key/payment)
    // Simulating "TokenUnlocks" data
    const unlocks = [
        { token: 'ARB', value: 25000000, date: 'Mar 16' },
        { token: 'APT', value: 89000000, date: 'Feb 12' },
        { token: 'SUI', value: 12000000, date: 'Feb 03' },
        { token: 'OP', value: 34000000, date: 'Jan 30' },
    ];

    return NextResponse.json(unlocks);
}
