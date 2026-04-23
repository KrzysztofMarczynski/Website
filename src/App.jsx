import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ai from "./components/Ai";
import Print from "./components/Print";
import Unity from "./components/Unity";
import Code from "./components/Code";
import Photo_to_playlist from "./components/Photo_to_playlist";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="bg-gray-950 text-white min-h-screen scroll-smooth">
      <Navbar />

      <main className="pb-40 sm:pb-24 md:pb-28 lg:pb-10">
        <section id="hero" className="animate-fadeIn">
          <Hero />
        </section>

        <section id="code" className="animate-fadeIn">
          <Code />
        </section>

        <section id="3d-print" className="animate-fadeIn">
          <Print />
        </section>

        <section id="unity-games" className="animate-fadeIn">
          <Unity />
        </section>

        <section id="contact" className="animate-fadeIn">
          <Contact />
        </section>

        <section id="Photo_to_playlist" className="animate-fadeIn">
          <Photo_to_playlist />
        </section>
      </main>
      <Ai />
    </div>
  );
}

export default App;
