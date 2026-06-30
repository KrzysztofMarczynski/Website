import { motion } from "framer-motion";

const skills = [
  "Computer hardware",
  "3D printing",
  "3D modeling",
  "Pixel art",
  "Unity",
  "C",
  "C#",
  "Python",
  "JavaScript",
  "English C1",
];

export default function Hero() {
  const scrollToContact = () => {
    const el = document.getElementById("contact");

    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const scrollToBlog = () => {
    const el = document.getElementById("blog");

    if (el) {
      const yOffset = -96;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-white px-5 pb-10 pt-24 text-zinc-950 md:px-10 md:pb-12 md:pt-28 lg:px-16 lg:pt-32">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="relative left-1/2 w-screen -translate-x-1/2 px-5 md:px-10 lg:px-16">
          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-[94rem] text-center text-[clamp(3.05rem,7.35vw,7.35rem)] font-black uppercase leading-[1.08] tracking-normal text-zinc-950"
          >
            <span className="block xl:inline">KRZYSZTOF</span>
            <span className="block xl:ml-8 xl:inline">MARCZYŃSKI</span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-zinc-200 pt-5 text-[0.7rem] font-bold uppercase tracking-normal text-zinc-500 sm:text-xs lg:max-w-none lg:justify-between"
        >
          <span>Portfolio 2026</span>
          <span>Creative Developer</span>
          <span>Based in Poland</span>
        </motion.div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 42 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[32rem] overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-100 shadow-[0_18px_60px_rgba(15,23,42,0.10)]">
              <img
                src="portrait.png"
                alt="Krzysztof Marczyński"
                className="aspect-[4/5] w-full object-cover object-center grayscale-[12%] transition-all duration-700 hover:scale-[1.025] hover:grayscale-0"
              />
            </div>
          </motion.div>

          <div className="w-full space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 42 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.85,
                delay: 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="space-y-6 text-lg leading-relaxed text-zinc-700 md:text-xl"
            >
              <div>
                <p className="mb-3 text-sm font-bold uppercase text-zinc-400">
                  About me
                </p>
                <h2 className="text-3xl font-bold leading-tight text-zinc-950 md:text-5xl">
                  Creative developer focused on clean ideas, useful details,
                  and interactive work.
                </h2>
              </div>

              <p>
                I am an energetic and creative person who enjoys solving
                problems and improving existing solutions. I think outside the
                box and confidently share my ideas and opinions. My greatest
                strengths are my soft skills and my ability to quickly learn new
                things. I work very well in a team environment and enjoy
                collaborating with others.
              </p>

              <div className="grid grid-cols-2 gap-3 text-sm font-semibold text-zinc-600 sm:grid-cols-5">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex min-h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-4 py-2 text-center leading-tight shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.75,
                delay: 0.38,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-wrap justify-center gap-3 lg:justify-start"
            >
              <button
                type="button"
                onClick={scrollToBlog}
                className="rounded-full border border-zinc-300 bg-white px-7 py-3.5 text-sm font-bold uppercase text-zinc-950 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-950 active:scale-95"
              >
                See my blog
              </button>
              <button
                type="button"
                onClick={scrollToContact}
                className="rounded-full bg-zinc-950 px-7 py-3.5 text-sm font-bold uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 active:scale-95"
              >
                Contact me
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
