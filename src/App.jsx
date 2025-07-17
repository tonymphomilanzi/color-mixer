import { usePaletteStore } from './store/paletteStore'
import { useState } from 'react'
import ColorMixer from './components/ColorMixer'
import ColorPreview from './components/ColorPreview'
import TailwindOutput from './components/TailwindOutput'
import ColorInputWithMix from './components/ColorInputWithMix'

function App() {
  const { colors } = usePaletteStore()
  const [mixed, setMixed] = useState('#000000')

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

  const handleMix = () => {
    const result = blendColors(colors)
    setMixed(result)
  }

return (
<div className="h-screen flex bg-gray-950 text-white">
  {/* Left Panel – Color Mixer */}
  <div className="w-1/2 border-r border-gray-800 overflow-auto p-6">
    <h1 className="text-1xl font-bold mb-4">Color Palette Mixer</h1>
    <ColorMixer onMix={handleMix} />
  </div>

  {/* Right Panel – Preview + Tailwind Config */}
  <div className="w-1/2 flex flex-col">
    {/* Top Row – Preview Box */}
    <div className="bg-gray-900  shadow-md  p-6 overflow-auto">
  
      <ColorPreview colors={colors} mixed={mixed} />
    </div>

    {/* Bottom Row – Tailwind Config Output */}
    <div className="bg-gray-900  shadow-md h-1/2 p-6 overflow-auto">
     
      <TailwindOutput colors={colors} mixed={mixed} />
    </div>
  </div>
</div>

)

}

export default App
