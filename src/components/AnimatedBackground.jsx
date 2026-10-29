import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Glowing data pulses traveling across circuit lines
    const pulses = Array.from({ length: 24 }, () => ({
      x: Math.random() * width,
      y: (Math.floor(Math.random() * 20) / 20) * height,
      speed: 1.0 + Math.random() * 2.2,
      size: 1.8 + Math.random() * 2.2,
      length: 20 + Math.random() * 45,
      alpha: 0.25 + Math.random() * 0.55,
      color: Math.random() > 0.4 ? '#0284c7' : '#6366f1',
    }));

    // Twinkling circuit junction nodes
    const nodes = Array.from({ length: 18 }, () => ({
      x: Math.random() * width,
      y: (Math.floor(Math.random() * 18) / 18) * height,
      radius: 1.5 + Math.random() * 2.5,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.04,
      color: Math.random() > 0.5 ? '#38bdf8' : '#818cf8',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render nodes
      nodes.forEach((n) => {
        n.pulse += n.pulseSpeed;
        const currentAlpha = 0.15 + (Math.sin(n.pulse) + 1) * 0.25;
        const currentRadius = n.radius * (0.8 + (Math.sin(n.pulse) + 1) * 0.25);

        ctx.save();
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.globalAlpha = currentAlpha * 0.2;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? '#ffffff' : n.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      });

      // Render traveling light pulses / data streams
      pulses.forEach((p) => {
        p.x += p.speed;
        if (p.x - p.length > width) {
          p.x = -p.length;
          p.y = (Math.floor(Math.random() * 20) / 20) * height;
        }

        ctx.save();
        const grad = ctx.createLinearGradient(p.x - p.length, p.y, p.x, p.y);
        grad.addColorStop(0, 'rgba(2, 132, 199, 0)');
        grad.addColorStop(0.7, p.color);
        grad.addColorStop(1, isDark ? '#ffffff' : p.color);

        ctx.beginPath();
        ctx.moveTo(p.x - p.length, p.y);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = p.size;
        ctx.lineCap = 'round';
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.globalAlpha = isDark ? p.alpha : p.alpha * 0.6;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? '#ffffff' : p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.globalAlpha = Math.min(1, p.alpha);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* Light Mode Soft Ambient Base Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-indigo-50/25 to-blue-50/30 dark:bg-slate-950 transition-colors duration-500" />

      {/* Animated Photo Layer - subtle watermark in light mode, vivid in dark mode */}
      <div className="absolute inset-0 w-full h-full transform-gpu animate-ambient-drift scale-105 origin-center">
        <img
          src="/tech-bg.png"
          alt="Vocational Tech Background"
          className="w-full h-full object-cover object-center opacity-[0.07] dark:opacity-85 mix-blend-multiply dark:mix-blend-normal transition-opacity duration-700"
        />
      </div>

      {/* Dark mode vignette */}
      <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

      {/* Dark mode horizontal laser traces */}
      <div className="hidden dark:block absolute top-[38%] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-laser-flow pointer-events-none" />
      <div className="hidden dark:block absolute top-[62%] left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_12px_#60a5fa] animate-laser-flow [animation-delay:3s] pointer-events-none" />

      {/* Live Glowing Sparks & Circuit Pulses Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60 dark:opacity-90" />

      {/* Subtle Grid Accent for Depth */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
}
