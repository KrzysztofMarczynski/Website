import { Github, Linkedin, Mail, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1E201E] text-white py-8 flex flex-col items-center space-y-4">
      {/* Nagłówek / info */}
      <p className="font-semibold text-lg">Connect with me</p>

      {/* Ikony linków */}
      <div className="flex space-x-6">
        <a
          href="https://github.com/KrzysztofMarczynski" 
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
          aria-label="GitHub"
        >
          <Github className="w-6 h-6" />
        </a>
        <a
          href="https://www.linkedin.com/in/krzysztof-marczyński-559072354/" 
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-6 h-6" />
        </a>
        <a
          href="https://www.instagram.com/tomat0photo/?hl=en" 
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
          aria-label="Instagram"
        >
          <Instagram className="w-6 h-6" />
        </a>
        <a
          href="mailto:krzysztofmarczynski4@gmail.com" 
          className="hover:text-white transition-colors"
          aria-label="Email"
        >
          <Mail className="w-6 h-6" />
        </a>
      </div>

      {/* Prawa autorskie */}
      <p className="text-sm text-white/80 mt-4">
        © {new Date().getFullYear()} Krzysztof. All rights reserved.
      </p>
    </footer>
  );
}
