import { Github, Linkedin, Mail, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer 
      className="
        fixed bottom-0 left-0 right-0 z-50
        bg-[#1E201E] text-white 
        py-4 md:py-5 lg:py-6
        border-t border-gray-700/50
        shadow-[0_-4px_10px_rgba(0,0,0,0.4)]
      "
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        
        {/* Lewa / środek – connect */}
        <p className="font-medium text-base md:text-lg">
          Connect with me
        </p>

        {/* Ikony social */}
        <div className="flex items-center justify-center gap-6 md:gap-8">
          <a href="https://github.com/KrzysztofMarczynski" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors" aria-label="GitHub">
            <Github className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/in/krzysztof-marczyński-559072354/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors" aria-label="LinkedIn">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="https://www.instagram.com/tomat0photo/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors" aria-label="Instagram">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="mailto:krzysztofmarczynski4@gmail.com" className="hover:text-red-400 transition-colors" aria-label="Email">
            <Mail className="w-6 h-6" />
          </a>
        </div>

        {/* Prawa autorskie – mniejsze na mobile */}
        <p className="text-xs md:text-sm text-white/70">
          © {new Date().getFullYear()} Krzysztof
        </p>
      </div>
    </footer>
  );
}