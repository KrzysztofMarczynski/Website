export default function Contact() {
  return (
    <section
      id="Contact"
      className=" sm:py-24 bg-gray-900 text-white flex flex-col items-center"
    >
      {/* Nagłówek */}
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center drop-shadow-md">
        Contact Me
      </h2>

      {/* Dodatkowe dane kontaktowe */}
      <div className="text-white flex flex-col items-center space-y-3 text-lg md:text-xl">
        <p>
          Email:{" "}
          <a
            href="mailto:krzysztofmarczynski4@gmail.com"
            className="underline hover:text-white"
          >
            krzysztofmarczynski4@gmail.com
          </a>
        </p>
        <p>
          GitHub:{" "}
          <a
            href="https://github.com/KrzysztofMarczynski"
            target="_blank"
            className="underline hover:text-white"
          >
            github.com/KrzysztofMarczynski
          </a>
        </p>
        <p>
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/krzysztof-marczyński-559072354/"
            target="_blank"
            className="underline hover:text-white"
          >
            linkedin.com/in/krzysztof-marczyński
          </a>
        </p>
        <p>
          Instagram:{" "}
          <a
            href="https://www.instagram.com/tomat0photo/?hl=en"
            target="_blank"
            className="underline hover:text-white"
          >
            instagram.com/tomat0photo
          </a>
        </p>
      </div>
    </section>
  );
}
