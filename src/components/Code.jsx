import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Braces, Code2, Terminal } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

const codeProjects = [
  {
    id: "C",
    label: "C",
    name: "ft_printf",
    eyebrow: "Low-level programming",
    repo: "ft_printf",
    filePath: "ft_printf.c",
    language: "c",
    title: "Printf implementation in C",
    description:
      "My own printf implementation. It helped me understand variadic arguments, data formatting, parsing, and precise text output at a lower level.",
    details: ["Variadic arguments", "Format parsing", "Manual control"],
  },
  {
    id: "JavaScript",
    label: "JS",
    name: "Portfolio UI",
    eyebrow: "Frontend engineering",
    repo: "Website",
    filePath: "src/components/Ai.jsx",
    language: "jsx",
    title: "React component architecture",
    description:
      "JavaScript and React helped me build a clear portfolio experience, connect UI with APIs, and present my projects in an interactive way.",
    details: ["React", "UI state", "API requests"],
  },
  {
    id: "CSharp",
    label: "C#",
    name: "Level generator",
    eyebrow: "Game systems",
    repo: "RogueLike-Level-Generation-System",
    filePath: "LevelGenerator.cs",
    language: "csharp",
    title: "Roguelike room generation",
    description:
      "A Binding of Isaac style level generation system for my game. It focuses on modular rooms, rules, and flexible generation parameters.",
    details: ["Unity", "Procedural logic", "Game design"],
  },
  {
    id: "Python",
    label: "PY",
    name: "AI assistant API",
    eyebrow: "Backend learning",
    repo: "Website",
    filePath: "api/index.py",
    language: "python",
    title: "AI assistant backend",
    description:
      "This backend file supports the AI assistant on the site and connects the interface with server-side logic.",
    details: ["API route", "PY", "AI support"],
  },
];

const codeHighlights = [
  "Low-level C",
  "React UI",
  "Unity logic",
  "PY API",
];

const codeIntro =
  "A compact look at the languages and systems I use: from low-level C exercises, through React UI work, to Unity game logic and PY API experiments.";

