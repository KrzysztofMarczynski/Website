import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Print from "./components/Print";
import Unity from "./components/Unity";
import Arduino from "./components/Arduino";
import Code from "./components/Code";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Ai from "./components/Ai";

function App() {
  return (
    <div
      className="min-h-screen text-white overflow-hidden scroll-smooth"
      style={{ backgroundColor: "bg-gray-900" }}
    >
      {/* Navbar */}
      <Navbar />
      {/* Sekcje z id i animacją fade-in */}

      <section id="Hero" className="animate-fadeIn">
        <Hero />
      </section>
      <section id="AI" className="animate-fadeIn">
        <Ai />
      </section>
      <section id="3D Print" className="animate-fadeIn">
        <Print />
      </section>
      <section id="Unity Games" className="animate-fadeIn">
        <Unity />
      </section>
      <section id="Arduino" className="animate-fadeIn">
        <Arduino />
      </section>
      <section id="Code" className="animate-fadeIn">
        <Code />
      </section>
      <section id="Contact" className="animate-fadeIn">
        <Contact />
      </section>
      {/* Footer */}
      <Footer />
      {/* Tailwind CSS animacja fade-in */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default App;
