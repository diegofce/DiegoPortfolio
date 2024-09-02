import styles from './ProjectsStyles.module.css';
import veterinaria from '../../assets/veterinaria.png';
import ecommerce from '../../assets/ecommerce.png';
import juego from '../../assets/juego.png';
import progreso from '../../assets/progreso.png';

import ProjectCard from '../../common/ProjectCard';

function Projects() {
  return (
    <section id="projects" className={styles.container}>
      <h1 className="sectionTitle">Proyects</h1>
      <div className={styles.projectsContainer}>
        <ProjectCard
          src={veterinaria}
          link="https://github.com/diegofce/veterinariaSena"
          h3="veterinaria  (react, python)"
          p="Modelo de Adm. de Veterinaria"
        />

        <ProjectCard
          src={ecommerce}
          link="https://github.com/diegofce/Ecommerce"
          h3="Ecommerce- Mi tienda OnLine (Angular)"
          p="Fake-App"
        />

        <ProjectCard
          src={juego}
          link="https://github.com/diegofce/moketonJuego"
          h3="Moketon (JavaScript)"
          p="Juego"
        />

        <ProjectCard
          src={progreso}
          link="https://github.com/diegofce"
          h3="Proyecto en progreso"
          p="App"
        />
      </div>
    </section>
  );
}

export default Projects;
