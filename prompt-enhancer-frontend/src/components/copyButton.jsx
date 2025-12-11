import React from "react";

export default function CopyButton({ text }) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied!");
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
    >
      Copy
    </button>
  );
}
