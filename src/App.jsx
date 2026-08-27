import './App.css';
import { useEffect, useState } from 'react';
import { profile, socialLinks } from './data/profile';
import { projects } from './data/projects';
import { technologies } from './data/technologies';
import { experience, education } from './data/experience';
import cvFile from './assets/cvPy.pdf';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
];

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
          <a key={item.href} href={item.href}>{item.label}</a>
        ))}
      </nav>
      <a className="nav-cv" href={cvFile} download>Download CV</a>
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
          <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>{item.label}</a>
        ))}
        <a href={cvFile} download onClick={() => setIsOpen(false)}>Download CV</a>
      </div>
    </header>
  );
}

function CodeConstellation() {
  useEffect(() => {
    const canvas = document.querySelector('[data-constellation]');
    if (!canvas) return undefined;

    const context = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 720px)');
    let frame;
    let width = 0;
    let height = 0;
    let nodes = [];
    const pointer = { x: -9999, y: -9999, active: false };
    const labels = ['Python', 'FastAPI', 'React', 'AI', 'API', 'JWT', 'SQL', 'Docker', 'Redis', 'TS'];

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = mobile.matches ? 24 : 56;
      nodes = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        label: index % 7 === 0 ? labels[index % labels.length] : '',
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = 'rgba(240, 247, 255, 0.78)';
      context.strokeStyle = 'rgba(130, 181, 255, 0.16)';
      context.lineWidth = 1;

      nodes.forEach((node) => {
        if (!reduceMotion.matches) {
          node.x += node.vx;
          node.y += node.vy;
        }
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        if (pointer.active && !mobile.matches && !reduceMotion.matches) {
          const dx = pointer.x - node.x;
          const dy = pointer.y - node.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 150) {
            node.x -= dx * 0.002;
            node.y -= dy * 0.002;
          }
        }
      });

      if (!mobile.matches) {
        for (let i = 0; i < nodes.length; i += 1) {
          for (let j = i + 1; j < nodes.length; j += 1) {
            const a = nodes[i];
            const b = nodes[j];
            const distance = Math.hypot(a.x - b.x, a.y - b.y);
            if (distance < 132) {
              context.globalAlpha = 1 - distance / 132;
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
        context.beginPath();
        context.arc(node.x, node.y, node.label ? 2.3 : 1.5, 0, Math.PI * 2);
        context.fill();
        if (node.label && !mobile.matches) {
          context.font = '11px ui-monospace, SFMono-Regular, Consolas, monospace';
          context.fillStyle = 'rgba(198, 219, 255, 0.56)';
          context.fillText(node.label, node.x + 8, node.y - 8);
          context.fillStyle = 'rgba(240, 247, 255, 0.78)';
        }
      });

      frame = window.requestAnimationFrame(draw);
    };

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };

    resize();
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

  return <canvas className="constellation" data-constellation aria-hidden="true" />;
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
    <section className="hero section-shell" id="home">
      <CodeConstellation />
      <div className="hero-content reveal">
        <p className="status-dot">Open to opportunities</p>
        <h1>Diego Chacón</h1>
        <p className="hero-role">Software Developer</p>
        <p className="hero-tags">Backend · Full Stack · AI Integration</p>
        <p className="hero-copy">Construyo aplicaciones web, APIs e integraciones inteligentes con Python, React y tecnologías de IA.</p>
        <div className="hero-actions">
          <a className="button primary" href="#projects">Ver proyectos</a>
          <a className="button secondary" href={cvFile} download>Descargar CV</a>
          <a className="button ghost" href={socialLinks.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="button ghost" href={socialLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section-shell about-grid reveal" id="about">
      <SectionHeading eyebrow="About Me" title="Backend thinking with full-stack execution">Desarrollo sistemas web con foco en APIs, autenticación, lógica de negocio, arquitectura y experiencias frontend claras.</SectionHeading>
      <div className="about-copy">
        <p>Mi trabajo conecta experiencia previa en healthcare con desarrollo de software: entiendo procesos reales, traduzco reglas de negocio y construyo soluciones mantenibles con Python, React e integraciones asistidas por IA.</p>
        <p>Me interesan los sistemas backend bien estructurados, la comunicación limpia entre frontend y API, y el uso práctico de herramientas de IA para acelerar investigación, debugging, automatización y entrega.</p>
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
  const categories = ['Backend', 'Frontend', 'Databases', 'Architecture', 'Infrastructure', 'AI & Automation'];

  return (
    <section className="section-shell reveal" id="stack">
      <SectionHeading eyebrow="Tech Stack" title="Tools for APIs, products and AI workflows">Tecnologías organizadas por el tipo de problema que ayudan a resolver.</SectionHeading>
      <div className="stack-categories">
        {categories.map((category) => (
          <div className="stack-category" key={category}>
            <h3>{category}</h3>
            <div>
              {technologies.filter((tech) => tech.category === category).map((tech) => <span key={tech.name}>{tech.name}</span>)}
            </div>
          </div>
        ))}
      </div>
      <div className="marquee" aria-label="Technology logos">
        <div className="marquee-track">
          {loop.map((tech, index) => (
            <div className="tech-pill" key={tech.name + index}>
              {tech.icon ? <img src={tech.icon} alt="" loading="lazy" /> : <span>{tech.short}</span>}
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
      <SectionHeading eyebrow="Experience" title="Real systems, practical delivery" />
      <div className="timeline">
        {experience.map((item) => (
          <article className="timeline-item" key={item.company}>
            <div>
              <span>{item.period}</span>
              <h3>{item.company}</h3>
              <p>{item.role}</p>
            </div>
            <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  return (
    <article className={project.featured ? 'project-card featured' : 'project-card'}>
      <div className="project-visual"><span>Project screenshot coming soon</span></div>
      <div className="project-body">
        <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
        <p className="eyebrow">{project.category}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-meta">
          <span>{project.status}</span>
          {project.stack.map((item) => <span key={item}>{item}</span>)}
        </div>
        <details>
          <summary>View Project</summary>
          <div className="project-details">
            <p><strong>Problem:</strong> {project.problem}</p>
            <p><strong>Solution:</strong> {project.solution}</p>
            {project.architecture && <p><strong>Architecture:</strong> {project.architecture}</p>}
          </div>
        </details>
        <div className="project-links">
          {project.github ? <a href={project.github} target="_blank" rel="noreferrer">GitHub</a> : <span>GitHub pending</span>}
          {project.demo ? <a href={project.demo} target="_blank" rel="noreferrer">Live Demo</a> : <span>Live demo pending</span>}
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
      <SectionHeading eyebrow="Projects" title="Selected engineering work">Una muestra enfocada: proyectos principales, proyectos secundarios y espacio preparado para próximos casos de integración con IA.</SectionHeading>
      <div className="project-group">
        <h3>Featured Projects</h3>
        <div className="projects-grid featured-grid">{featured.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}</div>
      </div>
      <div className="project-group">
        <h3>Additional Projects</h3>
        <div className="projects-grid">{additional.map((project, index) => <ProjectCard key={project.title} project={project} index={index + featured.length} />)}</div>
      </div>
    </section>
  );
}

function HowIBuild() {
  return (
    <section className="section-shell reveal">
      <SectionHeading eyebrow="How I Build" title="From interface to infrastructure">Entiendo cómo conectar las piezas sin perder claridad en cada capa.</SectionHeading>
      <div className="system-flow" aria-label="Software architecture flow">{['Frontend', 'REST API', 'Backend', 'Database'].map((item) => <div className="flow-node" key={item}>{item}</div>)}</div>
      <div className="supporting-systems">{['Redis', 'Celery', 'AI APIs', 'Docker'].map((item) => <span key={item}>{item}</span>)}</div>
    </section>
  );
}

function AiSection() {
  return (
    <section className="section-shell ai-panel reveal">
      <div>
        <p className="eyebrow">AI & Automation</p>
        <h2>AI integration as a practical engineering layer</h2>
        <p>Trabajo con integraciones de APIs de IA, prompt engineering, automatización y desarrollo asistido por herramientas como Codex y Claude Code.</p>
      </div>
      <div className="assistant-preview" aria-label="AI Portfolio Assistant coming soon">
        <span>Coming Soon</span>
        <strong>Ask Diego AI</strong>
        <p>Future assistant for questions about experience, projects, stack and architecture.</p>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="section-shell reveal">
      <SectionHeading eyebrow="Education" title="Formal training and continued growth" />
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
        <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={socialLinks.github} target="_blank" rel="noreferrer">GitHub</a>
      </div>
      <a className="button primary" href={'mailto:' + profile.email}>Let&apos;s talk</a>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <h2>Diego Chacón</h2>
        <p>Software Developer</p>
        <p>Backend · Full Stack · AI Integration</p>
      </div>
      <div>
        <h3>Navigation</h3>
        {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
      </div>
      <div>
        <h3>Elsewhere</h3>
        <a href={socialLinks.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
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
    </>
  );
}

export default App;

