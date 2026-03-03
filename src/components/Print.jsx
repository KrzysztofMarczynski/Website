import { motion } from "framer-motion";

export default function Print() {
  return (
    <section
      id="3D Print"
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
                     pb-6 md:pb-8 lg:pb-10 leading-[1.2] md:leading-[1.15] lg:leading-[1.1]
                     bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 
                     bg-clip-text text-transparent drop-shadow-md"
        >
          3D Printing
        </motion.h2>

        {/* Wstęp */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-3xl mx-auto text-center text-lg md:text-xl leading-relaxed text-gray-300 mb-20"
        >
          <p>3D printing is my another hobbie, I am currently working on my own board game, I am also involved in other side projects, depends what i need.</p>
          <p className="mt-6">Each print is modeled and created by me, using programs like SketchUp and Solid Edge.</p>
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-semibold mb-6 pb-4 text-center
                       bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent leading-[1.25]">
          Pirate Stories
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-3xl mx-auto text-center text-lg md:text-xl leading-relaxed text-gray-300 mb-20"
        >
          <p>Pirate Stories is a board game. The goal is to capture three pirate treasures at all costs. The board is modular, making each game completely different from the last. Players can attack each other, capture ships, and, most importantly, spice things up.</p>
        </motion.div>

        {/* BLOKI – zmniejszone odstępy */}
        <div className="space-y-16">   {/* ← ZMIENIONE z 24 na 16 */}

          {/* Blok 1 */}
          <div className="grid md:grid-cols-2 gap-10 lg:gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6 order-1">
              <h3 className="text-3xl bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-500 bg-clip-text text-transparent">
                Concept
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                At the beginning I focus on creating and designing a board that will be modular so that each game is different from the previous one.
              </p>
            </motion.div>

            <div className="grid grid-cols-3 gap-4 order-2">
              {[1,2,3].map(i => (
                <motion.div key={i} whileHover={{ scale: 1.45, zIndex: 50 }} className="overflow-hidden rounded-2xl shadow-2xl aspect-[4/3] cursor-pointer">
                  <img src={`${i}.png`} alt="" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Blok 2 */}
          <div className="grid md:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="grid grid-cols-2 gap-4 order-2">
              {[4,5].map(i => (
                <motion.div key={i} whileHover={{ scale: 1.45, zIndex: 50 }} className="overflow-hidden rounded-2xl shadow-2xl aspect-[3/4] cursor-pointer">
                  <img src={`${i}.png`} alt="" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6 order-1">
              <h3 className="text-3xl bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-500 bg-clip-text text-transparent">
                Figurines
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                I designed figurines, the design of which took me some of my time
              </p>
            </motion.div>
          </div>

          {/* Blok 3 */}
          <div className="grid md:grid-cols-2 gap-10 lg:gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6 order-1">
              <h3 className="text-3xl bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-500 bg-clip-text text-transparent">
                Whole Game
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                After printing the entire board, it turned out that it was not practical to unfold, so I had to redesign the board a bit, which wasted a lot of filament.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 order-2">
              {[7,8].map(i => (
                <motion.div key={i} whileHover={{ scale: 1.45, zIndex: 50 }} className="overflow-hidden rounded-2xl shadow-2xl aspect-[4/3] cursor-pointer">
                  <img src={`${i}.png`} alt="" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Blok 4 */}
          <div className="grid md:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="grid grid-cols-2 gap-4 order-2">
              {[9,11].map(i => (
                <motion.div key={i} whileHover={{ scale: 1.45, zIndex: 50 }} className="overflow-hidden rounded-2xl shadow-2xl aspect-[3/4] cursor-pointer">
                  <img src={`${i}.png`} alt="" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6 order-1">
              <h3 className="text-3xl bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-500 bg-clip-text text-transparent">
                Redesign
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                I printed a new board and designed a new type of elements to be placed on the board, which is much more convenient
              </p>
            </motion.div>
          </div>

        </div>

        {/* Zakończenie */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 max-w-3xl mx-auto text-center pb-8"
        >
          <h3 className="text-3xl md:text-4xl font-semibold mb-6 pb-4 
                         bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent
                         leading-[1.25]">
            Other 3D Projects
          </h3>
          <p className="text-lg text-gray-300">
            Wszystkie modele są dostępne na moim GitHubie i Thingiverse. Chętnie przyjmuję też zlecenia na indywidualne projekty.
          </p>
        </motion.div>
      </div>
    </section>
  );
}