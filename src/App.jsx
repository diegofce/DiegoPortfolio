import { useEffect, useRef, useState } from 'react';
import './App.css';
import cvFile from './assets/cvPy.pdf';
import profilePhoto from './assets/foto-perfil.jpeg';
import { education, experience } from './data/experience';
import { profile, socialLinks } from './data/profile';
import { projects } from './data/projects';
import { technologies } from './data/technologies';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
];

const assistantPrompts = [
  "What is Diego's stack?",
  'Tell me about BookingSaaS.',
  'What experience does Diego have with AI?',
  'What projects has Diego built?',
];

function createAssistantAnswer(message) {
  const query = message.toLowerCase();

  if (
    query.includes('stack') ||
    query.includes('tech') ||
    query.includes('technolog')
  ) {
    return 'Diego works mainly with Python, FastAPI, Django REST Framework, React, TypeScript, PostgreSQL, Redis, Celery, Docker, REST APIs, JWT, OAuth2 and AI API integrations.';
  }

  if (query.includes('booking')) {
    return 'BookingSaaS is documented as a SaaS reservation system using FastAPI, React, PostgreSQL, Celery, Redis and JWT. The confirmed scope includes scalable backend architecture, role-based authentication, multi-tenant logic, conflict prevention and async notifications.';
  }

  if (
    query.includes('ai') ||
    query.includes('automation') ||
    query.includes('codex') ||
    query.includes('claude')
  ) {
    return 'Diego positions AI as an integration and productivity layer: AI API integrations, prompt engineering, AI-assisted development, Codex, Claude Code and automation workflows. The portfolio does not claim unsupported AI expertise.';
  }

  if (
    query.includes('experience') ||
    query.includes('insitel') ||
    query.includes('freelance')
  ) {
    return 'Confirmed experience includes INSITEL S.A. as Software Developer with AI · Freelance from Jul 2025 to Dec 2025, plus Freelance Projects from 2024 to Present focused on Python, Django REST Framework, REST APIs, debugging, refactoring and AI-assisted development.';
  }

  if (query.includes('project') || query.includes('teamsalud')) {
    return 'The portfolio currently features TeamSalud, BookingSaaS and a prepared AI Integration Project slot, plus three additional placeholders for future real projects. Project links are intentionally pending until real repositories or demos are provided.';
  }

  if (
    query.includes('education') ||
    query.includes('sena') ||
    query.includes('bootcamp')
  ) {
    return 'Education shown in the portfolio: Corporación Universitaria Iberoamericana · Ingeniería de Software en curso, SENA · Tecnólogo ADSO, and DevSenior-Code Bootcamp · Full Stack Python Senior.';
  }

  return "That information is not available in Diego's portfolio yet.";
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}>
      <a className="brand" href="#home" aria-label="Go to home">
        <span>DC</span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className="nav-cv" href={cvFile} download>
        Download CV
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
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
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
            {item.label}
          </a>
        ))}
        <a href={cvFile} download onClick={() => setIsOpen(false)}>
          Download CV
        </a>
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
      const count = mobile.matches ? 20 : 48;
      nodes = Array.from({ length: count }, (_, index) => ({
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.11,
        vy: (Math.random() - 0.5) * 0.11,
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
            const force = (1 - distance / 210) * 18 * node.depth;
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
            if (distance < 126) {
              context.globalAlpha = (1 - distance / 126) * 0.55;
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
    <canvas ref={canvasRef} className="constellation" aria-hidden="true" />
  );
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
  return (
    <section className="hero" id="home">
      <CodeConstellation />
      <div className="hero-inner section-shell">
        <div className="hero-content reveal">
          <p className="status-dot">Open to opportunities</p>
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
  return (
    <section className="section-shell about-grid reveal" id="about">
      <SectionHeading
        eyebrow="About Me"
        title="Backend thinking with full-stack execution"
      >
        Desarrollo sistemas web con foco en APIs, autenticación, lógica de
        negocio, arquitectura y experiencias frontend claras.
      </SectionHeading>
      <div className="about-copy">
        <p>
          Mi trabajo conecta experiencia previa en healthcare con desarrollo de
          software: entiendo procesos reales, traduzco reglas de negocio y
          construyo soluciones mantenibles con Python, React e integraciones
          asistidas por IA.
        </p>
        <p>
          Me interesan los sistemas backend bien estructurados, la comunicación
          limpia entre frontend y API, y el uso práctico de herramientas de IA
          para acelerar investigación, debugging, automatización y entrega.
        </p>
      </div>
      <aside className="profile-card" aria-label="Professional summary">
        <span>{profile.location}</span>
        <strong>{profile.role}</strong>
        <span>Open to opportunities</span>
      </aside>
    </section>
  );
}

function TechStack() {
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
        eyebrow="Tech Stack"
        title="Tools for APIs, products and AI workflows"
      >
        Tecnologías organizadas por el tipo de problema que ayudan a resolver.
      </SectionHeading>
      <div className="stack-categories">
        {categories.map((category) => (
          <div className="stack-category" key={category}>
            <h3>{category}</h3>
            <div>
              {technologies
                .filter((tech) => tech.category === category)
                .map((tech) => (
                  <span key={tech.name}>{tech.name}</span>
                ))}
            </div>
          </div>
        ))}
      </div>
      <div className="marquee" aria-label="Technology logos">
        <div className="marquee-track">
          {loop.map((tech, index) => (
            <div className="tech-pill" key={tech.name + index}>
              {tech.icon ? (
                <img src={tech.icon} alt="" loading="lazy" />
              ) : (
                <span>{tech.short}</span>
              )}
              <strong>{tech.name}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section-shell reveal" id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="Real systems, practical delivery"
      />
      <div className="timeline">
        {experience.map((item) => (
          <article className="timeline-item" key={item.company}>
            <div>
              <span>{item.period}</span>
              <h3>{item.company}</h3>
              <p>{item.role}</p>
            </div>
            <ul>
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectPreview({ title, category }) {
  return (
    <div
      className="project-visual"
      role="img"
      aria-label={`${title} project preview placeholder`}
    >
      <div>
        <span>PROJECT PREVIEW</span>
        <strong>{category}</strong>
        <small>SCREENSHOT COMING SOON</small>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const hasLinks = project.github || project.demo;

  return (
    <article
      className={project.featured ? 'project-card featured' : 'project-card'}
    >
      <ProjectPreview title={project.title} category={project.category} />
      <div className="project-body">
        <span className="project-number">
          {String(index + 1).padStart(2, '0')}
        </span>
        <p className="eyebrow">{project.category}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-meta">
          <span>{project.status}</span>
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <details>
          <summary>View Project</summary>
          <div className="project-details">
            <p>
              <strong>Problem:</strong> {project.problem}
            </p>
            <p>
              <strong>Solution:</strong> {project.solution}
            </p>
            {project.architecture && (
              <p>
                <strong>Architecture:</strong> {project.architecture}
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
            <span aria-disabled="true">GitHub pending</span>
          )}
          {project.demo ? (
            <a href={project.demo} target="_blank" rel="noreferrer">
              Live Demo
            </a>
          ) : (
            <span aria-disabled="true">Live demo pending</span>
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
  const featured = projects.filter((project) => project.featured);
  const additional = projects.filter((project) => !project.featured);

  return (
    <section className="section-shell reveal" id="projects">
      <SectionHeading eyebrow="Projects" title="Selected engineering work">
        Una muestra enfocada: proyectos principales, proyectos secundarios y
        espacio preparado para próximos casos de integración con IA.
      </SectionHeading>
      <div className="project-group">
        <h3>Featured Projects</h3>
        <div className="projects-grid featured-grid">
          {featured.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
      <div className="project-group">
        <h3>Additional Projects</h3>
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
  return (
    <section className="section-shell reveal">
      <SectionHeading
        eyebrow="How I Build"
        title="From interface to infrastructure"
      >
        Entiendo cómo conectar las piezas sin perder claridad en cada capa.
      </SectionHeading>
      <div className="system-flow" aria-label="Software architecture flow">
        {['Frontend', 'REST API', 'Backend', 'Database'].map((item) => (
          <div className="flow-node" key={item}>
            {item}
          </div>
        ))}
      </div>
      <div className="supporting-systems">
        {['Redis', 'Celery', 'AI APIs', 'Docker'].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}

function AiSection() {
  return (
    <section className="section-shell ai-panel reveal">
      <div>
        <p className="eyebrow">AI & Automation</p>
        <h2>AI integration as a practical engineering layer</h2>
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
        <span>Portfolio Assistant</span>
        <strong>Ask Diego AI</strong>
        <p>
          Ask about experience, projects, stack, architecture and AI
          integration. Answers are limited to confirmed portfolio content.
        </p>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="section-shell reveal">
      <SectionHeading
        eyebrow="Education"
        title="Formal training and continued growth"
      />
      <div className="education-grid">
        {education.map((item) => (
          <article key={item.school}>
            <span>{item.status}</span>
            <h3>{item.school}</h3>
            <p>{item.program}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section-shell contact-section reveal" id="contact">
      <p className="eyebrow">Contact</p>
      <h2>Let&apos;s build something.</h2>
      <div className="contact-links">
        <a href={'mailto:' + profile.email}>Email</a>
        <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={socialLinks.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
      <a className="button primary" href={'mailto:' + profile.email}>
        Let&apos;s talk
      </a>
    </section>
  );
}

function AssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hi, I'm Diego's AI assistant. Ask me about Diego's experience, projects or technical background.",
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
        Ask Diego AI
      </button>
      <section
        id="assistant-panel"
        className={isOpen ? 'assistant-panel is-open' : 'assistant-panel'}
        aria-label="Ask Diego AI assistant"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="assistant-header">
          <div>
            <span>Portfolio AI</span>
            <h2>Ask Diego AI</h2>
          </div>
          <button
            type="button"
            aria-label="Close AI assistant"
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
          <label htmlFor="assistant-input">Ask about Diego</label>
          <div>
            <input
              id="assistant-input"
              value={input}
              maxLength="240"
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about stack, projects, AI..."
            />
            <button type="submit" disabled={!input.trim()}>
              Ask
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <h2>Diego Chacón</h2>
        <p>Software Developer</p>
        <p>Backend · Full Stack · AI Integration</p>
      </div>
      <div>
        <h3>Navigation</h3>
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </div>
      <div>
        <h3>Connect</h3>
        <a href={socialLinks.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={'mailto:' + profile.email}>Email</a>
      </div>
      <div>
        <h3>Status</h3>
        <p>Open to opportunities</p>
        <p>© 2026 Diego Fernando Chacón Estacio</p>
        <p>Built with React</p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Experience />
        <Projects />
        <HowIBuild />
        <AiSection />
        <Education />
        <Contact />
      </main>
      <Footer />
      <AssistantWidget />
    </>
  );
}

export default App;
