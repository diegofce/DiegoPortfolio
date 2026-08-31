import { useLanguage } from '../../common/LanguageContext';
import { SectionHeading } from '../../components/SectionHeading';
import { LineIcon } from '../../components/LineIcon';

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

export function HowIBuild() {
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
