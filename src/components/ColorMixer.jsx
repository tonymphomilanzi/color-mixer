import { usePaletteStore } from '../store/paletteStore'

export default function ColorMixer({ onMix }) {
  const { mixCount, colors, setMixCount, updateColor } = usePaletteStore()

  return (
    <div className="p-4 bg-gray-900 rounded-xl shadow w-full text-white">
      <h2 className="text-xl font-semibold mb-4">Color Mixer</h2>

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
        onClick={onMix}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
      >
        Generate Mix
      </button>
    </div>
  )
}
