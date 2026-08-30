import { LineIcon } from './LineIcon';

export function TechIcon({ tech }) {
  if (tech.icon?.startsWith('concept:')) {
    return (
      <span className="tech-icon-shell" aria-hidden="true">
        <LineIcon type={tech.icon.replace('concept:', '')} />
      </span>
    );
  }

  return <img src={tech.icon} alt="" loading="lazy" />;
}
