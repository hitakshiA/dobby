import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowUp, Globe, Link as LinkIcon, Zap } from 'lucide-react'; // Added icons
import styles from './AiAgentWidget.module.css';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

const getTimestamp = () => new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

// Add props interface
interface AiAgentWidgetProps {
    linkedPluginIds?: string[];
    linkedWidgetNames?: string[];
    width?: number;
    height?: number;
}

const WEB_PLUGIN_ID = 'tool-1768599793';

// --- DEMO MODE CONFIGURATION ---
const DEMO_RESPONSES = [
    {
        keywords: ["contract", "security", "audit", "sweep", "rug", "risk"],
        response: "High Risk 🔴\n\n• Analysis: The contract contains a mutable proxy pattern matching the 'Gamma' exploit signature (98% match).\n• Authority: Ownership is NOT renounced. Mint authority is active.\n• Recommendation: DO NOT INTERACT. Immediate drain risk detected."
    },
    {
        keywords: ["yield", "apy", "stablecoin", "base", "ethereum", "gas"],
        response: "🏆 Winner: Aave V3 on Base Network.\n\n• Base APY: 12.4% (Net: 12.39% after $0.02 gas).\n• Mainnet APY: 14.1% (Net: 11.2% after $15.40 gas).\n\nAnalysis: Although Mainnet offers higher nominal yield, the gas drag erodes returns unless depositing >$25k. Route funds to Base for optimal capital efficiency."
    },
    {
        keywords: ["macro", "strategy", "open interest", "dominance", "leverage", "squeeze"],
        response: "⚠️ High Leverage Alert.\n\n• Open Interest: $22B (All-Time High).\n• Funding Rates: Negative (-0.02%).\n• BTC Dominance: Fading (54% -> 53%).\n\nSynthesis: This is a localized 'Short Squeeze' setup. Late shorts are piling in while spot buyers absorb the sell pressure. Probability of an upside squeeze: 85%."
    },
    {
        keywords: ["solana", "sniper", "speed", "new pool", "momentum", "pepe"],
        response: "Found 1 High-Momentum Opportunity ⚡:\n\n• Ticker: $PEPE2\n• Age: 4 mins 12 secs\n• Liquidity: $24,500 (Locked)\n• Network Status: Stable (3,400 TPS)\n\nAction: Momentum Entry Recommended. Buy pressure is accelerating (Volume +400% in last minute)."
    },
    {
        keywords: ["nft", "curator", "pudgy", "ape", "retention", "penguin"],
        response: "🐧 Pudgy Penguins are winning the retention war.\n\n• Pudgy Floor: +4.2% (Listing Ratio: DOWN 5%).\n• BAYC Floor: -1.2% (Listing Ratio: UP 2%).\n\nAnalysis: While BAYC has volume, existing holders are exiting. Pudgy holders are refusing to sell, creating a supply shock. Diamond hands are accumulating Penguins."
    },
    {
        keywords: ["vision", "chart", "pattern", "support", "invalidation"],
        response: "Analysis: Bull Flag Formation 🚩\n\n• Timeframe: 4H\n• Key Support: $142.50 (Retested twice).\n• Resistance: $148.00.\n• Invalidation: A candle close below $138.00 breaks the structure.\n\nTarget: $165.00 if resistance clears with volume."
    }
];


