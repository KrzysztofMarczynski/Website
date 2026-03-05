import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export default function AI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hi, how can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const API_URL = "/api/chat";;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

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

      if (!res.ok) throw new Error("Something went wrong.");

      const data = await res.json();
      setMessages((prev) => [...prev, { from: "ai", text: data.response }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "Ups... try again" },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* ===== PŁYWAJĄCY DYMEK W PRAWYM DOLNYM ROGU ===== */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[100] bg-gradient-to-br from-blue-600 to-indigo-600 
                   text-white p-5 rounded-full shadow-2xl hover:shadow-blue-500/50 
                   transition-all duration-300 flex items-center gap-3 group"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="hidden sm:block font-medium pr-2 group-hover:pr-3 transition-all">
          Ask AI
        </span>
      </motion.button>

      {/* ===== CZAT (MODAL) ===== */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full max-w-md sm:max-w-lg bg-[#1E201E] rounded-3xl shadow-2xl 
                         flex flex-col overflow-hidden border border-gray-700/50 h-[85vh] sm:h-[90vh]"
            >
              {/* HEADER */}
              <div className="bg-gray-800 px-5 sm:px-6 py-4 flex justify-between items-center rounded-t-3xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">AI Assistant</p>
                    <p className="text-xs text-green-400">Online • Ready</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700/50 transition"
                >
                  <X className="w-7 h-7" />
                </button>
              </div>

              {/* WIADOMOŚCI – SCROLLABLE */}
              <div 
                ref={chatContainerRef}
                className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-gray-900/40 custom-scrollbar"
              >
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`px-4 py-3 rounded-2xl max-w-[85%] break-words shadow-sm
                        ${msg.from === "user" 
                          ? "bg-blue-600 text-white" 
                          : "bg-gray-700 text-white"}`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* INPUT */}
              <div className="bg-gray-800 px-4 py-3 flex gap-2 border-t border-gray-700">
                <input
                  type="text"
                  placeholder="Write message..."
                  className="flex-1 bg-gray-700 text-white placeholder-gray-400 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={handleSend}
                  className="bg-blue-600 hover:bg-blue-500 px-6 rounded-2xl font-medium text-white transition-all active:scale-95"
                >
                  Send
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}