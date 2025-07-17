import { useState } from "react";

export default function TailwindOutput({ colors, mixed }) {
  const [copied, setCopied] = useState(false);

  // Create dynamic color entries: color1, color2, ..., colorN
  const colorEntries = colors
    .map((color, i) => `color${i + 1}: '${color}'`)
    .join(",\n      ");

  const configCode = `theme: {
  extend: {
    colors: {
      ${colorEntries},
      mixed: '${mixed}'
    }
  }
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(configCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative p-4 bg-gray-900 rounded-xl shadow w-full h-full text-white">
      <h3 className="text-lg font-semibold mb-3">🧾 Tailwind Config</h3>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        aria-label="Copy config to clipboard"
        className="absolute top-4 right-4 p-1 rounded hover:bg-gray-700 transition"
        title="Copy to clipboard"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 16h8M8 12h8m-6-8H6a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2v-4m-6-4h6"
          />
        </svg>
      </button>

      <pre className="bg-gray-800 p-4 rounded text-sm overflow-auto whitespace-pre-wrap text-green-400 mt-6">
        {configCode}
      </pre>

      {copied && (
        <div className="absolute top-2 right-12 bg-green-600 text-white px-2 py-1 rounded text-xs select-none">
          Copied!
        </div>
      )}
    </div>
  );
}
