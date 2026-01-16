
export class TextHeatReveal {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    W: number;
    H: number;
    res: number;
    characters: string;
    fontSize: number;
    fontFamily: string;
    words: string[];
    heat: {
        current: Float32Array;
        lastTime: number;
        active: boolean;
        maxValue: number;
    };
    P: any;
    scrambleInterval: number;
    scrambleAmount: number;
    scrambleActive: boolean;
    coverCanvas: HTMLCanvasElement;
    coverCtx: CanvasRenderingContext2D;
    coverData: ImageData | null;
    staticCanvas: HTMLCanvasElement;
    staticCtx: CanvasRenderingContext2D;
    staticRendered: boolean;
    lastFrameTime: number;
    frameCount: number;
    fps: number;
    lowPerformanceMode: boolean;
    charGrid: any[];
    img: HTMLImageElement;
    scrambleTimer: any;
    _raf: any;
    _lastEvt: number;
    _lastX: number | null;
    _lastY: number | null;

    constructor(canvas: HTMLCanvasElement, imgSrc: string, options: any = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d", {
            willReadFrequently: true
        }) as CanvasRenderingContext2D;
        this.W = canvas.width;
        this.H = canvas.height;
        this.res = options.resolution || 96;
        this.characters = options.characters || "GSAPHEATEFFECT!@#$%&*()_+";
        this.fontSize = options.fontSize || 10;
        this.fontFamily = options.fontFamily || "monospace";
        this.words = options.words || [
            "CREATE", "INSPIRE", "DESIGN", "IMAGINE", "VISION", "IDEA", "DREAM"
        ];
        this.heat = {
            current: new Float32Array(this.res * this.res).fill(0),
            lastTime: 0,
            active: false,
            maxValue: 0
        };
        this._lastEvt = 0;
        this._lastX = null;
        this._lastY = null;
        this.P = {
            grid: {
                size: options.gridSize || 20,
                weight: options.textWeight || 1,
                contrast: options.contrast || 1.2,
                minBrightness: options.minBrightness || 0.25,
                textOpacity: options.textOpacity || 0.85
            },
            effect: {
                strength: options.strength || 16.5,
                diffusion: options.diffusion || 0.92,
                decay: options.decay || 0.98,
                threshold: options.threshold || 0.04
            },
            image: {
                brightness: options.imageBrightness || 1.2,
                contrast: options.imageContrast || 1.3
            }
        };
        this.scrambleInterval = options.scrambleInterval || 50;
        this.scrambleAmount = options.scrambleAmount || 0.08;
        this.scrambleActive = true;
        this.coverCanvas = document.createElement("canvas");
        this.coverCanvas.width = this.W;
        this.coverCanvas.height = this.H;
        this.coverCtx = this.coverCanvas.getContext("2d") as CanvasRenderingContext2D;
        this.coverData = null;
        this.staticCanvas = document.createElement("canvas");
        this.staticCanvas.width = this.W;
        this.staticCanvas.height = this.H;
        this.staticCtx = this.staticCanvas.getContext("2d") as CanvasRenderingContext2D;
        this.staticRendered = false;
        this.lastFrameTime = 0;
        this.frameCount = 0;
        this.fps = 0;
        this.lowPerformanceMode = false;
        this.charGrid = [];
        this.img = new Image();
        this.img.crossOrigin = "anonymous";
        this.img.onload = () => this._prepareCover();
        this.img.onerror = () => {
            // fallback if needed
        };
        this.img.src = imgSrc;

        this._move = this._move.bind(this);
        this._down = this._down.bind(this);
        this._leave = this._leave.bind(this);
    }

    _prepareCover() {
        this.coverCtx.fillStyle = "black";
        this.coverCtx.fillRect(0, 0, this.W, this.H);
        const scale = Math.max(this.W / this.img.width, this.H / this.img.height);
        const sw = this.img.width * scale,
            sh = this.img.height * scale;
        const ox = (this.W - sw) / 2,
            oy = (this.H - sh) / 2;
        this.coverCtx.filter = `brightness(${this.P.image.brightness}) contrast(${this.P.image.contrast})`;
        this.coverCtx.drawImage(this.img, ox, oy, sw, sh);
        this.coverCtx.filter = "none";
        this.coverData = this.coverCtx.getImageData(0, 0, this.W, this.H);
        this._clearHeat();
        this._generateCharGrid();
        this._placeWordsInGrid();
        this._renderStaticGrid();
        this._render();
        this._bindEvents();
        this._startScrambling();
        this._monitorPerformance();

        // Initial fade in logic handled by parent if needed, 
        // or we can just trigger a render cycle
        this._createInitialAnimation();
    }

    _createInitialAnimation() {
        // Logic for initial 'decoding' effect
        const originalGrid = this.charGrid.map(cell => ({ ...cell }));

        this.charGrid.forEach(cell => {
            if (!cell.isWordChar) {
                cell.char = " ";
                cell.brightness = 0;
            } else {
                cell.brightness = 0.25;
            }
        });

        this._renderStaticGrid();
        this._render();

        let count = 0;
        const totalCells = this.charGrid.length;
        const duration = 800;
        const indices = this._createAnimationIndices();
        const startTime = performance.now();

        const animateIn = () => {
            const now = performance.now();
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / duration);

            const visibleCount = Math.floor(progress * totalCells);

            for (let i = 0; i < visibleCount; i++) {
                const idx = indices[i];
                if (i >= count && !this.charGrid[idx].isWordChar) {
                    const originalCell = originalGrid[idx];
                    this.charGrid[idx].char = this._getRandomChar();
                    const fadeProgress = Math.min(1, progress * 1.5);
                    this.charGrid[idx].brightness = originalCell.brightness * fadeProgress;
                    count = i;
                }
            }

            if (progress >= 1) {
                for (let i = 0; i < this.charGrid.length; i++) {
                    if (!this.charGrid[i].isWordChar) {
                        this.charGrid[i] = { ...originalGrid[i] };
                    }
                }
                this._renderStaticGrid();
                this._render();
                return;
            }

            this._renderStaticGrid();
            this._render();
            requestAnimationFrame(animateIn);
        };

        animateIn();
    }

    _createAnimationIndices() {
        const nonWord = [];
        const word = [];
        for (let i = 0; i < this.charGrid.length; i++) {
            if (this.charGrid[i].isWordChar) word.push(i);
            else nonWord.push(i);
        }
        this._shuffleArray(nonWord);
        return [...nonWord, ...word];
    }

    _shuffleArray(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    _getRandomChar() {
        return this.characters.charAt(Math.floor(Math.random() * this.characters.length));
    }

    _monitorPerformance() {
        const checkPerformance = () => {
            this.frameCount++;
            const now = performance.now();
            if (now - this.lastFrameTime >= 1000) {
                this.fps = this.frameCount;
                this.frameCount = 0;
                this.lastFrameTime = now;
                if (this.fps < 30 && !this.lowPerformanceMode) {
                    this.lowPerformanceMode = true;
                    this.scrambleInterval = 200;
                    this.scrambleAmount = 0.05;
                    clearInterval(this.scrambleTimer);
                    this._startScrambling();
                } else if (this.fps > 50 && this.lowPerformanceMode) {
                    this.lowPerformanceMode = false;
                    this.scrambleInterval = 50;
                    this.scrambleAmount = 0.08;
                    clearInterval(this.scrambleTimer);
                    this._startScrambling();
                }
            }
            requestAnimationFrame(checkPerformance);
        };
        checkPerformance();
    }

    _placeWordsInGrid() {
        const { W, H, P } = this;
        const gridSize = P.grid.size;
        const cols = Math.floor(W / gridSize);
        const rows = Math.floor(H / gridSize);

        this.charGrid.forEach(cell => cell.isWordChar = false);

        this.words.forEach(word => {
            const placementCount = Math.max(1, Math.floor(Math.random() * 2) + 1);
            for (let p = 0; p < placementCount; p++) {
                const dir = Math.floor(Math.random() * 3);
                let startX, startY, valid = false, attempts = 0;

                while (!valid && attempts < 20) {
                    attempts++;
                    startX = Math.floor(Math.random() * cols);
                    startY = Math.floor(Math.random() * rows);
                    valid = true;

                    if (dir === 0) { if (startX + word.length > cols) valid = false; }
                    else if (dir === 1) { if (startY + word.length > rows) valid = false; }
                    else { if (startX + word.length > cols || startY + word.length > rows) valid = false; }

                    if (valid) {
                        for (let i = 0; i < word.length; i++) {
                            let x, y;
                            if (dir == 0) { x = (startX + i) * gridSize; y = startY * gridSize; }
                            else if (dir == 1) { x = startX * gridSize; y = (startY + i) * gridSize; }
                            else { x = (startX + i) * gridSize; y = (startY + i) * gridSize; }

                            const idx = this.charGrid.findIndex(c => c.x === x && c.y === y);
                            if (idx !== -1) {
                                this.charGrid[idx].char = word[i];
                                this.charGrid[idx].isWordChar = true;
                                this.charGrid[idx].brightness = Math.max(this.charGrid[idx].brightness, 0.65);
                            }
                        }
                    }
                }
            }
        });
    }

    _generateCharGrid() {
        const { W, H, P } = this;
        const gridSize = P.grid.size;
        const minB = P.grid.minBrightness;

        this.charGrid = [];
        if (!this.coverData) return;

        for (let y = 0; y < H; y += gridSize) {
            for (let x = 0; x < W; x += gridSize) {
                const pi = (Math.floor(y) * W + Math.floor(x)) * 4;
                let gray = (this.coverData.data[pi] * 0.299 + this.coverData.data[pi + 1] * 0.587 + this.coverData.data[pi + 2] * 0.114) / 255;
                gray = Math.max(minB, Math.min(1, (gray - 0.5) * P.grid.contrast + 0.5));

                const randomChar = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
                this.charGrid.push({
                    x, y, char: randomChar,
                    weight: gray * P.grid.weight,
                    brightness: gray,
                    isWordChar: false
                });
            }
        }
    }

    _renderStaticGrid() {
        const { staticCtx, W, H, P } = this;
        staticCtx.clearRect(0, 0, W, H);
        staticCtx.fillStyle = "black";
        staticCtx.fillRect(0, 0, W, H);

        staticCtx.font = `${this.fontSize}px ${this.fontFamily}`;
        staticCtx.textAlign = "center";
        staticCtx.textBaseline = "middle";

        this.charGrid.forEach(cell => {
            const { x, y, char, brightness, isWordChar } = cell;
            const sizeFactor = isWordChar ? 0.8 : 0.5;
            const size = this.fontSize * (sizeFactor + brightness * 0.8);

            staticCtx.font = `${isWordChar ? "bold" : ""} ${size}px ${this.fontFamily}`;

            const colorFactor = isWordChar ? 1.3 : 1.1;
            const finalB = Math.min(1, brightness * colorFactor) * P.grid.textOpacity;

            staticCtx.fillStyle = `rgba(0, 0, 0, ${finalB})`; // Using black intentionally? Wait user snippet used white text on black.
            // Correcting to user snippet:
            staticCtx.fillStyle = `rgba(255, 255, 255, ${finalB})`;

            staticCtx.fillText(char, x + P.grid.size / 2, y + P.grid.size / 2);
        });
        this.staticRendered = true;
    }

    _startScrambling() {
        this.scrambleTimer = setInterval(() => {
            if (this.scrambleActive && (!this.heat.active || this.lowPerformanceMode)) {
                this._scrambleRandomChars();
            }
        }, this.scrambleInterval);
    }

    _scrambleRandomChars() {
        if (this.heat.active && this.heat.maxValue > 0.5) return;
        const numChars = Math.floor(this.charGrid.length * this.scrambleAmount);

        for (let i = 0; i < numChars; i++) {
            const idx = Math.floor(Math.random() * this.charGrid.length);
            const cell = this.charGrid[idx];
            if (!cell.isWordChar) {
                cell.char = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            }
        }
        this._renderStaticGrid();
        if (!this.heat.active) this._render();
    }

    _bindEvents() {
        this.canvas.addEventListener("pointermove", this._move, { passive: true });
        this.canvas.addEventListener("pointerdown", this._down, { passive: true });
        this.canvas.addEventListener("pointerleave", this._leave, { passive: true });
        this.canvas.addEventListener("pointercancel", this._leave, { passive: true });
    }

    _start() {
        if (!this.heat.active) {
            this.heat.active = true;
            this._anim();
        }
    }

    _stop() {
        this.heat.active = false;
        cancelAnimationFrame(this._raf);
        this._render();
    }

    _anim = () => {
        this._update();
        this._render();
        if (this.heat.active) {
            this._raf = requestAnimationFrame(this._anim);
        }
    }

    _render() {
        const { ctx, W, H, res, P, heat, coverCanvas, staticCanvas } = this;
        ctx.clearRect(0, 0, W, H);
        // Main image is the static canvas (text grid)
        ctx.drawImage(staticCanvas, 0, 0);

        // Heat effect reveals original image
        if (heat.active || heat.maxValue > 0) {
            const gridSize = P.grid.size;
            const threshold = P.effect.threshold;
            for (let y = 0; y < H; y += gridSize) {
                for (let x = 0; x < W; x += gridSize) {
                    const idx = Math.floor((y / H) * res) * res + Math.floor((x / W) * res);
                    if (heat.current[idx] > threshold) {
                        ctx.save();
                        ctx.beginPath();
                        ctx.rect(x, y, gridSize, gridSize);
                        ctx.clip();
                        ctx.drawImage(coverCanvas, 0, 0);
                        ctx.restore();
                    }
                }
            }
        }
    }

    _update() {
        const now = performance.now();
        if (!this.heat.lastTime) { this.heat.lastTime = now; return; }

        // logic for diff calc
        this.heat.lastTime = now;
        const H = this.heat;
        const P = this.P.effect;
        H.maxValue = 0;
        const tempGrid = new Float32Array(this.res * this.res);
        const res = this.res;

        for (let y = 1; y < res - 1; y++) {
            for (let x = 1; x < res - 1; x++) {
                const idx = y * res + x;
                // Optimization check could go here
                const up = H.current[idx - res];
                const down = H.current[idx + res];
                const left = H.current[idx - 1];
                const right = H.current[idx + 1];
                // ... simpler update for performance in React env? No stick to snippet.
                const neighbors = (up + down + left + right) * 0.25; // simplified diffusion
                tempGrid[idx] = H.current[idx] * (1 - P.diffusion) + neighbors * P.diffusion;
                tempGrid[idx] *= P.decay;
                if (tempGrid[idx] < P.threshold) tempGrid[idx] = 0;
                else H.maxValue = Math.max(H.maxValue, tempGrid[idx]);
            }
        }
        H.current.set(tempGrid);
        if (H.maxValue <= P.threshold) this._stop();
    }

    _addHeat(px: number, py: number, amount = 1) {
        // heat add logic
        const nx = (px / this.W) * this.res;
        const ny = (py / this.H) * this.res;
        const rad = 8; // Reduced to 8 as requested
        for (let i = -rad; i <= rad; i++) {
            for (let j = -rad; j <= rad; j++) {
                const x = Math.floor(nx + i);
                const y = Math.floor(ny + j);
                if (x >= 0 && x < this.res && y >= 0 && y < this.res) {
                    const idx = y * this.res + x;

                    // Add distance-based falloff for smoother edges even with small radius
                    const d = Math.hypot(i, j);
                    if (d <= rad) {
                        const intensity = amount * Math.pow(1 - d / rad, 1.5) * 0.8;
                        this.heat.current[idx] += intensity;
                        this.heat.current[idx] = Math.min(1, this.heat.current[idx]);
                        this.heat.maxValue = Math.max(this.heat.maxValue, this.heat.current[idx]);
                    }
                }
            }
        }
        this._start();
    }

    _move(e: PointerEvent) {
        const { x, y } = this._coords(e);
        this._addHeat(x, y, 0.5);
    }
    _down(e: PointerEvent) {
        const { x, y } = this._coords(e);
        this._addHeat(x, y, 1.0);
    }
    _leave() { }

    _coords(e: any) {
        const r = this.canvas.getBoundingClientRect();
        const cx = (e.clientX || e.touches?.[0].clientX) - r.left;
        const cy = (e.clientY || e.touches?.[0].clientY) - r.top;
        return { x: cx * (this.W / r.width), y: cy * (this.H / r.height) };
    }

    _clearHeat() {
        this.heat.current.fill(0);
        this.heat.active = false;
    }

    destroy() {
        clearInterval(this.scrambleTimer);
        cancelAnimationFrame(this._raf);
        this.canvas.removeEventListener("pointermove", this._move);
        this.canvas.removeEventListener("pointerdown", this._down);
        this.canvas.removeEventListener("pointerleave", this._leave);
    }
}
