import { Github, Instagram, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

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
      className="relative overflow-hidden bg-white px-5 py-20 text-zinc-950 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 border-t border-zinc-200 pt-8"
        >
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <p className="mb-4 text-sm font-bold uppercase text-zinc-400">
                Contact
              </p>
              <h2 className="text-4xl font-black uppercase leading-[0.98] sm:text-5xl md:text-7xl lg:text-8xl">
                LET'S
                <br />
                CONNECT
              </h2>
            </div>

            <p className="max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg lg:pt-2 xl:text-xl">
              Feel free to contact me if you would like to collaborate,
              discuss game development, software engineering or simply say hi.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
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
              whileHover={{ y: -6 }}
              className="group flex min-h-[220px] flex-col rounded-[1.8rem] border border-zinc-200 bg-white p-7 shadow-[0_18px_60px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-zinc-900 hover:bg-zinc-950"
            >
              <div className="mb-10 flex items-center justify-between">
                <div className="rounded-full border border-zinc-200 bg-zinc-100 p-4 transition group-hover:border-white/10 group-hover:bg-white group-hover:text-zinc-950">
                  <item.icon className="h-7 w-7"/>
                </div>
                <ArrowUpRight className="h-5 w-5 text-zinc-400 transition group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/>
              </div>

              <div className="mt-auto">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-zinc-400 group-hover:text-white/50">
                  {item.label}
                </p>
                <h3 className="break-all text-lg font-bold text-zinc-950 group-hover:text-white">
                  {item.value}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
