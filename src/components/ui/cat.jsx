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

// Force initialization even if the system/browser has "prefers-reduced-motion" enabled
if (typeof window !== 'undefined' && Oneko) {
  Oneko.canInitialize = () => true;
}

const NekoCat = () => {
  const [currentCat, setCurrentCat] = useState('default');
  const usedCatsRef = useRef(new Set());

  // All available cat types
  const allCats = [
    "ace", "black", "bunny", "calico", "default", "eevee",
    "esmeralda", "fox", "ghost", "gray", "jess", "kina",
    "lucy", "maia", "maria", "mike", "silver", "silversky",
    "snuupy", "spirit", "tora", "valentine"
  ];

  // Get random cat that hasn't been used yet
  const getNextCat = () => {
    // If all cats have been used, reset the list
    if (usedCatsRef.current.size >= allCats.length) {
      usedCatsRef.current.clear();
      console.log("All cats used, restarting cycle!");
    }

    // Get available cats (not yet used)
    const availableCats = allCats.filter(cat => !usedCatsRef.current.has(cat));

    // Pick a random cat from available ones
    const randomIndex = Math.floor(Math.random() * availableCats.length);
    const selectedCat = availableCats[randomIndex];

    // Mark this cat as used
    usedCatsRef.current.add(selectedCat);

    console.log(`Selected cat: ${selectedCat}, Used: ${usedCatsRef.current.size}/${allCats.length}`);
    return selectedCat;
  };

  // Get Indian Standard Time
  const getIndianTime = () => {
    return new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  };

  // Calculate milliseconds until next 6 AM IST
  const getTimeUntilNext6AM = () => {
    const now = new Date();
    const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

    // Set next 6 AM
    const next6AM = new Date(istTime);
    next6AM.setHours(6, 0, 0, 0);

    // If it's already past 6 AM today, set for tomorrow
    if (istTime >= next6AM) {
      next6AM.setDate(next6AM.getDate() + 1);
    }

    return next6AM - istTime;
  };

  // Initialize cat based on current day
  useEffect(() => {
    // Get cat for today based on day of year
    const now = new Date();
    const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const dayOfYear = Math.floor((istTime - new Date(istTime.getFullYear(), 0, 0)) / 86400000);

    // Calculate which cat should be shown today
    const cyclePosition = dayOfYear % allCats.length;
    const todaysCat = allCats[cyclePosition];

    setCurrentCat(todaysCat);
    console.log(`Today's cat (Day ${dayOfYear}): ${todaysCat} at IST: ${getIndianTime()}`);
  }, []);

  useEffect(() => {
    let catInstance = null;
    let rotationTimeout = null;

    try {
      // Initialize with local oneko.gif sprite from public folder
      catInstance = new Oneko({
        nekoSize: 32,
        nekoSpeed: 10,
        source: "/oneko.gif",
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

      // Add event listener for mouse movement only
      document.addEventListener('mousemove', handleMouseMove);

      // Schedule next cat change at 6 AM IST
      const timeUntil6AM = getTimeUntilNext6AM();


      rotationTimeout = setTimeout(() => {
        const nextCat = getNextCat();
        setCurrentCat(nextCat);

      }, timeUntil6AM);

      // Cleanup function
      return () => {
        clearTimeout(rotationTimeout);
        document.removeEventListener('mousemove', handleMouseMove);
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
