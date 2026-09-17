import { useEffect, useMemo, useRef, useState } from "react";
import { offRamps, onRamps } from "@/lib/site";
import {
  bezier,
  drawCoreMark,
  hexAlpha,
  readCanvasTokens,
  roundRectPath,
  runCanvas,
} from "@/lib/canvas-tokens";
import { cn } from "@/lib/utils";

type Ramp = {
  code: string;
  name: string;
  region: string;
  kind: string;
  blurb: string;
  dir: "on" | "off";
};

export function RailMesh() {
  const ramps = useMemo<Ramp[]>(
    () => [
      ...onRamps.map((r) => ({ ...r, dir: "on" as const })),
      ...offRamps.map((r) => ({ ...r, dir: "off" as const })),
    ],
    [],
  );
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  activeRef.current = active;
  const hits = useRef<{ i: number; x: number; y: number; r: number }[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const hit = hits.current.find((h) => (h.x - x) ** 2 + (h.y - y) ** 2 <= h.r ** 2);
      if (hit) setActive(hit.i);
    };
    canvas.addEventListener("pointerdown", onPointer);

    const stop = runCanvas(wrap, canvas, (ctx, width, height, t, reduce) => {
      const tok = readCanvasTokens(wrap);
      const sel = activeRef.current;
      const cx = width * 0.5;
      const cy = height * 0.54;
      const compact = width < 640;
      const on = ramps.filter((r) => r.dir === "on");
      const off = ramps.filter((r) => r.dir === "off");
      const leftX = compact ? 50 : Math.max(70, width * 0.14);
      const rightX = width - leftX;
      const spread = Math.min(height * 0.62, 260);
      const startY = cy - spread / 2;

      ctx.fillStyle = tok.night;
      ctx.fillRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(cx, cy, 8, cx, cy, 140);
      glow.addColorStop(0, hexAlpha(tok.signal, 0.16));
      glow.addColorStop(1, hexAlpha(tok.night, 0));
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, 140, 0, Math.PI * 2);
      ctx.fill();

      hits.current = [];
      const laid: { x: number; y: number; dir: "on" | "off"; i: number; code: string }[] = [];

      on.forEach((ramp, k) => {
        const i = ramps.indexOf(ramp);
        const y = startY + (spread / Math.max(on.length - 1, 1)) * k;
        laid.push({ x: leftX, y, dir: "on", i, code: ramp.code });
      });
      off.forEach((ramp, k) => {
        const i = ramps.indexOf(ramp);
        const y = startY + (spread / Math.max(off.length - 1, 1)) * k;
        laid.push({ x: rightX, y, dir: "off", i, code: ramp.code });
      });

      laid.forEach((node, n) => {
        const inbound = node.dir === "on";
        const selected = node.i === sel;
        const p0 = inbound ? node : { x: cx, y: cy };
        const p3 = inbound ? { x: cx, y: cy } : node;
        const mid = inbound ? (p0.x + p3.x) / 2 + 24 : (p0.x + p3.x) / 2 - 24;
        const c1 = { x: mid, y: p0.y };
        const c2 = { x: mid, y: p3.y };

        ctx.strokeStyle = selected
          ? tok.signal
          : inbound
            ? hexAlpha(tok.signal, 0.32)
            : hexAlpha(tok.nightFg, 0.16);
        ctx.lineWidth = selected ? 1.75 : 1.1;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, p3.x, p3.y);
        ctx.stroke();

        if (!reduce) {
          const p = (t * 0.28 + n * 0.09) % 1;
          const pt = bezier(p, p0, c1, c2, p3);
          ctx.fillStyle = inbound || selected ? tok.signal : tok.nightFg;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, selected ? 4 : 2.8, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = selected ? tok.signal : inbound ? hexAlpha(tok.signal, 0.14) : tok.night2;
        ctx.strokeStyle = selected || inbound ? tok.signal : hexAlpha(tok.nightFg, 0.3);
        ctx.lineWidth = 1.2;
        roundRectPath(ctx, node.x - 34, node.y - 15, 68, 30, 4);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = selected ? tok.paper : inbound ? tok.signal : tok.nightFg;
        ctx.font = "500 11px 'IBM Plex Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText(node.code, node.x, node.y + 4);
        hits.current.push({ i: node.i, x: node.x, y: node.y, r: 32 });
      });

      drawCoreMark(ctx, cx, cy, 58, tok.nightFg, tok.signal);
      ctx.fillStyle = tok.signal;
      ctx.font = "400 9px 'IBM Plex Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText("one book", cx, cy + 46);

      ctx.textAlign = "start";
      ctx.fillStyle = tok.signal;
      ctx.font = "500 10px 'IBM Plex Mono', monospace";
      ctx.fillText("ON-RAMP →", 16, 24);
      ctx.fillStyle = tok.nightMuted;
      ctx.textAlign = "end";
      ctx.fillText("← OFF-RAMP", width - 16, 24);
      ctx.textAlign = "start";
    });

    return () => {
      canvas.removeEventListener("pointerdown", onPointer);
      stop();
    };
  }, [ramps]);

  const selected = ramps[active] ?? ramps[0];
  const inbound = selected.dir === "on";

  return (
    <div className="border border-night-line bg-night text-night-fg">
      <div className="grid gap-0 lg:grid-cols-12">
        <div ref={wrapRef} className={cn("relative h-[340px] sm:h-[420px] lg:col-span-8")}>
          <canvas
            ref={canvasRef}
            className="absolute inset-0 size-full cursor-pointer"
            aria-label="On-ramp and off-ramp connectivity"
          />
        </div>
        <div className="border-t border-night-line px-6 py-8 lg:col-span-4 lg:border-l lg:border-t-0">
          <p className="font-mono text-xs tracking-[0.16em] text-signal">
            {inbound ? "On-ramp" : "Off-ramp"} · {selected.code}
          </p>
          <h3 className="mt-2 text-2xl tracking-[-0.02em]">{selected.name}</h3>
          <p className="mt-1 text-sm text-night-muted">
            {selected.kind} · {selected.region}
          </p>
          <p className="mt-5 text-sm leading-relaxed text-night-muted">{selected.blurb}</p>
          <p className="mt-5 text-xs leading-relaxed text-night-muted">
            Click a rail. Inbound credits post before they are available. Outbound
            leaves only after the ledger and the agent trace.
          </p>
        </div>
      </div>
    </div>
  );
}
