import styles from './HeroStyles.module.css';
import heroImg from '../../assets/hero-img.png';
import sun from '../../assets/sun.svg';
import moon from '../../assets/moon.svg';
import instagramIcon2 from '../../assets/icons8-instagram2.svg';
import instagramIcon1 from '../../assets/icons8-instagram.svg';
import githubLight from '../../assets/github-light.svg';
import githubDark from '../../assets/github-dark.svg';
import linkedinLight from '../../assets/linkedin-light.svg';
import linkedinDark from '../../assets/linkedin-dark.svg';
import CV from '../../assets/cv.pdf';
import { useTheme } from '../../common/ThemeContext';

function Hero() {
  const { theme, toggleTheme } = useTheme();

  const themeIcon = theme === 'light' ? sun : moon;
  const instagramIcon = theme === 'light' ? instagramIcon1 : instagramIcon2;
  const githubIcon = theme === 'light' ? githubLight : githubDark;
  const linkedinIcon = theme === 'light' ? linkedinLight : linkedinDark;

  return (
    <section id="hero" className={styles.container}>
      <div className={styles.colorModeContainer}>
        <img
          src={heroImg}
          className={styles.hero}
          alt="Profile picture of Diego"
        />
        <img
          className={styles.colorMode}
          src={themeIcon}
          alt="Color mode icon"
          onClick={toggleTheme}
        />
      </div>
      <div className={styles.info}>
        <h1>
          Diego F <br />
          Chacón
        </h1>
        <h2>Software Developer</h2>
        <span>
          <a
            href="https://www.instagram.com/diegoefec/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instagramIcon} alt="Instagram icon" />
          </a>
          <a
            href="https://github.com/diegofce"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={githubIcon} alt="Github Icon" />
          </a>
          <a
            href="https://www.linkedin.com/in/diego-fernando-chacon/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedinIcon} alt="Linkedin icon" />
          </a>
        </span>
        <p className={styles.description}>
          I am committed, I contribute innovative ideas, I like challenges and
          new projects; I like working in coordination and as a team, I am
          passionate about technology, I try to learn more every day.
        </p>
        <a href={CV} download>
          <button className="hover">Resume⬇️</button>
        </a>
      </div>
    </section>
  );
}

export default Hero;
