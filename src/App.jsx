import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ai from "./components/Ai";
import Print from "./components/Print";
import Unity from "./components/Unity";
import Arduino from "./components/Arduino";
import Code from "./components/Code";
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
      </main>

      <Footer />  {/* fixed – nie wpływa na layout */}
    </div>
  );
}

export default App;