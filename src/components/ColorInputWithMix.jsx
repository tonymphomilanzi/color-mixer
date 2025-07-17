import { usePaletteStore } from '../store/paletteStore'
import { useState } from 'react'

export default function ColorInputWithMix() {
  const { mixCount, colors, setMixCount, updateColor } = usePaletteStore()
  const [mixResult, setMixResult] = useState(null)

  const blendColors = (colors) => {
    let r = 0, g = 0, b = 0
    colors.forEach((hex) => {
      const bigint = parseInt(hex.slice(1), 16)
      r += (bigint >> 16) & 255
      g += (bigint >> 8) & 255
      b += bigint & 255
    })
    r = Math.round(r / colors.length)
    g = Math.round(g / colors.length)
    b = Math.round(b / colors.length)
    return `#${((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)
      .toUpperCase()}`
  }

  const generateMix = () => {
    const mixed = blendColors(colors)
    setMixResult(mixed)
  }

  return (
    <div className="p-4 bg-gray-900 rounded-xl shadow-lg mb-6 text-white">
      <h2 className="text-xl font-semibold mb-4">🎛️ Color Mixer</h2>

      <label className="block mb-2">How many colors to mix?</label>
      <input
        type="number"
        value={mixCount}
        min={2}
        max={10}
        onChange={(e) => setMixCount(Number(e.target.value))}
        className="border border-gray-700 rounded px-3 py-1 w-24 mb-4 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex flex-wrap gap-4 mb-4">
        {colors.map((color, i) => (
          <input
            key={i}
            type="color"
            value={color}
            onChange={(e) => updateColor(i, e.target.value)}
            className="w-12 h-12 rounded border border-gray-700 cursor-pointer"
          />
        ))}
      </div>

      <button
        onClick={generateMix}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
      >
        Generate Mix
      </button>

      {mixResult && (
        <div className="mt-6">
          <p className="mb-2">🎨 Mixed Result:</p>
          <div
            className="w-32 h-12 rounded border border-gray-700"
            style={{ backgroundColor: mixResult }}
          />
          <code className="block mt-1 text-gray-300">{mixResult}</code>
        </div>
      )}
    </div>
  )
}
