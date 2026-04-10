import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export const NetworkRadar = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 0;

    const dots = [
      { x: 0.2, y: 0.3, color: '#0aff00', size: 3 }, // Secure
      { x: 0.7, y: 0.2, color: '#ff00ff', size: 4 }, // Threat
      { x: 0.4, y: 0.8, color: '#ffcc00', size: 3 }, // Warning
      { x: 0.8, y: 0.6, color: '#00f0ff', size: 3 }, // Secure
    ];

    const render = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) / 2 - 20;

      // Draw circles
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (radius / 4) * i, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw crosshair
      ctx.beginPath();
      ctx.moveTo(centerX - radius, centerY);
      ctx.lineTo(centerX + radius, centerY);
      ctx.moveTo(centerX, centerY - radius);
      ctx.lineTo(centerX, centerY + radius);
      ctx.stroke();

      // Draw sweep
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, 'rgba(0, 240, 255, 0)');
      gradient.addColorStop(1, 'rgba(0, 240, 255, 0.1)');

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, -0.2, 0.2);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Sweep line
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(radius, 0);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // Draw dots
      dots.forEach(dot => {
        const dx = (dot.x - 0.5) * radius * 2;
        const dy = (dot.y - 0.5) * radius * 2;
        
        ctx.beginPath();
        ctx.arc(centerX + dx, centerY + dy, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
        
        // Glow
        ctx.beginPath();
        ctx.arc(centerX + dx, centerY + dy, dot.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = dot.color + '33';
        ctx.fill();
      });

      rotation += 0.02;
      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full h-full relative">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute top-4 right-4 flex gap-4 text-[8px] font-mono uppercase tracking-widest">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-neon-green" />
          <span className="text-white/40">Secure</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
          <span className="text-white/40">Warning</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-neon-magenta" />
          <span className="text-white/40">Threat</span>
        </div>
      </div>
    </div>
  );
};
