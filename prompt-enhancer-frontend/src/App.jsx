// import { useState } from "react";
// import ChatWindow from "./components/ChatWindow";
// import InputBar from "./components/InputBar";
// import { enhancePrompt } from "./services/api";

// function App() {
//   const [messages, setMessages] = useState([]);

//   const handleSend = async (text) => {
//     // Show user message
//     setMessages((prev) => [...prev, { text, sender: "user" }]);

//     // Temporary bot typing
//     setMessages((prev) => [...prev, { text: "Enhancing...", sender: "bot" }]);

//     const enhancedText = await enhancePrompt(text);

//     // Replace the placeholder with actual response
//     setMessages((prev) => {
//       const updated = [...prev];
//       updated.pop(); 
//       return [...updated, { text: enhancedText, sender: "bot" }];
//     });
//   };

//   return (
//     <div className="flex flex-col h-screen p-4 bg-white">
//       <h1 className="text-2xl font-bold mb-4 text-center">Prompt Enhancer</h1>

//       <ChatWindow messages={messages} />

//       <InputBar onSend={handleSend} />
//     </div>
//   );
// }

// export default App;



import { useState } from "react";
import { enhancePrompt } from "./services/api";
import { Typewriter } from "react-simple-typewriter";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [aiTypingData, setAiTypingData] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Push user message immediately
    setMessages((prev) => [...prev, { role: "user", text: input }]);

    const userPrompt = input;
    setInput("");

    // Call backend -> enhanced prompt
    const enhanced = await enhancePrompt(userPrompt);

    // Start the typing animation
    setAiTypingData(enhanced);

    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: enhanced },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Prompt Enhancer (Real-Time AI)</h1>

      <div className="space-y-4 max-w-2xl mx-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg ${
              msg.role === "user"
                ? "bg-blue-600 text-white self-end"
                : "bg-gray-700 text-green-300"
            }`}
          >
            {msg.role === "assistant" ? (
              <Typewriter
                words={[msg.text]}
                loop={1}
                cursor
                cursorStyle="_"
                typeSpeed={20}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            ) : (
              msg.text
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-2 max-w-2xl mx-auto">
        <input
          type="text"
          className="flex-1 p-3 bg-gray-800 rounded-lg"
          placeholder="Type a prompt to enhance..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-green-500 px-4 py-3 rounded-lg hover:bg-green-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
