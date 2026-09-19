import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  const experiences = [
    {
      year: 'Aug 2026 – Present',
      title: 'Frontend Engineering Intern',
      company: 'PARQIS',
      link: 'https://parqis.com',
      description: (
        <>
          Developing the{' '}
          <a
            href="https://parqis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline text-black dark:text-white hover:opacity-80 transition-opacity"
          >
            PARQIS
          </a>{' '}
          E-Commerce platform using Next.js, React, and Tailwind CSS. Built 15+ responsive pages, 30+ reusable UI components, and integrated profile APIs for optimized state management.
        </>
      ),
    },
    {
      year: 'May 2025 - June 2025',
      title: 'Web Developement Intern',
      company: 'Param Counsulting Service, India',
      description: 'Delivered 12+ responsive React pages in under 2 months using React, Tailwind, and GSAP for animations. Contributed to client-focused UI layouts with cross-browser compatibility.',
    },
  ];

  useEffect(() => {
    if (!timelineRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Ensure initial visible state fallback
      gsap.set(timelineRef.current.children, { opacity: 1, x: 0 });

      gsap.from(timelineRef.current.children, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
        opacity: 0,
        x: -50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="flex items-center justify-center px-0 py-8 md:py-12">
      <div className="w-full max-w-[720px] mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 text-center text-black dark:text-white">Experience</h2>
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
