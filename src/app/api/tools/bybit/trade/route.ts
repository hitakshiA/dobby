import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Bybit V5 Unified API - Order Creation Proxy
 * 
 * Supports One-Shot Order Creation with TakeProfit and StopLoss.
 * 
 * Documentation: https://bybit-exchange.github.io/docs/v5/order/create-order
 */

const BYBIT_API_KEY = process.env.BYBIT_API_KEY;
const BYBIT_API_SECRET = process.env.BYBIT_API_SECRET;
const BYBIT_BASE_URL = 'https://api.bybit.com'; // Use https://api-testnet.bybit.com for testnet

function generateSignature(parameters: string, secret: string, timestamp: string, recvWindow: string) {
    const data = timestamp + BYBIT_API_KEY + recvWindow + parameters;
    return crypto.createHmac('sha256', secret).update(data).digest('hex');
}

export async function POST(req: NextRequest) {
    try {
        if (!BYBIT_API_KEY || !BYBIT_API_SECRET) {
            return NextResponse.json(
                { error: 'Server Configuration Error: Missing Bybit API Keys.' },
                { status: 500 }
            );
        }

        const body = await req.json();
        const { symbol, side, qty, leverage = 10, takeProfit, stopLoss } = body;

        if (!symbol || !side || !qty) {
            return NextResponse.json(
                { error: 'Missing required parameters: symbol, side, qty' },
                { status: 400 }
            );
        }

        // 1. Construct Bybit V5 Payload
        const payload = {
            category: 'linear',  // Default to USDT Perpetuals
            symbol: symbol.toUpperCase(),
            side: side,          // "Buy" or "Sell"
            orderType: 'Market', // Default to Market for simplicity in Agent
            qty: String(qty),
            timeInForce: 'GTC',
            // Optional TP/SL
            ...(takeProfit && { takeProfit: String(takeProfit) }),
            ...(stopLoss && { stopLoss: String(stopLoss) }),
            // Agent-specific Defaults
            positionIdx: 0, // 0 for One-Way Mode (most common for simple bots)
        };

        const payloadString = JSON.stringify(payload);
        const timestamp = Date.now().toString();
        const recvWindow = '5000';
        const signature = generateSignature(payloadString, BYBIT_API_SECRET, timestamp, recvWindow);

        // 2. Call Bybit API
        const response = await fetch(`${BYBIT_BASE_URL}/v5/order/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-BAPI-API-KEY': BYBIT_API_KEY,
                'X-BAPI-TIMESTAMP': timestamp,
                'X-BAPI-SIGN': signature,
                'X-BAPI-RECV-WINDOW': recvWindow
            },
            body: payloadString
        });

        const data = await response.json();

        if (data.retCode !== 0) {
            return NextResponse.json(
                { error: `Bybit API Error: ${data.retMsg} (Code: ${data.retCode})` },
                { status: 400 }
            );
        }

        // 3. Success Response
        return NextResponse.json({
            success: true,
            message: `Order Placed: ${side} ${symbol} x ${qty}`,
            orderId: data.result.orderId,
            data: data.result
        });

    } catch (error: any) {
        console.error('Bybit Tool Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        );
    }
}
