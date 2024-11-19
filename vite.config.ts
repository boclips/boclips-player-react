import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';
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
  plugins: [react(), dts({
  beforeWriteFile: (filePath, content) => ({
    filePath: filePath.replace('Player.d.ts', 'boclips-player-react.d.ts'),
    content,
  }),
})]
  }))