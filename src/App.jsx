import { useEffect, useRef, useState } from 'react';
import './App.css';
import cvFile from './assets/Diego_Chacon_Desarrollador.pdf';
import profilePhoto from './assets/foto-perfil.jpeg';
import { useLanguage } from './common/LanguageContext';
import { useTheme } from './common/ThemeContext';
import { education } from './data/education';
import { profile, socialLinks } from './data/profile';
import { projects } from './data/projects';
import { technologies } from './data/technologies';

const projectCovers = import.meta.glob('./assets/projects/**/cover.webp', {
  eager: true,
  import: 'default',
  query: '?url',
});

const navItems = [
  { key: 'home', href: '#home' },
  { key: 'about', href: '#about' },
  { key: 'stack', href: '#stack' },
  { key: 'projects', href: '#projects' },
  { key: 'build', href: '#build' },
  { key: 'education', href: '#education' },
  { key: 'contact', href: '#contact' },
];

const assistantPrompts = [
  '¿Cuál es el stack de Diego?',
  'Cuéntame sobre BookingSaaS.',
  '¿Cómo usa Diego la IA?',
  '¿Qué proyectos ha construido Diego?',
];

const stackDescriptions = {
  Backend: 'APIs, lógica de negocio y servicios preparados para evolucionar.',
  Frontend:
    'Interfaces claras que mantienen visible el comportamiento del producto.',
  Databases:
    'Persistencia confiable para datos estructurados de la aplicación.',
  Infrastructure: 'Herramientas que mantienen repetible la entrega.',
  Architecture: 'Límites que hacen más sencillo cambiar los sistemas.',
  'AI & Automation': 'Inteligencia práctica conectada a flujos reales.',
};

const stackSymbols = {
  Backend: 'server',
  Frontend: 'browser',
  Databases: 'database',
  Infrastructure: 'container',
  Architecture: 'layers',
  'AI & Automation': 'spark',
};

const principleCards = [
  {
    number: '01',
    title: 'Lógica de negocio',
    text: 'Entender el problema antes de escribir código.',
  },
  {
    number: '02',
    title: 'Arquitectura',
    text: 'Responsabilidades claras, sistemas mantenibles y APIs bien definidas.',
  },
  {
    number: '03',
    title: 'Integración de IA',
    text: 'Usar IA como herramienta de ingeniería para investigar, depurar, automatizar y entregar.',
  },
];

const buildLayers = [
  [
    '01',
    'Interfaz',
    'React / TypeScript',
    'La superficie que usan las personas.',
  ],
  ['02', 'API', 'REST / JWT', 'Un contrato claro entre sistemas.'],
  [
    '03',
    'Lógica de negocio',
    'FastAPI / Django',
    'Reglas que hacen útil al producto.',
  ],
  ['04', 'Datos', 'PostgreSQL / SQL', 'Estado en el que se puede confiar.'],
  [
    '05',
    'Infraestructura',
    'Redis / Docker',
    'Entrega confiable y trabajo asíncrono.',
  ],
  ['06', 'Inteligencia', 'AI APIs', 'Automatización conectada a un propósito.'],
];

function BrandMark({ className = '' }) {
  return (
    <svg
      className={className ? `brand-mark ${className}` : 'brand-mark'}
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      <path
        className="brand-mark-bracket"
        d="m18 8-10 16 10 16M30 8l10 16-10 16"
      />
      <path className="brand-mark-bridge" d="M19 24h10" />
      <circle className="brand-mark-accent" cx="24" cy="24" r="4" />
      <path className="brand-mark-success" d="M24 10v6M24 32v6" />
    </svg>
  );
}

