export default function MessageBubble({ text, sender }) {
  return (
    <div className={`w-full flex ${sender === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] px-4 py-2 rounded-lg shadow 
        ${sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
      >
        {text}
      </div>
    </div>
  );
}
