import { motion } from "framer-motion";

export default function Unity() {
  return (
    <section
      id="Unity Games"
      className="relative min-h-screen pt-20 md:pt-24 lg:pt-28 pb-20 px-5 md:px-10 lg:px-16 
                 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Nagłówek */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16
                     pb-8 md:pb-10 lg:pb-12
                     leading-[1.25] md:leading-[1.2] lg:leading-[1.15]
                     bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 
                     bg-clip-text text-transparent drop-shadow-md"
        >
          Unity Projects
        </motion.h2>

        {/* VIDEO BACKGROUND */}
        <div className="relative w-full aspect-video max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl mb-16">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/hKB-22coN84?autoplay=1&mute=1&loop=1&playlist=hKB-22coN84&controls=0&showinfo=0&modestbranding=1&rel=0"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>

        {/* Główny opis */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-3xl mx-auto text-center text-lg md:text-xl leading-relaxed text-gray-300 mb-20"
        >
          <p>
            Games is my passion.<br />
            My goal is to one day run my own studio and create unique indie games.
          </p>
          <br />
          <p>
            I enjoy the entire process —
            from programming and designing systems to shaping the visual feel of
            a game. While it can be challenging at times, it constantly pushes
            me to think creatively and solve problems in innovative ways.
          </p>
        </motion.div>

        {/* 4 bloki: gif + tekst */}
        <div className="space-y-16 md:space-y-20 lg:space-y-24">
          {[
            { gif: "gra1.gif", title: "Project 1 – Flappy Bird", text: "It was first game that i created. It teached me basics of C# and how Unity works." },
            { gif: "gra2.gif", title: "Project 2 – Tetris", text: "Tetris was the first game of this complexity. Just figuring out how to approach it burned through many nerves and hours." },
            { gif: "gra3.gif", title: "Project 3 – Ladder Climber", text: "One of the most enjoyable projects that allowed me to add whatever I wanted to the game and test various ideas that wouldn't normally have a place anywhere else." },
            { gif: "gra4.gif", title: "Project 4 – RougeLike Game", text: "Unfortunately, this project was buried by overambition. However, it's the most advanced I've created to date. It includes a working room generation system with a multitude of modular parameters. It also has a working shooting system, dialogue, inventory, and level movement system, as well as a player tracking system and enemy patrols." },
          ].map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center"
            >
              <div className={`order-1 ${index % 2 === 1 ? "md:order-2" : "md:order-1"}`}>
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-gray-700/50">
                  <img
                    src={`/${project.gif}`}
                    alt={`${project.title} gameplay`}
                    className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>

              <div className={`order-2 ${index % 2 === 1 ? "md:order-1" : "md:order-2"} space-y-6 text-center md:text-left`}>
                <h3 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-500 bg-clip-text text-transparent">
                  {project.title}
                </h3>
                <p className="text-lg md:text-xl leading-relaxed text-gray-300">
                  {project.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Zakończenie */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
        </motion.div>
      </div>
    </section>
  );
}