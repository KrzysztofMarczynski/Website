import { motion } from "framer-motion";

export default function Hero() {
  const scrollToContact = () => {
    const el = document.getElementById("contact");

    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-white px-5 pb-10 pt-24 text-zinc-950 md:px-10 md:pt-28 lg:px-16 lg:pt-32">
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 text-center text-4xl font-bold leading-tight text-zinc-950 md:text-5xl lg:hidden"
        >
          Hi, my name is Krzysztof
        </motion.h1>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="flex w-full justify-center lg:w-1/2 lg:justify-start"
          >
            <div className="relative overflow-hidden rounded-2xl border border-zinc-200 shadow-[0_24px_90px_rgba(15,23,42,0.12)]">
              <img
                src="portrait.png"
                alt="Krzysztof"
                className="aspect-[4/5] w-full max-w-md object-cover grayscale-[20%] transition-all duration-700 hover:grayscale-0 lg:aspect-[3/4] lg:max-w-none"
              />
            </div>
          </motion.div>

          <div className="w-full space-y-8 text-center lg:w-1/2 lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="hidden text-5xl font-bold leading-tight text-zinc-950 lg:block xl:text-6xl"
            >
              Hi, my name is Krzysztof
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-5 text-lg leading-relaxed text-zinc-700 md:text-xl"
            >
              <p className="font-semibold text-zinc-950">#about me</p>
              <p>
                I am an energetic and creative person who enjoys solving
                problems and improving existing solutions. I think outside the
                box and confidently share my ideas and opinions. My greatest
                strengths are my soft skills and my ability to quickly learn new
                things. I work very well in a team environment and enjoy
                collaborating with others.
              </p>

              <p className="font-semibold text-zinc-950">#skillset</p>
              <div className="space-y-1">
                <p>- Computer hardware</p>
                <p>- 3D printing and 3D modeling</p>
                <p>- Pixel art creation</p>
                <p>- Game development in Unity</p>
                <p>- Programming in C, C#, Python, and JavaScript</p>
                <p>- English C1</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center lg:justify-start"
            >
              <button
                type="button"
                onClick={scrollToContact}
                className="rounded-full bg-zinc-950 px-10 py-4 text-xl font-bold text-white transition-all duration-300 hover:bg-zinc-800 active:scale-95"
              >
                Contact Me
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
