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

  const API_URL = "/api/chat";

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

    setMessages((prev) => [
      ...prev,
      { from: "user", text: userMessage }
    ]);

    setInput("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userMessage
        })
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { from: "ai", text: data.response }
      ]);

    } catch (err) {

      console.error(err);

      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "Ups... try again" }
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
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[100] bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-5 rounded-full shadow-2xl"
      >
        <MessageCircle className="w-8 h-8" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="w-full max-w-md bg-[#1E201E] rounded-3xl flex flex-col overflow-hidden h-[85vh]"
            >

              <div className="bg-gray-800 px-6 py-4 flex justify-between items-center">
                <p className="text-white font-semibold">AI Assistant</p>
                <button onClick={() => setIsOpen(false)}>
                  <X className="w-6 h-6 text-white"/>
                </button>
              </div>

              <div className="flex-1 p-5 overflow-y-auto space-y-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`px-4 py-3 rounded-2xl max-w-[80%]
                      ${msg.from === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-white"}`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef}/>
              </div>

              <div className="bg-gray-800 p-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Write message..."
                  className="flex-1 bg-gray-700 text-white rounded-xl px-4 py-2"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />

                <button
                  onClick={handleSend}
                  className="bg-blue-600 px-5 rounded-xl text-white"
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