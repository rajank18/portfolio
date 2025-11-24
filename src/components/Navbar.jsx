import { useState, useEffect, useRef } from 'react';
import profileImg from '../assets/img.jpg';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const buttonRef = useRef(null);

  const navItems = [
    { name: 'About Me', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Work', href: '#experience' },
    { name: 'Connect', href: '#contact' }
  ];

  useEffect(() => {
    // Force light mode on mount - clear any stored preferences
    localStorage.removeItem('theme');
    document.documentElement.classList.remove('dark');
    setIsDark(false);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = (e) => {
    if (isAnimating) return;
    
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Calculate the distance to the farthest corner
    const maxDistance = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Create expanding circle element
    const circle = document.createElement('div');
    circle.style.position = 'fixed';
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.width = '0';
    circle.style.height = '0';
    circle.style.borderRadius = '50%';
    circle.style.transform = 'translate(-50%, -50%)';
    // If currently dark, use white circle to transition to light
    // If currently light, use black circle to transition to dark
    circle.style.backgroundColor = isDark ? '#ffffff' : '#111827';
    circle.style.zIndex = '9999';
    circle.style.pointerEvents = 'none';
    circle.style.transition = 'all 0.8s ease-out';
    
    document.body.appendChild(circle);
    
    setIsAnimating(true);

    // Trigger animation
    requestAnimationFrame(() => {
      const size = maxDistance * 2.5;
      circle.style.width = `${size}px`;
      circle.style.height = `${size}px`;
    });

    // Toggle theme when circle fully covers screen
    setTimeout(() => {
      const newTheme = !isDark;
      setIsDark(newTheme);
      if (newTheme) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      // Immediately start fading out the circle
      circle.style.opacity = '0';
    }, 600);

    // Remove circle after fade out
    setTimeout(() => {
      circle.remove();
      setIsAnimating(false);
    }, 1400);
  };

  return (
    <>
      {/* Fade overlay at top */}
      <div className="fixed top-0 left-0 right-0 h-32 bg-linear-to-b from-white dark:from-gray-900 via-white/80 dark:via-gray-900/80 to-transparent z-40 pointer-events-none"></div>
      
      {/* Profile Image - Left Side */}
      <div 
        onClick={scrollToTop}
        className="fixed top-8 cursor-pointer left-8 z-50 hidden md:block hover:opacity-80 transition-opacity"
      >
        <img 
          src={profileImg} 
          alt="Profile" 
          className="w-12 h-12 border-2 border-gray-300 dark:border-gray-200 object-cover"
        />
      </div>
      
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0 z-50 flex items-center gap-4 md:gap-8  bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm  px-6 py-3 rounded-full md:rounded-none md:bg-transparent md:dark:bg-transparent md:backdrop-blur-none shadow-sm md:shadow-none">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={(e) => scrollToSection(e, item.href)}
            className="relative text-md md:text-md font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors group cursor-pointer whitespace-nowrap"
          >
            {item.name}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
        
        {/* Theme Toggle Button */}
        <button
          ref={buttonRef}
          onClick={toggleTheme}
          className="ml-2 p-2  border-2 border-gray-300 dark:border-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          aria-label="Toggle theme"
        >
          {isDark ? (
            // Sun icon
            <svg
              className="w-5 h-5 text-gray-900 dark:text-gray-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            // Moon icon
            <svg
              className="w-5 h-5 text-gray-900 dark:text-gray-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>
      </nav>
    </>
  );
};

export default Navbar;
