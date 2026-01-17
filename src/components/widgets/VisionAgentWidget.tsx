
import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, Send, Image as ImageIcon, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './VisionAgentWidget.module.css';
import { analyzeImage } from '@/app/actions/vision';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export const VisionAgentWidget = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [mediaId, setMediaId] = useState<string | null>(null);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [thinking, setThinking] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // --- File Handling ---

    // --- File Handling ---

    const handleFile = async (file: File) => {
        if (!file.type.startsWith('image/')) return;

        // Preview
        const objectUrl = URL.createObjectURL(file);
        setImageUrl(objectUrl);
        setUploading(true);

        try {
            // Convert to Base64 for Gemini
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64String = reader.result as string;
                // Remove data:image/png;base64, prefix
                const base64Content = base64String.split(',')[1];
                setMediaId(base64Content); // Storing Base64 as "MediaID" for now
                setMessages([{
                    id: 'init',
                    role: 'assistant',
                    content: 'Image loaded into OnDemand. Ask me anything!'
                }]);
                setUploading(false);
            };
            reader.onerror = (error) => {
                console.error('File reading error:', error);
                setUploading(false);
            };
        } catch (e) {
            console.error(e);
            setUploading(false);
        }
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files?.[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    // Paste Handler (Ctrl+V)
    useEffect(() => {
        const handlePaste = (e: ClipboardEvent) => {
            if (mediaId || uploading) return; // Already working
            const items = e.clipboardData?.items;
            if (items) {
                for (let i = 0; i < items.length; i++) {
                    if (items[i].type.indexOf('image') !== -1) {
                        const file = items[i].getAsFile();
                        if (file) handleFile(file);
                        break;
                    }
                }
            }
        };
        document.addEventListener('paste', handlePaste);
        return () => document.removeEventListener('paste', handlePaste);
    }, [mediaId, uploading]);

    // --- Chat Logic ---

    // Import the server action (Dynamically import or assume it's available via props/context if needed, 
    // but typically we import at top. Since I can't add imports easily with replace_file_content in one go 
    // if they are far apart, I'll add the import in a separate step or usage a dynamic import here if Next.js allows,
    // but standard practice is top-level. I will add the import in a separate step.)

    const handleSend = async () => {
        if (!input.trim() || !mediaId) return;

        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setThinking(true);

        // --- DEMO MODE SIMULATION ---
        const isDemoMode = true;
        if (isDemoMode) {
            setTimeout(() => {
                const lowerText = input.toLowerCase();
                let responseText = "I see the image. What would you like to know?";

                if (lowerText.includes("analyze") || lowerText.includes("chart") || lowerText.includes("pattern")) {
                    responseText = "Analysis: Analytics Center Dashboard (Solana) 📊\n\n• Price Action: SOL/USDT is trading at **$144.41** (+1.21% 24h).\n• Order Depth: I see a significant **Buy Wall** (Green) absorbing sell pressure.\n• Momentum: The gauge indicates steady bullish strength.\n• Signal: **Reversal Confirmed**. The heavy buy-side depth suggests $144 is a strong verified support floor.";
                }

                setMessages(prev => [...prev, {
                    id: Date.now().toString() + 'ai',
                    role: 'assistant',
                    content: responseText
                }]);
                setThinking(false);
            }, 8200); // 8.2s delay for "Facilitating Request" feel
            return;
        }

        try {
            // Call Server Action
            const result = await analyzeImage(mediaId, input);

            if (result.success && result.text) {
                setMessages(prev => [...prev, {
                    id: Date.now().toString() + 'ai',
                    role: 'assistant',
                    content: result.text
                }]);
            } else {
                throw new Error(result.error || 'Unknown error');
            }

        } catch (e) {
            setMessages(prev => [...prev, {
                id: Date.now().toString() + 'err',
                role: 'assistant',
                content: "Error: " + (e instanceof Error ? e.message : "Failed to analyze image.")
            }]);
        } finally {
            setThinking(false);
        }
    };

    // Auto scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                Vision Agent V1
            </div>

            <div className={styles.content}>
                {!mediaId ? (
                    // Drop Zone
                    <div
                        className={`${styles.dropZone} ${isDragging ? styles.dropZoneActive : ''}`}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={onDrop}
                    >
                        {uploading ? (
                            <div className="flex flex-col items-center gap-2">
                                <Loader2 className="animate-spin text-purple-500" size={32} />
                                <span className={styles.dropText}>Uploading & Analyzing...</span>
                            </div>
                        ) : (
                            <>
                                <ImageIcon className={styles.dropIcon} />
                                <div>
                                    <div className={styles.dropText}>Drag Image or Paste (Ctrl+V)</div>
                                    <div className={styles.dropSub}>Analyze charts, UI, or screenshots</div>
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    // Chat Interface
                    <div className={styles.chatContainer}>
                        {imageUrl && (
                            <div className={styles.imagePreview}>
                                <img src={imageUrl} className={styles.previewImg} alt="Analysis Target" />
                                <button
                                    onClick={() => { setMediaId(null); setImageUrl(null); setMessages([]); }}
                                    className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-red-500/80 transition-colors"
                                >
                                    <X size={12} className="text-white" />
                                </button>
                            </div>
                        )}

                        <div className={styles.messages}>
                            {messages.map(m => (
                                <motion.div
                                    key={m.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`${styles.message} ${m.role === 'user' ? styles.userMsg : styles.aiMsg}`}
                                >
                                    {m.content}
                                </motion.div>
                            ))}
                            {thinking && (
                                <div className={styles.thinking}>
                                    <span className="animate-pulse">Vision Agent is thinking...</span>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className={styles.inputArea}>
                            <input
                                className={styles.input}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about this image..."
                                disabled={thinking}
                                autoFocus
                            />
                            <button
                                className={styles.sendBtn}
                                onClick={handleSend}
                                disabled={thinking || !input.trim()}
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
