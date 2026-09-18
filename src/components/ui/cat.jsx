// import { useEffect } from 'react';
// import { Oneko } from 'lots-o-nekos';

// const NekoCat = () => {
//   useEffect(() => {
//     const cat = new Oneko({
//       nekoSize: 32,
//       nekoSpeed: 10,
//     });

//     cat.start();

//     return () => {
//       if (cat && typeof cat.destroy === 'function') {
//         cat.destroy();
//       }
//     };
//   }, []);

//   return null;
// };

// export default NekoCat;


import { useEffect, useState, useRef } from 'react';
import { Oneko } from 'lots-o-nekos';
import catMeowAudio from '../../assets/cat-meow.mp3';
import catVid from '../../assets/cat-vid.webm';

// Force initialization even if the system/browser has "prefers-reduced-motion" enabled
if (typeof window !== 'undefined' && Oneko) {
  Oneko.canInitialize = () => true;
}

const NekoCat = () => {
  const [currentCat, setCurrentCat] = useState('black');
  const usedCatsRef = useRef(new Set());
  const petCountRef = useRef(0);
  const nextMilestoneRef = useRef(15);
  const resetTimerRef = useRef(null);
  const activeVideoRef = useRef(null);
  const latestMousePosRef = useRef({ x: 0, y: 0 });

  // All available cat types
  const allCats = [
    "black", "ace", "bunny", "calico", "default", "eevee",
    "esmeralda", "fox", "ghost", "gray", "jess", "kina",
    "lucy", "maia", "maria", "mike", "silver", "silversky",
    "snuupy", "spirit", "tora", "valentine"
  ];

  useEffect(() => {
    let catInstance = null;

    try {
      // Initialize with black cat sprite
      catInstance = new Oneko({
        nekoSize: 32,
        nekoSpeed: 10,
        source: "https://raw.githubusercontent.com/raynecloudy/oneko_db/refs/heads/master/black.png",
      });

      // Enable pointer events on the cat so it can be clicked/petted
      if (catInstance && catInstance.element) {
        catInstance.element.style.pointerEvents = 'auto';
        catInstance.element.style.cursor = 'pointer';
        catInstance.element.title = 'click!♥';

        const spawnHeart = (x, y) => {
          const heart = document.createElement('div');
          const heartIcons = ['♡', '⋆⑅˚₊', 'ᰔ', '✦', '🐾', '♥'];
          const randomIcon = heartIcons[Math.floor(Math.random() * heartIcons.length)];
          const randomOffsetX = (Math.random() - 0.5) * 36;
          const randomRotation = (Math.random() - 0.5) * 30;

          heart.innerText = randomIcon;
          heart.style.position = 'fixed';
          heart.style.left = `${x + randomOffsetX}px`;
          heart.style.top = `${y - 12}px`;
          heart.style.fontSize = `${Math.floor(Math.random() * 8) + 16}px`;
          heart.style.zIndex = '2147483647';
          heart.style.pointerEvents = 'none';
          heart.style.userSelect = 'none';
          heart.style.transform = `translate(-50%, -50%) rotate(${randomRotation}deg)`;
          heart.style.transition = 'all 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
          heart.style.opacity = '1';

          document.body.appendChild(heart);

          requestAnimationFrame(() => {
            heart.style.transform = `translate(-50%, -60px) scale(1.3) rotate(${randomRotation * 1.5}deg)`;
            heart.style.opacity = '0';
          });

          setTimeout(() => {
            if (heart.parentNode) {
              heart.parentNode.removeChild(heart);
            }
          }, 1200);
        };

        const playMeowSound = () => {
          try {
            const audio = new Audio(catMeowAudio);
            audio.currentTime = 0;
            audio.volume = 0.75;
            audio.play().catch(() => { });
          } catch (e) {
            // Silently catch audio error if user hasn't interacted
          }
        };

        const playCatVideo = (x, y) => {
          if (activeVideoRef.current) return;

          // Stop loop animation and freeze cat position
          if (catInstance) {
            catInstance.loopAnimating = false;
            catInstance.x = x;
            catInstance.y = y;
            catInstance.targetX = x;
            catInstance.targetY = y;
            if (catInstance.element) {
              catInstance.element.style.display = 'none';
            }
          }

          const video = document.createElement('video');
          video.src = catVid;
          video.autoplay = true;
          video.playsInline = true;
          video.style.position = 'fixed';
          video.style.left = `${x}px`;
          video.style.top = `${y}px`;
          video.style.transform = 'translate(-50%, -50%)';
          video.style.maxWidth = '220px';
          video.style.maxHeight = '220px';
          video.style.width = 'auto';
          video.style.height = 'auto';
          video.style.zIndex = '2147483647';
          video.style.pointerEvents = 'none';
          // video.style.borderRadius = '12px';
          // video.style.boxShadow = '0 8px 30px rgba(0,0,0,0.35)';
          video.style.objectFit = 'contain';

          document.body.appendChild(video);
          activeVideoRef.current = video;

          video.play().catch(() => { });

          const handleVideoEnd = () => {
            if (video.parentNode) {
              video.parentNode.removeChild(video);
            }
            activeVideoRef.current = null;

            // Restore cat exactly at this video position
            if (catInstance) {
              catInstance.x = x;
              catInstance.y = y;
              catInstance.targetX = x;
              catInstance.targetY = y;
              catInstance.idleTime = 0;
              catInstance.idleAnimation = null;
              catInstance.idleAnimationFrame = 0;
              catInstance.draw();

              if (catInstance.element) {
                catInstance.element.style.display = 'block';
              }

              // Restart the animation loop
              catInstance.loopAnimating = true;
              window.requestAnimationFrame(catInstance.onAnimationFrame);

              // Set target to current cursor position so cat runs from video place to cursor
              if (latestMousePosRef.current.x !== 0 || latestMousePosRef.current.y !== 0) {
                catInstance.setTarget(latestMousePosRef.current.x, latestMousePosRef.current.y);
              }
            }
          };

          video.onended = handleVideoEnd;
          video.onerror = handleVideoEnd;
        };

        const handlePet = (e) => {
          e.stopPropagation();
          if (activeVideoRef.current) return;

          const rect = catInstance.element.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          // Increment pet counter
          petCountRef.current += 1;

          // Reset continuous tap counter if user stops for > 3.5 seconds
          if (resetTimerRef.current) {
            clearTimeout(resetTimerRef.current);
          }
          resetTimerRef.current = setTimeout(() => {
            petCountRef.current = 0;
            nextMilestoneRef.current = 15;
          }, 3500);

          // Check if continuous taps reached milestone (>15, then >30, etc.)
          if (petCountRef.current >= nextMilestoneRef.current) {
            nextMilestoneRef.current += 15; // Next trigger at +15 (e.g. 30)
            playCatVideo(centerX, centerY);
            return;
          }

          // Play cute meow / purr audio
          playMeowSound();

          // Spawn 2-3 love hearts
          spawnHeart(centerX, centerY);
          setTimeout(() => spawnHeart(centerX, centerY), 120);

          // Trigger happy scratch/pet animation
          catInstance.idleAnimation = 'scratchSelf';
          catInstance.idleAnimationFrame = 0;
          catInstance.idleTime = 11;
        };

        catInstance.element.addEventListener('click', handlePet);
        catInstance.element.addEventListener('touchstart', handlePet, { passive: false });
      }

      const isInsideInteractiveWindow = (x, y) => {
        const interactiveWindows = document.querySelectorAll('[data-interactive-window="true"], iframe');
        for (const win of interactiveWindows) {
          const rect = win.getBoundingClientRect();
          if (
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom
          ) {
            return true;
          }
        }
        return false;
      };

      const clampOutsideInteractiveWindow = () => {
        if (!catInstance) return;
        const interactiveWindows = document.querySelectorAll('[data-interactive-window="true"], iframe');
        for (const win of interactiveWindows) {
          const rect = win.getBoundingClientRect();
          if (
            catInstance.x >= rect.left - 16 &&
            catInstance.x <= rect.right + 16 &&
            catInstance.y >= rect.top - 16 &&
            catInstance.y <= rect.bottom + 16
          ) {
            // Position cat above the interactive iframe window
            catInstance.y = Math.max(16, rect.top - 20);
            catInstance.targetY = catInstance.y;
            catInstance.draw();
          }
        }
      };

      // Track mouse movement and update cat's target
      const handleMouseMove = (event) => {
        latestMousePosRef.current = { x: event.clientX, y: event.clientY };
        if (catInstance && !activeVideoRef.current) {
          if (isInsideInteractiveWindow(event.clientX, event.clientY)) {
            // Freeze cat at current spot and ensure it sits outside the iframe window
            catInstance.targetX = catInstance.x;
            catInstance.targetY = catInstance.y;
            clampOutsideInteractiveWindow();
            if (catInstance.idleAnimation !== 'sleeping') {
              catInstance.idleTime = 12;
              catInstance.idleAnimation = 'sleeping';
              catInstance.idleAnimationFrame = 0;
            }
          } else {
            // Normal area - wake up and follow cursor
            if (catInstance.idleAnimation === 'sleeping') {
              catInstance.idleAnimation = null;
              catInstance.idleTime = 0;
            }
            catInstance.setTarget(event.clientX, event.clientY);
          }
        }
      };

      // Track touch movement for mobile devices
      const handleTouchMove = (event) => {
        if (event.touches.length > 0) {
          const touch = event.touches[0];
          latestMousePosRef.current = { x: touch.clientX, y: touch.clientY };
          if (catInstance && !activeVideoRef.current) {
            if (isInsideInteractiveWindow(touch.clientX, touch.clientY)) {
              catInstance.targetX = catInstance.x;
              catInstance.targetY = catInstance.y;
              clampOutsideInteractiveWindow();
              if (catInstance.idleAnimation !== 'sleeping') {
                catInstance.idleTime = 12;
                catInstance.idleAnimation = 'sleeping';
                catInstance.idleAnimationFrame = 0;
              }
            } else {
              if (catInstance.idleAnimation === 'sleeping') {
                catInstance.idleAnimation = null;
                catInstance.idleTime = 0;
              }
              catInstance.setTarget(touch.clientX, touch.clientY);
            }
          }
        }
      };

      // Track touch start for mobile devices (when user taps)
      const handleTouchStart = (event) => {
        if (event.touches.length > 0) {
          const touch = event.touches[0];
          latestMousePosRef.current = { x: touch.clientX, y: touch.clientY };
          if (catInstance && !activeVideoRef.current) {
            if (isInsideInteractiveWindow(touch.clientX, touch.clientY)) {
              catInstance.targetX = catInstance.x;
              catInstance.targetY = catInstance.y;
              clampOutsideInteractiveWindow();
              if (catInstance.idleAnimation !== 'sleeping') {
                catInstance.idleTime = 12;
                catInstance.idleAnimation = 'sleeping';
                catInstance.idleAnimationFrame = 0;
              }
            } else {
              if (catInstance.idleAnimation === 'sleeping') {
                catInstance.idleAnimation = null;
                catInstance.idleTime = 0;
              }
              catInstance.setTarget(touch.clientX, touch.clientY);
            }
          }
        }
      };

      const handlePointerOver = (e) => {
        if (e.target && e.target.closest && e.target.closest('[data-interactive-window="true"]')) {
          if (catInstance && !activeVideoRef.current) {
            catInstance.targetX = catInstance.x;
            catInstance.targetY = catInstance.y;
            clampOutsideInteractiveWindow();
            catInstance.idleTime = 12;
            catInstance.idleAnimation = 'sleeping';
            catInstance.idleAnimationFrame = 0;
          }
        }
      };

      // Add event listeners for mouse, touch and pointer movements
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove, { passive: true });
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('pointerover', handlePointerOver, { passive: true });

      // Cleanup function
      return () => {
        if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
        if (activeVideoRef.current && activeVideoRef.current.parentNode) {
          activeVideoRef.current.parentNode.removeChild(activeVideoRef.current);
          activeVideoRef.current = null;
        }
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('pointerover', handlePointerOver);
        if (catInstance && catInstance.isInitialized()) {
          catInstance.loopAnimating = false;
          if (catInstance.element && catInstance.element.parentNode) {
            catInstance.element.parentNode.removeChild(catInstance.element);
          }
        }
      };
    } catch (error) {
      console.error("Error starting Neko cat:", error);
    }
  }, [currentCat]); // Re-run when cat changes

  return null;
};

export default NekoCat;
