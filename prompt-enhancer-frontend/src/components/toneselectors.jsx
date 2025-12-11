import React from "react";

const TONES = [
  { id: "neutral", label: "Neutral" },
  { id: "professional", label: "Professional" },
  { id: "casual", label: "Casual" },
  { id: "creative", label: "Creative" },
  { id: "concise", label: "Concise" },
  { id: "detailed", label: "Detailed" },
];

export default function ToneSelector({ value, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm">Tone:</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 bg-gray-800 text-white rounded-lg border"
      >
        {TONES.map((t) => (
          <option key={t.id} value={t.id}>
            {t.label}
          </option>
        ))}
      </select>
    </div>
  );
}
