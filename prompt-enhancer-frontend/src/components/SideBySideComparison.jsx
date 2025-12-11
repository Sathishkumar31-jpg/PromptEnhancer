import React from "react";
import CopyButton from "./CopyButton";
import { Typewriter } from "react-simple-typewriter";

export default function SideBySideComparison({ original, enhanced }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3">
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-semibold text-gray-200">Original</h3>
          <CopyButton text={original} />
        </div>
        <pre className="whitespace-pre-wrap text-sm text-gray-100">{original}</pre>
      </div>
      <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-semibold text-green-200">Enhanced</h3>
        <CopyButton text={enhanced} />
      </div>

      <pre className="whitespace-pre-wrap text-sm text-green-100">
        <Typewriter
          key={enhanced}
          words={[enhanced]}
          loop={1}
          cursor
          cursorStyle="|"
          typeSpeed={20}
          deleteSpeed={0}
          delaySpeed={1000}
        />
      </pre>
    </div>
    </div>
  );
}
