import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

function CodeFromFile({ filePath, repo, language = "python" }) {
  const [code, setCode] = useState("// git hub loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    const rawUrl = `https://raw.githubusercontent.com/KrzysztofMarczynski/${repo}/main/${filePath}`;

    fetch(rawUrl)
      .then((res) => {
        if (!res.ok)
          throw new Error(`Błąd ${res.status} – plik nie znaleziony`);
        return res.text();
      })
      .then((text) => setCode(text))
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setCode("// Nie udało się wczytać kodu");
      });
  }, [filePath, repo]);

  if (error) {
    return (
      <div className="p-6 bg-red-950/40 rounded-xl border border-red-800/50 text-red-300 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden border border-gray-700/60 shadow-2xl shadow-black/30">
      <SyntaxHighlighter
        language={language}
        style={dracula}
        customStyle={{
          margin: 0,
          padding: "1.75rem 2.25rem",
          background: "transparent",
          fontSize: "0.97rem",
          lineHeight: "1.58",
        }}
        showLineNumbers
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default function Code() {
  const [activeTab, setActiveTab] = useState("C");

  // Mapowanie: nazwa zakładki → repozytorium GitHub
  const repoMap = {
    C: "ft_printf",
    JavaScript: "Website",
    CSharp: "RogueLike-Level-Generation-System",
    Python: "Website",
  };

  // Mapowanie: nazwa zakładki → dokładna ścieżka do pliku (do linku blob)
  const filePathMap = {
    C: "ft_printf.c",
    JavaScript: "src/components/Ai.jsx",
    CSharp: "LevelGenerator.cs",
    Python: "api/index.py",
  };

  const codeSamples = {
    C: "",
    JavaScript: "",
    CSharp: "",
    Python: "",
  };

  const languageDescriptions = {
    C: (
      <>
        This is my <code>printf</code> implementation.
        <br />I learned how to work with variadic arguments, data formatting and
        low level text printing in C.
      </>
    ),
    JavaScript: (
      <>
        JavaScript + React – allowed me to learn how to create a nice and clear
        website where I can post my portfolio .
        <br />
      </>
    ),
    CSharp: (
      <>
        This is my own Binding of Isaac style level generation system that I use
        in the game I'm creating.
      </>
    ),
    Python: (
      <>
		The language I'm currently learning, this is the code that supports the AI ​​assistant on this website
      </>
    ),
  };

  const tabs = Object.keys(codeSamples);

  // Pobieramy repo i ścieżkę dla aktualnej zakładki
  const currentRepo = repoMap[activeTab] || "Website";
  const currentFilePath = filePathMap[activeTab] || "README.md";

  // Link do konkretnego pliku w konkretnym repo
  const githubFileLink = `https://github.com/KrzysztofMarczynski/${currentRepo}/blob/main/${currentFilePath}`;

  return (
    <section
      id="Code"
      className="relative min-h-screen pt-12 sm:pt-14 md:pt-16 lg:pt-16 pb-20 px-5 md:px-10 lg:px-16 
                 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 
                 text-white overflow-visible"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold mt-6 mb-12 pb-4 text-center leading-tight tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent drop-shadow-md"
        >
          My Code & Experience
        </motion.h2>

        {/* Zakładki */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10"
        >
          {tabs.map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveTab(lang)}
              className={`
                px-6 py-2.5 rounded-full font-medium text-base md:text-lg
                transition-all duration-300 border border-gray-700/60
                ${
                  activeTab === lang
                    ? "bg-gradient-to-r from-blue-600/80 to-indigo-600/80 text-white shadow-lg shadow-blue-700/30 border-blue-500/50"
                    : "bg-gray-800/40 text-gray-300 hover:bg-gray-700/60 hover:text-white hover:border-gray-500/60"
                }
              `}
            >
              {lang === "JavaScript" ? "JS / React" : lang}
            </button>
          ))}
        </motion.div>

        {/* Zawartość kodu */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.97 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative w-full max-w-5xl mx-auto bg-gray-950/70 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden"
          >
            <div className="max-h-[500px] overflow-y-auto">
              {activeTab === "C" ? (
                <CodeFromFile
                  filePath="ft_printf.c"
                  repo="ft_printf"
                  language="c"
                />
              ) : activeTab === "JavaScript" ? (
                <CodeFromFile
                  filePath="src/components/Ai.jsx"
                  repo="Website"
                  language="jsx"
                />
              ) : activeTab === "CSharp" ? (
                <CodeFromFile
                  filePath="LevelGenerator.cs"
                  repo="RogueLike-Level-Generation-System"
                  language="csharp"
                />
              ) : activeTab === "Python" ? (
                <CodeFromFile
                  filePath="api/index.py"
                  repo="Website"
                  language="python"
                />
              ) : null}
            </div>

            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-gray-950/40" />
          </motion.div>
        </AnimatePresence>

        {/* Opis doświadczenia */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-10 md:mt-12 lg:mt-14 max-w-3xl mx-auto text-center space-y-8 pb-12 md:pb-16 lg:pb-20"
          >
            <h3 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
              {activeTab === "JavaScript" ? "JavaScript / React" : activeTab} –
              Experience
            </h3>

            <p className="text-lg md:text-xl leading-relaxed text-gray-300">
              {languageDescriptions[activeTab]}
            </p>

            {/* Poprawiony link – teraz zależy od aktywnej zakładki */}
            <a
              href={githubFileLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-700/30"
            >
              See my {activeTab === "JavaScript" ? "JS/React" : activeTab} code
              on GitHub →
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
