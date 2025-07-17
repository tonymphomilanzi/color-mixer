import { create } from 'zustand'

export const usePaletteStore = create((set) => ({
  mixCount: 3,
  colors: ['#FF0000', '#00FF00', '#0000FF'],
  setMixCount: (count) => {
    const newColors = Array(count).fill('#000000')
    set({ mixCount: count, colors: newColors })
  },
  updateColor: (index, value) =>
    set((state) => {
      const newColors = [...state.colors]
      newColors[index] = value
      return { colors: newColors }
    }),
}))
