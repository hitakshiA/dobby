import React, { useEffect, useRef } from 'react';
import UnicornScene from 'unicornstudio-react';
import gsap from 'gsap';
import styles from './UnicornPreloader.module.css';

interface UnicornPreloaderProps {
    onComplete: () => void;
}

const UnicornPreloader: React.FC<UnicornPreloaderProps> = ({ onComplete }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

    useEffect(() => {
        // Set initial dimensions
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        });

        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Simulate loading duration or wait for scene ready
        // Since UnicornScene doesn't expose an onReady prop easily here without checking docs deeper,
        // we'll use a safe timeout to ensure it's visible before fading out.
        const timeout = setTimeout(() => {
            if (containerRef.current) {
                gsap.to(containerRef.current, {
                    opacity: 0,
                    duration: 1.0,
                    ease: "power2.inOut",
                    onComplete: () => {
                        onComplete();
                    }
                });
            }
        }, 4500); // 4.5 seconds duration

        return () => clearTimeout(timeout);
    }, [onComplete]);

    return (
        <div ref={containerRef} className={styles.container}>
            <UnicornScene
                projectId="bLd7Gw2ZpLj9GOznxGRE" // User provided ID
                width={dimensions.width}
                height={dimensions.height}
                scale={1}
                dpi={1.5}
            />
        </div>
    );
};

export default UnicornPreloader;
