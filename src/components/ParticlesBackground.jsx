import React, { useEffect } from 'react';
import { useTheme } from '../common/ThemeContext'; // Importa el hook de tema

const ParticlesBackground = () => {
  const { theme } = useTheme(); // Obtiene el tema actual

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js';
    script.async = true;
    document.body.appendChild(script);

    const updateParticlesColor = () => {
      const color = theme === 'dark' ? '#fff' : '#222';
      
      if (window.particlesJS) {
        window.particlesJS('particles-js', {
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: color },
            shape: { type: 'circle' },
            opacity: { value: 0.7 },
            size: {
              value: 5,
              random: true,
              anim: { enable: true, speed: 2, size_min: 3, sync: false }
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: color,
              opacity: 0.5,
              width: 2
            },
            move: {
              enable: true,
              speed: 3,
              direction: 'none',
              random: false,
              straight: false,
              out_mode: 'out',
              bounce: false,
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: { enable: true, mode: 'grab' },
              onclick: { enable: true, mode: 'push' },
              resize: true
            }
          },
          retina_detect: true
        });
      }
    };

    script.onload = updateParticlesColor;

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, [theme]); // Añade theme como dependencia para recargar cuando cambie

  return (
    <div
      id="particles-js"
      className="fixed top-0 left-0 w-full h-full"
      style={{
        zIndex: -1,
        pointerEvents: 'none',
        backgroundColor: 'transparent'
      }}
    />
  );
};

export default ParticlesBackground;