export const AiAgentWidget = ({ linkedPluginIds = [], linkedWidgetNames = [], width, height }: AiAgentWidgetProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<string>('');
    const [isWebEnabled, setIsWebEnabled] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, statusMessage]);

    const sendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return;

        const userTimestamp = getTimestamp();
        const userMessage: Message = { role: 'user', content: text, timestamp: userTimestamp };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setStatusMessage('Facilitating Your Request...');

        // Create a placeholder for the assistant response immediately so we can update it in real-time
        const assistantTimestamp = getTimestamp();
        setMessages(prev => [...prev, { role: 'assistant', content: '', timestamp: assistantTimestamp }]);

        // Combine linked plugins with web plugin if enabled
        const activePlugins = [...linkedPluginIds];
        if (isWebEnabled) activePlugins.push(WEB_PLUGIN_ID);

        // DEMO MODE OVERRIDE - CLIENT SIDE ONLY
        const isDemoMode = true;

        if (isDemoMode) {
            // Client-side simulation - NO FETCH
            setTimeout(() => {
                const lowerText = text.toLowerCase();
                let matchedResponse = "I'm analyzing the data... please be specific about which agent you want to consult.";

                // Find matching scenario
                for (const scenario of DEMO_RESPONSES) {
                    if (scenario.keywords.some(k => lowerText.includes(k))) {
                        matchedResponse = scenario.response;
                        break;
                    }
                }

                // Simulate response
                setMessages(prev => {
                    const newMsgs = [...prev];
                    const lastMsg = newMsgs[newMsgs.length - 1];
                    // Ensure we are updating the assistant placeholder
                    if (lastMsg.role === 'assistant') {
                        lastMsg.content = matchedResponse;
                    }
                    return newMsgs;
                });

                setIsLoading(false);
                setStatusMessage('');
            }, 8200); // 8.2s delay for "Facilitating Your Request" effect
            return; // EXIT FUNCTION - DO NOT FETCH
        }

        abortControllerRef.current = new AbortController();

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: messages.map(m => ({ role: m.role, content: m.content })).concat([{ role: 'user', content: text }]),
                    sessionId: sessionId,
                    pluginIds: activePlugins
                }),
                signal: abortControllerRef.current.signal
            });

            if (!response.ok) throw new Error('Fetch failed');

            // Capture session ID from headers if available (our proxy sets this)
            const newSessionId = response.headers.get('X-OnDemand-Session-Id');
            if (newSessionId && !sessionId) {
                setSessionId(newSessionId);
            }

            // SSE Handling
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (!reader) throw new Error('No readable stream');

            let buffer = '';
            let accumulatedAnswer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                buffer += chunk;

                const lines = buffer.split('\n');
                buffer = lines.pop() || ''; // Keep incomplete line

                for (const line of lines) {
                    if (line.trim() === '') continue;

                    // The backend proxy sends raw SSE lines like "data: {...}"
                    if (line.startsWith('data:')) {
                        const dataStr = line.slice(5).trim();

                        // CRITICAL: Handle [DONE] signal
                        if (dataStr === '[DONE]') {
                            break;
                        }

                        try {
                            const jsonData = JSON.parse(dataStr);

                            // 1. Fulfillment (The actual answer chunks)
                            if (jsonData.eventType === 'fulfillment' && jsonData.answer) {
                                accumulatedAnswer += jsonData.answer;

                                // Update the last message (which is the assistant's placeholder)
                                setMessages(prev => {
                                    const newMsgs = [...prev];
                                    const lastMsg = newMsgs[newMsgs.length - 1];
                                    if (lastMsg.role === 'assistant') {
                                        lastMsg.content = accumulatedAnswer;
                                    }
                                    return newMsgs;
                                });
                            }

                            // 2. Status Updates (Loading messages)
                            else if (jsonData.eventType === 'statusLog') {
                                if (jsonData.currentStatusLog?.statusMessage) {
                                    let msg = jsonData.currentStatusLog.statusMessage;
                                    // If agents executed, show specifically which one
                                    if (jsonData.executedAgents?.length > 0) {
                                        msg = `Running ${jsonData.executedAgents[0].name}...`;
                                    }
                                    else if (jsonData.retrievedAgents?.length > 0) {
                                        msg = `Consulting ${jsonData.retrievedAgents[0].name}...`;
                                    }
                                    setStatusMessage(msg);
                                }
                            }

                        } catch (e) {
                            // Verify if it's not just a benign keep-alive or malformed chunk
                            console.warn('JSON parse error in stream:', e);
                        }
                    }
                    // Handle direct answer format if our proxy simplifies it (fallback)
                    else {
                        // Attempt to parse as direct JSON if not prefixed with data:
                        try {
                            // This is just a fallback for robustness
                        } catch (e) { }
                    }
                }
            }

        } catch (error: any) {
            if (error.name !== 'AbortError') {
                console.error('Chat error:', error);
                setMessages(prev => {
                    // Check if last message was empty assistant msg, if so update it
                    const newMsgs = [...prev];
                    const lastMsg = newMsgs[newMsgs.length - 1];
                    if (lastMsg.role === 'assistant' && !lastMsg.content) {
                        lastMsg.content = '⚠️ Connection failed.';
                    } else {
                        newMsgs.push({ role: 'assistant', content: '⚠️ Connection failed.', timestamp: getTimestamp() });
                    }
                    return newMsgs;
                });
            }
        } finally {
            setIsLoading(false);
            setStatusMessage('');
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    return (
        <div className={styles.terminalContainer} onClick={() => inputRef.current?.focus()}>
            {/* Modern Header */}
            {/* Modern Header */}
            {/* Modern Header - CSS Modules */}
            <div className={styles.modernHeader}>
                {/* Top Row: Title & Web Toggle */}
                <div className={styles.topRow}>
                    <div className={styles.headerTitle}>DOBBY OS</div>

                    {/* Web Toggle (Top Right) */}
                    {/* Web Toggle Disabled temporarily due to API latency 
                    <div className={styles.webToggleWrapper}>
                        <button 
                            onClick={(e) => { e.stopPropagation(); setIsWebEnabled(!isWebEnabled); }}
                            className={`${styles.webButton} ${isWebEnabled ? styles.webButtonActive : ''}`}
                            title={isWebEnabled ? "Web Research Active" : "Enable Web Research"}
                        >
                            <Globe size={14} className={isWebEnabled ? styles.animatePulse : ""} />
                        </button>
                    </div>
                    */}
                </div>

                {/* Bottom Row: Active Context (Pills) */}
                {(linkedWidgetNames.length > 0 || isWebEnabled) && (
                    <div className={styles.contextRow}>
                        {isWebEnabled && (
                            <div className={`${styles.pill} ${styles.pillBlue}`}>
                                <Globe size={10} />
                                <span>Web Active</span>
                            </div>
                        )}
                        {linkedWidgetNames.map((name, i) => (
                            <div key={i} className={styles.pill} style={{ animationDelay: `${i * 50}ms` }}>
                                <LinkIcon size={10} className={styles.pillIcon} />
                                <span className={styles.truncate}>{name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Logs Area */}
            <div className={styles.logsArea}>
                {messages.map((msg, idx) => (
                    <div key={idx} className={styles.logEntry}>
                        <div className={styles.logHeader}>
                            <span className={styles.timestamp}>{msg.timestamp}</span>
                            <span className={msg.role === 'user' ? styles.userHeader : styles.aiHeader}>
                                {msg.role === 'user' ? 'USER' : 'AI'}
                            </span>
                        </div>
                        <div className={styles.logContent}>
                            <ReactMarkdown
                                components={{
                                    p: ({ node, ...props }: any) => <span {...props} />,
                                    code: ({ node, ...props }: any) => <code {...props} />,
                                    pre: ({ node, ...props }: any) => <div className="mt-2 mb-2 p-2 bg-gray-100 border border-gray-300 rounded overflow-x-auto text-[10px] text-black" {...props} />
                                }}
                            >
                                {msg.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className={styles.thinkingLine}>
                        <div className={styles.spinner}></div>
                        <span>{statusMessage || 'processing...'}</span>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className={styles.inputArea}>
                <div className={styles.inputRow}>
                    <span className={styles.prompt}>~</span>
                    <input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={styles.input}
                        placeholder={isLoading ? "Processing..." : "Type command..."}
                        autoComplete="off"
                        spellCheck="false"
                        disabled={isLoading}
                    />
                    {!isLoading && input.length > 0 && (
                        <button
                            onClick={() => sendMessage(input)}
                            className={styles.sendButton}
                        >
                            <ArrowUp size={12} strokeWidth={3} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
