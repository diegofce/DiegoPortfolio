import { useEffect, useRef } from 'react';

export function CodeConstellation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 720px)');
    let frame;
    let width = 0;
    let height = 0;
    let nodes = [];
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: false };
    const PARTICLE_SPEED = 0.22;
    const MOUSE_INFLUENCE = 18;
    const CONNECTION_DISTANCE = 126;
    const labels = [
      'Python',
      'FastAPI',
      'Django',
      'React',
      'TypeScript',
      'AI',
      'API',
      'JWT',
      'SQL',
      'Docker',
      'Redis',
    ];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      let count = 48;
      if (mobile.matches) {
        count = 15;
        const concurrency = navigator.hardwareConcurrency || 4;
        if (concurrency <= 2) count = 10;
      }

      nodes = Array.from({ length: count }, (_, index) => ({
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * PARTICLE_SPEED,
        vy: (Math.random() - 0.5) * PARTICLE_SPEED,
        depth: 0.45 + Math.random() * 0.9,
        label: index % 8 === 0 ? labels[index % labels.length] : '',
      }));
    };

    const draw = () => {
      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;
      context.clearRect(0, 0, width, height);

      const glowX =
        pointer.active && !mobile.matches ? pointer.x : width * 0.68;
      const glowY =
        pointer.active && !mobile.matches ? pointer.y : height * 0.32;
      const glow = context.createRadialGradient(
        glowX,
        glowY,
        0,
        glowX,
        glowY,
        mobile.matches ? 280 : 460,
      );
      glow.addColorStop(0, 'rgba(143, 184, 255, 0.13)');
      glow.addColorStop(1, 'rgba(143, 184, 255, 0)');
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      nodes.forEach((node) => {
        if (!reduceMotion.matches) {
          node.baseX += node.vx;
          node.baseY += node.vy;
        }
        if (node.baseX < -30 || node.baseX > width + 30) node.vx *= -1;
        if (node.baseY < -30 || node.baseY > height + 30) node.vy *= -1;

        let offsetX = 0;
        let offsetY = 0;
        if (pointer.active && !mobile.matches && !reduceMotion.matches) {
          const dx = pointer.x - node.baseX;
          const dy = pointer.y - node.baseY;
          const distance = Math.max(Math.hypot(dx, dy), 1);
          if (distance < 210) {
            const force = (1 - distance / 210) * MOUSE_INFLUENCE * node.depth;
            offsetX = -(dx / distance) * force;
            offsetY = -(dy / distance) * force;
          }
          offsetX += (pointer.x - width / 2) * 0.012 * node.depth;
          offsetY += (pointer.y - height / 2) * 0.008 * node.depth;
        }

        node.x += (node.baseX + offsetX - node.x) * 0.07;
        node.y += (node.baseY + offsetY - node.y) * 0.07;
      });

      context.lineWidth = 1;
      if (!mobile.matches) {
        for (let i = 0; i < nodes.length; i += 1) {
          for (let j = i + 1; j < nodes.length; j += 1) {
            const a = nodes[i];
            const b = nodes[j];
            const distance = Math.hypot(a.x - b.x, a.y - b.y);
            if (distance < CONNECTION_DISTANCE) {
              context.globalAlpha = (1 - distance / CONNECTION_DISTANCE) * 0.55;
              context.strokeStyle = 'rgba(143, 184, 255, 0.28)';
              context.beginPath();
              context.moveTo(a.x, a.y);
              context.lineTo(b.x, b.y);
              context.stroke();
            }
          }
        }
      }

      context.globalAlpha = 1;
      nodes.forEach((node) => {
        context.fillStyle = node.label
          ? 'rgba(226, 238, 255, 0.9)'
          : 'rgba(221, 232, 255, 0.7)';
        context.beginPath();
        context.arc(node.x, node.y, node.label ? 2.4 : 1.45, 0, Math.PI * 2);
        context.fill();

        if (node.label && !mobile.matches) {
          context.font =
            '11px ui-monospace, SFMono-Regular, Consolas, monospace';
          context.fillStyle = 'rgba(198, 219, 255, 0.58)';
          context.fillText(node.label, node.x + 10, node.y - 10);
        }
      });

      if (!reduceMotion.matches) {
        frame = window.requestAnimationFrame(draw);
      }
    };

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = event.clientX - rect.left;
      pointer.ty = event.clientY - rect.top;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
      pointer.tx = width * 0.64;
      pointer.ty = height * 0.35;
    };

    resize();
    pointer.tx = width * 0.64;
    pointer.ty = height * 0.35;
    draw();
    window.addEventListener('resize', resize);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="global-constellation"
      aria-hidden="true"
    />
  );
}
