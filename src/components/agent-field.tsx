import { useEffect, useRef } from "react";
import { agents } from "@/lib/site";
import { hexAlpha, readCanvasTokens, roundRectPath, runCanvas } from "@/lib/canvas-tokens";
import { cn } from "@/lib/utils";

export function AgentField({ className }: { className?: string }) {
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

      const names = ["ON", ...agents.map((a) => a.name), "OFF"];
      const n = names.length;
      const pad = Math.max(40, width * 0.08);
      const usable = width - pad * 2;
      const step = usable / (n - 1);
      const y = height * 0.55;

      ctx.strokeStyle = hexAlpha(tok.signal, 0.35);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(pad, y);
      ctx.lineTo(width - pad, y);
      ctx.stroke();

      const phase = reduce ? 0.45 : (t * 0.22) % 1;
      const px = pad + phase * usable;
      ctx.fillStyle = tok.signal;
      ctx.beginPath();
      ctx.arc(px, y, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = hexAlpha(tok.signal, 0.18);
      ctx.beginPath();
      ctx.arc(px, y, 14, 0, Math.PI * 2);
      ctx.fill();

      names.forEach((name, i) => {
        const x = pad + i * step;
        const end = i === 0 || i === n - 1;
        const lit = Math.abs(phase * (n - 1) - i) < 0.5 || reduce;
        if (end) {
          ctx.fillStyle = lit ? hexAlpha(tok.signal, 0.2) : tok.night2;
          ctx.strokeStyle = tok.signal;
          ctx.lineWidth = 1.2;
          roundRectPath(ctx, x - 28, y - 14, 56, 28, 4);
          ctx.fill();
          ctx.stroke();
        } else {
          ctx.fillStyle = lit ? hexAlpha(tok.signal, 0.18) : tok.night2;
          ctx.strokeStyle = lit ? tok.signal : hexAlpha(tok.nightFg, 0.25);
          ctx.lineWidth = 1.25;
          ctx.beginPath();
          ctx.arc(x, y, 24, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
        ctx.fillStyle = end || lit ? tok.signal : tok.nightMuted;
        ctx.font = "500 10px 'IBM Plex Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText(end ? (width < 520 ? name : name + "-RAMP") : String(i).padStart(2, "0"), x, y - 36);
        ctx.fillStyle = tok.nightFg;
        ctx.font = "600 12px Outfit, sans-serif";
        ctx.fillText(end ? (i === 0 ? "Inbound" : "Outbound") : name, x, y + 48);
      });
      ctx.textAlign = "start";

      ctx.fillStyle = tok.signal;
      ctx.font = "500 10px 'IBM Plex Mono', monospace";
      ctx.fillText("Instruction · on-ramp → agents → off-ramp", 20, 28);
    });
  }, []);

  return (
    <div ref={wrapRef} className={cn("relative overflow-hidden bg-night", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 size-full" aria-hidden="true" />
    </div>
  );
}
