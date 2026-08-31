import { useLanguage } from './LanguageContext';

const projectCovers = import.meta.glob(
  ['../assets/projects/**/cover.webp', '../assets/projects/**/cover.svg'],
  {
  eager: true,
  import: 'default',
  query: '?url',
  },
);

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
  const cover =
    projectCovers[`../assets/projects/${project.slug}/cover.svg`] ||
    projectCovers[`../assets/projects/${project.slug}/cover.webp`];
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
        <small>{cover ? 'CURATED PRODUCT VIEW' : 'SCREENSHOT COMING SOON'}</small>
      </div>
    </div>
  );
}

export function ProjectCard({ project, index }) {
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
