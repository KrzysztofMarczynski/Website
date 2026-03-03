import { motion } from "framer-motion";

export default function Unity() {
  return (
    <section
      id="Unity Games"
      className="relative min-h-screen pt-20 md:pt-24 lg:pt-28 pb-20 px-5 md:px-10 lg:px-16 
                 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Nagłówek – NAPRAWIONE UCIECCIE OD DOŁU */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16
                     pb-8 md:pb-10 lg:pb-12                    {/* ← dodatkowy padding od dołu */}
                     leading-[1.25] md:leading-[1.2] lg:leading-[1.15]   {/* ← zwiększony line-height */}
                     bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 
                     bg-clip-text text-transparent drop-shadow-md"
        >
          Unity Projects
        </motion.h2>

        {/* VIDEO BACKGROUND */}
        <div className="relative w-full aspect-video max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl mb-16">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/KufwP77IBDc?autoplay=1&mute=1&loop=1&playlist=KufwP77IBDc&controls=0&showinfo=0&modestbranding=1&rel=0"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>

        {/* Główny tekst */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-3xl mx-auto text-center text-lg md:text-xl leading-relaxed text-gray-300 mb-20"
        >
          <p>
            Tworzę gry, prototypy i eksperymenty w Unity – od prostych mechanik 
            po kompletne środowiska 3D. Każdy projekt to unikalne wyzwanie, 
            w którym sprawdzam gameplay, interakcje i wizualne eksperymenty.
          </p>
        </motion.div>

        {/* Przykłady projektów */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[12, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-black"
            >
              <img
                src={`${i}.gif`}
                alt={`Unity Project ${i}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
          <p className="text-lg text-gray-400">
            Wszystkie projekty znajdziesz na moim GitHubie. 
            Chętnie pokażę więcej szczegółów i opowiem o procesie tworzenia.
          </p>
        </motion.div>
      </div>
    </section>
  );
}