import React, { useEffect, useRef } from 'react';

export const OceanCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Nodes for global maritime network grid
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const numNodes = Math.min(35, Math.floor(width / 35));

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.8 + 1,
      });
    }

    let waveStep = 0;

    const render = () => {
      waveStep += 0.01;
      ctx.fillStyle = '#071B2E';
      ctx.fillRect(0, 0, width, height);

      // Deep water ocean gradient overlay
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#071B2E');
      bgGrad.addColorStop(0.5, '#0F3B63');
      bgGrad.addColorStop(1, '#071B2E');
      ctx.fillStyle = bgGrad;
      ctx.globalAlpha = 0.85;
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1.0;

      // Draw subtle ocean wave sine curves
      ctx.lineWidth = 1;
      for (let wave = 0; wave < 3; wave++) {
        ctx.beginPath();
        const yOffset = height * (0.4 + wave * 0.15);
        ctx.moveTo(0, yOffset);

        for (let x = 0; x <= width; x += 20) {
          const y = Math.sin(x * 0.003 + waveStep + wave) * 20 + Math.cos(x * 0.001 - waveStep) * 15 + yOffset;
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = wave === 0 ? 'rgba(24, 104, 184, 0.25)' : 'rgba(126, 146, 166, 0.12)';
        ctx.stroke();
      }

      // Draw digital global network nodes & connecting lines
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(24, 104, 184, 0.6)';
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dist = Math.hypot(node.x - other.x, node.y - other.y);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(24, 104, 184, ${0.25 * (1 - dist / 140)})`;
            ctx.stroke();
          }
        }
      }

        if (!prefersReducedMotion) {
          animationFrameId = requestAnimationFrame(render);
        }
      };

      render();

      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
};