function CodeFromFile({ filePath, repo, language = "python" }) {
  const [code, setCode] = useState("// Loading from GitHub");
  const [error, setError] = useState(null);

  useEffect(() => {
    const rawUrl = `https://raw.githubusercontent.com/KrzysztofMarczynski/${repo}/main/${filePath}`;

    setCode("// Loading from GitHub");
    setError(null);

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
      <div className="flex min-h-[24rem] items-center justify-center rounded-b-[1.75rem] bg-red-50 p-8 text-center">
        <p className="max-w-md text-base font-medium text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-h-[18rem] overflow-x-auto overflow-y-auto rounded-b-[1.75rem] bg-zinc-950 sm:max-h-[24rem] md:max-h-[28rem] lg:max-h-[34rem]">
      <SyntaxHighlighter
        language={language}
        style={dracula}
        customStyle={{
          margin: 0,
          padding: "0.75rem",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          background: "transparent",
          fontSize: "0.7rem",
          lineHeight: "1.4",
          minHeight: "16rem",
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

  const activeProject = useMemo(
    () =>
      codeProjects.find((project) => project.id === activeTab) ||
      codeProjects[0],
    [activeTab],
  );

  const githubFileLink = `https://github.com/KrzysztofMarczynski/${activeProject.repo}/blob/main/${activeProject.filePath}`;

  return (
    <section
      id="Code"
      className="relative bg-white px-4 py-10 text-zinc-950 sm:px-5 md:px-10 md:py-14 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 border-t border-zinc-200 pt-6 md:mb-10"
        >
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div className="text-center lg:text-left">
              <p className="mb-3 text-sm font-bold uppercase text-zinc-400">
                Code archive
              </p>
              <div className="mx-auto mb-5 max-w-2xl lg:mx-0 lg:hidden">
                <p className="mb-2 text-xs font-bold uppercase text-zinc-400">
                  Focus stack
                </p>
                <p className="mb-4 text-sm leading-relaxed text-zinc-600">
                  {codeIntro}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {codeHighlights.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-zinc-100 px-3 py-2 text-center text-xs font-bold text-zinc-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <h2 className="text-2xl font-black uppercase leading-[0.98] tracking-normal text-zinc-950 sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl">
                Code & experience
              </h2>
            </div>

            <div className="hidden max-w-2xl lg:block">
              <p className="mb-3 text-xs font-bold uppercase text-zinc-400">
                Focus stack
              </p>
              <p className="mb-4 text-base leading-relaxed text-zinc-600">
                {codeIntro}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {codeHighlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-zinc-100 px-4 py-2 text-center text-sm font-bold text-zinc-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col gap-5 sm:gap-6 lg:grid lg:grid-cols-[20rem_1fr] xl:grid-cols-[22rem_1fr]">
          <motion.aside
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-2 sm:gap-3 lg:block lg:space-y-3"
          >
            {codeProjects.map((project) => {
              const isActive = activeProject.id === project.id;

              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setActiveTab(project.id)}
                  className={`group flex h-14 w-full items-center gap-3 rounded-[1rem] border px-3 text-left transition-colors duration-300 sm:h-16 sm:px-4 sm:rounded-[1.25rem] lg:block lg:h-auto lg:min-h-0 lg:w-full lg:rounded-[1.35rem] lg:p-5 lg:transition-all ${
                    isActive
                      ? "border-zinc-950 bg-zinc-950 text-white"
                      : "border-zinc-200 bg-white text-zinc-950 lg:hover:-translate-y-0.5 lg:hover:border-zinc-400"
                  }`}
                >
                  <div className="flex shrink-0 items-center justify-between gap-2 sm:gap-4 lg:mb-5">
                    <span
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-black sm:h-9 sm:w-9 sm:text-sm lg:h-10 lg:w-10 ${
                        isActive
                          ? "border-white/20 bg-white text-zinc-950"
                          : "border-zinc-200 bg-zinc-50 text-zinc-950"
                      }`}
                    >
                      {project.label}
                    </span>
                    <ArrowUpRight
                      className={`hidden h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-5 sm:w-5 lg:block ${
                        isActive ? "text-white" : "text-zinc-400"
                      }`}
                    />
                  </div>

                  <p
                    className={`mb-2 hidden text-xs font-bold uppercase sm:text-xs lg:block ${
                      isActive ? "text-white/50" : "text-zinc-400"
                    }`}
                  >
                    {project.eyebrow}
                  </p>
                  <h3 className="min-w-0 truncate text-xs font-bold leading-tight sm:text-sm lg:text-lg">
                    {project.name}
                  </h3>
                </button>
              );
            })}
          </motion.aside>

          <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeProject.id}-description`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-2 rounded-[1.75rem] border border-zinc-200 bg-white p-2.5 sm:gap-3 sm:p-3 md:gap-5 md:grid-cols-[1fr_auto] md:items-center md:p-6 md:min-h-[160px]"
              >
                <div>
                  <p className="mb-2 text-xs font-bold uppercase text-zinc-400 sm:text-sm">
                    {activeProject.eyebrow}
                  </p>
                  <h3 className="text-base font-bold leading-tight text-zinc-950 sm:text-xl md:text-2xl lg:text-4xl">
                    {activeProject.title}
                  </h3>
                  <p className="mt-3 max-w-3xl text-xs leading-relaxed text-zinc-600 sm:text-sm md:text-base">
                    {activeProject.description}
                  </p>
                </div>

                <a
                  href={githubFileLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-1.5 rounded-full bg-zinc-950 px-3 py-2 text-xs font-bold uppercase text-white transition-all duration-300 sm:gap-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 md:text-sm md:inline-flex md:w-auto hover:-translate-y-0.5 hover:bg-zinc-800 active:scale-95"
                >
                  GitHub
                  <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </a>
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-[1.75rem] border border-zinc-800 bg-zinc-950"
            >
              <div className="flex flex-col gap-2 border-b border-white/10 bg-zinc-900 px-3 py-3 sm:gap-4 sm:px-5 sm:py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400 sm:h-3 sm:w-3" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-300 sm:h-3 sm:w-3" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400 sm:h-3 sm:w-3" />
                </div>

                <div className="flex min-w-0 items-center gap-2 text-xs font-medium text-zinc-400 sm:text-sm">
                  <Terminal className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                  <span className="truncate">{activeProject.filePath}</span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeProject.id}-code`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <CodeFromFile
                    filePath={activeProject.filePath}
                    repo={activeProject.repo}
                    language={activeProject.language}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeProject.id}-details`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-1.5 gap-y-2 grid-cols-2 sm:gap-2 sm:gap-y-3 md:gap-3 md:grid-cols-3"
              >
                {activeProject.details.map((detail) => (
                  <div
                    key={detail}
                    className="flex min-h-10 items-center justify-center gap-1 rounded-full border border-zinc-200 bg-white px-2 py-1.5 text-center text-xs font-bold text-zinc-700 sm:min-h-12 sm:gap-1.5 sm:px-3 sm:py-2 md:min-h-14 md:gap-2 md:px-5 md:py-3 md:text-sm"
                  >
                    {detail === "React" || detail === "PY" ? (
                      <Code2 className="h-3 w-3 text-zinc-400 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                    ) : (
                      <Braces className="h-3 w-3 text-zinc-400 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                    )}
                    {detail}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