function LineIcon({ type = 'node' }) {
  const paths = {
    node: (
      <>
        <circle cx="12" cy="4" r="2" />
        <circle cx="5" cy="19" r="2" />
        <circle cx="19" cy="19" r="2" />
        <path d="m10.8 5.6-4.6 11.7m7-11.7 4.6 11.7M7 19h10" />
      </>
    ),
    server: (
      <>
        <rect x="4" y="4" width="16" height="6" rx="1" />
        <rect x="4" y="14" width="16" height="6" rx="1" />
        <path d="M8 7h.01M8 17h.01M11 7h5M11 17h5" />
      </>
    ),
    browser: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M7 6.5h.01M10 6.5h.01M13 6.5h.01M8 14l2 2 4-5" />
      </>
    ),
    database: (
      <>
        <ellipse cx="12" cy="5" rx="7" ry="3" />
        <path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 12v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7" />
      </>
    ),
    container: (
      <>
        <path d="M4 8h16v10H4zM4 8l8-4 8 4M12 4v14M8 6v12M16 6v12" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 13 9 5 9-5M3 18l9 5 9-5" />
      </>
    ),
    spark: (
      <>
        <path d="M12 2v5M12 17v5M4.9 4.9l3.5 3.5M15.6 15.6l3.5 3.5M2 12h5M17 12h5M4.9 19.1l3.5-3.5M15.6 8.4l3.5-3.5" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    api: (
      <>
        <path d="M7 8h10M7 16h10M4 12h16" />
        <circle cx="5" cy="8" r="2" />
        <circle cx="19" cy="12" r="2" />
        <circle cx="5" cy="16" r="2" />
      </>
    ),
    key: (
      <>
        <circle cx="8" cy="12" r="4" />
        <path d="M12 12h9M17 12v3M20 12v2" />
      </>
    ),
    hexagon: (
      <>
        <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
        <path d="M8.5 12h7M12 8.5v7" />
      </>
    ),
    terminal: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m7 10 3 2-3 2M12 15h5" />
      </>
    ),
    prompt: (
      <>
        <path d="M5 6h14v8H9l-4 4V6Z" />
        <path d="M8 10h.01M11 10h5" />
      </>
    ),
    code: (
      <>
        <path d="m9 7-5 5 5 5M15 7l5 5-5 5M13 5l-2 14" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8M12 4v16M6 9c0 2.2 1.3 4.1 3.2 5s4.1 1 5.8-0.2" />
      </>
    ),
    circle: <circle cx="12" cy="12" r="7" />,
  };
  return (
    <svg className="line-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[type] || paths.node}
    </svg>
  );
}

function TechIcon({ tech }) {
  if (tech.icon?.startsWith('concept:')) {
    return (
      <span className="tech-icon-shell" aria-hidden="true">
        <LineIcon type={tech.icon.replace('concept:', '')} />
      </span>
    );
  }

  return <img src={tech.icon} alt="" loading="lazy" />;
}

function SocialIcon({ type }) {
  const paths = {
    email: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    linkedin: (
      <>
        <path d="M6.5 10v8M6.5 6.5v.01M11 18v-8M11 13.5c0-2.1 1.2-3.5 3.3-3.5s3.2 1.5 3.2 4v4" />
      </>
    ),
    github: (
      <>
        <path d="M9 19c-4 1.3-4-2-5.5-2.5M14.5 21v-3.4c0-1 .1-1.4-.5-2 2.9-.3 6-1.4 6-6A4.7 4.7 0 0 0 18.7 6a4.4 4.4 0 0 0-.1-3.4s-1.1-.3-3.5 1.3a12.1 12.1 0 0 0-6.2 0C6.5 2.3 5.4 2.6 5.4 2.6A4.4 4.4 0 0 0 5.3 6 4.7 4.7 0 0 0 4 9.6c0 4.6 3.1 5.7 6 6-.6.6-.6 1.2-.5 2V21" />
      </>
    ),
  };

  return (
    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[type]}
    </svg>
  );
}

