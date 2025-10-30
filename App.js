import React, { useState } from "react";

// Tailwind CSS required in your project: add @tailwind base; @tailwind components; @tailwind utilities; to index.css

const reflectIntro =
  "Hi, I'm Reflect. I'm not a therapist. I'm your mirror. Let's explore how your childhood shaped your attachment style. Answer honestly—this is private, just for you.";

const initialBotMessages = [
  {
    from: "bot",
    text: reflectIntro,
  },
  {
    from: "bot",
    text:
      "First question: Was it safe to show sadness or cry in your childhood home?",
  },
];

export default function App() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState(initialBotMessages);
  const [input, setInput] = useState("");

  function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessages = [...messages, { from: "user", text: input }];
    // Simulated reflection logic
    let botText = "";
    if (messages.length < 4) {
      botText = "Thanks for sharing. Did you have a parent who was emotionally distant or critical?";
    } else if (messages.length < 6) {
      botText = "When you're hurt, do you withdraw, get overwhelmed, or try to fix things right away?";
    } else {
      botText = "Reflect: Based on what you've shared, you may have developed certain attachment patterns. This isn't a diagnosis—just a mirror.";
    }
    setMessages([...newMessages, { from: "bot", text: botText }]);
    setInput("");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      {!showChat ? (
        <div className="flex flex-col items-center space-y-6">
          <h1 className="text-4xl font-bold mb-2 text-cyan-400">MirrorAI</h1>
          <div className="text-base text-center mb-2">
            I&apos;m not a therapist. I&apos;m your mirror.
          </div>
          <button
            className="px-8 py-3 bg-cyan-500 text-black text-lg font-semibold rounded-xl shadow hover:bg-cyan-400 transition"
            onClick={() => setShowChat(true)}
          >
            Start with Reflect
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md bg-gray-800 rounded-2xl p-6 shadow-xl flex flex-col h-[32rem]">
          <div className="text-2xl font-bold text-cyan-300 mb-3">Reflect</div>
          <div className="flex-1 overflow-y-auto mb-3 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.from === "bot"
                    ? "bg-gray-700 p-3 rounded-xl text-sm text-cyan-100 self-start"
                    : "bg-cyan-600 p-3 rounded-xl text-sm text-black self-end"
                }
              >
                {m.text}
              </div>
            ))}
          </div>
          <form
            className="flex space-x-2"
            onSubmit={handleSend}
            autoComplete="off"
          >
            <input
              className="flex-1 p-2 rounded-xl bg-gray-900 text-white border border-gray-700"
              placeholder="Type your answer…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-500 text-black font-semibold rounded-xl hover:bg-cyan-400 transition"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
