import { useLanguage } from '../../common/LanguageContext';
import { profile } from '../../data/profile';
import { LineIcon } from '../../components/LineIcon';

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

export function About() {
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
        <svg
          className="career-map"
          viewBox="0 0 420 280"
          aria-hidden="true"
          width="420"
          height="280"
        >
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
