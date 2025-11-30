import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages }) {
  return (
    <div className="flex flex-col gap-4 p-4 h-[85vh] overflow-y-auto bg-gray-50 rounded-lg">
      {messages.map((msg, i) => (
        <MessageBubble key={i} text={msg.text} sender={msg.sender} />
      ))}
    </div>
  );
}
