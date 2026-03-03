import { motion } from "framer-motion";

export default function Hero() {
  
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      const yOffset = -80;
      const y =
        el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

return (
  <section className="relative pt-24 md:pt-28 lg:pt-32 pb-10 px-5 md:px-10 lg:px-16 bg-gray-950 text-white">
    <div className="relative z-10 max-w-7xl mx-auto">

        {/* ===== MOBILE TITLE ===== */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:hidden text-center mb-10 text-4xl md:text-5xl font-bold leading-tight 
                     bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 
                     bg-clip-text text-transparent"
        >
          Hi, my name is Krzysztof
        </motion.h1>

        {/* ===== MAIN FLEX CONTAINER ===== */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">

          {/* ===== LEFT SIDE – IMAGE ===== */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="w-full lg:w-1/2 flex justify-center lg:justify-start"
          >
            <div className="relative rounded-2xl overflow-hidden border border-gray-700/50">
              <img
                src="portrait.png"
                alt="Krzysztof"
                className="w-full max-w-md lg:max-w-none object-cover 
                           aspect-[4/5] lg:aspect-[3/4] 
                           grayscale-[30%] hover:grayscale-0 
                           transition-all duration-700"
              />
            </div>
          </motion.div>

          {/* ===== RIGHT SIDE – TEXT ===== */}
          <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">

            {/* ===== DESKTOP TITLE ===== */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="hidden lg:block text-5xl xl:text-6xl font-bold leading-tight 
                         bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 
                         bg-clip-text text-transparent"
            >
              Hi, my name is Krzysztof
            </motion.h1>

            {/* ===== DESCRIPTION ===== */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-5 text-lg md:text-xl leading-relaxed text-gray-300"
            >
              <p>
                I'm a very energetic and creative person who can tackle any
                problem. I believe that every solution can be improved.
              </p>
              <p>
                I often think outside the box, I'm not afraid to express my
                opinion.
              </p>
              <p>
                My greatest strengths are my soft skills. I learn new skills
                very quickly. I feel great working with a group.
              </p>
            </motion.div>

            {/* ===== BUTTON ===== */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center lg:justify-start"
            >
            <button
              onClick={() => scrollToContact(contact)}
              className="px-10 py-4 text-xl font-bold rounded-full
                         bg-red-600 hover:bg-red-500 text-white cursor-pointer
                         transition-all active:scale-95"
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