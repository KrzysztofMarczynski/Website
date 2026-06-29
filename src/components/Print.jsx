import { motion } from "framer-motion";

export default function Print() {
  return (
    <section
      id="3D Print"
      className="relative min-h-screen overflow-hidden bg-white px-5 pb-20 pt-20 text-zinc-950 md:px-10 md:pt-24 lg:px-16 lg:pt-28"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 pb-6 text-center text-4xl font-bold leading-[1.2] text-zinc-950 md:pb-8 md:text-5xl md:leading-[1.15] lg:pb-10 lg:text-6xl lg:leading-[1.1]"
        >
          3D Printing
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto mb-20 max-w-3xl text-center text-lg leading-relaxed text-zinc-700 md:text-xl"
        >
          <p>
            3D printing is another hobby of mine. I am currently working on my
            own board game, and I also create smaller side projects depending on
            what I need.
          </p>
          <p className="mt-6">
            Each print is modeled and created by me, using programs like
            SketchUp and Solid Edge.
          </p>
        </motion.div>

        <h1 className="mb-6 pb-4 text-center text-4xl font-semibold leading-[1.25] text-zinc-950 md:text-5xl">
          Pirate Stories
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto mb-20 max-w-3xl text-center text-lg leading-relaxed text-zinc-700 md:text-xl"
        >
          <p>
            Pirate Stories is a board game. The goal is to capture three pirate
            treasures at all costs. The board is modular, making each game
            completely different from the last. Players can attack each other,
            capture ships, and make every session more unpredictable.
          </p>
        </motion.div>

        <div className="space-y-16">
          <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="order-1 space-y-6 md:order-1"
            >
              <h3 className="text-3xl font-semibold text-zinc-950">Concept</h3>
              <p className="text-lg leading-relaxed text-zinc-700">
                At the beginning I focused on creating and designing a modular
                board so that each game feels different from the previous one.
              </p>
            </motion.div>

            <div className="order-2 grid grid-cols-3 gap-4 md:order-2">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.45, zIndex: 50 }}
                  className="aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl border border-zinc-200 shadow-[0_18px_60px_rgba(15,23,42,0.12)]"
                >
                  <img
                    src={`${i}.png`}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-12">
            <div className="order-2 grid grid-cols-2 gap-4 md:order-1">
              {[4, 5].map((i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.45, zIndex: 50 }}
                  className="aspect-[3/4] cursor-pointer overflow-hidden rounded-2xl border border-zinc-200 shadow-[0_18px_60px_rgba(15,23,42,0.12)]"
                >
                  <img
                    src={`${i}.png`}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="order-1 space-y-6 md:order-2"
            >
              <h3 className="text-3xl font-semibold text-zinc-950">
                Figurines
              </h3>
              <p className="text-lg leading-relaxed text-zinc-700">
                I designed figurines for the game, and the design process took a
                lot of careful iteration.
              </p>
            </motion.div>
          </div>

          <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="order-1 space-y-6 md:order-1"
            >
              <h3 className="text-3xl font-semibold text-zinc-950">
                Whole Game
              </h3>
              <p className="text-lg leading-relaxed text-zinc-700">
                After printing the entire board, I realized that it was not
                practical to unfold, so I redesigned part of the board.
              </p>
            </motion.div>

            <div className="order-2 grid grid-cols-2 gap-4 md:order-2">
              {[7, 8].map((i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.45, zIndex: 50 }}
                  className="aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl border border-zinc-200 shadow-[0_18px_60px_rgba(15,23,42,0.12)]"
                >
                  <img
                    src={`${i}.png`}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-12">
            <div className="order-2 grid grid-cols-2 gap-4 md:order-1">
              {[9, 11].map((i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.45, zIndex: 50 }}
                  className="aspect-[3/4] cursor-pointer overflow-hidden rounded-2xl border border-zinc-200 shadow-[0_18px_60px_rgba(15,23,42,0.12)]"
                >
                  <img
                    src={`${i}.png`}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="order-1 space-y-6 md:order-2"
            >
              <h3 className="text-3xl font-semibold text-zinc-950">
                Redesign
              </h3>
              <p className="text-lg leading-relaxed text-zinc-700">
                I printed a new board and designed a new type of element to
                place on it, making the whole setup much more convenient.
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-24 max-w-5xl"
        >
          <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
            <div className="space-y-8 text-center md:text-left">
              <h3 className="mb-6 pb-4 text-4xl font-semibold leading-[1.25] text-zinc-950 md:text-5xl">
                Other 3D Projects
              </h3>
              <h3 className="mb-6 pb-4 text-3xl font-semibold leading-[1.25] text-zinc-950 md:text-4xl">
                Phone Holder
              </h3>

              <p className="text-lg leading-relaxed text-zinc-700 md:text-xl">
                Just a basic magnetic phone holder that I use every day. It has
                a printed screw inside so you can attach a rubber mount to it.
                The charger is press-fitted. It works surprisingly well.
              </p>

              <a
                href="https://www.printables.com/model/1627041-phone-holder"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-3 rounded-xl bg-zinc-950 px-8 py-4 text-lg font-medium text-white shadow-lg shadow-zinc-950/15 transition-all duration-300 hover:bg-zinc-800 active:scale-95"
              >
                Check out my model here -&gt;
              </a>
            </div>

            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 shadow-[0_18px_60px_rgba(15,23,42,0.12)]"
              >
                <img
                  src="/phone_holder.gif"
                  alt="Phone holder 3D printing timelapse"
                  className="h-auto w-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-24 max-w-5xl"
        >
          <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
            <div className="space-y-8 text-center md:text-left">
              <h3 className="mb-6 pb-4 text-3xl font-semibold leading-[1.25] text-zinc-950 md:text-4xl">
                Coin Holder
              </h3>

              <p className="text-lg leading-relaxed text-zinc-700 md:text-xl">
                This is the coin holder I use in my car to keep coins in one
                place so they do not make noise while driving.
              </p>

              <a
                href="https://www.printables.com/model/1658618-coin-holder-for-polish-zloty"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-3 rounded-xl bg-zinc-950 px-8 py-4 text-lg font-medium text-white shadow-lg shadow-zinc-950/15 transition-all duration-300 hover:bg-zinc-800 active:scale-95"
              >
                Check out my model here -&gt;
              </a>
            </div>

            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 shadow-[0_18px_60px_rgba(15,23,42,0.12)]"
              >
                <img
                  src="/coin_holder.gif"
                  alt="Coin Holder 3D printing timelapse"
                  className="h-auto w-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}