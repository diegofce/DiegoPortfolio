import { useEffect, useState } from 'react';
import cvFile from '../assets/Diego_Chacon_Desarrollador.pdf';
import { useLanguage } from '../common/LanguageContext';
import { useTheme } from '../common/ThemeContext';
import { BrandMark } from '../components/BrandMark';
import { LineIcon } from '../components/LineIcon';

export function Navbar() {
  const { language, t, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'stack', href: '#stack' },
    { key: 'projects', href: '#projects' },
    { key: 'build', href: '#build' },
    { key: 'education', href: '#education' },
    { key: 'contact', href: '#contact' },
  ];

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setActiveSection(sectionId);
          }
        });
      },
      { threshold: 0.3 },
    );

    const navItemsArray = [
      { key: 'home', href: '#home' },
      { key: 'about', href: '#about' },
      { key: 'stack', href: '#stack' },
      { key: 'projects', href: '#projects' },
      { key: 'build', href: '#build' },
      { key: 'education', href: '#education' },
      { key: 'contact', href: '#contact' },
    ];

    const sections = navItemsArray.map((item) => document.querySelector(item.href));
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}>
      <a className="brand" href="#home" aria-label={t('ui.goHome')}>
        <BrandMark />
        <span>Diego Chacón</span>
      </a>
      <nav className="desktop-nav" aria-label={t('ui.primaryNavigation')}>
        {navItems.map((item) => {
          const isActive = activeSection === item.key;
          return (
            <a
              key={item.href}
              href={item.href}
              className={isActive ? 'is-active' : ''}
              aria-current={isActive ? 'page' : undefined}
            >
              {t(`nav.${item.key}`)}
            </a>
          );
        })}
      </nav>
      <a className="nav-cv" href={cvFile} download>
        {t('actions.downloadCv')}
      </a>
      <button
        className="language-toggle"
        type="button"
        onClick={toggleLanguage}
        aria-label={t('language.switch')}
      >
        <LineIcon type="globe" />
        <span className="lang-badge">{language.toUpperCase()}</span>
      </button>
      <button
        className="theme-toggle"
        type="button"
        onClick={toggleTheme}
        aria-label={t('theme.switch')}
      >
        <LineIcon type={theme === 'dark' ? 'spark' : 'circle'} />
      </button>
      <button
        className="menu-toggle"
        type="button"
        aria-label={isOpen ? t('ui.closeMenu') : t('ui.openMenu')}
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
        {navItems.map((item) => {
          const isActive = activeSection === item.key;
          return (
            <a
              key={item.href}
              href={item.href}
              className={isActive ? 'is-active' : ''}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
            >
              {t(`nav.${item.key}`)}
            </a>
          );
        })}
        <a href={cvFile} download onClick={() => setIsOpen(false)}>
          {t('actions.downloadCv')}
        </a>
        <button
          className="language-toggle"
          type="button"
          onClick={toggleLanguage}
          aria-label={t('language.switch')}
        >
          <LineIcon type="globe" />
          <span className="lang-badge">{language.toUpperCase()}</span>
        </button>
        <button
          className="theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={t('theme.switch')}
        >
          <LineIcon type={theme === 'dark' ? 'spark' : 'circle'} />
        </button>
      </div>
    </header>
  );
}
