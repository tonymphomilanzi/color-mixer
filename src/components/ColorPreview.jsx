export default function ColorPreview({ colors, mixed }) {
  return (
    <div className="p-4 bg-gray-900 rounded-xl shadow w-full h-full text-white">
      <h3 className="font-semibold mb-4">Color Preview</h3>

      <div className="flex flex-wrap gap-3 mb-6">
        {colors.map((color, i) => (
          <div key={i} className="text-center">
            <div
              className="w-12 h-12 rounded border border-gray-700"
              style={{ backgroundColor: color }}
            />
            <code className="block text-sm mt-1 text-gray-300">{color}</code>
          </div>
        ))}
      </div>

      <p className="font-medium">Mixed Color:</p>
      <div
        className="w-24 h-10  border-gray-700 mb-2"
        style={{ backgroundColor: mixed }}
      />
      <code className="text-sm text-gray-300">{mixed}</code>
    </div>
  )
}
