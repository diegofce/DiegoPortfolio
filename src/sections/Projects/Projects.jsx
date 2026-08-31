import { useLanguage } from '../../common/LanguageContext';
import { projects } from '../../data/projects';
import { SectionHeading } from '../../components/SectionHeading';
import { ProjectCard } from '../../common/ProjectCard';

export function Projects() {
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
