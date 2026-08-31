import { useLanguage } from '../../common/LanguageContext';
import { SocialIcon } from '../../components/SocialIcon';
import { profile, socialLinks } from '../../data/profile';

export function Contact() {
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
        <svg
          viewBox="0 0 360 240"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
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
