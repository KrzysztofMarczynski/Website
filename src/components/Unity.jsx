import { motion } from "framer-motion";

export default function Unity() {
  return (
    <section
      id="Unity Games"
      className="relative bg-white px-4 py-16 text-zinc-950 sm:px-5 md:px-10 md:py-16 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 border-t border-zinc-200 pt-8 md:mb-14"
        >
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <p className="mb-4 text-sm font-bold uppercase text-zinc-400">
                Game Development
              </p>
              <p className="mb-6 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg lg:hidden">
                Games are my passion. I enjoy the entire process, from programming and designing systems to shaping the visual feel of a game, constantly pushing me to think creatively and solve problems in innovative ways.
              </p>
              <h2 className="text-2xl font-black uppercase leading-[0.98] tracking-normal text-zinc-950 sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl">
                Unity Projects
              </h2>
            </div>

            <p className="hidden max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg lg:block lg:pt-2 xl:text-xl">
              Games are my passion. I enjoy the entire process, from programming and designing systems to shaping the visual feel of a game, constantly pushing me to think creatively and solve problems in innovative ways.
            </p>
          </div>
        </motion.div>

        <div className="relative mx-auto mb-12 aspect-video w-full max-w-5xl overflow-hidden rounded-3xl border border-zinc-200 shadow-[0_24px_90px_rgba(15,23,42,0.16)]">
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube.com/embed/hKB-22coN84?autoplay=1&mute=1&loop=1&playlist=hKB-22coN84&controls=0&showinfo=0&modestbranding=1&rel=0"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>

        <div className="space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-20">
          {[
            {
              gif: "gra1.gif",
              title: "Project 1 - Flappy Bird",
              text: "It was the first game that I created. It taught me the basics of C# and how Unity works.",
            },
            {
              gif: "gra2.gif",
              title: "Project 2 - Tetris",
              text: "Tetris was the first game of this complexity. Figuring out how to approach it took many hours and a lot of patience.",
            },
            {
              gif: "gra3.gif",
              title: "Project 3 - Ladder Climber",
              text: "One of the most enjoyable projects, because it allowed me to test small ideas that would not normally fit anywhere else.",
            },
            {
              gif: "gra4.gif",
              title: "Project 4 - RogueLike Game",
              text: "This project was buried by overambition, but it is the most advanced one I have created so far. It includes a room generation system, shooting, dialogue, inventory, level movement, player tracking, and enemy patrols.",
            },
          ].map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="gap-3 rounded-[1.75rem] border border-zinc-200 bg-white p-2.5 shadow-[0_18px_70px_rgba(15,23,42,0.07)] sm:gap-3 sm:p-3 md:gap-4 md:p-5 lg:gap-5 lg:p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 items-center">
                <div
                  className={`order-1 ${
                    index % 2 === 1 ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <div className="overflow-hidden rounded-lg sm:rounded-xl border border-zinc-200 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
                    <img
                      src={`/${project.gif}`}
                      alt={`${project.title} gameplay`}
                      className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>

                <div
                  className={`order-2 space-y-2 sm:space-y-2.5 ${
                    index % 2 === 1 ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <h3 className="text-base font-bold leading-tight text-zinc-950 sm:text-xl md:text-2xl lg:text-4xl">
                    {project.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-zinc-600 sm:text-sm md:text-base">
                    {project.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        ></motion.div>
      </div>
    </section>
  );
}