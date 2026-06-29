import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "krzysztofmarczynski4@gmail.com",
      href: "mailto:krzysztofmarczynski4@gmail.com",
      color: "group-hover:text-red-500",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/KrzysztofMarczynski",
      href: "https://github.com/KrzysztofMarczynski",
      color: "group-hover:text-zinc-950",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/krzysztof-marczynski",
      href: "https://www.linkedin.com/in/krzysztof-marczy%C5%84ski-559072354/",
      color: "group-hover:text-blue-600",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "instagram.com/tomat0photo",
      href: "https://www.instagram.com/tomat0photo/?hl=en",
      color: "group-hover:text-pink-500",
    },
  ];

  return (
    <section
      id="Contact"
      className="relative flex min-h-screen items-center overflow-hidden bg-white px-5 py-12 text-zinc-950 md:px-10 lg:px-16"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center text-4xl font-bold text-zinc-950 md:text-5xl lg:text-6xl"
        >
          Contact Me
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {contactLinks.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={
                item.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.04, y: -5 }}
              className="group flex flex-col items-center rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-[0_18px_60px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-zinc-300 hover:shadow-[0_24px_80px_rgba(15,23,42,0.12)]"
            >
              <div
                className={`mb-6 rounded-full bg-zinc-100 p-4 text-zinc-700 transition-colors duration-300 ${item.color}`}
              >
                <item.icon className="h-9 w-9" />
              </div>
              <p className="mb-1 text-xl font-medium text-zinc-950">
                {item.label}
              </p>
              <p className="break-all text-sm text-zinc-500">{item.value}</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}