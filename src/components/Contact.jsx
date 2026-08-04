import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const socials = [
    { name: 'GitHub', url: 'https://github.com/rajank18', icon: '→' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/rajan-kanzariya/', icon: '→' },
    { name: 'Twitter', url: 'https://twitter.com/KanzariyaRajan', icon: '→' },
    { name: 'Email', url: 'mailto:rajankanzariya1806@gmail.com', icon: '→' },
  ];

  useEffect(() => {
    if (!contentRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(contentRef.current.children, { opacity: 1, y: 0 });

      gsap.from(contentRef.current.children, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="flex items-center justify-center px-0 py-8 md:py-12">
      <div className="w-full max-w-[720px] mx-auto text-center">
        <div ref={contentRef}>
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-black dark:text-white">Let's Connect</h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
            Have a project in mind? Let's build something amazing together.
          </p>
          
          <div className="space-y-4 mb-6">
            {socials.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full max-w-md mx-auto px-8 py-4 border-2 border-black dark:border-white rounded-full hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 text-lg font-medium group text-black dark:text-white"
              >
                <span className="flex items-center justify-between">
                  {social.name}
                  <span className="transform group-hover:translate-x-2 transition-transform">
                    {social.icon}
                  </span>
                </span>
              </a>
            ))}
          </div>

          <p className="text-gray-500 dark:text-gray-400 text-sm pt-2">
            Developed by ‎Rajan♡ ˎˊ˗
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
