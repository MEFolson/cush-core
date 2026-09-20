export type CanvasTokens = {
  night: string;
  night2: string;
  nightFg: string;
  nightMuted: string;
  nightLine: string;
  signal: string;
  paper: string;
};

const fallback: CanvasTokens = {
  night: "#f7f4ef",
  night2: "#efeae2",
  nightFg: "#1c1917",
  nightMuted: "#6b645c",
  nightLine: "#ddd4c8",
  signal: "#a67c2d",
  paper: "#f7f4ef",
};

function read(el: Element, name: string, alt: string) {
  const v = getComputedStyle(el).getPropertyValue(name).trim();
  return v || alt;
}

export function readCanvasTokens(el: Element): CanvasTokens {
  // Light-surface mapping: canvases paint on paper with ink strokes.
  return {
    night: read(el, "--color-paper", fallback.night),
    night2: read(el, "--color-paper-2", fallback.night2),
    nightFg: read(el, "--color-ink", fallback.nightFg),
    nightMuted: read(el, "--color-muted", fallback.nightMuted),
    nightLine: read(el, "--color-line", fallback.nightLine),
    signal: read(el, "--color-signal", fallback.signal),
    paper: read(el, "--color-paper", fallback.paper),
  };
}

export function hexAlpha(hex: string, a: number) {
  const h = hex.replace("#", "");
  const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function bezier(
  t: number,
  a: { x: number; y: number },
  b: { x: number; y: number },
  c: { x: number; y: number },
  d: { x: number; y: number },
) {
  const u = 1 - t;
  return {
    x: u ** 3 * a.x + 3 * u ** 2 * t * b.x + 3 * u * t ** 2 * c.x + t ** 3 * d.x,
    y: u ** 3 * a.y + 3 * u ** 2 * t * b.y + 3 * u * t ** 2 * c.y + t ** 3 * d.y,
  };
}

export function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

export function drawCoreMark(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  ring: string,
  disc: string,
) {
  const img = markImage();
  if (img.complete && img.naturalWidth > 0) {
    const s = r * 2;
    ctx.drawImage(img, x - s / 2, y - s / 2, s, s);
    return;
  }
  const gap = (38 * Math.PI) / 180;
  ctx.save();
  ctx.strokeStyle = ring;
  ctx.lineCap = "butt";
  ctx.lineWidth = r * 0.22;
  ctx.beginPath();
  ctx.arc(x, y, r * 0.72, -gap, gap, true);
  ctx.stroke();
  ctx.lineWidth = r * 0.18;
  ctx.beginPath();
  ctx.arc(x, y, r * 0.44, -gap, gap, true);
  ctx.stroke();
  ctx.fillStyle = disc;
  ctx.beginPath();
  ctx.arc(x, y, r * 0.22, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

let markEl: HTMLImageElement | null = null;
function markImage() {
  if (markEl) return markEl;
  markEl = new Image();
  markEl.crossOrigin = "anonymous";
  markEl.src = "/brand/mark.png";
  return markEl;
}

export function hashNibble(n: number, len = 12) {
  const hex = "0123456789abcdef";
  let out = "";
  let x = Math.abs(Math.sin(n + 1.7) * 1e12);
  for (let i = 0; i < len; i++) {
    out += hex[Math.floor(x % 16)];
    x = x / 16 + n * 1.13;
  }
  return out;
}

export function runCanvas(
  wrap: HTMLDivElement,
  canvas: HTMLCanvasElement,
  paint: (ctx: CanvasRenderingContext2D, width: number, height: number, t: number, reduce: boolean) => void,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let raf = 0;
  let running = true;
  let visible = true;
  const t0 = performance.now();

  const fit = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = wrap.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { width, height };
  };

  const draw = (now: number) => {
    const { width, height } = fit();
    paint(ctx, width, height, (now - t0) / 1000, reduce);
  };

  const loop = (now: number) => {
    if (!running) return;
    if (visible) draw(now);
    if (!reduce) raf = requestAnimationFrame(loop);
  };

  draw(performance.now());
  if (!reduce) raf = requestAnimationFrame(loop);

  const ro = new ResizeObserver(() => draw(performance.now()));
  ro.observe(wrap);
  const io = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
    },
    { threshold: 0.05 },
  );
  io.observe(wrap);

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
  };
}
