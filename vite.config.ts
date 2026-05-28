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
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          // 🔥 Strategi pemecahan otomatis: Memisahkan library pihak ketiga dari kode inti Anda
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // Jika library besar berasal dari recharts, pisahkan menjadi file khusus
              if (id.includes('recharts') || id.includes('d3')) {
                return 'vendor-charts';
              }
              // Jika berasal dari flowbite, pisahkan menjadi file khusus
              if (id.includes('flowbite')) {
                return 'vendor-ui';
              }
              // Sisanya satukan ke dalam file vendor umum
              return 'vendor-libs';
            }
          }
        }
      }
    },
    server: {
      proxy: {
        '/image': {
          target: 'http://localhost:8080',
          changeOrigin: true,
        },
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
});