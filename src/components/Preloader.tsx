'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Custom scramble utility
const scrambleText = (
    element: HTMLElement,
    finalText: string,
    duration: number = 1,
    startDelay: number = 0
) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    const length = finalText.length;

    const obj = { p: 0 };

    gsap.to(obj, {
        p: 1,
        duration: duration,
        delay: startDelay,
        ease: "none",
        onUpdate: () => {
            const progress = obj.p;
            let result = "";
            for (let i = 0; i < length; i++) {
                if (i < length * progress) {
                    result += finalText[i];
                } else {
                    result += chars[Math.floor(Math.random() * chars.length)];
                }
            }
            element.innerText = result;
        },
        onComplete: () => {
            element.innerText = finalText;
        }
    });
};

interface PreloaderProps {
    onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                // Animation complete
                gsap.to(containerRef.current, {
                    yPercent: -100,
                    duration: 0.8,
                    ease: "power2.inOut",
                    onComplete: onComplete
                });
            }
        });

        // Initial state
        gsap.set(".terminal-line", { opacity: 0 });

        const lines = gsap.utils.toArray<HTMLElement>(".terminal-line");
        const totalDuration = 5;

        // Scramble text animation for each line
        lines.forEach((line, i) => {
            const spans = line.querySelectorAll('span[data-scramble="true"]');
            const startTime = (i / lines.length) * (totalDuration * 0.8);

            tl.to(line, { opacity: 1, duration: 0.2 }, startTime);

            spans.forEach((span) => {
                const el = span as HTMLElement;
                const originalText = el.innerText;
                el.innerText = ""; // Clear initially

                // Add a dummy tween to the timeline to trigger the custom scramble
                tl.add(() => {
                    scrambleText(el, originalText, 0.8);
                }, startTime + 0.1);
            });
        });

        // Progress bar animation
        tl.to(progressBarRef.current, {
            width: "100%",
            duration: totalDuration,
            ease: "none"
        }, 0);

        // Disappear lines at the end
        tl.to(lines, {
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power1.in"
        }, totalDuration - 1);

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="preloader" id="preloader">
            <div className="terminal-preloader">
                <div className="border-top">
                    <span>Market Synchronization</span>
                    <span>Traversal Initiated</span>
                </div>

                <div className="terminal-container">
                    {/* Main flow */}
                    <div className="terminal-line" style={{ top: '0px' }}>
                        <span className="faded" data-scramble="true">Network Status:</span>
                        <span className="highlight" data-scramble="true" style={{ marginLeft: '10px' }}>Online</span>
                    </div>

                    <div className="terminal-line" style={{ top: '30px' }}>
                        <span className="faded" data-scramble="true">Calibrating</span>
                        <span className="highlight" data-scramble="true" style={{ marginLeft: '10px' }}>Alpha Seekers</span>
                    </div>

                    <div className="terminal-line" style={{ top: '60px' }}>
                        <span className="highlight" data-scramble="true">Liquidity Pools Detected</span>
                    </div>

                    <div className="terminal-line" style={{ top: '90px' }}>
                        <span className="highlight" data-scramble="true">Aggregating Decentralized Feeds</span>
                    </div>

                    {/* Progress Bar Section */}
                    <div className="progress-line">
                        <span className="progress-label">Loading</span>
                        <div className="progress-container">
                            <div ref={progressBarRef} className="progress-bar" id="progress-bar"></div>
                        </div>
                        <span className="highlight" style={{ marginLeft: "10px" }} data-scramble="true">System Access</span>
                    </div>

                    {/* Second block */}
                    <div className="terminal-line" style={{ top: '165px' }}>
                        <span className="highlight" data-scramble="true">Cross-Chain Bridges Active</span>
                    </div>

                    <div className="terminal-line" style={{ top: '195px' }}>
                        <span className="highlight" data-scramble="true">Monitoring Whale Wallets</span>
                    </div>

                    <div className="terminal-line" style={{ top: '225px' }}>
                        <span className="highlight" data-scramble="true">Establishing Secure Handshake</span>
                    </div>

                    <div className="terminal-line" style={{ top: '255px' }}>
                        <span className="highlight" data-scramble="true">Gateway Stabilizing</span>
                    </div>

                    <div className="terminal-line" style={{ top: '285px' }}>
                        <span className="highlight" data-scramble="true">Reality Parameters Reconfigured</span>
                    </div>

                    {/* Background faded lines */}
                    <div className="terminal-line" style={{ top: '15px' }}>
                        <span className="faded" data-scramble="true">Latency: 14ms</span>
                    </div>

                    <div className="terminal-line" style={{ top: '45px' }}>
                        <span className="faded" data-scramble="true">Connecting to Solana Mainnet</span>
                    </div>

                    <div className="terminal-line" style={{ top: '75px' }}>
                        <span className="faded" data-scramble="true">Indexing Ethereum Mempool</span>
                    </div>

                    <div className="terminal-line" style={{ top: '105px' }}>
                        <span className="faded" data-scramble="true">Calculating Yield APYs</span>
                    </div>

                    <div className="terminal-line" style={{ top: '180px' }}>
                        <span className="faded" data-scramble="true">Verifying Smart Contracts</span>
                    </div>

                    <div className="terminal-line" style={{ top: '240px' }}>
                        <span className="faded" data-scramble="true">Syncing Block Heights</span>
                    </div>
                </div>

                <div className="border-bottom">
                    <span>Initialization Complete</span>
                    <span>Welcome to Dobby</span>
                </div>
            </div>
        </div>
    );
}
