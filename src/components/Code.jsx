import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

function CodeFromFile({ filePath, repo, language = "python" }) {
  const [code, setCode] = useState("// Loading from GitHub");
  const [error, setError] = useState(null);

  useEffect(() => {
    const rawUrl = `https://raw.githubusercontent.com/KrzysztofMarczynski/${repo}/main/${filePath}`;

    fetch(rawUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status} - file not found`);
        }

        return res.text();
      })
      .then((text) => setCode(text))
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setCode("// Could not load code");
      });
  }, [filePath, repo]);

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 shadow-2xl shadow-zinc-950/20">
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

  const repoMap = {
    C: "ft_printf",
    JavaScript: "Website",
    CSharp: "RogueLike-Level-Generation-System",
    Python: "Website",
  };

  const filePathMap = {
    C: "ft_printf.c",
    JavaScript: "src/components/Ai.jsx",
    CSharp: "LevelGenerator.cs",
    Python: "api/index.py",
  };

  const languageDescriptions = {
    C: (
      <>
        This is my <code>printf</code> implementation.
        <br />I learned how to work with variadic arguments, data formatting,
        and low-level text printing in C.
      </>
    ),
    JavaScript: (
      <>
        JavaScript and React helped me build a clean portfolio where I can show
        my projects and experiments.
      </>
    ),
    CSharp: (
      <>
        This is my Binding of Isaac style level generation system that I use in
        the game I am creating.
      </>
    ),
    Python: (
      <>
        Python is the language I am currently learning. This example supports
        the AI assistant on this website.
      </>
    ),
  };

  const tabs = Object.keys(repoMap);
  const currentRepo = repoMap[activeTab] || "Website";
  const currentFilePath = filePathMap[activeTab] || "README.md";
  const githubFileLink = `https://github.com/KrzysztofMarczynski/${currentRepo}/blob/main/${currentFilePath}`;

  return (
    <section
      id="Code"
      className="relative min-h-screen overflow-visible bg-white px-5 pb-20 pt-12 text-zinc-950 sm:pt-14 md:px-10 md:pt-16 lg:px-16 lg:pt-16"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 mt-6 pb-4 text-center text-4xl font-bold leading-tight tracking-tight text-zinc-950 sm:text-5xl md:text-5xl lg:text-6xl"
        >
          My Code & Experience
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-10 flex flex-wrap justify-center gap-3 md:gap-4"
        >
          {tabs.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setActiveTab(lang)}
              className={`rounded-full border px-6 py-2.5 text-base font-medium transition-all duration-300 md:text-lg ${
                activeTab === lang
                  ? "border-zinc-950 bg-zinc-950 text-white shadow-lg shadow-zinc-950/15"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400 hover:text-zinc-950"
              }`}
            >
              {lang === "JavaScript"
                ? "JS / React"
                : lang === "CSharp"
                  ? "C#"
                  : lang}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.97 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-950 shadow-[0_24px_90px_rgba(15,23,42,0.18)]"
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

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950/30" />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mx-auto mt-10 max-w-3xl space-y-8 pb-12 text-center md:mt-12 md:pb-16 lg:mt-14 lg:pb-20"
          >
            <h3 className="text-3xl font-semibold leading-tight text-zinc-950 md:text-4xl">
              {activeTab === "JavaScript"
                ? "JavaScript / React"
                : activeTab === "CSharp"
                  ? "C#"
                  : activeTab}{" "}
              Experience
            </h3>

            <p className="text-lg leading-relaxed text-zinc-700 md:text-xl">
              {languageDescriptions[activeTab]}
            </p>

            <a
              href={githubFileLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-7 py-3.5 font-medium text-white shadow-lg shadow-zinc-950/15 transition-all duration-300 hover:bg-zinc-800"
            >
              See my{" "}
              {activeTab === "JavaScript"
                ? "JS/React"
                : activeTab === "CSharp"
                  ? "C#"
                  : activeTab}{" "}
              code on GitHub -&gt;
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}