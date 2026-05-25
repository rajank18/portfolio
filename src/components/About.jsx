import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current.children, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-0 pb-24 md:pb-60"
    >
      <div className="w-full max-w-[720px] mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-14 text-center text-black dark:text-white">
          About Me
        </h2>
        <div
          ref={textRef}
          className="space-y-6 text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-center"
        >
          {/* <p>
            I'm a passionate developer and designer who loves creating
            beautiful, functional digital experiences.
          </p> */}
          <p>
            A curious mind who loves creating things that feel smooth, simple,
            and a little bit magical. 
          </p>
          <p>
            I enjoy exploring new ideas, building cool
            projects, and figuring out how tech can make life easier (or just
            more fun). Most days you’ll find me experimenting with code,
            learning something new, or following my creativity wherever it wants
            to go.
          </p>
          <p>
             ✦ Still growing, Still building ✦ 
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
