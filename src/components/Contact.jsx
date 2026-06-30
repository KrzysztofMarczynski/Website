import { Github, Instagram, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const contactIntro =
  "Feel free to contact me if you would like to collaborate, discuss game development, software engineering or simply say hi.";

export default function Contact() {
  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "krzysztofmarczynski4@gmail.com",
      href: "mailto:krzysztofmarczynski4@gmail.com",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/KrzysztofMarczynski",
      href: "https://github.com/KrzysztofMarczynski",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/krzysztof-marczynski",
      href: "https://www.linkedin.com/in/krzysztof-marczy%C5%84ski-559072354/",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@tomat0photo",
      href: "https://www.instagram.com/tomat0photo/?hl=en",
    },
  ];

  return (
    <section
      id="Contact"
      className="relative overflow-hidden bg-white px-5 py-10 text-zinc-950 md:px-10 md:py-12 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 border-t border-zinc-200 pt-5"
        >
          <div className="grid gap-4 lg:grid-cols-[max-content_minmax(0,1fr)] lg:items-start lg:gap-8">
            <div className="text-center lg:text-left">
              <p className="mb-2 text-xs font-bold uppercase text-zinc-400">
                Contact
              </p>
              <h2 className="text-4xl font-black uppercase leading-none sm:text-5xl md:text-6xl">
                Let's connect
              </h2>
            </div>

            <div className="mx-auto max-w-2xl rounded-[1.5rem] border border-zinc-200 bg-white p-4 lg:mx-0">
              <p className="mb-2 text-xs font-bold uppercase text-zinc-400">
                Available for
              </p>
              <p className="text-sm leading-relaxed text-zinc-600 md:text-base">
                {contactIntro}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {contactLinks.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -3 }}
              className="group flex items-center gap-3 rounded-full border border-zinc-200 bg-white p-3 pr-4 transition-all duration-300 hover:border-zinc-900 hover:bg-zinc-950"
            >
              <div className="shrink-0 rounded-full border border-zinc-200 bg-zinc-100 p-2.5 transition group-hover:border-white/10 group-hover:bg-white group-hover:text-zinc-950">
                <item.icon className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wide text-zinc-400 group-hover:text-white/50">
                  {item.label}
                </p>
                <h3 className="truncate text-sm font-bold text-zinc-950 group-hover:text-white">
                  {item.value}
                </h3>
              </div>

              <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
