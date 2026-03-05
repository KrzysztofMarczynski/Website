import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// ────────────────────────────────────────────────
// Komponent do dynamicznego wczytywania kodu z GitHub
// ────────────────────────────────────────────────
function CodeFromFile({ filePath, language = "jsx", title }) {
  const [code, setCode] = useState("// Ładowanie kodu z GitHub...");
  const [error, setError] = useState(null);

  useEffect(() => {
    const rawUrl = `https://raw.githubusercontent.com/KrzysztofMarczynski/Website/main/${filePath}`;

    fetch(rawUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Błąd ${res.status} – plik nie znaleziony`);
        return res.text();
      })
      .then((text) => setCode(text))
      .catch((err) => {
        setError(err.message);
        setCode("// Nie udało się wczytać kodu");
      });
  }, [filePath]);

  return (
    <div className="space-y-4">
      {title && (
        <h4 className="text-xl font-semibold text-blue-300">{title}</h4>
      )}

      <div className="flex justify-end">
        <a
          href={`https://github.com/KrzysztofMarczynski/Website/blob/main/${filePath}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-400 hover:text-blue-300 underline flex items-center gap-1"
        >
          Zobacz na GitHub →
        </a>
      </div>

      {error ? (
        <div className="p-6 bg-red-950/40 rounded-xl text-red-300 border border-red-800/50">
          {error}
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden border border-gray-700/60 shadow-2xl">
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: "1.5rem 2rem",
              background: "transparent",
              fontSize: "0.98rem",
              lineHeight: "1.55",
            }}
            showLineNumbers
            wrapLongLines
          >
            {code}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
}

export default function Code() {
  const [activeTab, setActiveTab] = useState("C");

  const codeSamples = {
    C: `#include "./ft_printf.h"
#include "./libft/libft.h"

static int	ft_print_sign(int input, va_list args)
{
	int	i;

	i = 0;
	if (input == 'c')
		i = print_char(va_arg(args, int));
	else if (input == 's')
		i = print_string(va_arg(args, char *));
	else if (input == 'p')
		i = print_pointer(va_arg(args, unsigned long long *));
	else if (input == 'd')
		i = print_number(va_arg(args, int));
	else if (input == 'i')
		i = print_number(va_arg(args, int));
	else if (input == 'u')
		i = print_unsigned(va_arg(args, unsigned int));
	else if (input == 'x' || input == 'X')
		i = print_hex(va_arg(args, unsigned int), input);
	return (i);
}

int	ft_printf(const char *input, ...)
{
	va_list			arguments;
	unsigned int	res;

	res = 0;
	va_start(arguments, input);
	while (*input)
	{
		if (*input == '%')
		{
			input++;
			if (ft_strchr("cspdiuxX", *input))
				res += ft_print_sign(*input, arguments);
			else if (*input == '%')
				res += write(1, "%", 1);
		}
		else
			res += write(1, input, 1);
		input++;
	}
	va_end(arguments);
	return (res);
}`,

    // JavaScript → usuwamy statyczny kod – będzie ładowany dynamicznie

    CSharp: `using System.Collections.Generic;
using JetBrains.Annotations;
using UnityEngine;

// ... (cały Twój kod C# bez zmian) ...`,

    Python: `print("Hello, World!")`,
  };

  const languageDescriptions = {
    C: (
      <>
        This is my implementation of the printf function in C.
        <br></br>
        I started learning C when I got into 42Warsaw school. There, I was
        forced to write code in a very simple form, which taught me the basics
        of how C works.
        <br />
      </>
    ),
    JavaScript: (
      <>
        JavaScript + React to mój główny język do tworzenia nowoczesnych aplikacji webowych.
        <br />
        Poniżej rzeczywisty kod komponentu pływającego czatu AI z mojej strony.
      </>
    ),
    CSharp: (
      <>
        It's my own level generation system, just like in The Binding of isaac.
        <br></br>I mainly use C# to create games in Unity.
      </>
    ),
    Python: (
      <>
        Python wybieram, gdy potrzebuję szybko prototypować, automatyzować
        zadania, analizować dane lub eksperymentować z AI/ML.
        <br />
        Używam go do narzędzi CLI, web scrapingu, przetwarzania obrazów i
        skryptów DevOps.
      </>
    ),
  };

  const tabs = Object.keys(codeSamples);

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
          className="
            text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold 
            mt-6 sm:mt-6 md:mt-6 lg:mt-6 xl:mt-6
            mb-12 md:mb-14 lg:mb-16
            pb-4 md:pb-6 lg:pb-8
            text-center 
            leading-[1.25] md:leading-[1.2] lg:leading-[1.15]
            tracking-tight
            bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 
            bg-clip-text text-transparent 
            drop-shadow-md
          "
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

        {/* Okno kodu */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.97 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative w-full max-w-5xl mx-auto bg-gray-950/70 backdrop-blur-md 
                       border border-gray-700/50 rounded-2xl shadow-2xl shadow-black/40 
                       overflow-hidden"
          >
            <div className="max-h-[500px] overflow-y-auto p-1">
              {activeTab === "JavaScript" ? (
                <CodeFromFile
                  filePath="src/components/Ai.jsx"
                  title="Komponent pływającego czatu AI"
                />
              ) : (
                <SyntaxHighlighter
                  language={
                    activeTab.toLowerCase() === "csharp"
                      ? "csharp"
                      : activeTab.toLowerCase()
                  }
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    padding: "2rem",
                    background: "transparent",
                    fontSize: "1.05rem",
                    lineHeight: "1.6",
                  }}
                  showLineNumbers
                  wrapLongLines
                >
                  {codeSamples[activeTab]}
                </SyntaxHighlighter>
              )}
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
            <h3 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent leading-[1.25]">
              {activeTab === "JavaScript" ? "JavaScript / React" : activeTab} – My Experience
            </h3>

            <p className="text-lg md:text-xl leading-[1.8] md:leading-[1.9] lg:leading-[2.0] text-gray-300">
              {languageDescriptions[activeTab]}
            </p>

            <a
              href={`https://github.com/KrzysztofMarczynski?tab=repositories&q=&type=&language=${activeTab.toLowerCase()}&sort=`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 
                         bg-gradient-to-r from-blue-600 to-indigo-600 
                         hover:from-blue-500 hover:to-indigo-500 
                         text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-700/30"
            >
              See my {activeTab === "JavaScript" ? "JS/React" : activeTab} repo on GitHub →
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}