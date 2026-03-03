import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export default function AI() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { from: "ai", text: "Co tam byku, jak mogę Ci dzisiaj pomóc?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const API_URL = "http://localhost:8000/chat";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = input;
    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    setInput("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: userMessage }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { from: "ai", text: data.response },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "Narazie to ja mam urlop, DO WIDZENIA PAŃSTWU!" },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 w-[380px]"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="bg-[#1E201E] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* HEADER */}
        <div
          className="bg-gray-800 px-6 py-4 flex justify-between items-center cursor-pointer"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-white">AI Asystent</p>
              <p className="text-xs text-gray-400">Online</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-white">
            {isMinimized ? (
              <MessageCircle className="w-6 h-6" />
            ) : (
              <X className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* BODY */}
        {!isMinimized && (
          <>
            <div className="flex-1 p-5 overflow-y-auto space-y-4 h-[420px]">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-3 rounded-2xl max-w-[85%] break-words
                      ${
                        msg.from === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-white"
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="bg-gray-800 p-4 flex gap-2">
              <input
                type="text"
                placeholder="Napisz wiadomość..."
                className="flex-1 bg-gray-700 text-white 
                           placeholder-gray-400 
                           rounded-2xl px-5 py-3 
                           focus:outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 hover:bg-blue-500 
                           px-6 rounded-2xl 
                           font-medium text-white 
                           transition"
              >
                Wyślij
              </button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}