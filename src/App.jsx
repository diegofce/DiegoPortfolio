import './App.css';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { CodeConstellation } from './components/CodeConstellation';
import { CustomCursor } from './components/CustomCursor';
import { AssistantWidget } from './components/AssistantWidget';
import { Navbar } from './layout/Navbar';
import { Footer } from './layout/Footer';
import { Hero } from './sections/Hero/Hero';
import { About } from './sections/About/About';
import { TechStack } from './sections/TechStack/TechStack';
import { Projects } from './sections/Projects/Projects';
import { HowIBuild } from './sections/Build/HowIBuild';
import { AiSection } from './sections/AI/AiSection';
import { Education } from './sections/Education/Education';
import { Contact } from './sections/Contact/Contact';

function App() {
  return (
    <>
      <ScrollProgressBar />
      <div className="global-background" aria-hidden="true">
        <CodeConstellation />
      </div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <HowIBuild />
        <AiSection />
        <Education />
        <Contact />
      </main>
      <Footer />
      <AssistantWidget />
      <CustomCursor />
    </>
  );
}

export default App;
