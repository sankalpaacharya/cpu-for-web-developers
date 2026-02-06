"use client";

import { useState } from "react";

function HeavyComponent({ text }: { text: string }) {
  // Simulate blocking render
  const start = Date.now();
  while (Date.now() - start < 80) {}
  
  return <div className="text-lg text-gray-800">{text}</div>;
}

export function React15InputDemo() {
  const [input, setInput] = useState("");

  return (
    <div className="not-prose my-6 border border-gray-200 rounded-lg overflow-hidden bg-white">
      <div className="p-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type quickly..."
          className="w-full px-3 py-2 text-base border border-gray-300 rounded mb-4 text-gray-900 bg-white"
        />
        <HeavyComponent text={input} />
      </div>
    </div>
  );
}
