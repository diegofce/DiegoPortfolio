import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const cursorRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reducedMotion.matches) return undefined;

    setEnabled(true);
    document.documentElement.classList.add('custom-cursor-enabled');
    const position = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...position };
    let frame;

    const move = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
    };
    const updateInteractive = (event) => {
      cursorRef.current?.classList.toggle(
        'is-interactive',
        Boolean(
          event.target.closest('a, button, summary, input, .project-card'),
        ),
      );
    };
    const render = () => {
      position.x += (target.x - position.x) * 0.3;
      position.y += (target.y - position.y) * 0.3;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
      }
      frame = window.requestAnimationFrame(render);
    };

    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', updateInteractive, {
      passive: true,
    });
    render();
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', updateInteractive);
      document.documentElement.classList.remove('custom-cursor-enabled');
    };
  }, []);

  if (!enabled) return null;
  return <span ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
}
