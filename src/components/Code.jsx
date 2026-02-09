import { useState } from "react";

export default function Code() {
  const [activeTab, setActiveTab] = useState("C");

  const codeSamples = {
    C: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
    "C++": `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    CSharp: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
    Python: `print("Hello, World!")`,
  };

  return (
    <section
      id="Code"
      className="min-h-screen px-4 py-24 sm:py-32 bg-gray-900 text-white flex flex-col items-center"
    >
      {/* Nagłówek */}
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center drop-shadow-md">
        My Code & Experience
      </h2>

      {/* Zakładki języków */}
      <div className="flex space-x-4 mb-8 flex-wrap justify-center">
        {Object.keys(codeSamples).map((lang) => (
          <button
            key={lang}
            onClick={() => setActiveTab(lang)}
            className={`px-4 py-2 rounded-md font-bold transition-colors ${
              activeTab === lang
                ? "bg-[#1A1A1A] text-[#FFD300]"
                : "bg-white/20 text-[#1A1A1A] hover:bg-white/40"
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Okno kodu */}
      <div className="w-full max-w-4xl bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-lg overflow-auto">
        <pre className="text-sm sm:text-base md:text-lg font-mono whitespace-pre-wrap">
          {codeSamples[activeTab]}
        </pre>
      </div>

      {/* Doświadczenie */}
      <div className="mt-12 max-w-3xl text-center">
        <h3 className="text-2xl md:text-3xl font-semibold mb-4">
          My Experience
        </h3>
        <p className="text-lg md:text-xl">
          I have experience in programming with: <b>C, C++, C#, Python</b>. I enjoy building games, applications, and
          learning new technologies. All projects are available on my GitHub.
        </p>
      </div>
    </section>
  );
}
