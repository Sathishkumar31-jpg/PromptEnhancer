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



// import { useState } from "react";
// import { enhancePrompt } from "./services/api";
// import { Typewriter } from "react-simple-typewriter";

// function App() {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [aiTypingData, setAiTypingData] = useState("");

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     // Push user message immediately
//     setMessages((prev) => [...prev, { role: "user", text: input }]);

//     const userPrompt = input;
//     setInput("");

//     // Call backend -> enhanced prompt
//     const enhanced = await enhancePrompt(userPrompt);

//     // Start the typing animation
//     setAiTypingData(enhanced);

//     setMessages((prev) => [
//       ...prev,
//       { role: "assistant", text: enhanced },
//     ]);
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6">
//       <h1 className="text-3xl font-bold mb-4">Prompt Enhancer (Real-Time AI)</h1>

//       <div className="space-y-4 max-w-2xl mx-auto">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`p-3 rounded-lg ${
//               msg.role === "user"
//                 ? "bg-blue-600 text-white self-end"
//                 : "bg-gray-700 text-green-300"
//             }`}
//           >
//             {msg.role === "assistant" ? (
//               <Typewriter
//                 words={[msg.text]}
//                 loop={1}
//                 cursor
//                 cursorStyle="_"
//                 typeSpeed={20}
//                 deleteSpeed={50}
//                 delaySpeed={1000}
//               />
//             ) : (
//               msg.text
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="mt-6 flex gap-2 max-w-2xl mx-auto">
//         <input
//           type="text"
//           className="flex-1 p-3 bg-gray-800 rounded-lg"
//           placeholder="Type a prompt to enhance..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-green-500 px-4 py-3 rounded-lg hover:bg-green-600"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default App;











import React, { useState } from "react";
import { enhancePrompt } from "./services/api";
import ToneSelector from "./components/toneselectors";
import SideBySideComparison from "./components/SideBySideComparison";
// import CopyButton from "./components/copyButton";
import { Typewriter } from "react-simple-typewriter";

export default function App() {
  const [input, setInput] = useState("");
  const [tone, setTone] = useState("neutral");
  const [messages, setMessages] = useState([]); // {role, text}
  const [enhancedText, setEnhancedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCompare, setShowCompare] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // push user message
    setMessages((m) => [...m, { role: "user", text: input }]);
    setLoading(true);
    setEnhancedText("");

    try {
      const enhanced = await enhancePrompt(input, tone); // send tone
      setEnhancedText(enhanced);
      setMessages((m) => [...m, { role: "assistant", text: enhanced }]);
      setShowCompare(true);
    } catch (err) {
      console.error(err);
      setMessages((m) => [...m, { role: "assistant", text: "Error enhancing prompt" }]);
    } finally {
      setLoading(false);
    }

    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Prompt Enhancer</h1>
          <div className="flex items-center gap-4">
            {/* <ToneSelector value={tone} onChange={setTone} /> */}
            {/* <button
              onClick={() => setShowCompare((s) => !s)}
              className="px-3 py-2 bg-gray-700 rounded-md text-sm"
            >
              {showCompare ? "Hide Compare" : "Show Compare"}
            </button> */}
          </div>
        </header>

        <div className="mb-4">
          <textarea
            rows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your prompt..."
            className="w-full p-3 bg-gray-800 rounded-md text-sm resize-none"
          />
          <div className="flex items-center justify-end gap-2 mt-2">
            {/* <CopyButton text={input || ""} /> */}
            <button
              onClick={sendMessage}
              disabled={loading}
              className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-60"
            >
              {loading ? "Enhancing..." : "Enhance"}
            </button>
          </div>
        </div>

        {/* Chat / Results */}
        {/* <div className="space-y-4">
          {messages.map((m, i) =>
            m.role === "user" ? (
              <div key={i} className="text-right">
                <div className="inline-block bg-blue-600 px-3 py-2 rounded-lg text-sm">{m.text}</div>
              </div>
            ) : (
              <div key={i}>
                <div className="inline-block bg-gray-800 px-3 py-2 rounded-lg text-sm">
                  <Typewriter words={[m.text]} loop={1} cursor cursorStyle="|" typeSpeed={20} />
                </div>
              </div>
            )
          )}
        </div> */}

        {/* Side-by-side compare */}
        {showCompare && (
          <div className="mt-6">
            <SideBySideComparison original={messages[messages.length - 2]?.text || ""} enhanced={enhancedText} />
          </div>
        )}
      </div>
    </div>
  );
}
