import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if device is mobile/touch device
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    
    // Check for dark mode
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkMobile();
    checkDarkMode();
    
    window.addEventListener('resize', checkMobile);
    
    // Watch for dark mode changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const isInsideIframeArea = (x, y) => {
      const iframes = document.querySelectorAll('[data-interactive-window="true"], iframe');
      for (const win of iframes) {
        const rect = win.getBoundingClientRect();
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
          return true;
        }
      }
      return false;
    };

    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      if (isInsideIframeArea(e.clientX, e.clientY)) {
        setIsVisible(false);
        return;
      }
      setIsVisible(true);

      const target = e.target;
      if (!target) return;
      const isLink = target.tagName === 'A' || (target.closest && target.closest('a'));
      const isButton = target.tagName === 'BUTTON' || (target.closest && target.closest('button'));
      const isHeading = Boolean(
        target.tagName === 'H1' ||
        target.tagName === 'H2' ||
        target.tagName === 'H3' ||
        target.tagName === 'H4' ||
        (target.closest && target.closest('h1, h2, h3, h4, [data-cursor-expand]'))
      );
      const hasPointerCursor = window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(Boolean(isLink || isButton || isHeading || hasPointerCursor));
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('blur', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('blur', handleMouseLeave);
      window.removeEventListener('resize', checkMobile);
      observer.disconnect();
    };
  }, []);

  // Don't render cursor on mobile devices
  if (isMobile) return null;

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 99999,
        mixBlendMode: 'exclusion',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.15s ease',
      }}
    >
      <div
        className={`rounded-full transition-all duration-200 ${isPointer ? 'w-12 h-12' : 'w-6 h-6'}`}
        style={{ background: 'white' }}
      />

      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        <div className={`w-1 h-1 rounded-full`} style={{ background: 'white' }} />
      </div>
    </div>
  );
};

export default CustomCursor;
