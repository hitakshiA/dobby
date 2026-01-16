(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/utils/TextHeatReveal.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TextHeatReveal",
    ()=>TextHeatReveal
]);
class TextHeatReveal {
    canvas;
    ctx;
    W;
    H;
    res;
    characters;
    fontSize;
    fontFamily;
    words;
    heat;
    P;
    scrambleInterval;
    scrambleAmount;
    scrambleActive;
    coverCanvas;
    coverCtx;
    coverData;
    staticCanvas;
    staticCtx;
    staticRendered;
    lastFrameTime;
    frameCount;
    fps;
    lowPerformanceMode;
    charGrid;
    img;
    scrambleTimer;
    _raf;
    _lastEvt;
    _lastX;
    _lastY;
    constructor(canvas, imgSrc, options = {}){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d", {
            willReadFrequently: true
        });
        this.W = canvas.width;
        this.H = canvas.height;
        this.res = options.resolution || 96;
        this.characters = options.characters || "GSAPHEATEFFECT!@#$%&*()_+";
        this.fontSize = options.fontSize || 10;
        this.fontFamily = options.fontFamily || "monospace";
        this.words = options.words || [
            "CREATE",
            "INSPIRE",
            "DESIGN",
            "IMAGINE",
            "VISION",
            "IDEA",
            "DREAM"
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
        this.coverCtx = this.coverCanvas.getContext("2d");
        this.coverData = null;
        this.staticCanvas = document.createElement("canvas");
        this.staticCanvas.width = this.W;
        this.staticCanvas.height = this.H;
        this.staticCtx = this.staticCanvas.getContext("2d");
        this.staticRendered = false;
        this.lastFrameTime = 0;
        this.frameCount = 0;
        this.fps = 0;
        this.lowPerformanceMode = false;
        this.charGrid = [];
        this.img = new Image();
        this.img.crossOrigin = "anonymous";
        this.img.onload = ()=>this._prepareCover();
        this.img.onerror = ()=>{
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
        const sw = this.img.width * scale, sh = this.img.height * scale;
        const ox = (this.W - sw) / 2, oy = (this.H - sh) / 2;
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
        const originalGrid = this.charGrid.map((cell)=>({
                ...cell
            }));
        this.charGrid.forEach((cell)=>{
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
        const animateIn = ()=>{
            const now = performance.now();
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / duration);
            const visibleCount = Math.floor(progress * totalCells);
            for(let i = 0; i < visibleCount; i++){
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
                for(let i = 0; i < this.charGrid.length; i++){
                    if (!this.charGrid[i].isWordChar) {
                        this.charGrid[i] = {
                            ...originalGrid[i]
                        };
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
        for(let i = 0; i < this.charGrid.length; i++){
            if (this.charGrid[i].isWordChar) word.push(i);
            else nonWord.push(i);
        }
        this._shuffleArray(nonWord);
        return [
            ...nonWord,
            ...word
        ];
    }
    _shuffleArray(array) {
        for(let i = array.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [
                array[j],
                array[i]
            ];
        }
        return array;
    }
    _getRandomChar() {
        return this.characters.charAt(Math.floor(Math.random() * this.characters.length));
    }
    _monitorPerformance() {
        const checkPerformance = ()=>{
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
        this.charGrid.forEach((cell)=>cell.isWordChar = false);
        this.words.forEach((word)=>{
            const placementCount = Math.max(1, Math.floor(Math.random() * 2) + 1);
            for(let p = 0; p < placementCount; p++){
                const dir = Math.floor(Math.random() * 3);
                let startX, startY, valid = false, attempts = 0;
                while(!valid && attempts < 20){
                    attempts++;
                    startX = Math.floor(Math.random() * cols);
                    startY = Math.floor(Math.random() * rows);
                    valid = true;
                    if (dir === 0) {
                        if (startX + word.length > cols) valid = false;
                    } else if (dir === 1) {
                        if (startY + word.length > rows) valid = false;
                    } else {
                        if (startX + word.length > cols || startY + word.length > rows) valid = false;
                    }
                    if (valid) {
                        for(let i = 0; i < word.length; i++){
                            let x, y;
                            if (dir == 0) {
                                x = (startX + i) * gridSize;
                                y = startY * gridSize;
                            } else if (dir == 1) {
                                x = startX * gridSize;
                                y = (startY + i) * gridSize;
                            } else {
                                x = (startX + i) * gridSize;
                                y = (startY + i) * gridSize;
                            }
                            const idx = this.charGrid.findIndex((c)=>c.x === x && c.y === y);
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
        for(let y = 0; y < H; y += gridSize){
            for(let x = 0; x < W; x += gridSize){
                const pi = (Math.floor(y) * W + Math.floor(x)) * 4;
                let gray = (this.coverData.data[pi] * 0.299 + this.coverData.data[pi + 1] * 0.587 + this.coverData.data[pi + 2] * 0.114) / 255;
                gray = Math.max(minB, Math.min(1, (gray - 0.5) * P.grid.contrast + 0.5));
                const randomChar = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
                this.charGrid.push({
                    x,
                    y,
                    char: randomChar,
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
        this.charGrid.forEach((cell)=>{
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
        this.scrambleTimer = setInterval(()=>{
            if (this.scrambleActive && (!this.heat.active || this.lowPerformanceMode)) {
                this._scrambleRandomChars();
            }
        }, this.scrambleInterval);
    }
    _scrambleRandomChars() {
        if (this.heat.active && this.heat.maxValue > 0.5) return;
        const numChars = Math.floor(this.charGrid.length * this.scrambleAmount);
        for(let i = 0; i < numChars; i++){
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
        this.canvas.addEventListener("pointermove", this._move, {
            passive: true
        });
        this.canvas.addEventListener("pointerdown", this._down, {
            passive: true
        });
        this.canvas.addEventListener("pointerleave", this._leave, {
            passive: true
        });
        this.canvas.addEventListener("pointercancel", this._leave, {
            passive: true
        });
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
    _anim = ()=>{
        this._update();
        this._render();
        if (this.heat.active) {
            this._raf = requestAnimationFrame(this._anim);
        }
    };
    _render() {
        const { ctx, W, H, res, P, heat, coverCanvas, staticCanvas } = this;
        ctx.clearRect(0, 0, W, H);
        // Main image is the static canvas (text grid)
        ctx.drawImage(staticCanvas, 0, 0);
        // Heat effect reveals original image
        if (heat.active || heat.maxValue > 0) {
            const gridSize = P.grid.size;
            const threshold = P.effect.threshold;
            for(let y = 0; y < H; y += gridSize){
                for(let x = 0; x < W; x += gridSize){
                    const idx = Math.floor(y / H * res) * res + Math.floor(x / W * res);
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
        if (!this.heat.lastTime) {
            this.heat.lastTime = now;
            return;
        }
        // logic for diff calc
        this.heat.lastTime = now;
        const H = this.heat;
        const P = this.P.effect;
        H.maxValue = 0;
        const tempGrid = new Float32Array(this.res * this.res);
        const res = this.res;
        for(let y = 1; y < res - 1; y++){
            for(let x = 1; x < res - 1; x++){
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
    _addHeat(px, py, amount = 1) {
        // heat add logic
        const nx = px / this.W * this.res;
        const ny = py / this.H * this.res;
        const rad = 8; // Reduced to 8 as requested
        for(let i = -rad; i <= rad; i++){
            for(let j = -rad; j <= rad; j++){
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
    _move(e) {
        const { x, y } = this._coords(e);
        this._addHeat(x, y, 0.5);
    }
    _down(e) {
        const { x, y } = this._coords(e);
        this._addHeat(x, y, 1.0);
    }
    _leave() {}
    _coords(e) {
        const r = this.canvas.getBoundingClientRect();
        const cx = (e.clientX || e.touches?.[0].clientX) - r.left;
        const cy = (e.clientY || e.touches?.[0].clientY) - r.top;
        return {
            x: cx * (this.W / r.width),
            y: cy * (this.H / r.height)
        };
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/UnicornPreloader/UnicornPreloader.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "container": "UnicornPreloader-module__J7CzNG__container",
});
}),
"[project]/src/components/UnicornPreloader/UnicornPreloader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$unicornstudio$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/unicornstudio-react/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UnicornPreloader$2f$UnicornPreloader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/UnicornPreloader/UnicornPreloader.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const UnicornPreloader = ({ onComplete })=>{
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [dimensions, setDimensions] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState({
        width: 0,
        height: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UnicornPreloader.useEffect": ()=>{
            // Set initial dimensions
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
            const handleResize = {
                "UnicornPreloader.useEffect.handleResize": ()=>{
                    setDimensions({
                        width: window.innerWidth,
                        height: window.innerHeight
                    });
                }
            }["UnicornPreloader.useEffect.handleResize"];
            window.addEventListener('resize', handleResize);
            return ({
                "UnicornPreloader.useEffect": ()=>window.removeEventListener('resize', handleResize)
            })["UnicornPreloader.useEffect"];
        }
    }["UnicornPreloader.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UnicornPreloader.useEffect": ()=>{
            // Simulate loading duration or wait for scene ready
            // Since UnicornScene doesn't expose an onReady prop easily here without checking docs deeper,
            // we'll use a safe timeout to ensure it's visible before fading out.
            const timeout = setTimeout({
                "UnicornPreloader.useEffect.timeout": ()=>{
                    if (containerRef.current) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(containerRef.current, {
                            opacity: 0,
                            duration: 1.0,
                            ease: "power2.inOut",
                            onComplete: {
                                "UnicornPreloader.useEffect.timeout": ()=>{
                                    onComplete();
                                }
                            }["UnicornPreloader.useEffect.timeout"]
                        });
                    }
                }
            }["UnicornPreloader.useEffect.timeout"], 4500); // 4.5 seconds duration
            return ({
                "UnicornPreloader.useEffect": ()=>clearTimeout(timeout)
            })["UnicornPreloader.useEffect"];
        }
    }["UnicornPreloader.useEffect"], [
        onComplete
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UnicornPreloader$2f$UnicornPreloader$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$unicornstudio$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            projectId: "bLd7Gw2ZpLj9GOznxGRE",
            width: dimensions.width,
            height: dimensions.height,
            scale: 1,
            dpi: 1.5
        }, void 0, false, {
            fileName: "[project]/src/components/UnicornPreloader/UnicornPreloader.tsx",
            lineNumber: 55,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/UnicornPreloader/UnicornPreloader.tsx",
        lineNumber: 54,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(UnicornPreloader, "5imk3AoiJ+7ElUVOhaslHRzF8Dc=");
_c = UnicornPreloader;
const __TURBOPACK__default__export__ = UnicornPreloader;
var _c;
__turbopack_context__.k.register(_c, "UnicornPreloader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$CustomEase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/CustomEase.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lenis/dist/lenis.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$TextHeatReveal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/TextHeatReveal.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UnicornPreloader$2f$UnicornPreloader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/UnicornPreloader/UnicornPreloader.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
if ("TURBOPACK compile-time truthy", 1) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$CustomEase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$CustomEase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create("customEase", "M0,0 C0.86,0 0.07,1 1,1");
}
/* Sound Manager Logic */ class SoundManager {
    sounds;
    isEnabled;
    constructor(){
        this.sounds = {};
        this.isEnabled = false;
        if ("TURBOPACK compile-time truthy", 1) {
            this.init();
        }
    }
    init() {
        this.loadSound("hover", "https://assets.codepen.io/7558/click-reverb-001.mp3", 0.15);
        this.loadSound("click", "https://assets.codepen.io/7558/shutter-fx-001.mp3", 0.3);
        this.loadSound("textChange", "https://assets.codepen.io/7558/whoosh-fx-001.mp3", 0.3);
    }
    loadSound(name, url, volume = 0.3) {
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
    play(soundName, delay = 0) {
        if (this.isEnabled && this.sounds[soundName]) {
            setTimeout(()=>{
                this.sounds[soundName].currentTime = 0;
                this.sounds[soundName].play().catch(()=>{});
            }, delay);
        }
    }
}
const soundManager = new SoundManager();
const ARTISTS = [
    "",
    "Market Scan",
    "Whale Watch",
    "Token Sniffer",
    "Volume Spike",
    "Liquidity",
    "Social Sent.",
    "Smart Money",
    "Gas Tracker",
    "Yield Hunt",
    "Alpha Leak"
];
const CATEGORIES = [
    "",
    "Active",
    "Tracking",
    "Analyzed",
    "+500% Vol",
    "Draining",
    "Trending",
    "Accumulating",
    "Low Gwei",
    "High APY",
    "Verified"
];
const SLIDE_DATA = [
    {
        header: [],
        center: [
            "DOBBY"
        ],
        footer: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "scroll-hint",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "SCROLL TO BEGIN"
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "scroll-arrow",
                    children: "↓"
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 81,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0)),
        intro: true
    },
    {
        header: [
            "DOBBY",
            "INTELLIGENCE"
        ],
        center: [],
        footer: "PIERCE THE NOISE",
        intro: true
    },
    {
        header: [
            "OMNISCIENT",
            "VIEW"
        ],
        center: [
            "Real-time surveillance of",
            "global market movements."
        ],
        footer: "SEE EVERYTHING"
    },
    {
        header: [
            "APEX",
            "PREDATORS"
        ],
        center: [
            "Tracking large wallet",
            "movements across chains."
        ],
        footer: "HUNT THE GIANTS"
    },
    {
        header: [
            "FIRST",
            "MOVER"
        ],
        center: [
            "Instantly detecting",
            "new token deployments."
        ],
        footer: "ZERO LATENCY"
    },
    {
        header: [
            "MOMENTUM",
            "SHIFT"
        ],
        center: [
            "Identifying abnormal",
            "trading volume patterns."
        ],
        footer: "RIDE THE WAVE"
    },
    {
        header: [
            "DEPTH",
            "SENSING"
        ],
        center: [
            "Monitoring liquidity pool",
            "depth and stability."
        ],
        footer: "TRUE VALUE"
    },
    {
        header: [
            "HIVE",
            "MIND"
        ],
        center: [
            "Analyzing social media",
            "trends and sentiment."
        ],
        footer: "DECODE HYPE"
    },
    {
        header: [
            "ELITE",
            "TRACKING"
        ],
        center: [
            "Following profitable",
            "wallet addresses."
        ],
        footer: "COPY WINNERS"
    },
    {
        header: [
            "EXECUTION",
            "SPEED"
        ],
        center: [
            "Optimizing transaction",
            "costs in real-time."
        ],
        footer: "ZERO FRICTION"
    },
    {
        header: [
            "MAXIMIZE",
            "RETURNS"
        ],
        center: [
            "Finding the highest",
            "APY opportunities."
        ],
        footer: "PASSIVE GAINS"
    }
];
// Original flame glow blur images
const BG_IMAGES = [
    "https://assets.codepen.io/7558/flame-glow-blur-001.jpg",
    "https://assets.codepen.io/7558/flame-glow-blur-001.jpg",
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
function Home() {
    _s();
    /* Preloader State */ const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [currentSection, setCurrentSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [audioEnabled, setAudioEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const lenisRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fixedContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fixedSectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const progressFillRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const backgroundsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const artistsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const categoriesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const featuredRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const isAnimating = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const isSnapping = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Preloader finishes
    // Preloader finishes
    const handlePreloaderComplete = ()=>{
        setLoading(false);
        animateColumns();
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            // Initial Side Column State
            if (currentSection === 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(".left-column", {
                    x: -100,
                    opacity: 0
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(".right-column", {
                    x: 100,
                    opacity: 0
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(".featured", {
                    width: "100%"
                });
            }
        }
    }["Home.useEffect"], []);
    const animateColumns = ()=>{
        artistsRef.current.forEach((item, index)=>{
            if (item) setTimeout(()=>item.classList.add("loaded"), index * 60);
        });
        categoriesRef.current.forEach((item, index)=>{
            if (item) setTimeout(()=>item.classList.add("loaded"), index * 60 + 200);
        });
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Home.useLayoutEffect": ()=>{
            if (loading) return;
            const lenis = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
                duration: 1.2,
                easing: {
                    "Home.useLayoutEffect": (t)=>Math.min(1, 1.001 - Math.pow(2, -10 * t))
                }["Home.useLayoutEffect"],
                orientation: 'vertical',
                smoothWheel: true
            });
            lenisRef.current = lenis;
            const raf = {
                "Home.useLayoutEffect.raf": (time)=>{
                    lenis.raf(time);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].update();
                    requestAnimationFrame(raf);
                }
            }["Home.useLayoutEffect.raf"];
            requestAnimationFrame(raf);
            const st = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
                trigger: fixedSectionRef.current,
                start: "top top",
                end: "bottom bottom",
                pin: fixedContainerRef.current,
                pinSpacing: true,
                onUpdate: {
                    "Home.useLayoutEffect.st": (self)=>{
                        if (isSnapping.current) return;
                        const progress = self.progress;
                        const totalSlides = SLIDE_DATA.length - 1;
                        const target = Math.min(totalSlides, Math.floor(progress * (totalSlides + 1)));
                        if (target !== currentSection && !isAnimating.current) {
                            const nextSection = currentSection + (target > currentSection ? 1 : -1);
                            snapToSection(nextSection);
                        }
                        if (progressFillRef.current) {
                            progressFillRef.current.style.width = `${currentSection / (SLIDE_DATA.length - 1) * 100}%`;
                        }
                    }
                }["Home.useLayoutEffect.st"]
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
                trigger: ".end-section",
                start: "top center",
                end: "bottom bottom",
                onUpdate: {
                    "Home.useLayoutEffect": (self)=>{
                        const blurNodes = document.querySelectorAll('.scroll-footer, .left-column, .right-column, .featured, .section-header');
                        if (self.progress > 0.1) {
                            blurNodes.forEach({
                                "Home.useLayoutEffect": (node)=>node.classList.add('blur')
                            }["Home.useLayoutEffect"]);
                            const newHeight = Math.max(0, 100 - (self.progress - 0.1) / 0.9 * 100);
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(fixedContainerRef.current, {
                                height: `${newHeight}vh`,
                                duration: 0.1,
                                overwrite: true
                            });
                            const moveY = -(self.progress - 0.1) / 0.9 * 200;
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(".section-header", {
                                y: moveY * 1.5,
                                duration: 0.1,
                                overwrite: true
                            });
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(".content", {
                                y: moveY,
                                yPercent: -50,
                                duration: 0.1,
                                overwrite: true
                            });
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(".scroll-footer", {
                                y: moveY * 0.5,
                                duration: 0.1,
                                overwrite: true
                            });
                        } else {
                            blurNodes.forEach({
                                "Home.useLayoutEffect": (node)=>node.classList.remove('blur')
                            }["Home.useLayoutEffect"]);
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(fixedContainerRef.current, {
                                height: "100vh",
                                duration: 0.1,
                                overwrite: true
                            });
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(".section-header", {
                                y: 0,
                                duration: 0.1,
                                overwrite: true
                            });
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(".content", {
                                y: 0,
                                yPercent: -50,
                                duration: 0.1,
                                overwrite: true
                            });
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(".scroll-footer", {
                                y: 0,
                                duration: 0.1,
                                overwrite: true
                            });
                        }
                    }
                }["Home.useLayoutEffect"]
            });
            return ({
                "Home.useLayoutEffect": ()=>{
                    lenis.destroy();
                    st.kill();
                }
            })["Home.useLayoutEffect"];
        }
    }["Home.useLayoutEffect"], [
        loading,
        currentSection
    ]);
    const snapToSection = (targetIndex)=>{
        if (targetIndex < 0 || targetIndex >= SLIDE_DATA.length || targetIndex === currentSection || isAnimating.current) return;
        isSnapping.current = true;
        changeSection(targetIndex);
        if (fixedSectionRef.current && lenisRef.current) {
            const start = fixedSectionRef.current.offsetTop;
            const height = fixedSectionRef.current.offsetHeight;
            const targetPos = start + height * targetIndex / SLIDE_DATA.length;
            lenisRef.current.scrollTo(targetPos, {
                duration: 0.8,
                easing: (t)=>1 - Math.pow(1 - t, 3),
                lock: true,
                onComplete: ()=>{
                    isSnapping.current = false;
                }
            });
        }
    };
    const changeSection = (newSection)=>{
        if (newSection === currentSection || isAnimating.current) return;
        isAnimating.current = true;
        const isScrollingDown = newSection > currentSection;
        const prevSection = currentSection;
        setCurrentSection(newSection);
        // Side Columns Animation (Intro vs Content)
        if (newSection === 0) {
            // Going to Intro: Hide sides, Expand Center
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(".left-column", {
                x: -100,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(".right-column", {
                x: 100,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            }); // Fix direction
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(".featured", {
                width: "100%",
                duration: 0.5,
                ease: "power2.inOut"
            });
        } else {
            // Going to Content: Show sides, Shrink Center
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(".left-column", {
                x: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(".right-column", {
                x: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(".featured", {
                width: "40%",
                duration: 0.5,
                ease: "power2.inOut"
            });
        }
        const prevFeatured = featuredRefs.current[prevSection];
        const nextFeatured = featuredRefs.current[newSection];
        const duration = 0.64;
        if (prevFeatured) {
            const words = prevFeatured.querySelectorAll('.split-word');
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(words, {
                yPercent: isScrollingDown ? -100 : 100,
                opacity: 0,
                duration: duration * 0.6,
                stagger: isScrollingDown ? 0.03 : -0.03,
                ease: "customEase",
                onComplete: ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(prevFeatured, {
                        visibility: "hidden"
                    });
                    prevFeatured.classList.remove('active');
                }
            });
        }
        if (nextFeatured) {
            soundManager.play("textChange", 250);
            nextFeatured.classList.add('active');
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(nextFeatured, {
                visibility: "visible",
                opacity: 1
            });
            const words = nextFeatured.querySelectorAll('.split-word');
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(words, {
                yPercent: isScrollingDown ? 100 : -100,
                opacity: 0
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(words, {
                yPercent: 0,
                opacity: 1,
                duration: duration,
                stagger: isScrollingDown ? 0.05 : -0.05,
                ease: "customEase",
                onComplete: ()=>{
                    isAnimating.current = false;
                }
            });
        }
        backgroundsRef.current.forEach((bg, i)=>{
            if (!bg) return;
            bg.classList.remove("previous", "active");
            if (i === newSection) {
                bg.classList.add("active");
                if (isScrollingDown) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(bg, {
                        opacity: 1,
                        y: 0,
                        clipPath: "inset(100% 0 0 0)"
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(bg, {
                        clipPath: "inset(0% 0 0 0)",
                        duration: duration,
                        ease: "customEase"
                    });
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(bg, {
                        opacity: 1,
                        y: 0,
                        clipPath: "inset(0 0 100% 0)"
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(bg, {
                        clipPath: "inset(0 0 0% 0)",
                        duration: duration,
                        ease: "customEase"
                    });
                }
            } else if (i === prevSection) {
                bg.classList.add("previous");
                const parallax = 5;
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(bg, {
                    y: isScrollingDown ? `${parallax}%` : `-${parallax}%`,
                    duration: duration,
                    ease: "customEase"
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(bg, {
                    opacity: 0,
                    delay: duration * 0.5,
                    duration: duration * 0.5,
                    ease: "customEase",
                    onComplete: ()=>{
                        bg.classList.remove("previous");
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(bg, {
                            y: 0
                        });
                    }
                });
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(bg, {
                    opacity: 0,
                    duration: duration * 0.3,
                    ease: "customEase"
                });
            }
        });
        artistsRef.current.forEach((el, i)=>{
            if (el) {
                if (i === newSection) {
                    el.classList.add("active");
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(el, {
                        opacity: 1,
                        duration: 0.3
                    });
                } else {
                    el.classList.remove("active");
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(el, {
                        opacity: 0.3,
                        duration: 0.3
                    });
                }
            }
        });
        categoriesRef.current.forEach((el, i)=>{
            if (el) {
                if (i === newSection) {
                    el.classList.add("active");
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(el, {
                        opacity: 1,
                        duration: 0.3
                    });
                } else {
                    el.classList.remove("active");
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(el, {
                        opacity: 0.3,
                        duration: 0.3
                    });
                }
            }
        });
    };
    const toggleAudio = ()=>{
        setAudioEnabled(!audioEnabled);
        soundManager.enableAudio();
    };
    const handleInteraction = ()=>{
        soundManager.enableAudio();
        soundManager.play("hover");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "/new",
                className: `enter-button ${currentSection === 0 ? 'hidden' : currentSection > 1 ? 'top-right' : ''}`,
                onClick: (e)=>{
                    e.preventDefault();
                    // Full page reload for /new to clear home page from memory
                    window.location.href = '/new';
                },
                children: "[ ENTER ]"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 418,
                columnNumber: 7
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UnicornPreloader$2f$UnicornPreloader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onComplete: handlePreloaderComplete
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 430,
                columnNumber: 19
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "scroll-container",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: fixedSectionRef,
                        className: "fixed-section",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: fixedContainerRef,
                            className: "fixed-container",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "background-container",
                                    children: BG_IMAGES.map((src, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `background-image ${i === 0 ? 'active' : ''}`,
                                            ref: (el)=>{
                                                if (el && !el.dataset.initialized) {
                                                    const canvas = document.createElement('canvas');
                                                    canvas.width = window.innerWidth;
                                                    canvas.height = window.innerHeight;
                                                    canvas.style.width = '100%';
                                                    canvas.style.height = '100%';
                                                    el.appendChild(canvas);
                                                    // Initialize Heat Reveal
                                                    new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$TextHeatReveal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextHeatReveal"](canvas, src, {
                                                        gridSize: 14,
                                                        fontSize: 12,
                                                        characters: "01DOBBYINTELLIGENCE",
                                                        resolution: 80,
                                                        imageBrightness: 1.1
                                                    });
                                                    backgroundsRef.current[i] = el; // Store container ref instead of img
                                                    el.dataset.initialized = "true";
                                                }
                                            }
                                        }, i, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 437,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 435,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid-container",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "section-header",
                                            children: (SLIDE_DATA[currentSection] || SLIDE_DATA[0]).header.map((line, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "header-row",
                                                    children: line
                                                }, i, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 471,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 469,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "content",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "left-column",
                                                    children: ARTISTS.map((text, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            ref: (el)=>{
                                                                artistsRef.current[i] = el;
                                                            },
                                                            className: `artist ${i === 0 ? 'active' : ''}`,
                                                            "data-index": i,
                                                            onClick: ()=>snapToSection(i),
                                                            onMouseEnter: handleInteraction,
                                                            children: text
                                                        }, i, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 478,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 476,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "featured",
                                                    children: SLIDE_DATA.map((slide, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            ref: (el)=>{
                                                                featuredRefs.current[i] = el;
                                                            },
                                                            className: `featured-content ${i === 0 ? 'active' : ''}`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: slide.intro ? 'text-mega' : '',
                                                                children: slide.center.map((line, lineIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "center-line",
                                                                        children: line.split(' ').map((word, wI)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "word-mask",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "split-word",
                                                                                    children: [
                                                                                        word,
                                                                                        " "
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/app/page.tsx",
                                                                                    lineNumber: 503,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            }, wI, false, {
                                                                                fileName: "[project]/src/app/page.tsx",
                                                                                lineNumber: 502,
                                                                                columnNumber: 31
                                                                            }, this))
                                                                    }, lineIdx, false, {
                                                                        fileName: "[project]/src/app/page.tsx",
                                                                        lineNumber: 500,
                                                                        columnNumber: 27
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 498,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, i, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 493,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 491,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "right-column",
                                                    children: CATEGORIES.map((text, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            ref: (el)=>{
                                                                categoriesRef.current[i] = el;
                                                            },
                                                            className: `category ${i === 0 ? 'active' : ''}`,
                                                            "data-index": i,
                                                            onClick: ()=>snapToSection(i),
                                                            onMouseEnter: handleInteraction,
                                                            children: text
                                                        }, i, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 515,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 513,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 475,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "scroll-footer",
                                            children: [
                                                (SLIDE_DATA[currentSection] || SLIDE_DATA[0]).footer,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "progress-indicator",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "progress-numbers",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: (currentSection + 1).toString().padStart(2, '0')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 533,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: SLIDE_DATA.length
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 534,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 532,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            ref: progressFillRef,
                                                            className: "progress-fill"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 536,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 531,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 529,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 468,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 434,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 433,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "end-section",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "https://github.com/hitakshiA",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "github-link",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                viewBox: "0 0 24 24",
                                width: "24",
                                height: "24",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                fill: "none",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 546,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 545,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 544,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 543,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 432,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 417,
        columnNumber: 5
    }, this);
}
_s(Home, "cS0+SCw0A37cyx3Lc2HefU7Z6VE=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_a391298c._.js.map