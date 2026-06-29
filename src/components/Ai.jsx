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
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
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
      { from: "user", text: userMessage },
    ]);

    setInput("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: userMessage,
        }),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text: data.reply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text: "Ups... try again",
        },
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
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[9998] flex items-center gap-3 rounded-full border border-zinc-800 bg-zinc-950 px-5 py-5 text-white shadow-[0_18px_60px_rgba(15,23,42,0.24)] transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-900 active:scale-95"
      >
        <MessageCircle className="h-7 w-7" />

        <span className="hidden font-semibold sm:block">
          Ask AI
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950/75 backdrop-blur-md p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 40,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
              }}
              transition={{
                duration: 0.25,
              }}
              className="flex h-[85vh] w-full max-w-xl flex-col overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-[0_35px_120px_rgba(15,23,42,0.20)]"
            >
              {/* HEADER */}

              <div className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-950 text-white">
                    <MessageCircle className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-semibold text-zinc-950">
                      AI Assistant
                    </p>

                    <p className="text-xs text-zinc-400">
                      Online
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
<div className="flex-1 overflow-y-auto bg-white p-5 custom-scrollbar">
  <div className="space-y-4">
    {messages.map((msg, i) => (
      <div
        key={i}
        className={`flex ${
          msg.from === "user"
            ? "justify-end"
            : "justify-start"
        }`}
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 8,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.2,
          }}
          className={`max-w-[82%] rounded-3xl px-5 py-3 shadow-sm break-words ${
            msg.from === "user"
              ? "bg-zinc-950 text-white"
              : "border border-zinc-200 bg-zinc-100 text-zinc-900"
          }`}
        >
          <p className="whitespace-pre-wrap text-[15px] leading-7">
            {msg.text}
          </p>
        </motion.div>
      </div>
    ))}

    <div ref={messagesEndRef} />
  </div>
</div>

<div className="border-t border-zinc-200 bg-white p-4">
  <div className="flex items-end gap-3">
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Ask me anything..."
      className="flex-1 rounded-2xl border border-zinc-200 bg-zinc-100 px-5 py-3 text-zinc-900 placeholder:text-zinc-500 transition-all duration-200 focus:border-zinc-900 focus:bg-white focus:outline-none"
    />

    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={handleSend}
      className="rounded-2xl bg-zinc-950 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-zinc-800"
    >
      Send
    </motion.button>
  </div>

  <p className="mt-3 text-center text-xs text-zinc-400">
    AI responses may contain mistakes.
  </p>
</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  </>
);
}