import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  type: 'heart' | 'sparkle' | 'petal';
  rotation: number;
  rotationSpeed: number;
  color: string;
}

export const FloatingParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(244, 114, 182, ', // pink-400
      'rgba(251, 113, 133, ', // rose-400
      'rgba(245, 158, 11, ',  // amber-500
      'rgba(253, 224, 71, ',  // yellow-300
      'rgba(225, 29, 72, ',   // rose-600
    ];

    const particles: Particle[] = [];
    const particleCount = Math.min(45, Math.floor((width * height) / 25000));

    const createParticle = (customX?: number, customY?: number, isBurst = false): Particle => {
      const types: Array<'heart' | 'sparkle' | 'petal'> = ['heart', 'heart', 'sparkle', 'petal'];
      const type = types[Math.floor(Math.random() * types.length)];
      const baseColor = colors[Math.floor(Math.random() * colors.length)];
      const size = isBurst ? Math.random() * 14 + 10 : Math.random() * 12 + 8;

      return {
        x: customX ?? Math.random() * width,
        y: customY ?? (isBurst ? customY ?? height : height + Math.random() * 20),
        size,
        speedX: isBurst ? (Math.random() - 0.5) * 4 : (Math.random() - 0.5) * 0.8,
        speedY: isBurst ? -Math.random() * 4 - 1.5 : -Math.random() * 1.2 - 0.4,
        opacity: Math.random() * 0.6 + 0.3,
        type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        color: baseColor,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      const p = createParticle();
      p.y = Math.random() * height; // distribute initially across screen
      particles.push(p);
    }

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number) => {
      c.save();
      c.translate(x, y);
      c.fillStyle = `${color}${alpha})`;
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      // top left curve
      c.bezierCurveTo(
        -size / 2, -size / 2,
        -size, topCurveHeight / 3,
        0, size
      );
      // top right curve
      c.bezierCurveTo(
        size, topCurveHeight / 3,
        size / 2, -size / 2,
        0, topCurveHeight
      );
      c.closePath();
      c.fill();
      c.restore();
    };

    const drawSparkle = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number) => {
      c.save();
      c.translate(x, y);
      c.fillStyle = `${color}${alpha})`;
      c.beginPath();
      c.moveTo(0, -size);
      c.quadraticCurveTo(0, 0, size, 0);
      c.quadraticCurveTo(0, 0, 0, size);
      c.quadraticCurveTo(0, 0, -size, 0);
      c.quadraticCurveTo(0, 0, 0, -size);
      c.closePath();
      c.fill();
      c.restore();
    };

    const drawPetal = (c: CanvasRenderingContext2D, x: number, y: number, size: number, rot: number, color: string, alpha: number) => {
      c.save();
      c.translate(x, y);
      c.rotate(rot);
      c.fillStyle = `${color}${alpha})`;
      c.beginPath();
      c.ellipse(0, 0, size * 0.8, size * 0.35, Math.PI / 4, 0, Math.PI * 2);
      c.fill();
      c.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.opacity);
        } else if (p.type === 'sparkle') {
          drawSparkle(ctx, p.x, p.y, p.size * 0.7, p.color, p.opacity);
        } else {
          drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.color, p.opacity);
        }

        // Wrap around bottom to top
        if (p.y < -30 || p.x < -30 || p.x > width + 30) {
          particles[idx] = createParticle();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Spawn hearts on click/tap
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      for (let i = 0; i < 6; i++) {
        if (particles.length < 80) {
          particles.push(createParticle(clientX, clientY, true));
        }
      }
    };

    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('touchstart', handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('touchstart', handlePointerDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    />
  );
};