function StackArtwork({ category }) {
  const type = stackSymbols[category];
  return (
    <svg className="stack-art" viewBox="0 0 180 180" aria-hidden="true">
      <path d="M24 36h132M24 72h132M24 108h132M24 144h132M36 24v132M72 24v132M108 24v132M144 24v132" />
      {type === 'server' && (
        <>
          <rect x="44" y="44" width="92" height="32" rx="6" />
          <rect x="44" y="104" width="92" height="32" rx="6" />
          <path d="M58 60h8M78 60h42M58 120h8M78 120h42" />
        </>
      )}
      {type === 'browser' && (
        <>
          <rect x="42" y="42" width="96" height="88" rx="8" />
          <path d="M42 66h96M62 52h1M78 52h1M66 96l16 16 34-40" />
        </>
      )}
      {type === 'database' && (
        <>
          <ellipse cx="90" cy="54" rx="48" ry="18" />
          <path d="M42 54v70c0 10 21.5 18 48 18s48-8 48-18V54M42 90c0 10 21.5 18 48 18s48-8 48-18" />
        </>
      )}
      {type === 'container' && (
        <>
          <path d="M44 68h92v58H44zM44 68l46-24 46 24M90 44v82M62 58v68M118 58v68" />
        </>
      )}
      {type === 'layers' && (
        <>
          <path d="m90 38 56 30-56 30-56-30 56-30Z" />
          <path d="m34 92 56 30 56-30M34 116l56 30 56-30" />
        </>
      )}
      {type === 'spark' && (
        <>
          <circle cx="90" cy="90" r="22" />
          <path d="M90 26v28M90 126v28M26 90h28M126 90h28M45 45l20 20M115 115l20 20M45 135l20-20M115 65l20-20" />
        </>
      )}
    </svg>
  );
}

// MVP: Asistente basado en reglas de keywords. Futuro refactor: considerar embeddings + semantic search para respuestas más robustas.
function createAssistantAnswer(message) {
  // Normalizar búsqueda: remover tildes (educación → educacion) y pasar a minúsculas
  const query = message
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  if (
    query.includes('stack') ||
    query.includes('tech') ||
    query.includes('technolog')
  ) {
    return 'Diego trabaja principalmente con Python, FastAPI, Django REST Framework, React, TypeScript, PostgreSQL, Redis, Celery, Docker, APIs REST, JWT, OAuth2 e integraciones con APIs de IA.';
  }

  if (query.includes('booking')) {
    return 'BookingSaaS es un sistema SaaS de reservas con FastAPI, React, PostgreSQL, Celery, Redis y JWT. Incluye arquitectura backend escalable, autenticación por roles, lógica multiinquilino, prevención de conflictos y notificaciones asíncronas.';
  }

  if (
    query.includes('ai') ||
    query.includes('automation') ||
    query.includes('codex') ||
    query.includes('claude')
  ) {
    return 'Diego entiende la IA como una capa de integración y productividad: APIs de IA, prompt engineering, desarrollo asistido, Codex, Claude Code y flujos de automatización.';
  }

  if (query.includes('project') || query.includes('teamsalud')) {
    return 'El portafolio presenta TeamSalud, BookingSaaS y un espacio para un proyecto de integración con IA, además de tres proyectos preparados para el futuro.';
  }

  if (
    query.includes('education') ||
    query.includes('sena') ||
    query.includes('bootcamp')
  ) {
    return 'La formación incluye Ingeniería de Software en curso en la Corporación Universitaria Iberoamericana, Tecnólogo ADSO del SENA y Full Stack Python Senior en DevSenior-Code Bootcamp.';
  }

  return 'Esa información todavía no está disponible en el portafolio de Diego.';
}

