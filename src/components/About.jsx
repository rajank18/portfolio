import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  const [meme, setMeme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshCount, setRefreshCount] = useState(0);

  // GSAP Animation
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

  // Fetch random XKCD
  useEffect(() => {
    async function fetchXkcd() {
      try {
        setLoading(true);
        setError(null);

        // latest comic
        const latest = await fetch(
          "https://corsproxy.io/?https://xkcd.com/info.0.json"
        ).then((res) => res.json());

        const maxComic = latest.num;

        let randomComic;

        do {
          randomComic =
            Math.floor(Math.random() * maxComic) + 1;
        } while (randomComic === 404);

        // random comic
        const data = await fetch(
          `https://corsproxy.io/?https://xkcd.com/${randomComic}/info.0.json`
        ).then((res) => res.json());

        setMeme({
          url: data.img,
          title: data.title,
          alt: data.alt,
          source: `https://xkcd.com/${data.num}/`,
        });
      } catch (err) {
        console.log(err);
        setError("Failed to load comic");
      } finally {
        setLoading(false);
      }
    }

    fetchXkcd();
  }, [refreshCount]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 pb-24 md:pb-60"
    >
      <div className="w-full max-w-[720px] mx-auto">

        <h2 className="text-5xl md:text-6xl font-bold mb-14 text-center text-black dark:text-white">
          About Me
        </h2>

        <div
          ref={textRef}
          className="space-y-6 text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-center"
        >
          <p>
            A curious mind who loves creating things
            that feel smooth, simple, and a little magical.
          </p>

          <p>
            I enjoy exploring new ideas, building cool
            projects, and figuring out how tech can make
            life easier.
          </p>

          <p>✦Still growing, Still building✦</p>
        </div>

        {/* Meme section */}
        <div className="mt-16  pt-10">

          <h3 className="text-xl font-extrabold text-center mb-6 text-black dark:text-white">
            <span>
              <button
                onClick={() => location.reload()}
                className="inline underline decoration-black dark:decoration-white decoration-2 underline-offset-2 "
              >
                Refresh
              </button><span className="inline">ments ☕︎</span>
            </span>
          </h3>

          <div className="max-w-md mx-auto flex flex-col items-center">

            {loading && (
              <div className="w-full h-60  bg-gray-200 dark:bg-gray-800 animate-pulse" />
            )}

            {error && (
              <div className="text-center text-red-500">
                <p>{error}</p>
              </div>
            )}

            {!loading && meme && (
              <>
                <a
                  href={meme.source}
                  target="_blank"
                  rel="noreferrer"
                  className="group"
                >
                  <img
                    src={meme.url}
                    alt={meme.alt}
                    title={meme.alt}
                    loading="lazy"
                    className="
                      bg-white
                      p-2
                      transition
                      duration-300
                      group-hover:scale-[1.03]
                    "
                  />
                </a>

                <h4 className="mt-4 font-semibold text-center dark:text-white">
                  {meme.title}
                </h4>

                <p className="text-sm italic mt-2 text-gray-500 text-center">
                  "{meme.alt}"
                </p>

                {/* Removed New Meme button per request */}
              </>
            )}
          </div>

          {/* <p className="mt-6 text-center text-xs text-gray-400">
            Random XKCD comic on every refresh
          </p> */}
        </div>
      </div>
    </section>
  );
};

export default About;