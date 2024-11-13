import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig(({ command }) => ({
  ...(command === 'serve' &&
    {
      server: {
        port: 8081,
      },
    }),
  build: {
    rollupOptions: {
      input: {main: "src/Player.tsx"},
      external: ['boclips-player', 'react', 'react-dom'],
    },
    lib: {
      entry: resolve(__dirname, 'src/Player.tsx'),
      name: 'BoclipsPlayerReact',
      fileName: 'boclips-player-react',
    },
  },
  plugins: [react()]
  }))