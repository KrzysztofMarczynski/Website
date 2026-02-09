import { useState } from "react";

export default function AI() {
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hello! I'm your AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const API_URL = "http://localhost:8000/chat"; // Twój backend

  const handleSend = async () => {
    if (input.trim() === "") return;

    setMessages((prev) => [...prev, { from: "user", text: input }]);
    const userMessage = input;
    setInput("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: userMessage }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { from: "ai", text: data.response }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "Sorry, something went wrong." },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-16">
      <div className="w-full max-w-md bg-[#1E201E] rounded-xl shadow-lg flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gray-800 px-6 py-4 text-white font-bold text-lg">AI Chat</div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 h-96">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-xs break-words
                  ${msg.from === "user" ? "bg-blue-500 text-white" : "bg-gray-700 text-white"}`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-gray-800 px-4 py-3 flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 rounded-lg px-4 py-2 text-white bg-gray-700 placeholder-gray-400 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
}
