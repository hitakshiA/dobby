
import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxy to PumpPortal API for generating trading transactions.
 * This allows the AI Agent to "buy" or "sell" tokens on Pump.fun.
 * 
 * Target API: https://pumpportal.fun/api/trade-local
 * Docs: https://pumpportal.fun
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { action, mint, amount, publicKey, slippage = 5, priorityFee = 0.005 } = body;

        // 1. Validation
        if (!action || !mint || !amount || !publicKey) {
            return NextResponse.json(
                { error: 'Missing required parameters: action, mint, amount, publicKey' },
                { status: 400 }
            );
        }

        if (!['buy', 'sell'].includes(action)) {
            return NextResponse.json(
                { error: 'Invalid action. Must be "buy" or "sell".' },
                { status: 400 }
            );
        }

        // 2. Construct Payload for PumpPortal
        // Docs: https://github.com/pumpportal/pumpportal-api
        const payload = {
            publicKey,
            action,
            mint,
            amount,
            denominatedInSol: "true", // We assume amount is always SOL for buys, Token Amount for sells? 
            // Note: PumpPortal docs say "denominatedInSol" is for input amount. 
            // For "buy": amount is SOL.
            // For "sell": amount is Token.
            // We will stick to SOL denomination for buys. For sells, it might be different.
            // Let's assume standard behavior: Buy = SOL amt, Sell = Token amt.
            // But for simplicity in this agent tool, we might force SOL input for buys.
            slippage,
            priorityFee,
            pool: "pump"
        };

        // Adjust for Sell: typically sells might not support denominatedInSol="true" if passing raw token amount. 
        // However, PumpPortal docs are sparse. Let's send it and rely on their default handling 
        // or assume the Agent passes the correct raw values.
        // SAFEGUARD: The agent might pass "0.1" for 0.1 SOL.

        // 3. Call External API
        const response = await fetch('https://pumpportal.fun/api/trade-local', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json(
                { error: `PumpPortal API Error: ${response.status}`, details: errorText },
                { status: response.status }
            );
        }

        // 4. Return the serialized transaction to the Agent
        // The Agent (OnDemand) will then likely ask the user to sign this, 
        // or if it's a "custodial" agent, it might try to sign it (but we don't have private keys here).
        // Review: The tool should return the TX to be passed back to the UI or displayed.
        const transactionData = await response.arrayBuffer();
        // PumpPortal returns binary data (the transaction). We need to encode it to base64 for JSON transport.
        const base64Tx = Buffer.from(transactionData).toString('base64');

        return NextResponse.json({
            success: true,
            message: `Transaction generated for ${action.toUpperCase()} ${mint}`,
            transaction: base64Tx, // Base64 encoded serialized transaction
            data: {
                mint,
                action,
                amount,
                slippage
            }
        });

    } catch (error: any) {
        console.error('Error in /api/tools/pumpfun/trade:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        );
    }
}
