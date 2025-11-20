import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Typewriter from "typewriter-effect";
import TextType from "./ui/text-type.jsx";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
      className="min-h-screen flex items-center justify-center px-6"
    >
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xl md:text-xl text-gray-600 dark:text-gray-400 font-light mb-2 md:mr-150">
          Hey, I'm
        </p>
        <h1
          ref={nameRef}
          className="text-6xl md:text-8xl font-bold mb-6 tracking-tight text-black dark:text-white"
        >
          Rajan Kanzariya
        </h1>
        <div ref={titleRef} className="space-y-4">
          <p className="text-xl md:text-xl text-gray-600 dark:text-gray-400 font-light md:ml-110 mb-10">
            I Build Cool Projects for Fun
          </p>
          <div className="text-lg md:text-xl text-gray-700 dark:text-gray-300 min-h-8">
            {/* <Typewriter
              options={{
                strings: ['Full Stack Developer✱', 'Flutter App Developer✱', 'UI Designer✱'],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
                delay: 150,
                cursor: '|',
                cursorClassName: 'text-black dark:text-white',
              }}
            /> */}
            <TextType
              text={[
                "Full Stack Developer*",
                "Flutter App Developer*",
                "UI Designer*",
              ]}
              // typingSpeed={70}
              // pauseDuration={1500}
              showCursor={true}
              cursorCharacter="_"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
