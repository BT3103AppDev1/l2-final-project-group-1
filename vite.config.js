import { defineConfig } from 'vite' 
import vue from '@vitejs/plugin-vue' 

module.exports = {
  devServer: {
  proxy: 'https://chatengine.io/',
  }
  }

// https://vitejs.dev/config/
export default defineConfig({ 
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => ['md-linedivider'].includes(tag),
      }
    }
  })]
})
