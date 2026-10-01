import { useEffect, useRef } from "react";
import { offRamps, onRamps } from "@/lib/site";
import {
  bezier,
  drawCoreMark,
  hashNibble,
  hexAlpha,
  readCanvasTokens,
  roundRectPath,
  runCanvas,
} from "@/lib/canvas-tokens";
import { cn } from "@/lib/utils";

export function LedgerField({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    return runCanvas(wrap, canvas, (ctx, width, height, t, reduce) => {
      const tok = readCanvasTokens(wrap);
      ctx.fillStyle = tok.night;
      ctx.fillRect(0, 0, width, height);

      const gap = 36;
      ctx.strokeStyle = hexAlpha(tok.nightFg, 0.045);
      ctx.lineWidth = 1;
      for (let x = (t * 8) % gap; x < width; x += gap) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gap) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const cx = width * 0.5;
      const cy = height * 0.5;
      const compact = width < 720;
      const on = onRamps.slice(0, compact ? 4 : 5);
      const off = offRamps.slice(0, compact ? 4 : 5);
      const leftX = compact ? 56 : Math.max(72, width * 0.12);
      const rightX = width - leftX;
      const spread = Math.min(height * 0.42, compact ? 150 : 190);
      const startY = cy - spread / 2;

      const glow = ctx.createRadialGradient(cx, cy, 12, cx, cy, 160);
      glow.addColorStop(0, hexAlpha(tok.signal, 0.2));
      glow.addColorStop(1, hexAlpha(tok.night, 0));
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, 160, 0, Math.PI * 2);
      ctx.fill();

      type Node = { x: number; y: number; code: string; dir: "on" | "off" };
      const nodes: Node[] = [];

      on.forEach((ramp, i) => {
        const y = startY + (spread / Math.max(on.length - 1, 1)) * i;
        nodes.push({ x: leftX, y, code: ramp.code, dir: "on" });
      });
      off.forEach((ramp, i) => {
        const y = startY + (spread / Math.max(off.length - 1, 1)) * i;
        nodes.push({ x: rightX, y, code: ramp.code, dir: "off" });
      });

      nodes.forEach((node, i) => {
        const inbound = node.dir === "on";
        const p0 = inbound ? node : { x: cx, y: cy };
        const p3 = inbound ? { x: cx, y: cy } : node;
        const mid = inbound ? (p0.x + p3.x) / 2 + 20 : (p0.x + p3.x) / 2 - 20;
        const c1 = { x: mid, y: p0.y };
        const c2 = { x: mid, y: p3.y };

        ctx.strokeStyle = inbound ? hexAlpha(tok.signal, 0.35) : hexAlpha(tok.nightFg, 0.18);
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, p3.x, p3.y);
        ctx.stroke();

        if (!reduce) {
          const p = (t * 0.22 + i * 0.11) % 1;
          const pt = bezier(p, p0, c1, c2, p3);
          ctx.fillStyle = inbound ? tok.signal : tok.nightFg;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, inbound ? 3.4 : 2.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = inbound ? hexAlpha(tok.signal, 0.22) : hexAlpha(tok.nightFg, 0.12);
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 9, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = inbound ? hexAlpha(tok.signal, 0.16) : tok.night2;
        ctx.strokeStyle = inbound ? tok.signal : hexAlpha(tok.nightFg, 0.28);
        ctx.lineWidth = 1.25;
        roundRectPath(ctx, node.x - 30, node.y - 14, 60, 28, 4);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = inbound ? tok.signal : tok.nightFg;
        ctx.font = "500 10px 'IBM Plex Mono', ui-monospace, monospace";
        ctx.textAlign = "center";
        ctx.fillText(node.code, node.x, node.y + 3);
      });

      drawCoreMark(ctx, cx, cy, compact ? 52 : 64, tok.nightFg, tok.signal);
      ctx.fillStyle = tok.signal;
      ctx.font = "400 9px 'IBM Plex Mono', ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.fillText("BLAKE3", cx, cy + (compact ? 42 : 52));

      ctx.textAlign = "start";
      ctx.fillStyle = tok.signal;
      ctx.font = "500 10px 'IBM Plex Mono', ui-monospace, monospace";
      ctx.fillText("ON-RAMP", leftX - 30, startY - 28);
      ctx.fillStyle = tok.nightMuted;
      ctx.fillText("OFF-RAMP", rightX - 32, startY - 28);

      ctx.fillStyle = hexAlpha(tok.signal, 0.9);
      ctx.fillText("HEAD  " + hashNibble(90 + Math.floor(t * 0.2)), 20, 28);

      const tapeY = height - 36;
      ctx.fillStyle = hexAlpha(tok.nightFg, 0.08);
      ctx.fillRect(0, tapeY - 14, width, 28);
      ctx.fillStyle = hexAlpha(tok.nightFg, 0.55);
      ctx.font = "400 10px 'IBM Plex Mono', ui-monospace, monospace";
      const tape = Array.from({ length: 8 }, (_, i) => hashNibble(t * 0.15 + i, 8)).join("   ·   ");
      const tx = reduce ? 16 : 16 - ((t * 40) % 220);
      ctx.fillText(tape + "   ·   " + tape, tx, tapeY + 4);
    });
  }, []);

  return (
    <div ref={wrapRef} className={cn("relative overflow-hidden bg-paper", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 size-full" aria-hidden="true" />
    </div>
  );
}
