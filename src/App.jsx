import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ai from "./components/Ai";
import Blog from "./components/Blog";
import Print from "./components/Print";
import Unity from "./components/Unity";
import Code from "./components/Code";
import Photo_to_playlist from "./components/Photo_to_playlist";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="min-h-screen scroll-smooth bg-white text-zinc-950">
      <Navbar />

      <main className="pb-12 sm:pb-10 md:pb-10 lg:pb-10">
        <section id="hero" className="animate-fadeIn">
          <Hero />
        </section>

        <section id="blog" className="animate-fadeIn">
          <Blog />
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
      </main>

      <Ai />
    </div>
  );
}

export default App;
