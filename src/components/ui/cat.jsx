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


import { useEffect } from 'react';
import { Oneko } from 'lots-o-nekos';

const NekoCat = () => {
  useEffect(() => {
    let catInstance = null;
    
    try {
      // Initialize the cat - it starts automatically when instantiated
      catInstance = new Oneko({
        nekoSize: 32,
        nekoSpeed: 10,
      });
      
      // Track mouse movement and update cat's target
      const handleMouseMove = (event) => {
        if (catInstance) {
          catInstance.setTarget(event.clientX, event.clientY);
        }
      };
      
      // Track touch movement for mobile devices
      const handleTouchMove = (event) => {
        if (catInstance && event.touches.length > 0) {
          const touch = event.touches[0];
          catInstance.setTarget(touch.clientX, touch.clientY);
        }
      };
      
      // Track touch start for mobile devices (when user taps)
      const handleTouchStart = (event) => {
        if (catInstance && event.touches.length > 0) {
          const touch = event.touches[0];
          catInstance.setTarget(touch.clientX, touch.clientY);
        }
      };
      
      // Add event listeners for both mouse and touch
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove, { passive: true });
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      
      console.log("Neko cat initialized successfully.");
      
      // Cleanup function
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchstart', handleTouchStart);
        if (catInstance && catInstance.isInitialized()) {
          catInstance.loopAnimating = false;
          if (catInstance.element && catInstance.element.parentNode) {
            catInstance.element.parentNode.removeChild(catInstance.element);
          }
        }
        console.log("Neko cat destroyed.");
      };
    } catch (error) {
      console.error("Error starting Neko cat:", error);
    }
  }, []); // Run only once on mount

  return null; 
};

export default NekoCat;
