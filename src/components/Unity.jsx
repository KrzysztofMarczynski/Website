import gif1 from '/gif1.gif';
import gif2 from '/gif2.gif';

export default function Unity() {
  return (
    <>
      {/* VIDEO SECTION */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <iframe
            className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2"
            src="https://www.youtube.com/embed/KufwP77IBDc?autoplay=1&mute=1&loop=1&playlist=KufwP77IBDc&controls=0&showinfo=0&modestbranding=1&rel=0"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>

        <div className="absolute inset-0 bg-black/40 z-10" />

        <div className="relative z-20 flex items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold">Unity Projects</h1>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="w-full bg-gray-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-12">
          
          {/* TEXT AND DESCRIPTION */}
          <div className="md:w-1/2">
            <p className="text-lg md:text-xl mb-6">
              Tworzę gry, prototypy i eksperymenty w Unity – od prostych mechanik po kompletne środowiska 3D.  
              Każdy projekt to unikalne wyzwanie, w którym sprawdzam gameplay, interakcje i wizualne eksperymenty.
            </p>
            <ul className="list-disc ml-5 space-y-3 text-left">
              <li><strong>Projekt 1:</strong> Eksperyment z fizyką i ruchem postaci w 2D.</li>
              <li><strong>Projekt 2:</strong> Mini-gry z różnymi typami kamer i animacji.</li>
              <li><strong>Projekt 3:</strong> Środowiska 3D z interaktywnymi obiektami.</li>
            </ul>
          </div>

          {/* GIFs */}
          <div className="md:w-1/2 flex flex-col gap-6 items-center md:items-start">
            <img src={gif1} alt="Demo 1" className="w-full max-w-sm rounded-lg shadow-lg" />
            <img src={gif2} alt="Demo 2" className="w-full max-w-sm rounded-lg shadow-lg" />
          </div>

        </div>
      </section>
    </>
  );
}