function Navbar() {
  const { language, t, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  // ScrollSpy: detectar sección visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setActiveSection(sectionId);
          }
        });
      },
      { threshold: 0.3 },
    );

    const sections = navItems.map((item) => document.querySelector(item.href));
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}>
      <a className="brand" href="#home" aria-label={t('ui.goHome')}>
        <BrandMark />
        <span>Diego Chacón</span>
      </a>
      <nav className="desktop-nav" aria-label={t('ui.primaryNavigation')}>
        {navItems.map((item) => {
          const isActive = activeSection === item.key;
          return (
            <a
              key={item.href}
              href={item.href}
              className={isActive ? 'is-active' : ''}
              aria-current={isActive ? 'page' : undefined}
            >
              {t(`nav.${item.key}`)}
            </a>
          );
        })}
      </nav>
      <a className="nav-cv" href={cvFile} download>
        {t('actions.downloadCv')}
      </a>
      <button
        className="language-toggle"
        type="button"
        onClick={toggleLanguage}
        aria-label={t('language.switch')}
      >
        <LineIcon type="globe" />
        <span className="lang-badge">{language.toUpperCase()}</span>
      </button>
      <button
        className="theme-toggle"
        type="button"
        onClick={toggleTheme}
        aria-label={t('theme.switch')}
      >
        <LineIcon type={theme === 'dark' ? 'spark' : 'circle'} />
      </button>
      <button
        className="menu-toggle"
        type="button"
        aria-label={isOpen ? t('ui.closeMenu') : t('ui.openMenu')}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((value) => !value)}
      >
        <span />
        <span />
      </button>
      <div
        id="mobile-navigation"
        className={isOpen ? 'mobile-nav is-open' : 'mobile-nav'}
        aria-hidden={!isOpen}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.key;
          return (
            <a
              key={item.href}
              href={item.href}
              className={isActive ? 'is-active' : ''}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
            >
              {t(`nav.${item.key}`)}
            </a>
          );
        })}
        <a href={cvFile} download onClick={() => setIsOpen(false)}>
          {t('actions.downloadCv')}
        </a>
        <button
          className="language-toggle"
          type="button"
          onClick={toggleLanguage}
          aria-label={t('language.switch')}
        >
          <LineIcon type="globe" />
          <span className="lang-badge">{language.toUpperCase()}</span>
        </button>
        <button
          className="theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={t('theme.switch')}
        >
          <LineIcon type={theme === 'dark' ? 'spark' : 'circle'} />
        </button>
      </div>
    </header>
  );
}

