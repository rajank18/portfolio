import { useState, useEffect, useRef } from 'react';
import { GitHubContributionGraph } from 'github-contrib-graph/react';
import 'github-contrib-graph/styles.css';

const lightTheme = {
  bgColor: 'transparent',
  textColor: '#6b7280',
  inactiveTextColor: '#6b7280',
  cellLevel0: '#e9e9e9ff',  //none
  cellLevel1: '#b6b6b6ff',  //lowest
  cellLevel2: '#989898ff',  //low cont
  cellLevel3: '#4e4e4eff',  //mid cont
  cellLevel4: '#2c2c2cff',  //high cont
  cellOutlineColor: 'transparent',
  borderColor: 'transparent',
  cellSize: '8.5px',
  cellGap: '2.5px',
  cellRadius: '2px',
};

const darkTheme = {
  bgColor: 'transparent',
  textColor: '#9ca3af',
  inactiveTextColor: '#9ca3af',
  cellLevel0: '#2c2c2cff',  //none
  cellLevel1: '#4e4e4eff',  //lowest
  cellLevel2: '#989898ff',  //low cont
  cellLevel3: '#b6b6b6ff',  //mid cont
  cellLevel4: '#e9e9e9ff',  //high cont
  cellOutlineColor: 'transparent',
  borderColor: 'transparent',
  cellSize: '8.5px',
  cellGap: '2.5px',
  cellRadius: '2px',
};

const GitHubWidget = () => {
  const [isDark, setIsDark] = useState(false);
  const containerRef = useRef(null);
  const username = 'rajank18';

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let timeoutId;
    const handleTouch = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (document.activeElement && container.contains(document.activeElement)) {
          document.activeElement.blur();
        }
      }, 2500);
    };

    container.addEventListener('touchend', handleTouch, { passive: true });
    container.addEventListener('click', handleTouch, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      container.removeEventListener('touchend', handleTouch);
      container.removeEventListener('click', handleTouch);
    };
  }, []);

  return (
    <section className="w-full max-w-[720px] mx-auto py-4 md:py-6 mt-4 md:mt-6">
      <style>{`
        .ghCalendarHeader a {
          color: inherit !important;
        }
        .ghCalendarHeader a:hover {
          opacity: 0.8;
        }
        .ghCalendarDayCell .ghCalendarTooltip {
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.25s ease, visibility 0.25s ease;
          pointer-events: none !important;
        }
        .ghCalendarDayCell:hover .ghCalendarTooltip,
        .ghCalendarDayCell:active .ghCalendarTooltip,
        .ghCalendarDayCell:focus .ghCalendarTooltip {
          animation: ghTooltipAutoFade 2.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes ghTooltipAutoFade {
          0% {
            opacity: 0;
            visibility: hidden;
            transform: translate(-50%, -120%) scale(0.95);
          }
          10% {
            opacity: 1;
            visibility: visible;
            transform: translate(-50%, -130%) scale(1);
          }
          75% {
            opacity: 1;
            visibility: visible;
            transform: translate(-50%, -130%) scale(1);
          }
          100% {
            opacity: 0;
            visibility: hidden;
            transform: translate(-50%, -130%) scale(0.98);
          }
        }
        @media (max-width: 767px) {
          .ghCalendarHeader,
          .ghCalendarHeader span,
          .ghCalendarHeader a,
          .ghCalendarCardFooter,
          .ghCalendarCardFooter span {
            font-size: 11px !important;
          }
          .ghCalendarLabel {
            font-size: 10px !important;
          }
          .ghCalendarHeader img,
          .ghCalendarHeader svg {
            width: 16px !important;
            height: 16px !important;
          }
        }
      `}</style>
      <div
        ref={containerRef}
        className="w-auto overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-none"
      >
        <div className="min-w-[620px] md:min-w-0 w-max md:w-full flex justify-start md:justify-center bg-transparent transition-all duration-300 [&_.ghCalendarCard]:!bg-transparent [&_.ghCalendarCard]:!border-none [&_.ghCalendarCard]:!shadow-none [&_.ghCalendarCard]:!p-0 [&_.ghCalendarCardFooter]:!p-0 [&_.ghContributionGraph]:!bg-transparent [&_.ghCalendarCanvas]:!m-0 [&_.ghCalendarCanvas]:!p-0">
          <GitHubContributionGraph
            username={username}
            theme={isDark ? darkTheme : lightTheme}
            showHeader={true}
            showFooter={true}
            showThumbnail={false}
          />
        </div>
      </div>
    </section>
  );
};

export default GitHubWidget;
