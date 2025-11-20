import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import AnimatedBackground from './components/AnimatedBackground';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import NekoCat from './components/ui/cat.jsx';


gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Force light mode on initial load
    document.documentElement.classList.remove('dark');
    
    // Smooth scroll
    const lenis = {
      update: (time) => {
        gsap.ticker.add((time) => {
          ScrollTrigger.update();
        });
      }
    };

    gsap.ticker.add(lenis.update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.update);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <NekoCat />
      <AnimatedBackground />
      <CustomCursor />
      <Navbar />
      
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </div>
  );
}

export default App;
