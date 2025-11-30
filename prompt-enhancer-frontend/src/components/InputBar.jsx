import { useState } from "react";
import { IoSend } from "react-icons/io5";

export default function InputBar({ onSend }) {
  const [input, setInput] = useState("");

  const submit = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="flex items-center gap-2 p-4 border-t bg-white">
      <input
        className="flex-1 px-4 py-2 border rounded-lg"
        placeholder="Type your prompt..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={submit} className="p-3 bg-blue-500 text-white rounded-lg">
        <IoSend size={20} />
      </button>
    </div>
  );
}
