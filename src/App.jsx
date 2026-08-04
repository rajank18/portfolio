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
import SpotifyWidget from './components/SpotifyWidget';
import GitHubWidget from './components/GitHubWidget';


gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Force light mode on initial load
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <div className="relative min-h-screen">
      <NekoCat />
      
    
      <CustomCursor />
      <Navbar />
      
      <div className="relative z-10 mx-auto w-full max-w-[720px] px-6">
        <Hero />
        <About />
        
        {/* Spotify Widget Section */}
        <section className="mx-auto w-full max-w-[720px] pb-6">
          <SpotifyWidget />
        </section>

        {/* <section className="mx-auto w-full max-w-[720px] pb-16">
          <GitHubWidget />
        </section>
         */}
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </div>
  );
}

export default App;
