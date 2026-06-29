import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "ABOUT", id: "hero" },
  { label: "CODE", id: "code" },
  { label: "3D PRINT", id: "3d-print" },
  { label: "UNITY", id: "unity-games" },
  { label: "PHOTO", id: "Photo_to_playlist" },
  { label: "CONTACT", id: "contact" },
];

const NAV_OFFSET = 96;

export default function Navbar() {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const [buttonPos, setButtonPos] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  const updateButtonPosition = useCallback(() => {
    if (!buttonRef.current) {
      return;
    }

    const rect = buttonRef.current.getBoundingClientRect();

    setButtonPos({
      top: rect.top + rect.height / 2,
      left: rect.left + rect.width / 2,
    });
  }, []);

  useEffect(() => {
    updateButtonPosition();

    const handleResize = () => {
      updateButtonPosition();

      if (window.innerWidth >= 768) {
        setMobileMenuIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", updateButtonPosition, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", updateButtonPosition);
    };
  }, [updateButtonPosition]);

  useEffect(() => {
    if (!mobileMenuIsOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileMenuIsOpen]);

  useEffect(() => {
    if (!mobileMenuIsOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileMenuIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuIsOpen]);

  const handleScroll = (id) => {
    const section = document.getElementById(id);

    if (section) {
      const y =
        section.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;

      window.scrollTo({
        top: Math.max(y, 0),
        behavior: "smooth",
      });
    }

    setMobileMenuIsOpen(false);
  };

  const openMobileMenu = () => {
    updateButtonPosition();
    setMobileMenuIsOpen(true);
  };

  return (
    <>
      <nav
        className={`fixed left-4 right-4 top-4 z-[120] transition-all duration-300 md:left-6 md:right-6 md:top-6 ${
          mobileMenuIsOpen
            ? "pointer-events-none -translate-y-2 opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full border border-white/70 bg-white/90 px-5 shadow-[0_18px_60px_rgba(0,0,0,0.16)] backdrop-blur-xl sm:h-16 md:px-8">
          <button
            type="button"
            onClick={() => handleScroll("hero")}
            className="group flex h-10 w-10 items-center justify-center rounded-full text-sm font-black text-black transition-all duration-300 hover:bg-black hover:text-white active:scale-95"
            aria-label="Scroll to top"
          >
            <span className="leading-none">KM</span>
          </button>

          <div className="hidden items-center gap-6 lg:gap-9 md:flex">
            {NAV_LINKS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleScroll(item.id)}
                className="relative text-xs font-bold uppercase tracking-normal text-black transition-colors duration-300 hover:text-black/60 lg:text-sm after:absolute after:left-0 after:top-[calc(100%+6px)] after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-black after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="relative h-11 w-11 md:hidden">
            <button
              ref={buttonRef}
              type="button"
              onClick={openMobileMenu}
              className={`absolute inset-0 flex items-center justify-center rounded-full text-black transition-all duration-300 hover:bg-black hover:text-white active:scale-95 ${
                mobileMenuIsOpen
                  ? "pointer-events-none opacity-0"
                  : "opacity-100"
              }`}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuIsOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuIsOpen && buttonPos.top > 0 && (
        <button
          type="button"
          onClick={() => setMobileMenuIsOpen(false)}
          style={{
            top: `${buttonPos.top}px`,
            left: `${buttonPos.left}px`,
            transform: "translate(-50%, -50%)",
          }}
          className="fixed z-[160] flex h-11 w-11 items-center justify-center rounded-full text-white transition-transform duration-300 active:scale-90"
          aria-label="Close navigation menu"
        >
          <X className="h-7 w-7" />
        </button>
      )}

      <div
        className={`fixed inset-0 z-[140] overflow-hidden md:hidden ${
          mobileMenuIsOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!mobileMenuIsOpen}
      >
        <div
          className="fixed h-0 w-0 rounded-full bg-[#0b0b0b] transition-[width,height] duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            top: `${buttonPos.top}px`,
            left: `${buttonPos.left}px`,
            transform: "translate(-50%, -50%)",
            width: mobileMenuIsOpen ? "300vmax" : "0",
            height: mobileMenuIsOpen ? "300vmax" : "0",
          }}
        />

        <div className="relative z-[150] flex min-h-screen flex-col px-6 py-6 text-white">
          <div
            className={`flex h-14 items-center justify-between transition-all duration-500 ${
              mobileMenuIsOpen
                ? "translate-y-0 opacity-100 delay-150"
                : "-translate-y-2 opacity-0"
            }`}
          >
            <button
              type="button"
              onClick={() => handleScroll("hero")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-sm font-black transition-all duration-300 active:scale-95"
              aria-label="Scroll to top"
            >
              KM
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-6 pb-16">
            {NAV_LINKS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleScroll(item.id)}
                style={{
                  transitionDelay: mobileMenuIsOpen
                    ? `${220 + index * 60}ms`
                    : "0ms",
                }}
                className={`text-4xl font-black uppercase leading-none text-white transition-all duration-500 active:scale-95 sm:text-5xl ${
                  mobileMenuIsOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}