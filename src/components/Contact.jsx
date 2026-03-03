import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";

export default function Contact() {
  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "krzysztofmarczynski4@gmail.com",
      href: "mailto:krzysztofmarczynski4@gmail.com",
      color: "hover:text-red-400",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/KrzysztofMarczynski",
      href: "https://github.com/KrzysztofMarczynski",
      color: "hover:text-blue-400",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/krzysztof-marczyński",
      href: "https://www.linkedin.com/in/krzysztof-marczyński-559072354/",
      color: "hover:text-blue-500",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "instagram.com/tomat0photo",
      href: "https://www.instagram.com/tomat0photo/?hl=en",
      color: "hover:text-pink-400",
    },
  ];

  return (
    <section
      id="Contact"
      className="relative min-h-screen flex items-center py-12 px-5 md:px-10 lg:px-16 
                 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        
        {/* Nagłówek */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16
                     bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 
                     bg-clip-text text-transparent drop-shadow-md"
        >
          Contact Me
        </motion.h2>

        {/* Karty kontaktowe */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
        >
          {contactLinks.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group bg-gray-900/70 border border-gray-700 hover:border-gray-500 
                         rounded-2xl p-8 flex flex-col items-center text-center 
                         transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/20"
            >
              <div className={`p-4 rounded-full bg-gray-800 mb-6 transition-colors ${item.color}`}>
                <item.icon className="w-9 h-9" />
              </div>
              <p className="text-xl font-medium text-white mb-1">{item.label}</p>
              <p className="text-gray-400 text-sm break-all">{item.value}</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}