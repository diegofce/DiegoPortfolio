import { useLanguage } from '../../common/LanguageContext';
import { technologies } from '../../data/technologies';
import { SectionHeading } from '../../components/SectionHeading';
import { StackArtwork, STACK_SYMBOLS } from '../../components/StackArtwork';
import { TechIcon } from '../../components/TechIcon';
import { LineIcon } from '../../components/LineIcon';

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

export function TechStack() {
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
              <LineIcon type={STACK_SYMBOLS[category]} />
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
