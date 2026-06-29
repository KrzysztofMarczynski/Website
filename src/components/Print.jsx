import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: "pirate-stories",
    eyebrow: "Board game design",
    title: "Pirate Stories",
    description:
      "A modular board game where players compete to capture three pirate treasures. Each session is unique thanks to the dynamic board system, encouraging strategic gameplay and unpredictable interactions.",
    sections: [
      {
        heading: "Concept",
        text: "At the beginning I focused on creating and designing a modular board so that each game feels different from the previous one.",
        images: [1, 2, 3],
        cols: "grid-cols-2 sm:grid-cols-3",
      },
      {
        heading: "Figurines",
        text: "I designed figurines for the game, and the design process took a lot of careful iteration.",
        images: [4, 5],
        cols: "grid-cols-2",
        reverse: true,
      },
      {
        heading: "Whole Game",
        text: "After printing the entire board, I realized that it was not practical to unfold, so I redesigned part of the board.",
        images: [7, 8],
        cols: "grid-cols-1 sm:grid-cols-2",
      },
      {
        heading: "Redesign",
        text: "I printed a new board and designed a new type of element to place on it, making the whole setup much more convenient.",
        images: [9, 11],
        cols: "grid-cols-2",
        reverse: true,
      },
    ],
  },
  {
    id: "phone-holder",
    eyebrow: "Utility design",
    title: "Phone Holder",
    description:
      "A magnetic phone holder for daily use. Features a printed screw for mounting and press-fitted charging connector. Simple, practical, and effective.",
    image: "/phone_holder.gif",
    link: "https://www.printables.com/model/1627041-phone-holder",
  },
  {
    id: "coin-holder",
    eyebrow: "Car accessories",
    title: "Coin Holder",
    description:
      "A car-mounted coin holder designed to keep loose change organized and eliminate noise while driving.",
    image: "/coin_holder.gif",
    link: "https://www.printables.com/model/1658618-coin-holder-for-polish-zloty",
  },
];

export default function Print() {
  return (
    <section
      id="3D Print"
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
                3D & Fabrication
              </p>
              <p className="mb-6 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg lg:hidden">
                From custom board games to practical utilities, I design and
                print 3D models that combine functionality with precision.
              </p>
              <h2 className="text-2xl font-black uppercase leading-[0.98] tracking-normal text-zinc-950 sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl">
                Printing & Design
              </h2>
            </div>

            <p className="hidden max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg lg:block lg:pt-2 xl:text-xl">
              From custom board games to practical utilities, I design and print
              3D models that combine functionality with precision. Each project
              uses SketchUp and Solid Edge for modeling.
            </p>
          </div>
        </motion.div>

        <div className="space-y-12 lg:space-y-14">
          {/* Pirate Stories - Multi-section project */}
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 lg:space-y-8"
          >
            <div className="grid gap-3 rounded-[1.75rem] border border-zinc-200 bg-white p-2.5 shadow-[0_18px_70px_rgba(15,23,42,0.07)] sm:gap-3 sm:p-3 md:gap-4 md:p-5 lg:gap-5 lg:p-6 md:min-h-[120px]">
              <div>
                <p className="mb-2 text-xs font-bold uppercase text-zinc-400 sm:text-sm">
                  {projects[0].eyebrow}
                </p>
                <h3 className="text-base font-bold leading-tight text-zinc-950 sm:text-xl md:text-2xl lg:text-4xl">
                  {projects[0].title}
                </h3>
                <p className="mt-2 max-w-3xl text-xs leading-relaxed text-zinc-600 sm:mt-3 sm:text-sm md:text-base lg:text-lg">
                  {projects[0].description}
                </p>
              </div>
            </div>

            {/* Pirate Stories sections */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-7">
              {projects[0].sections.map((section, idx) => (
                <motion.div
                  key={section.heading}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`pb-4 sm:pb-5 lg:pb-6 ${
                    idx !== projects[0].sections.length - 1 ? "border-b border-zinc-100" : ""
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 items-start">
                    {/* Text on left */}
                    <div className="space-y-2 sm:space-y-2.5 md:col-span-1">
                      <h4 className="text-sm font-bold text-zinc-950 sm:text-base md:text-lg lg:text-xl">
                        {section.heading}
                      </h4>
                      <p className="text-xs leading-relaxed text-zinc-600 sm:text-sm md:text-base">
                        {section.text}
                      </p>
                    </div>

                    {/* Images on right - all in one row */}
                    <div className={`grid ${section.cols} md:flex md:gap-2.5 gap-1.5 sm:gap-2.5 md:col-span-2`}>
                      {section.images.map((img) => (
                        <div
                          key={img}
                          className="aspect-[4/3] overflow-hidden rounded-lg sm:rounded-xl border border-zinc-200 shadow-[0_8px_30px_rgba(15,23,42,0.06)] md:min-w-0"
                        >
                        <img
                          src={`${img}.png`}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Phone Holder & Coin Holder */}
          {projects.slice(1).map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.75,
                delay: 0.1 + idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid gap-6 sm:gap-8 md:gap-10 md:grid-cols-2 lg:gap-12"
            >
              <div className="space-y-3 sm:space-y-4 flex flex-col justify-center">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase text-zinc-400 sm:text-sm">
                    {project.eyebrow}
                  </p>
                  <h3 className="text-base font-bold leading-tight text-zinc-950 sm:text-xl md:text-2xl lg:text-4xl">
                    {project.title}
                  </h3>
                </div>
                <p className="text-xs leading-relaxed text-zinc-600 sm:text-sm md:text-base lg:text-lg">
                  {project.description}
                </p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-full bg-zinc-950 px-3 py-2 text-xs font-bold uppercase text-white transition-all duration-300 sm:gap-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 md:text-sm md:inline-flex md:w-auto hover:-translate-y-0.5 hover:bg-zinc-800 active:scale-95"
                >
                  View on Printables
                  <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                </a>
              </div>

              <div className="flex items-center justify-center">
                <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 shadow-[0_18px_60px_rgba(15,23,42,0.12)]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}