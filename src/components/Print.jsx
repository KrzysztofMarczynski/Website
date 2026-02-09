export default function Print() {
  const prints = [
    {
      id: 1,
      src: "1.png",
      title: "Figurka Smoka",
      description:
        "Precyzyjna figurka smoka z detalami łusek i ogona, wydrukowana w wysokiej rozdzielczości."
    },
    {
      id: 2,
      src: "2.png",
      title: "Pionki Planszówki",
      description:
        "Zestaw pionków do gry planszowej w różnych kolorach, ergonomiczne i estetyczne."
    },
    {
      id: 3,
      src: "3.png",
      title: "Element Dekoracyjny",
      description:
        "Nowoczesny element dekoracyjny do biurka lub półki, łączący design z funkcjonalnością."
    }
  ];

  return (
    <section className="w-full bg-gray-900">

      {/* VIDEO SECTION */}
      <div className="relative w-full h-screen overflow-hidden">

        {/* VIDEO BACKGROUND (rozszerzone horyzontalnie) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <iframe
            className="absolute top-1/2 left-1/2 w-[200vw] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2"
            src="https://www.youtube.com/embed/bgHoQ_5dT2M?autoplay=1&mute=1&loop=1&playlist=bgHoQ_5dT2M&controls=0&showinfo=0&modestbranding=1&rel=0"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* CENTER TEXT */}
        <div className="relative z-20 flex items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold drop-shadow-lg">
            3D Printing
          </h1>
        </div>
      </div>

      {/* TEKST O DRUKOWANIU */}
      <div className="text-white max-w-3xl mx-auto text-center py-12 px-4 text-lg md:text-xl space-y-4">
        <p>
          Moje projekty 3D powstają z pasją i dbałością o każdy detal. Eksperymentuję z różnymi
          kształtami, kolorami i technologiami druku, aby każdy wydruk był zarówno estetyczny,
          jak i funkcjonalny.
        </p>
        <p>
          Drukuję zarówno elementy do własnych planszówek, figurki, jak i praktyczne gadżety.
          Każdy projekt staram się dopracować tak, aby dawał satysfakcję w użytkowaniu i
          prezentował się profesjonalnie.
        </p>
      </div>

      {/* GALERIA WYDRUKÓW */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 px-4 pb-16">
        {prints.map((print) => (
          <div key={print.id} className="text-center">
            <img
              src={print.src}
              alt={print.title}
              className="w-full h-64 object-cover rounded-xl shadow-lg mb-4"
            />
            <h3 className="text-white text-xl font-semibold mb-2">{print.title}</h3>
            <p className="text-white">{print.description}</p>
          </div>
        ))}
      </div>

    </section>
  );
}
