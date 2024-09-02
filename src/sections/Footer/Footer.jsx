import styles from './FooterStyles.module.css';

function Footer() {
  return (
    <section id="footer" className={styles.container}>
      <p>
        &copy; 2024 Diego f chacón. <br />
        Colombia ©️
      </p>
    </section>
  );
}

export default Footer;
