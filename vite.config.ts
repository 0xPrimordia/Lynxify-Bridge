import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    global: {},
  },
  resolve: {  
    alias: {
        process: "process/browser",
        stream: "stream-browserify",
        zlib: "browserify-zlib",    
        util: "util/"    }
  },
  build: {
    commonjsOptions: { transformMixedEsModules: true } // Change
  }
})