function CodeConstellation() {
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

      // Adaptive node count: mobile < 768px, low CPU concurrency
      let count = 48; // desktop default
      if (mobile.matches) {
        count = 15; // mobile default
        const concurrency = navigator.hardwareConcurrency || 4;
        if (concurrency <= 2) count = 10; // ultra-low-end devices
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

function CustomCursor() {
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
      position.x += (target.x - position.x) * 0.22;
      position.y += (target.y - position.y) * 0.22;
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

function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

function Hero() {
  const { t } = useLanguage();
  return (
    <section className="hero" id="home">
      <div className="hero-inner section-shell">
        <div className="hero-content reveal">
          <p className="status-dot">{t('labels.open')}</p>
          <h1>Diego Chacón</h1>
          <p className="hero-role">Software Developer</p>
          <p className="hero-tags">Backend · Full Stack · AI Integration</p>
          <p className="hero-copy">
            Construyo aplicaciones web, APIs e integraciones inteligentes con
            Python, React y tecnologías de IA.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#projects">
              Ver proyectos
            </a>
            <a className="button secondary" href={cvFile} download>
              Descargar CV
            </a>
            <a
              className="button ghost"
              href={socialLinks.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="button ghost"
              href={socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <figure className="hero-portrait reveal">
          <div className="portrait-frame">
            <img
              src={profilePhoto}
              alt="Diego Fernando Chacón"
              loading="eager"
            />
          </div>
          <figcaption>
            <span>{profile.location}</span>
            <strong>Backend · Full Stack · AI</strong>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function About() {
  const { t } = useLanguage();
  const pathItems = [
    ['Healthcare', 'Procesos reales'],
    ['Software', 'Lógica de producto'],
    ['Backend', 'APIs y autenticación'],
    ['Full Stack', 'Interfaces claras'],
    ['AI Integration', 'Capa de automatización'],
  ];

  return (
    <section className="section-shell about-section reveal" id="about">
      <div className="about-intro">
        <p className="eyebrow">{t('labels.about')}</p>
        <h2>{t('headings.aboutTitle')}</h2>
        <p>
          Desarrollo sistemas web con foco en APIs, autenticación, lógica de
          negocio, arquitectura y experiencias frontend claras.
        </p>
        <p>
          Mi trabajo conecta experiencia previa en healthcare con desarrollo de
          software: entiendo procesos reales, traduzco reglas de negocio y
          construyo soluciones mantenibles con Python, React e integraciones
          asistidas por IA.
        </p>
      </div>
      <div className="about-visual">
        <div className="career-path" aria-label="Professional evolution">
          {pathItems.map(([item, detail], index) => (
            <article key={item}>
              <b>{String(index + 1).padStart(2, '0')}</b>
              <div>
                <strong>{item}</strong>
                <span>{detail}</span>
              </div>
            </article>
          ))}
        </div>
        <svg className="career-map" viewBox="0 0 420 280" aria-hidden="true">
          <path d="M66 64C128 32 168 100 210 82s74-82 142-28" />
          <path d="M70 216c66-56 116 4 164-20s76-88 124-48" />
          <path d="M96 76v132M210 86v110M328 58v94" />
          <circle cx="96" cy="76" r="12" />
          <circle cx="210" cy="86" r="12" />
          <circle cx="328" cy="58" r="12" />
          <circle cx="96" cy="208" r="12" />
          <circle cx="210" cy="196" r="12" />
          <circle cx="328" cy="152" r="12" />
        </svg>
        <div className="system-card">
          <span>diego.workflow</span>
          <strong>process - API - interface - automation</strong>
        </div>
      </div>
      <div className="about-story">
        <p>
          Me interesan los sistemas backend bien estructurados, la comunicación
          limpia entre frontend y API, y el uso práctico de herramientas de IA
          para acelerar investigación, debugging, automatización y entrega.
        </p>
        <div className="principles-grid">
          {principleCards.map((card) => (
            <article className="principle-card" key={card.number}>
              <span>{card.number}</span>
              <LineIcon />
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
      <aside className="profile-card" aria-label="Professional summary">
        <span className="status-line">Based in {profile.location}</span>
        <strong>{profile.role}</strong>
        <span>{profile.focus}</span>
        <span className="status-line is-open">{t('labels.open')}</span>
      </aside>
    </section>
  );
}

function TechStack() {
  const { t } = useLanguage();
  const loop = [...technologies, ...technologies];
  const categories = [
    'Backend',
    'Frontend',
    'Databases',
    'Infrastructure',
    'Architecture',
    'AI & Automation',
  ];

  return (
    <section className="section-shell reveal" id="stack">
      <SectionHeading
        eyebrow={t('labels.tech')}
        title={t('headings.techTitle')}
      >
        Tecnologías organizadas por el tipo de problema que ayudan a resolver.
      </SectionHeading>
      <div className="stack-categories">
        {categories.map((category) => (
          <article className="stack-category" key={category}>
            <div className="stack-card-top">
              <span>0{categories.indexOf(category) + 1}</span>
              <LineIcon type={stackSymbols[category]} />
            </div>
            <StackArtwork category={category} />
            <LineIcon
              type={
                category === 'Backend'
                  ? 'server'
                  : category === 'Frontend'
                    ? 'browser'
                    : category === 'Databases'
                      ? 'database'
                      : 'node'
              }
            />
            <h3>{t(`categories.${category}`)}</h3>
            <p>{stackDescriptions[category]}</p>
            <div>
              {technologies
                .filter((tech) => tech.category === category)
                .map((tech) => (
                  <span key={tech.name}>
                    <TechIcon tech={tech} />
                    {tech.name}
                  </span>
                ))}
            </div>
          </article>
        ))}
      </div>
      <div className="marquee" aria-label="Technology logos">
        <div className="marquee-track">
          {loop.map((tech, index) => (
            <div className="tech-pill" key={tech.name + index}>
              <TechIcon tech={tech} />
              <strong>{tech.name}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectVisual({ type }) {
  return (
    <svg className="project-diagram" viewBox="0 0 320 160" aria-hidden="true">
      <path d="M30 82h68m62 0h62m-124 0 31-38m31 38-31-38" />
      <circle cx="30" cy="82" r="10" />
      <circle cx="129" cy="44" r="10" />
      <circle cx="160" cy="82" r="10" />
      <circle cx="222" cy="82" r="10" />
      {type === 'calendar' && (
        <>
          <rect x="94" y="78" width="72" height="52" rx="6" />
          <path d="M94 96h72M110 70v16M150 70v16M110 110h10M130 110h10M150 110h10" />
          <rect x="206" y="36" width="70" height="50" rx="8" />
          <path d="M222 54h38M222 68h24" />
        </>
      )}
      {type === 'health' && (
        <>
          <circle cx="160" cy="82" r="30" />
          <path d="M160 66v32M144 82h32" />
          <rect x="205" y="42" width="74" height="82" rx="10" />
          <path d="M220 62h28M220 80h42M220 98h34" />
        </>
      )}
      {type === 'ai' && (
        <>
          <circle cx="160" cy="82" r="34" />
          <path d="M145 82h30M160 67v30M184 48l40-22M184 116l40 22M224 26v112" />
          <circle cx="224" cy="26" r="8" />
          <circle cx="224" cy="138" r="8" />
        </>
      )}
    </svg>
  );
}

function ProjectPreview({ project }) {
  const cover = projectCovers[`./assets/projects/${project.slug}/cover.webp`];
  const visualType =
    project.title === 'BookingSaaS'
      ? 'calendar'
      : project.title === 'TeamSalud'
        ? 'health'
        : 'ai';
  return (
    <div
      className="project-visual"
      role="img"
      aria-label={`${project.title} project preview`}
    >
      {cover && (
        <img className="project-cover" src={cover} alt="" loading="lazy" />
      )}
      <div className="preview-window">
        <div className="preview-toolbar">
          <span />
          <span />
          <span />
          <small>preview / {visualType}</small>
        </div>
        <svg className="project-grid" viewBox="0 0 280 100" aria-hidden="true">
          <path d="M0 20h280M0 50h280M0 80h280M40 0v100M100 0v100M160 0v100M220 0v100" />
        </svg>
        <ProjectVisual type={visualType} />
        <span>PROJECT PREVIEW</span>
        <strong>{project.category}</strong>
        <small>SCREENSHOT COMING SOON</small>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const { t } = useLanguage();
  const displayProjectValue = (value) => {
    if (value === 'Clean Architecture') return t('ui.cleanArchitecture');
    if (value === 'Project data pending') return t('ui.projectDataPending');
    return value;
  };
  const hasLinks = project.github || project.demo;

  return (
    <article
      className={project.featured ? 'project-card featured' : 'project-card'}
    >
      <ProjectPreview project={project} />
      <div className="project-body">
        <span className="project-number">
          {String(index + 1).padStart(2, '0')}
        </span>
        <p className="eyebrow">{project.category}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-meta">
          <span>{displayProjectValue(project.status)}</span>
          {project.stack.map((item) => (
            <span key={item}>{displayProjectValue(item)}</span>
          ))}
        </div>
        <details>
          <summary>{t('ui.viewProject')}</summary>
          <div className="project-details">
            <p>
              <strong>{t('ui.problem')}:</strong> {project.problem}
            </p>
            <p>
              <strong>{t('ui.solution')}:</strong> {project.solution}
            </p>
            {project.architecture && (
              <p>
                <strong>{t('ui.architecture')}:</strong>{' '}
                {displayProjectValue(project.architecture)}
              </p>
            )}
          </div>
        </details>
        <div className="project-links" aria-label={`${project.title} links`}>
          {project.github ? (
            <a href={project.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          ) : (
            <span aria-disabled="true">{t('ui.githubPending')}</span>
          )}
          {project.demo ? (
            <a href={project.demo} target="_blank" rel="noreferrer">
              Live Demo
            </a>
          ) : (
            <span aria-disabled="true">{t('ui.demoPending')}</span>
          )}
          {!hasLinks && (
            <span aria-disabled="true">Links will be added when available</span>
          )}
        </div>
      </div>
    </article>
  );
}

function Projects() {
  const { t } = useLanguage();
  const featured = projects.filter((project) => project.featured);
  const additional = projects.filter((project) => !project.featured);

  return (
    <section className="section-shell reveal" id="projects">
      <SectionHeading
        eyebrow={t('labels.projects')}
        title={t('headings.projectsTitle')}
      >
        Una muestra enfocada: proyectos principales, proyectos secundarios y
        espacio preparado para próximos casos de integración con IA.
      </SectionHeading>
      <div className="project-group">
        <h3>{t('labels.featured')}</h3>
        <div className="projects-grid featured-grid">
          {featured.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
      <div className="project-group">
        <h3>{t('labels.additional')}</h3>
        <div className="projects-grid">
          {additional.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index + featured.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function HowIBuild() {
  const { t } = useLanguage();
  return (
    <section className="section-shell reveal" id="build">
      <SectionHeading
        eyebrow={t('labels.build')}
        title={t('headings.buildTitle')}
      >
        Desde la interfaz hasta la infraestructura, diseño cada capa con
        responsabilidades claras, APIs bien definidas y una arquitectura que
        pueda evolucionar.
      </SectionHeading>
      <div className="architecture-board" aria-label={t('ui.architectureFlow')}>
        <div className="architecture-spine" />
        {buildLayers.map(([number, title, tools, text]) => (
          <article className="build-layer" key={number}>
            <span>{number}</span>
            <LineIcon
              type={
                number === '04'
                  ? 'database'
                  : number === '01'
                    ? 'browser'
                    : number === '05'
                      ? 'server'
                      : 'node'
              }
            />
            <div>
              <h3>{title}</h3>
              <strong>{tools}</strong>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="supporting-systems">
        {['User', 'Redis', 'Celery', 'Docker'].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}

function AiSection() {
  const { t } = useLanguage();
  return (
    <section className="section-shell ai-panel reveal">
      <div>
        <p className="eyebrow">{t('ui.aiLabel')}</p>
        <h2>{t('headings.aiTitle')}</h2>
        <p>
          Trabajo con integraciones de APIs de IA, prompt engineering,
          automatización y desarrollo asistido por herramientas como Codex y
          Claude Code.
        </p>
      </div>
      <div
        className="assistant-preview"
        aria-label="AI Portfolio Assistant available as a local portfolio assistant"
      >
        <span>{t('ui.assistantPreview')}</span>
        <strong>{t('assistant.toggle')}</strong>
        <p>{t('ui.askAbout')}</p>
      </div>
    </section>
  );
}

function Education() {
  const { t } = useLanguage();
  return (
    <section className="section-shell reveal" id="education">
      <SectionHeading
        eyebrow={t('labels.education')}
        title={t('headings.educationTitle')}
      />
      <div className="education-grid">
        {education.map((item, index) => (
          <article key={item.school}>
            <span className="education-number">0{index + 1}</span>
            <LineIcon
              type={index === 0 ? 'node' : index === 1 ? 'server' : 'browser'}
            />
            <div>
              <span>{item.status}</span>
              <h3>{item.school}</h3>
              <p>{item.program}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const { t } = useLanguage();
  const contactItems = [
    {
      label: 'Email',
      value: profile.email,
      href: 'mailto:' + profile.email,
      icon: 'email',
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/diegofchacon',
      href: socialLinks.linkedin,
      icon: 'linkedin',
    },
    {
      label: 'GitHub',
      value: 'github.com/diegofce',
      href: socialLinks.github,
      icon: 'github',
    },
  ];

  return (
    <section className="section-shell contact-section reveal" id="contact">
      <div className="contact-copy">
        <p className="eyebrow">{t('labels.contact')}</p>
        <h2>Let&apos;s build something.</h2>
        <p>
          ¿Tienes un producto, una API, una automatización o un problema técnico
          que quieras convertir en software?
        </p>
        <a className="button primary" href={'mailto:' + profile.email}>
          {t('actions.talk')} <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="contact-visual" aria-hidden="true">
        <svg viewBox="0 0 360 240">
          <path d="M42 80h80m116 0h80M122 80l58-42 58 42M122 80l58 58 58-58M180 38v100" />
          <circle cx="42" cy="80" r="14" />
          <circle cx="122" cy="80" r="14" />
          <circle cx="180" cy="38" r="14" />
          <circle cx="180" cy="138" r="14" />
          <circle cx="238" cy="80" r="14" />
          <circle cx="318" cy="80" r="14" />
          <path d="M80 176h200M110 196h140" />
        </svg>
        <span>INPUT / API / OUTCOME</span>
      </div>
      <div className="contact-links">
        {contactItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
            aria-label={`${item.label}: ${item.value}`}
          >
            <SocialIcon type={item.icon} />
            <b>{item.label}</b>
            <span>{item.value}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function AssistantWidget() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: t('assistant.intro'),
    },
  ]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const ask = (message) => {
    const trimmed = message.trim().slice(0, 240);
    if (!trimmed) return;

    setMessages((current) =>
      [
        ...current,
        { role: 'user', text: trimmed },
        { role: 'assistant', text: createAssistantAnswer(trimmed) },
      ].slice(-8),
    );
    setInput('');
  };

  return (
    <div className="assistant-widget">
      <button
        className="assistant-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="assistant-panel"
        onClick={() => setIsOpen((value) => !value)}
      >
        {t('assistant.toggle')}
      </button>
      <section
        id="assistant-panel"
        className={isOpen ? 'assistant-panel is-open' : 'assistant-panel'}
        aria-label={t('assistant.label')}
        aria-hidden={!isOpen}
      >
        <div className="assistant-header">
          <div>
            <span>Portfolio AI</span>
            <h2>{t('assistant.toggle')}</h2>
          </div>
          <button
            type="button"
            aria-label={t('assistant.close')}
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
        </div>
        <div className="assistant-messages" aria-live="polite">
          {messages.map((message, index) => (
            <p
              className={
                message.role === 'assistant'
                  ? 'assistant-message'
                  : 'user-message'
              }
              key={message.role + index}
            >
              {message.text}
            </p>
          ))}
        </div>
        <div className="quick-prompts" aria-label="Quick prompts">
          {assistantPrompts.map((prompt) => (
            <button type="button" key={prompt} onClick={() => ask(prompt)}>
              {prompt}
            </button>
          ))}
        </div>
        <form
          className="assistant-form"
          onSubmit={(event) => {
            event.preventDefault();
            ask(input);
          }}
        >
          <label htmlFor="assistant-input">{t('assistant.inputLabel')}</label>
          <div>
            <input
              id="assistant-input"
              value={input}
              maxLength="240"
              onChange={(event) => setInput(event.target.value)}
              placeholder={t('assistant.placeholder')}
            />
            <button type="submit" disabled={!input.trim()}>
              {t('assistant.submit')}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function Footer() {
  const { t } = useLanguage();
  const connectItems = [
    ['GitHub', socialLinks.github, 'github'],
    ['LinkedIn', socialLinks.linkedin, 'linkedin'],
    ['Email', 'mailto:' + profile.email, 'email'],
  ];

  return (
    <footer className="site-footer">
      <div className="footer-ambient" aria-hidden="true">
        <BrandMark />
      </div>
      <div className="footer-brand">
        <BrandMark className="footer-mark" />
        <h2>{profile.shortName}</h2>
        <p>{profile.role}</p>
        <p>{profile.focus}</p>
        <span className="status-line is-open">{t('labels.open')}</span>
        <span className="footer-location">{profile.location}</span>
      </div>
      <div>
        <h3>{t('labels.navigation')}</h3>
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {t(`nav.${item.key}`)}
          </a>
        ))}
      </div>
      <div>
        <h3>{t('labels.connect')}</h3>
        {connectItems.map(([label, href, icon]) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noreferrer' : undefined}
            aria-label={label}
          >
            <SocialIcon type={icon} />
            {label}
          </a>
        ))}
      </div>
      <div className="footer-end">
        <span>© 2026 Diego Fernando Chacón Estacio</span>
        <span>{t('ui.builtWith')}</span>
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <div className="global-background" aria-hidden="true">
        <CodeConstellation />
      </div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <HowIBuild />
        <AiSection />
        <Education />
        <Contact />
      </main>
      <Footer />
      <AssistantWidget />
      <CustomCursor />
    </>
  );
}

export default App;
