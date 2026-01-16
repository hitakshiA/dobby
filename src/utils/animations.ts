
import gsap from 'gsap';

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export const animateScramble = (
    targets: Element | Element[],
    text: string,
    duration: number,
    delay: number = 0
) => {
    const elements = Array.isArray(targets) ? targets : [targets];

    elements.forEach(el => {
        const originalText = text || el.textContent || "";
        const length = originalText.length;

        // Store original text if needed for reference, but here we just animate TO it
        // If the element is empty, we act as if we are typing it out scambled

        let progress = { p: 0 };

        gsap.to(progress, {
            p: 1,
            duration: duration,
            delay: delay,
            ease: "none",
            onUpdate: () => {
                const p = progress.p;
                const revealIdx = Math.floor(p * length);

                let output = "";
                for (let i = 0; i < length; i++) {
                    if (i < revealIdx) {
                        output += originalText[i];
                    } else {
                        // Random char
                        output += CHARS[Math.floor(Math.random() * CHARS.length)];
                    }
                }
                el.textContent = output;
            },
            onComplete: () => {
                el.textContent = originalText;
            }
        });
    });
};

export const animateGlitch = (
    targets: Element | Element[],
    duration: number = 0.2
) => {
    const elements = Array.isArray(targets) ? targets : [targets];
    elements.forEach(el => {
        const originalText = el.textContent || "";
        let p = { val: 0 };
        gsap.to(p, {
            val: 1,
            duration: duration,
            onUpdate: () => {
                if (Math.random() > 0.5) {
                    const arr = originalText.split('');
                    const idx = Math.floor(Math.random() * arr.length);
                    arr[idx] = CHARS[Math.floor(Math.random() * CHARS.length)];
                    el.textContent = arr.join('');
                } else {
                    el.textContent = originalText;
                }
            },
            onComplete: () => {
                el.textContent = originalText;
            }
        })
    });
}
