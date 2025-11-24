import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const projectsRef = useRef(null);

  const projects = [
    {
      title: 'ScanX Toolkit',
      description: 'A multi-tool web app offering image-to-PDF, scan effects, PDF merging, and fast file conversion in one clean interface.',
      tech: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Vercel', icon: 'https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png' },
        { name: 'Render', icon: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://render.com&size=32' }
      ],
      status: 'Live Demo',
      url: 'https://scanx-two.vercel.app/'
    },
    {
      title: 'Commit With AI',
      description: 'A npm package that writes smart git commit messages for you using top LLM, so you can focus on coding.',
      tech: [
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Vercel', icon: 'https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png' },
        { name: 'OpenRouter', icon: 'https://openrouter.ai/favicon.ico' }
      ],
      status: 'Developed',
      url: 'https://www.npmjs.com/package/commit_with_ai'
    },
    {
      title: 'ProGrade',
      description: 'Full-stack academic evaluation system designed to automate standardized project grading via custom rubrics',
      tech: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Vercel', icon: 'https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png' },
        { name: 'Render', icon: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://render.com&size=32' },
        { name: 'Railway', icon: 'https://railway.app/favicon.ico' }
        
      ],
      status: 'In Production',
      url: 'https://github.com/rajank18/SGP_S5/tree/rajan'
    },
    {
      title: 'Expense Tracker App',
      description: 'Smart expense tracking mobile app with real-time insights, bill splitting, budgeting tools, and AI-powered spending suggestions',
      tech: [
        { name: 'Dart', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
        { name: 'SQLite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg' },
        { name: 'Supabase', icon: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://supabase.com&size=32' },
        { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
        { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
        
      ],
      status: 'Developed',
      url: 'https://github.com/rajank18/SGP_S4/tree/master'
    },
    {
      title: 'DevScout',
      description: 'A sleek search tool for exploring open-source GitHub repos, with filters for languages, frameworks, tools, libraries, and even Y-Combinator projects.',
      tech: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Aceternity', icon: 'https://aceternity.com/favicon.ico' }
      ],
      status: 'Developed',
      url: 'https://dev-scout-hazel.vercel.app/'
    },
    {
      title: 'LOL VibeCoder',
      description: 'Full-stack web app that analyzes GitHub repositories to detect if code is "vibe-coded" or not',
      tech: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'Gemini', icon: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://gemini.google.com&size=64' }
      ],
      status: 'Developed',
      url: 'https://github.com/rajank18/LOL-VibeCoder/tree/master'
    },
    
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'in production':
        return 'bg-orange-500';
      case 'live demo':
        return 'bg-yellow-500';
      default:
        return 'bg-green-500';
    }
  };

  useEffect(() => {
    if (!projectsRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = projectsRef.current.children;
      if (cards.length === 0) return;

      gsap.set(cards, { opacity: 1, scale: 1, y: 0 });

      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        scale: 0.8,
        y: 100,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out(1.4)',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center text-black dark:text-white">Projects</h2>
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div 
              key={idx}
              className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {project.description}
                </p>

                {/* Status badge */}
                <div className="flex items-center gap-2 mb-6">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`}></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{project.status}</span>
                </div>

                {/* Technologies with logos */}
                <div className="mb-6">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium">Technologies</p>
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech, techIdx) => (
                      <div 
                        key={techIdx}
                        className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium"
                      >
                        <img src={tech.icon} alt={tech.name} className="w-5 h-5 object-contain" />
                        <span>{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* View Details Link */}
                <a 
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm font-medium text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <span>View Details</span>
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
