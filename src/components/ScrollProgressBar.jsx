import { useEffect, useRef } from 'react';

export function ScrollProgressBar() {
  const progressRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!progressRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressRef.current.style.width = `${scrollPercent}%`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={progressRef} className="scroll-progress-bar" aria-hidden="true" />
  );
}
