import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import desktopIcon from '../assets/desktop-svgrepo-com.svg';
import boxPackedIcon from '../assets/box-packed-svgrepo-com.svg';
import boxUnpackedIcon from '../assets/box-unpacked-svgrepo-com.svg';
import mobileIcon from '../assets/mobile-svgrepo-com.svg';
import neon from '../assets/neon.jpeg';
import rightArrowIcon from '../assets/right-arrow-next-svgrepo-com.svg';

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('web');
  const [isSwitchingCategory, setIsSwitchingCategory] = useState(false);
  const switchTimerRef = useRef(null);

  const categories = [
    { id: 'web', label: 'Web', icon: desktopIcon },
    { id: 'mobile', label: 'Mobile', icon: mobileIcon },
    { id: 'packages', label: 'Packages', icon: boxPackedIcon, activeIcon: boxUnpackedIcon },
  ];

//   StudioX is an AI-powered video editing platform for creators, with tools like AI subtitles, video summaries, reel cutter, compression, and enhancement in one place.
// Built with React, Node.js, and Prisma, it combines fast processing with a clean workflow for everyday content production.

  const projects = [
    {
      title: 'StudioX',
      category: 'web',
      description: 'A Free AI-powered video editing platform for creators, with tools like AI subtitles, video summaries, reel cutter, compression, and enhancement any many more features in one place.',
      tech: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Neon', icon: neon },
        { name: 'Redis', icon: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://redis.com&size=32' },
        { name: 'Hugging Face', icon: 'https://huggingface.co/favicon.ico' }
      ],
      status: 'Live Demo',
      githubUrl: 'https://gitb.com/rajank18/StudioX',
      liveUrl: 'https://thestudiox.vercel.app/'
    },
    {
      title: 'ApplyASAP',
      category: 'web',
      description: `ApplyASAP creates tailored job answers fast.
Upload resume, company name and JD, generate instantly.`,
      tech: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Cloudflare', icon: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://cloudflare.com&size=32' },
        { name: 'OpenRouter', icon: 'https://openrouter.ai/favicon.ico' }
      ],
      status: 'Developed',
      githubUrl: 'https://github.com/rajank18/ApplyASAP/',
      liveUrl: 'https://applyasap.vercel.app/'
    },
    {
      title: 'EasyCV - Resume Builder',
      category: 'mobile',
      description: `A Flutter Resume Builder App with ATS-optimized templates, a rule-based scoring engine, and polished UI with PDF export support.`,
      tech: [
        { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
        { name: 'SQLite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg' },
        { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
        
      ],
      status: 'Developed',
      githubUrl: 'https://github.com/rajank18/EasyCV',
    },
    {
      title: 'Hue Did It',
      category: 'web',
      description: `Hue Did It is a fast, addictive color memory game.
Match the target hue before time runs out and see how accurate your eyes really are.`,
      tech: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Framer Motion', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg' },
        { name: 'Vercel', icon: 'https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png' }
      ],
      status: 'Developed',
      githubUrl: 'https://github.com/rajank18/HueDidIt',
      liveUrl: 'https://huedidit.vercel.app/'
    },
    {
      title: 'ScanX Toolkit',
      category: 'web',
      description: 'A multi-tool web app offering image-to-PDF, scan effects, PDF merging, and fast file conversion in one clean interface.',
      tech: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Vercel', icon: 'https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png' },
        { name: 'Render', icon: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://render.com&size=32' }
      ],
      status: 'Live Demo',
      githubUrl: 'https://github.com/rajank18/ScanX',
      liveUrl: 'https://scanx-two.vercel.app/'
    },
    {
      title: 'Commit With AI',
      category: 'packages',
      description: 'A npm package that writes smart git commit messages for you using top LLM, so you can focus on coding.',
      tech: [
        { name: 'NPM', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'OpenRouter', icon: 'https://openrouter.ai/favicon.ico' }
      ],
      status: 'Developed',
      githubUrl: 'https://npmjs.com/package/commit_with_ai',
      
    },
    {
      title: 'Voice CLI',
      category: 'packages',
      description: 'Powerful voice-controlled command line interface with 100+ commands, AI-powered natural language processing, and beautiful terminal UI',
      tech: [
        { name: 'NPM', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        
      ],
      status: 'Developed',
      githubUrl: 'https://npmjs.com/package/voice-cli',
    },
    {
      title: 'Env Safe Guard',
      category: 'packages',
      description: 'A npm package that protect your repository from accidental secret leaks.',
      tech: [
        { name: 'NPM', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        
      ],
      status: 'Developed',
      githubUrl: 'https://www.npmjs.com/package/env-safe-gaurd',

    },
    {
      title: 'ProGrade',
      category: 'web',
      description: 'Full-stack academic evaluation system designed to automate standardized project grading via custom rubrics',
      tech: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Vercel', icon: 'https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png' },
        { name: 'Render', icon: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://render.com&size=32' },
        { name: 'Railway', icon: 'https://railway.app/favicon.ico' }
        
      ],
      status: 'Developed',
      githubUrl: 'https://github.com/rajank18/SGP_S5/tree/rajan',
      liveUrl: 'https://pro-grade.vercel.app/'
    },
    {
      title: 'Expense Tracker App',
      category: 'mobile',
      description: 'Smart expense tracking mobile app with real-time insights, bill splitting, budgeting tools, and AI-powered spending suggestions',
      tech: [
        { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
        { name: 'SQLite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg' },
        { name: 'Supabase', icon: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://supabase.com&size=32' },
        { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
        
      ],
      status: 'Developed',
      githubUrl: 'https://github.com/rajank18/SGP_S4/tree/master',
   
    },
    {
      title: 'DevScout',
      category: 'web',
      description: 'A sleek search tool for exploring open-source GitHub repos, with filters for languages, frameworks, tools, libraries, and even Y-Combinator projects.',
      tech: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Aceternity', icon: 'https://aceternity.com/favicon.ico' }
      ],
      status: 'Developed',
      githubUrl: 'https://github.com/rajank18/DevScout',
      liveUrl: 'https://dev-scout-hazel.vercel.app/'
    },
    {
      title: 'LOL VibeCoder',
      category: 'web',
      description: 'Full-stack web app that analyzes GitHub repositories to detect if code is "vibe-coded" or not',
      tech: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'Gemini', icon: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://gemini.google.com&size=64' }
      ],
      status: 'Developed',
      githubUrl: 'https://github.com/rajank18/LOL-VibeCoder/tree/master',
      liveUrl: ''
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

  const filteredProjects = projects.filter((project) => project.category === activeCategory);
  const isPackageOpened = activeCategory === 'packages';
  const webTryNowTitles = new Set([
    'StudioX',
    'ScanX Toolkit',
    'Hue Did It',
    'DevScout',
    'LOL VibeCoder',
    'ApplyASAP',
  ]);
  const getViewDetailsUrl = (project) => project.githubUrl || '';
  const getTryNowUrl = (project) => project.liveUrl || '';

  const handleCategoryChange = (categoryId) => {
    if (categoryId === activeCategory) return;

    if (categoryId === 'mobile' && typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([120, 80, 120, 80, 120, 80, 120, 80, 120]);
    }

    setIsSwitchingCategory(true);

    if (switchTimerRef.current) {
      window.clearTimeout(switchTimerRef.current);
    }

    switchTimerRef.current = window.setTimeout(() => {
      setActiveCategory(categoryId);
      setIsSwitchingCategory(false);
      switchTimerRef.current = null;
    }, 140);
  };

  useEffect(() => {
    return () => {
      if (switchTimerRef.current) {
        window.clearTimeout(switchTimerRef.current);
      }
    };
  }, []);

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-5xl md:text-6xl font-bold mb-10 text-center text-black dark:text-white">Projects</h2>

        <div className="mb-12 flex justify-center px-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/15 dark:border-white/15 bg-white/85 dark:bg-black/55 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-md">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              const iconSrc = category.id === 'packages' && isPackageOpened ? category.activeIcon : category.icon;

              return (
                <motion.button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategoryChange(category.id)}
                  aria-label={category.label}
                  title={category.label}
                  whileTap={{ scale: 0.94 }}
                  whileHover={{ y: -1 }}
                  className="relative h-10 w-16 md:h-10 md:w-16 rounded-full overflow-hidden grid place-items-center shrink-0"
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeProjectCategory"
                      className="absolute inset-0 rounded-full bg-black dark:bg-white"
                      transition={{
                        type: 'spring',
                        stiffness: 360,
                        damping: 32,
                        mass: 0.65,
                      }}
                    />
                  )}
                  <motion.img
                    src={iconSrc}
                    alt=""
                    aria-hidden="true"
                    animate={{ opacity: 1, scale: isActive ? 0.97 : 0.82 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`relative z-10 h-6 w-6 md:h-7 md:w-7 object-contain transition-all duration-300 ${isActive ? 'brightness-0 invert dark:invert-0 dark:brightness-0' : 'opacity-75 dark:invert'}`}
                  />
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isSwitchingCategory ? 'opacity-0 translate-y-2 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
          {filteredProjects.map((project) => (
            <div
              key={project.title}
              className="group relative bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 p-8 pb-36 rounded-3xl hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Content */}
                <div className="z-10">
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
                  <div className="flex flex-wrap gap-4">
                    {project.tech.map((tech, techIdx) => (
                      <div 
                        key={techIdx}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-50/90 dark:bg-gray-700 border border-gray-200/80 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium"
                      >
                        <img src={tech.icon} alt={tech.name} className="w-5 h-5 object-contain" />
                        <span>{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-8 left-8 right-8 z-20">
                  {/* View Details Link */}
                  {getViewDetailsUrl(project) ? (
                    <a 
                      href={getViewDetailsUrl(project)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm font-medium text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      <span>View Details</span>
                      <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  ) : (
                    <span className="flex items-center text-sm font-medium text-gray-300 dark:text-gray-600">
                      <span>View Details</span>
                      <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  )}

                  <div className={`mt-8 ${project.category === 'web' ? 'min-h-11 flex justify-end' : ''}`}>
                    {project.category === 'web' && webTryNowTitles.has(project.title) && getTryNowUrl(project) && (
                      <a
                        href={getTryNowUrl(project)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-none border-2 border-black text-black bg-transparent px-4 py-2 text-sm font-semibold transition-all duration-300 hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
                      >
                        <span>Try Now</span>
                        <img
                          src={rightArrowIcon}
                          alt=""
                          aria-hidden="true"
                          className="h-4 w-4 object-contain dark:invert translate-y-0.5"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
