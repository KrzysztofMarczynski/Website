import { useEffect, useState } from "react";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) =>
      setMousePosition({ x: e.clientX, y: e.clientY });

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const topImages = [1, 2, 3, 4, 5, 8, 9, 10, 11, 12];
  const bottomImages = [1, 2, 3, 4, 5, 8, 9, 10, 11, 12];

  return (
    <section className="relative min-h-screen pt-24 px-4 overflow-hidden bg-gray-900">
      {/* efekt myszki */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59,130,246,0.07), transparent 40%)`,
        }}
      />

      {/* tekst */}
      <div className="relative z-10 text-center max-w-3xl mx-auto text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-md">
          Welcome to my website!
        </h1>
        <p className="text-lg md:text-xl mb-4">
          My name is <b>Krzysztof</b> and I love to create and experience new things.
        </p>
        <p className="text-lg md:text-xl mb-4">
          I design board games, create 3D prints and explore new ideas.
        </p>
        <p className="text-lg md:text-xl">
          I enjoy collaborating with people and building cool stuff.
        </p>
      </div>

      {/* ===== PASEK GÓRNY ===== */}
      <div className="mt-16 overflow-hidden">
        <div className="scroll-left">
          {[...topImages, ...topImages].map((i, idx) => (
            <img
              key={idx}
              src={`${i}.png`}
              className="scroll-img"
              alt=""
            />
          ))}
        </div>
      </div>

      {/* ===== PASEK DOLNY ===== */}
      <div className="mt-6 overflow-hidden">
        <div className="scroll-right">
          {[...bottomImages, ...bottomImages].map((i, idx) => (
            <img
              key={idx}
              src={`${i}.png`}
              className="scroll-img"
              alt=""
            />
          ))}
        </div>
      </div>

      {/* ===== PASEK TRZECI (jak górny) ===== */}
      <div className="mt-6 overflow-hidden mb-24">
        <div className="scroll-left">
          {[...topImages, ...topImages].map((i, idx) => (
            <img
              key={`third-${idx}`}
              src={`${i}.png`}
              className="scroll-img"
              alt=""
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .scroll-left,
        .scroll-right {
          display: flex;
          width: max-content;
        }

        .scroll-left {
          animation: scrollLeft 65s linear infinite;
        }

        .scroll-right {
          animation: scrollRight 65s linear infinite;
        }

        .scroll-img {
          width: 260px;
          height: 160px;
          margin-right: 16px;
          object-fit: cover;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
        }

        @keyframes scrollLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes scrollRight {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
