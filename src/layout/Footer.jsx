import { useLanguage } from '../common/LanguageContext';
import { BrandMark } from '../components/BrandMark';
import { SocialIcon } from '../components/SocialIcon';
import { profile, socialLinks } from '../data/profile';

export function Footer() {
  const { t } = useLanguage();
  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'stack', href: '#stack' },
    { key: 'projects', href: '#projects' },
    { key: 'build', href: '#build' },
    { key: 'education', href: '#education' },
    { key: 'contact', href: '#contact' },
  ];

  const connectItems = [
    ['GitHub', socialLinks.github, 'github'],
    ['LinkedIn', socialLinks.linkedin, 'linkedin'],
    ['Email', 'mailto:' + profile.email, 'email'],
  ];

  return (
    <footer className="site-footer">
      <div className="footer-ambient" aria-hidden="true">
        <BrandMark />
      </div>
      <div className="footer-brand">
        <BrandMark className="footer-mark" />
        <h2>{profile.shortName}</h2>
        <p>{profile.role}</p>
        <p>{profile.focus}</p>
        <span className="status-line is-open">{t('labels.open')}</span>
        <span className="footer-location">{profile.location}</span>
      </div>
      <div>
        <h3>{t('labels.navigation')}</h3>
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {t(`nav.${item.key}`)}
          </a>
        ))}
      </div>
      <div>
        <h3>{t('labels.connect')}</h3>
        {connectItems.map(([label, href, icon]) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noreferrer' : undefined}
            aria-label={label}
          >
            <SocialIcon type={icon} />
            {label}
          </a>
        ))}
      </div>
      <div className="footer-end">
        <span>© 2026 Diego Fernando Chacón Estacio</span>
        <span>{t('ui.builtWith')}</span>
      </div>
    </footer>
  );
}
