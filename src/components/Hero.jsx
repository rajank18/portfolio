import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import VariableProximity from "./ui/VariableProximity";
import mainVideo from "../assets/71122-537102350_small.mp4";

gsap.registerPlugin(ScrollTrigger);

const roles = [
  "Full Stack Developer*",
  "Flutter App Developer*",
  "UI Designer*",
];

const Hero = () => {
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const mediaRef = useRef(null);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (mediaRef.current) {
        gsap.from(mediaRef.current, {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
        });
      }

      gsap.from(nameRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        opacity: 0.3,
        y: -100,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="flex items-center justify-center px-0 pt-36 pb-8 md:pt-42 md:pb-10"
    >
      <div className="w-full max-w-[720px] mx-auto text-center">
        {/* Auto loop media section */}
        {/* <div
          ref={mediaRef}
          className="-mx-6 w-[calc(100%+3rem)] sm:mx-0 sm:w-full h-[190px] overflow-hidden bg-white dark:border-white/10 dark:bg-black md:h-[180px] mb-6"
        >
          <video
            src={mainVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-label="Animated hero background"
            className="block h-full w-full object-cover"
          />
        </div> */}

        <p className="mb-2 inline-block whitespace-nowrap text-xl font-light text-gray-600 dark:text-gray-400 md:mr-160">
          Hey, I'm
        </p>

        <h1
          ref={nameRef}
          className="text-6xl md:text-8xl font-bold mb-4 tracking-tight text-black dark:text-white"
        >
          Rajan Kanzariya
        </h1>

        <div ref={titleRef}>
          <p className="text-xl text-gray-600 dark:text-gray-400 font-light md:ml-110 mb-4">
            I Build Cool   Projects   for Fun
          </p>

          <div className="h-10 overflow-hidden text-lg md:text-xl text-gray-700 dark:text-gray-300">
            <AnimatePresence mode="wait">
              <motion.div
                key={roles[index]}
                initial={{
                  opacity: 0,
                  filter: "blur(10px)",
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  filter: "blur(0px)",
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  filter: "blur(10px)",
                  y: -20,
                }}
                transition={{
                  duration: 0.6,
                }}
              >
                {roles[index]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;