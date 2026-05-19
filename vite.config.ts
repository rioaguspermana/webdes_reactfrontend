import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite"


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss(), flowbiteReact()],
    resolve: {
      alias: {
        // Memetakan simbol '@' agar mengarah ke folder 'src'
        '@': new URL('./src', import.meta.url).pathname,
      },
    },
    build: {
      outDir: '../gobackend/web',
      // Mengosongkan folder tujuan
      emptyOutDir: true,
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
});