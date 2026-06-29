import { motion } from "framer-motion";

export default function Unity() {
  return (
    <section
      id="Unity Games"
      className="relative min-h-screen overflow-hidden bg-white px-5 pb-20 pt-20 text-zinc-950 md:px-10 md:pt-24 lg:px-16 lg:pt-28"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 pb-8 text-center text-4xl font-bold leading-[1.25] text-zinc-950 md:pb-10 md:text-5xl md:leading-[1.2] lg:pb-12 lg:text-6xl lg:leading-[1.15]"
        >
          Unity Projects
        </motion.h2>

        <div className="relative mx-auto mb-16 aspect-video w-full max-w-5xl overflow-hidden rounded-3xl border border-zinc-200 shadow-[0_24px_90px_rgba(15,23,42,0.16)]">
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube.com/embed/hKB-22coN84?autoplay=1&mute=1&loop=1&playlist=hKB-22coN84&controls=0&showinfo=0&modestbranding=1&rel=0"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto mb-20 max-w-3xl text-center text-lg leading-relaxed text-zinc-700 md:text-xl"
        >
          <p>
            Games are my passion.
            <br />
            My goal is to one day run my own studio and create unique indie
            games.
          </p>
          <br />
          <p>
            I enjoy the entire process, from programming and designing systems
            to shaping the visual feel of a game. While it can be challenging at
            times, it constantly pushes me to think creatively and solve
            problems in innovative ways.
          </p>
        </motion.div>

        <div className="space-y-16 md:space-y-20 lg:space-y-24">
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
              className="grid items-center gap-10 md:grid-cols-2 lg:gap-16"
            >
              <div
                className={`order-1 ${
                  index % 2 === 1 ? "md:order-2" : "md:order-1"
                }`}
              >
                <div className="overflow-hidden rounded-2xl border border-zinc-200 shadow-[0_18px_60px_rgba(15,23,42,0.12)]">
                  <img
                    src={`/${project.gif}`}
                    alt={`${project.title} gameplay`}
                    className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>

              <div
                className={`order-2 space-y-6 text-center md:text-left ${
                  index % 2 === 1 ? "md:order-1" : "md:order-2"
                }`}
              >
                <h3 className="text-2xl font-semibold text-zinc-950 md:text-3xl">
                  {project.title}
                </h3>
                <p className="text-lg leading-relaxed text-zinc-700 md:text-xl">
                  {project.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        ></motion.div>
      </div>
    </section>
  );
}