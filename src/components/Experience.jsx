import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  const experiences = [
    {
      year: 'May 2025 - June 2025',
      title: 'Web Developement Intern',
      company: 'Param Counsulting Service, India',
      description: 'Developed Web applications using modern frameworks and technologies for one of their major clients.',
    },
    {
      year: 'Feb 2025',
      title: 'App Development Intern',
      company: 'Technohacks',
      description: 'Got hands-on experience in app development using Flutter and Dart',
    },
   
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(timelineRef.current.children, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        x: -100,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="min-h-screen flex items-center justify-center px-0 py-24 md:py-28">
      <div className="w-full max-w-[720px] mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-14 text-center text-black dark:text-white">Experience</h2>
        <div ref={timelineRef} className="space-y-10">
          {experiences.map((exp, idx) => (
            <div 
              key={idx}
              className="relative pl-8 pr-2 border-l-2 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors duration-300"
            >
              <div className="absolute -left-2 top-0 w-4 h-4 bg-black dark:bg-white rounded-full"></div>
              <div className="mb-2">
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">{exp.year}</span>
              </div>
              <h3 className="text-2xl font-bold mb-1 text-black dark:text-white">{exp.title}</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">{exp.company}</p>
              <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
