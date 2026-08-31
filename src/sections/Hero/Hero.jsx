import { useEffect, useState } from 'react';
import { useLanguage } from '../../common/LanguageContext';
import { socialLinks, profile } from '../../data/profile';
import cvFile from '../../assets/Diego_Chacon_Desarrollador.pdf';
import profilePhoto from '../../assets/foto-perfil.jpeg';

function RotatingText() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const texts = [
      'Backend Developer',
      'Full Stack Engineer',
      'Problem Solver',
    ];

    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % texts.length);
        setFade(false);
      }, 300);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const texts = ['Backend Developer', 'Full Stack Engineer', 'Problem Solver'];

  return (
    <span
      className={fade ? 'rotating-text fade-out' : 'rotating-text fade-in'}
      role="status"
      aria-live="polite"
    >
      {texts[index]}
    </span>
  );
}

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero" id="home">
      <div className="hero-inner section-shell">
        <div className="hero-content reveal">
          <p className="status-dot">{t('labels.open')}</p>
          <h1>Diego Chacón</h1>
          <p className="hero-role">
            <RotatingText />
          </p>
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
