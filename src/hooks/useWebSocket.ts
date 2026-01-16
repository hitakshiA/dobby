import { useState, useEffect, useRef, useCallback } from 'react';

interface WebSocketOptions {
    onOpen?: (event: Event) => void;
    onClose?: (event: CloseEvent) => void;
    onMessage?: (event: MessageEvent) => void;
    onError?: (event: Event) => void;
    reconnectInterval?: number;
    maxReconnectAttempts?: number;
    shouldReconnect?: boolean;
}

export function useWebSocket(url: string, options: WebSocketOptions = {}) {
    const {
        onOpen,
        onClose,
        onMessage,
        onError,
        reconnectInterval = 3000,
        maxReconnectAttempts = 5,
        shouldReconnect = true,
    } = options;

    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<Event | null>(null);
    const wsRef = useRef<WebSocket | null>(null);
    const reconnectCount = useRef(0);
    const reconnectTimer = useRef<NodeJS.Timeout | null>(null);

    const connect = useCallback(() => {
        try {
            if (wsRef.current?.readyState === WebSocket.OPEN) return;

            const ws = new WebSocket(url);

            ws.onopen = (event) => {
                setIsConnected(true);
                setError(null);
                reconnectCount.current = 0;
                if (onOpen) onOpen(event);
            };

            ws.onclose = (event) => {
                setIsConnected(false);
                if (onClose) onClose(event);

                if (shouldReconnect && reconnectCount.current < maxReconnectAttempts) {
                    reconnectTimer.current = setTimeout(() => {
                        reconnectCount.current++;
                        connect();
                    }, reconnectInterval);
                }
            };

            ws.onmessage = (event) => {
                if (onMessage) onMessage(event);
            };

            ws.onerror = (event) => {
                setError(event);
                if (onError) onError(event);
            };

            wsRef.current = ws;

        } catch (e) {
            console.error('WebSocket connection failed:', e);
        }
    }, [url, onOpen, onClose, onMessage, onError, reconnectInterval, maxReconnectAttempts, shouldReconnect]);

    useEffect(() => {
        connect();

        return () => {
            if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
            if (wsRef.current) wsRef.current.close();
        };
    }, [connect]);

    const sendMessage = useCallback((data: string | ArrayBufferLike | Blob | ArrayBufferView) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(data);
        } else {
            console.warn('WebSocket is not connected');
        }
    }, []);

    return { isConnected, error, sendMessage };
}
