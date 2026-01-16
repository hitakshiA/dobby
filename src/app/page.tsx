'use client';

import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import CustomEase from 'gsap/CustomEase';
import Lenis from 'lenis';
import { TextHeatReveal } from '@/utils/TextHeatReveal';

import { animateScramble, animateGlitch } from '@/utils/animations';
import UnicornPreloader from '@/components/UnicornPreloader/UnicornPreloader';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  CustomEase.create("customEase", "M0,0 C0.86,0 0.07,1 1,1");
}

/* Sound Manager Logic */
class SoundManager {
  sounds: { [key: string]: HTMLAudioElement };
  isEnabled: boolean;

  constructor() {
    this.sounds = {};
    this.isEnabled = false;
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  init() {
    this.loadSound("hover", "https://assets.codepen.io/7558/click-reverb-001.mp3", 0.15);
    this.loadSound("click", "https://assets.codepen.io/7558/shutter-fx-001.mp3", 0.3);
    this.loadSound("textChange", "https://assets.codepen.io/7558/whoosh-fx-001.mp3", 0.3);
  }

  loadSound(name: string, url: string, volume = 0.3) {
    const audio = new Audio(url);
    audio.preload = "auto";
    audio.volume = volume;
    this.sounds[name] = audio;
  }

  enableAudio() {
    if (!this.isEnabled) {
      this.isEnabled = true;
    }
  }

  play(soundName: string, delay = 0) {
    if (this.isEnabled && this.sounds[soundName]) {
      setTimeout(() => {
        this.sounds[soundName].currentTime = 0;
        this.sounds[soundName].play().catch(() => { });
      }, delay);
    }
  }
}

const soundManager = new SoundManager();

const ARTISTS = [
  "", // Intro placeholder
  "Market Scan", "Whale Watch", "Token Sniffer", "Volume Spike", "Liquidity",
  "Social Sent.", "Smart Money", "Gas Tracker", "Yield Hunt", "Alpha Leak"
];

const CATEGORIES = [
  "", // Intro placeholder
  "Active", "Tracking", "Analyzed", "+500% Vol", "Draining",
  "Trending", "Accumulating", "Low Gwei", "High APY", "Verified"
];

const SLIDE_DATA = [
  {
    header: [],
    center: ["DOBBY"],
    footer: (
      <div className="scroll-hint">
        <span>SCROLL TO BEGIN</span>
        <div className="scroll-arrow">↓</div>
      </div>
    ),
    intro: true
  },
  {
    header: ["DOBBY", "INTELLIGENCE"],
    center: [],
    footer: "PIERCE THE NOISE",
    intro: true
  },
  {
    header: ["OMNISCIENT", "VIEW"],
    center: ["Real-time surveillance of", "global market movements."],
    footer: "SEE EVERYTHING"
  },
  {
    header: ["APEX", "PREDATORS"],
    center: ["Tracking large wallet", "movements across chains."],
    footer: "HUNT THE GIANTS"
  },
  {
    header: ["FIRST", "MOVER"],
    center: ["Instantly detecting", "new token deployments."],
    footer: "ZERO LATENCY"
  },
  {
    header: ["MOMENTUM", "SHIFT"],
    center: ["Identifying abnormal", "trading volume patterns."],
    footer: "RIDE THE WAVE"
  },
  {
    header: ["DEPTH", "SENSING"],
    center: ["Monitoring liquidity pool", "depth and stability."],
    footer: "TRUE VALUE"
  },
  {
    header: ["HIVE", "MIND"],
    center: ["Analyzing social media", "trends and sentiment."],
    footer: "DECODE HYPE"
  },
  {
    header: ["ELITE", "TRACKING"],
    center: ["Following profitable", "wallet addresses."],
    footer: "COPY WINNERS"
  },
  {
    header: ["EXECUTION", "SPEED"],
    center: ["Optimizing transaction", "costs in real-time."],
    footer: "ZERO FRICTION"
  },
  {
    header: ["MAXIMIZE", "RETURNS"],
    center: ["Finding the highest", "APY opportunities."],
    footer: "PASSIVE GAINS"
  }
];

// Original flame glow blur images
const BG_IMAGES = [
  "https://assets.codepen.io/7558/flame-glow-blur-001.jpg", // Intro
  "https://assets.codepen.io/7558/flame-glow-blur-001.jpg", // Intro
  "https://assets.codepen.io/7558/flame-glow-blur-001.jpg",
  "https://assets.codepen.io/7558/flame-glow-blur-002.jpg",
  "https://assets.codepen.io/7558/flame-glow-blur-003.jpg",
  "https://assets.codepen.io/7558/flame-glow-blur-004.jpg",
  "https://assets.codepen.io/7558/flame-glow-blur-005.jpg",
  "https://assets.codepen.io/7558/flame-glow-blur-006.jpg",
  "https://assets.codepen.io/7558/flame-glow-blur-007.jpg",
  "https://assets.codepen.io/7558/flame-glow-blur-008.jpg",
  "https://assets.codepen.io/7558/flame-glow-blur-009.jpg",
  "https://assets.codepen.io/7558/flame-glow-blur-010.jpg"
];

export default function Home() {

  /* Preloader State */
  const [loading, setLoading] = useState(true);

  const [currentSection, setCurrentSection] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const lenisRef = useRef<Lenis | null>(null);
  const fixedContainerRef = useRef<HTMLDivElement>(null);
  const fixedSectionRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  const backgroundsRef = useRef<(HTMLDivElement | null)[]>([]);
  const artistsRef = useRef<(HTMLDivElement | null)[]>([]);
  const categoriesRef = useRef<(HTMLDivElement | null)[]>([]);
  const featuredRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isAnimating = useRef(false);
  const isSnapping = useRef(false);



  // Preloader finishes
  // Preloader finishes
  const handlePreloaderComplete = () => {
    setLoading(false);
    animateColumns();
  };

  useEffect(() => {
    // Initial Side Column State
    if (currentSection === 0) {
      gsap.set(".left-column", { x: -100, opacity: 0 });
      gsap.set(".right-column", { x: 100, opacity: 0 });
      gsap.set(".featured", { width: "100%" });
    }
  }, []);



  const animateColumns = () => {
    artistsRef.current.forEach((item, index) => {
      if (item) setTimeout(() => item.classList.add("loaded"), index * 60);
    });
    categoriesRef.current.forEach((item, index) => {
      if (item) setTimeout(() => item.classList.add("loaded"), index * 60 + 200);
    });
  };

  useLayoutEffect(() => {
    if (loading) return;


    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const st = ScrollTrigger.create({
      trigger: fixedSectionRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: fixedContainerRef.current,
      pinSpacing: true,
      onUpdate: (self) => {
        if (isSnapping.current) return;

        const progress = self.progress;
        const totalSlides = SLIDE_DATA.length - 1;
        const target = Math.min(totalSlides, Math.floor(progress * (totalSlides + 1)));

        if (target !== currentSection && !isAnimating.current) {
          const nextSection = currentSection + (target > currentSection ? 1 : -1);
          snapToSection(nextSection);
        }

        if (progressFillRef.current) {
          progressFillRef.current.style.width = `${(currentSection / (SLIDE_DATA.length - 1)) * 100}%`;
        }
      }
    });

    ScrollTrigger.create({
      trigger: ".end-section",
      start: "top center",
      end: "bottom bottom",
      onUpdate: (self) => {
        const blurNodes = document.querySelectorAll('.scroll-footer, .left-column, .right-column, .featured, .section-header');
        if (self.progress > 0.1) {
          blurNodes.forEach(node => node.classList.add('blur'));
          const newHeight = Math.max(0, 100 - ((self.progress - 0.1) / 0.9) * 100);
          gsap.to(fixedContainerRef.current, { height: `${newHeight}vh`, duration: 0.1, overwrite: true });

          const moveY = (-(self.progress - 0.1) / 0.9) * 200;
          gsap.to(".section-header", { y: moveY * 1.5, duration: 0.1, overwrite: true });
          gsap.to(".content", { y: moveY, yPercent: -50, duration: 0.1, overwrite: true });
          gsap.to(".scroll-footer", { y: moveY * 0.5, duration: 0.1, overwrite: true });

        } else {
          blurNodes.forEach(node => node.classList.remove('blur'));
          gsap.to(fixedContainerRef.current, { height: "100vh", duration: 0.1, overwrite: true });
          gsap.to(".section-header", { y: 0, duration: 0.1, overwrite: true });
          gsap.to(".content", { y: 0, yPercent: -50, duration: 0.1, overwrite: true });
          gsap.to(".scroll-footer", { y: 0, duration: 0.1, overwrite: true });
        }
      }
    });

    return () => {
      lenis.destroy();
      st.kill();
    };

  }, [loading, currentSection]);

  const snapToSection = (targetIndex: number) => {
    if (targetIndex < 0 || targetIndex >= SLIDE_DATA.length || targetIndex === currentSection || isAnimating.current) return;

    isSnapping.current = true;
    changeSection(targetIndex);

    if (fixedSectionRef.current && lenisRef.current) {
      const start = fixedSectionRef.current.offsetTop;
      const height = fixedSectionRef.current.offsetHeight;
      const targetPos = start + (height * targetIndex / SLIDE_DATA.length);

      lenisRef.current.scrollTo(targetPos, {
        duration: 0.8,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        lock: true,
        onComplete: () => { isSnapping.current = false; }
      });
    }
  };

  const changeSection = (newSection: number) => {
    if (newSection === currentSection || isAnimating.current) return;
    isAnimating.current = true;
    const isScrollingDown = newSection > currentSection;
    const prevSection = currentSection;
    setCurrentSection(newSection);

    // Side Columns Animation (Intro vs Content)
    if (newSection === 0) {
      // Going to Intro: Hide sides, Expand Center
      gsap.to(".left-column", { x: -100, opacity: 0, duration: 0.5, ease: "power2.out" });
      gsap.to(".right-column", { x: 100, opacity: 0, duration: 0.5, ease: "power2.out" }); // Fix direction
      gsap.to(".featured", { width: "100%", duration: 0.5, ease: "power2.inOut" });
    } else {
      // Going to Content: Show sides, Shrink Center
      gsap.to(".left-column", { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
      gsap.to(".right-column", { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
      gsap.to(".featured", { width: "40%", duration: 0.5, ease: "power2.inOut" });
    }

    const prevFeatured = featuredRefs.current[prevSection];
    const nextFeatured = featuredRefs.current[newSection];
    const duration = 0.64;

    if (prevFeatured) {
      const words = prevFeatured.querySelectorAll('.split-word');
      gsap.to(words, {
        yPercent: isScrollingDown ? -100 : 100,
        opacity: 0,
        duration: duration * 0.6,
        stagger: isScrollingDown ? 0.03 : -0.03,
        ease: "customEase",
        onComplete: () => {
          gsap.set(prevFeatured, { visibility: "hidden" });
          prevFeatured.classList.remove('active');
        }
      });
    }

    if (nextFeatured) {
      soundManager.play("textChange", 250);
      nextFeatured.classList.add('active');
      gsap.set(nextFeatured, { visibility: "visible", opacity: 1 });
      const words = nextFeatured.querySelectorAll('.split-word');

      gsap.set(words, { yPercent: isScrollingDown ? 100 : -100, opacity: 0 });
      gsap.to(words, {
        yPercent: 0, opacity: 1, duration: duration,
        stagger: isScrollingDown ? 0.05 : -0.05, ease: "customEase",
        onComplete: () => { isAnimating.current = false; }
      });
    }

    backgroundsRef.current.forEach((bg, i) => {
      if (!bg) return;
      bg.classList.remove("previous", "active");

      if (i === newSection) {
        bg.classList.add("active");
        if (isScrollingDown) {
          gsap.set(bg, { opacity: 1, y: 0, clipPath: "inset(100% 0 0 0)" });
          gsap.to(bg, { clipPath: "inset(0% 0 0 0)", duration: duration, ease: "customEase" });
        } else {
          gsap.set(bg, { opacity: 1, y: 0, clipPath: "inset(0 0 100% 0)" });
          gsap.to(bg, { clipPath: "inset(0 0 0% 0)", duration: duration, ease: "customEase" });
        }
      } else if (i === prevSection) {
        bg.classList.add("previous");
        const parallax = 5;
        gsap.to(bg, { y: isScrollingDown ? `${parallax}%` : `-${parallax}%`, duration: duration, ease: "customEase" });
        gsap.to(bg, {
          opacity: 0, delay: duration * 0.5, duration: duration * 0.5, ease: "customEase",
          onComplete: () => { bg.classList.remove("previous"); gsap.set(bg, { y: 0 }); }
        });
      } else {
        gsap.to(bg, { opacity: 0, duration: duration * 0.3, ease: "customEase" });
      }
    });

    artistsRef.current.forEach((el, i) => {
      if (el) {
        if (i === newSection) {
          el.classList.add("active");
          gsap.to(el, { opacity: 1, duration: 0.3 });
        } else {
          el.classList.remove("active");
          gsap.to(el, { opacity: 0.3, duration: 0.3 });
        }
      }
    });
    categoriesRef.current.forEach((el, i) => {
      if (el) {
        if (i === newSection) {
          el.classList.add("active");
          gsap.to(el, { opacity: 1, duration: 0.3 });
        } else {
          el.classList.remove("active");
          gsap.to(el, { opacity: 0.3, duration: 0.3 });
        }
      }
    });
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    soundManager.enableAudio();
  };

  const handleInteraction = () => {
    soundManager.enableAudio();
    soundManager.play("hover");
  };

  return (
    <main>
      <a
        href="/new"
        className={`enter-button ${currentSection === 0 ? 'hidden' : (currentSection > 1 ? 'top-right' : '')}`}
        onClick={(e) => {
          e.preventDefault();
          // Full page reload for /new to clear home page from memory
          window.location.href = '/new';
        }}
      >
        [ ENTER ]
      </a>

      {loading && <UnicornPreloader onComplete={handlePreloaderComplete} />}

      <div className="scroll-container">
        <div ref={fixedSectionRef} className="fixed-section">
          <div ref={fixedContainerRef} className="fixed-container">
            <div className="background-container">
              {BG_IMAGES.map((src, i) => (
                <div
                  key={i}
                  className={`background-image ${i === 0 ? 'active' : ''}`}
                  ref={el => {
                    if (el && !el.dataset.initialized) {
                      const canvas = document.createElement('canvas');
                      canvas.width = window.innerWidth;
                      canvas.height = window.innerHeight;
                      canvas.style.width = '100%';
                      canvas.style.height = '100%';
                      el.appendChild(canvas);

                      // Initialize Heat Reveal
                      new TextHeatReveal(canvas, src, {
                        gridSize: 14,
                        fontSize: 12,
                        characters: "01DOBBYINTELLIGENCE",
                        resolution: 80,
                        imageBrightness: 1.1
                      });

                      backgroundsRef.current[i] = el; // Store container ref instead of img
                      el.dataset.initialized = "true";
                    }
                  }}
                >
                  {/* Canvas appended via ref callback */}
                </div>
              ))}
            </div>

            <div className="grid-container">
              <div className="section-header">
                {(SLIDE_DATA[currentSection] || SLIDE_DATA[0]).header.map((line, i) => (
                  <div key={i} className="header-row">{line}</div>
                ))}
              </div>

              <div className="content">
                <div className="left-column">
                  {ARTISTS.map((text, i) => (
                    <div
                      key={i}
                      ref={el => { artistsRef.current[i] = el }}
                      className={`artist ${i === 0 ? 'active' : ''}`}
                      data-index={i}
                      onClick={() => snapToSection(i)}
                      onMouseEnter={handleInteraction}
                    >
                      {text}
                    </div>
                  ))}
                </div>

                <div className="featured">
                  {SLIDE_DATA.map((slide, i) => (
                    <div
                      key={i}
                      ref={el => { featuredRefs.current[i] = el }}
                      className={`featured-content ${i === 0 ? 'active' : ''}`}
                    >
                      <h3 className={slide.intro ? 'text-mega' : ''}>
                        {slide.center.map((line, lineIdx) => (
                          <div key={lineIdx} className="center-line">
                            {line.split(' ').map((word, wI) => (
                              <div key={wI} className="word-mask">
                                <span className="split-word">{word}&nbsp;</span>
                              </div>
                            ))}
                          </div>
                        ))}
                      </h3>
                    </div>
                  ))}
                </div>

                <div className="right-column">
                  {CATEGORIES.map((text, i) => (
                    <div
                      key={i}
                      ref={el => { categoriesRef.current[i] = el }}
                      className={`category ${i === 0 ? 'active' : ''}`}
                      data-index={i}
                      onClick={() => snapToSection(i)}
                      onMouseEnter={handleInteraction}
                    >
                      {text}
                    </div>
                  ))}
                </div>
              </div>

              <div className="scroll-footer">
                {(SLIDE_DATA[currentSection] || SLIDE_DATA[0]).footer}
                <div className="progress-indicator">
                  <div className="progress-numbers">
                    <span>{(currentSection + 1).toString().padStart(2, '0')}</span>
                    <span>{SLIDE_DATA.length}</span>
                  </div>
                  <div ref={progressFillRef} className="progress-fill"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="end-section">
          <a href="https://github.com/hitakshiA" target="_blank" rel="noopener noreferrer" className="github-link">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
        </div>
      </div>
    </main>
  );
}
