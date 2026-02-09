export default function Arduino() {
  const photos = [
    {
      id: 1,
      src: "1.png",
      title: "Automatyczne Oświetlenie LED",
      description:
        "Na zdjęciu widać mój projekt automatycznego oświetlenia LED – lampki reagują na ruch i tworzą efekt dynamicznego światła w pokoju."
    },
    {
      id: 2,
      src: "2.png",
      title: "Mini Robot Arduino",
      description:
        "Tutaj przedstawiam mini robota zbudowanego na Arduino. Robot potrafi poruszać się po torze i omijać przeszkody dzięki czujnikom."
    }
  ];

  return (
    <section className="w-full bg-gray-900">

      {/* VIDEO SECTION */}
      <div className="relative w-full h-screen overflow-hidden">

        {/* VIDEO BACKGROUND */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <iframe
            className="absolute top-1/2 left-1/2 w-[200vw] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2"
            src="https://www.youtube.com/embed/QxPBCBX8ac8?autoplay=1&mute=1&loop=1&playlist=QxPBCBX8ac8&controls=0&showinfo=0&modestbranding=1&rel=0"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* CENTER TEXT */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold drop-shadow-lg mb-4 text-white">
            Arduino Uno
          </h1>
        </div>
      </div>

      {/* TEKST O PROJEKTACH */}
      <div className="max-w-3xl mx-auto text-center py-16 px-4 text-lg md:text-xl space-y-6 text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 drop-shadow-md">
          Arduino Projects
        </h2>

        {/* Sekcja 1: Wstęp */}
        <div className="space-y-4">
          <h3 className="text-2xl md:text-3xl font-semibold mb-2">Wstęp</h3>
          <p>
            Arduino pozwala mi realizować pomysły związane z elektroniką i interaktywnymi projektami. 
            Dzięki niemu mogę tworzyć urządzenia sterowane cyfrowo, czujniki, oświetlenie czy mini-gry. 
            To doskonały sposób na łączenie kreatywności z technologią.
          </p>
        </div>

        {/* Sekcja 2: Projekty i doświadczenie */}
        <div className="space-y-4 mt-8">
          <h3 className="text-2xl md:text-3xl font-semibold mb-2">Projekty i doświadczenie</h3>
          <p>
            Tworzyłem projekty takie jak: automatyczne oświetlenie LED, mini-roboty, sterowanie 
            silnikami czy interaktywne urządzenia do mojej planszówki. Każdy projekt wymaga 
            dokładnego planowania, programowania i testowania.
          </p>
          <p>
            Praca z Arduino pozwala mi eksperymentować z elektroniką i jednocześnie rozwijać 
            umiejętności programowania w C/C++ oraz logicznego myślenia.
          </p>
        </div>

        {/* Sekcja 3: Inspiracja */}
        <div className="space-y-4 mt-8">
          <h3 className="text-2xl md:text-3xl font-semibold mb-2">Inspiracja</h3>
          <p>
            Moim celem jest tworzenie projektów, które łączą fizyczne obiekty z interaktywnymi 
            doświadczeniami. Arduino daje mi możliwość realizowania pomysłów, które trudno 
            byłoby zrealizować tradycyjnymi metodami.
          </p>
          <p>
            Chcę, aby każdy projekt był nie tylko funkcjonalny, ale także estetyczny i przyjemny 
            w użytkowaniu – dlatego dokładam dużą uwagę do designu i detali.
          </p>
        </div>
      </div>

      {/* GALERIA ZDJĘĆ */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 px-4 py-16">
        {photos.map((photo) => (
          <div key={photo.id} className="text-center">
            <img
              src={photo.src}
              alt={photo.title}
              className="w-full h-64 object-cover rounded-xl shadow-lg mb-4"
            />
            <h3 className="text-white text-xl font-semibold mb-2">{photo.title}</h3>
            <p className="text-white">{photo.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
