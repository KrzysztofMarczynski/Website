import { Menu, X, Gamepad } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const [buttonPos, setButtonPos] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  // dodana zakładka AI jako pierwsza
  const links = ["AI", "3D Print", "Unity Games", "Arduino", "Code"];
  const contact = "Contact";

  // Pobranie pozycji przycisku burgera
  useEffect(() => {
    const updatePos = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setButtonPos({
          top: rect.top + rect.height / 2,
          left: rect.left + rect.width / 2,
        });
      }
    };
    updatePos();
    window.addEventListener("resize", updatePos);
    return () => window.removeEventListener("resize", updatePos);
  }, []);

  // Blokada scrollowania przy otwartym menu
  useEffect(() => {
    document.body.style.overflow = mobileMenuIsOpen ? "hidden" : "auto";
  }, [mobileMenuIsOpen]);

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMobileMenuIsOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-4 left-4 right-4 z-[60] transition-opacity duration-300
        ${mobileMenuIsOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <div
          className="max-w-7xl mx-auto px-8 rounded-2xl"
          style={{ background: "linear-gradient(90deg, #1E201E, #1E201E)" }}
        >
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div
              className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Gamepad className="w-10 h-10 text-white" />
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex space-x-8">
              {[...links, contact].map((item) => (
                <button
                  key={item}
                  onClick={() => handleScroll(item)}
                  className="font-bold text-xl text-white cursor-pointer
                  transition-all duration-300
                  hover:text-white hover:scale-105"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile burger */}
            <div className="md:hidden relative w-11 h-11">
              <button
                ref={buttonRef}
                onClick={() => setMobileMenuIsOpen(true)}
                className={`absolute inset-0 flex items-center justify-center
                  cursor-pointer transition-opacity duration-200
                  ${mobileMenuIsOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
              >
                <Menu className="w-7 h-7 text-white transition-transform duration-200 active:scale-90" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* X — fixed nad body */}
      {mobileMenuIsOpen && buttonPos.top > 0 && (
        <button
          onClick={() => setMobileMenuIsOpen(false)}
          style={{
            top: `${buttonPos.top}px`,
            left: `${buttonPos.left}px`,
            transform: "translate(-50%, -50%)",
          }}
          className="fixed z-[50] w-11 h-11 flex items-center justify-center cursor-pointer"
        >
          <X className="w-7 h-7 text-white drop-shadow-md transition-transform duration-300 active:rotate-90 active:scale-90" />
        </button>
      )}

      {/* FULLSCREEN OVERLAY */}
      <div
        className={`fixed inset-0 z-[40] md:hidden overflow-hidden
        ${mobileMenuIsOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* CIRCULAR REVEAL */}
        <div
          className={`fixed w-0 h-0 rounded-full bg-[#1E201E]
          transition-[width,height] duration-[900ms] ease-[cubic-bezier(.4,0,.2,1)]`}
          style={{
            top: `${buttonPos.top}px`,
            left: `${buttonPos.left}px`,
            transform: "translate(-50%, -50%)",
            width: mobileMenuIsOpen ? "300vmax" : "0",
            height: mobileMenuIsOpen ? "300vmax" : "0",
          }}
        />

        {/* MENU CONTENT */}
        <div className="relative z-[45] h-full flex flex-col">
          <div
            className={`flex-1 flex flex-col items-center justify-center space-y-8
            transition-all
            ${
              mobileMenuIsOpen
                ? "opacity-100 translate-y-0 duration-500 delay-200"
                : "opacity-0 translate-y-4 duration-150"
            }`}
          >
            {links.map((item, i) => (
              <button
                key={item}
                onClick={() => handleScroll(item)}
                style={{
                  transitionDelay: mobileMenuIsOpen ? `${i * 70}ms` : "0ms",
                }}
                className={`relative text-3xl font-bold text-white cursor-pointer
                transition-all duration-300 hover:scale-110
                after:absolute after:left-0 after:-bottom-2
                after:h-[2px] after:w-0 after:bg-white
                after:transition-all after:duration-300 hover:after:w-full
                ${mobileMenuIsOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* CONTACT BUTTON */}
          <div
            className={`pb-16 flex justify-center transition-all
            ${mobileMenuIsOpen ? "opacity-100 translate-y-0 duration-500 delay-300" : "opacity-0 translate-y-2 duration-100"}`}
          >
            <button
              onClick={() => handleScroll(contact)}
              className="px-10 py-4 text-xl font-bold rounded-full
              bg-white text-[#403d39] cursor-pointer
              hover:bg-[#eb5e28] hover:text-white transition-all active:scale-95"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
