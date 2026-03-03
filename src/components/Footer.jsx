import { Github, Linkedin, Mail, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer 
      className="
        bg-[#1E201E] text-white 
        py-6 md:py-7
        border-t border-gray-700/50
        shadow-[0_-4px_10px_rgba(0,0,0,0.4)]

        /* Na telefonie i tablecie – zwykły footer na dole strony */
        /* Na PC (od lg w górę) – fixed na dole ekranu */
        lg:fixed lg:bottom-0 lg:left-0 lg:right-0 lg:z-50
      "
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        
        <p className="font-medium text-base md:text-lg">
          Connect with me
        </p>

        <div className="flex items-center justify-center gap-6 md:gap-8">
          <a href="https://github.com/KrzysztofMarczynski" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
            <Github className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/in/krzysztof-marczyński-559072354/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="https://www.instagram.com/tomat0photo/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="mailto:krzysztofmarczynski4@gmail.com" className="hover:text-red-400 transition-colors">
            <Mail className="w-6 h-6" />
          </a>
        </div>

        <p className="text-xs md:text-sm text-white/70">
          © {new Date().getFullYear()} Krzysztof
        </p>
      </div>
    </footer>
  );
}