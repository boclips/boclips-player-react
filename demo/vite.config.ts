import { defineConfig, mergeConfig } from 'vite'
import defaultConfig from '../vite.config'

export default defineConfig((configEnv) =>
  mergeConfig(defaultConfig(configEnv),{
    
  }))
