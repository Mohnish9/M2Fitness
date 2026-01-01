import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),

      // SAFE aliases only (do NOT version-pin here)
      'vaul': 'vaul',
      'sonner': 'sonner',
      'recharts': 'recharts',
      'react-resizable-panels': 'react-resizable-panels',
      'react-hook-form': 'react-hook-form',
      'react-day-picker': 'react-day-picker',
      'next-themes': 'next-themes',
      'lucide-react': 'lucide-react',
      'input-otp': 'input-otp',
      'embla-carousel-react': 'embla-carousel-react',
      'cmdk': 'cmdk',
      'class-variance-authority': 'class-variance-authority',
    },
  },

  build: {
    target: 'esnext',
    outDir: 'build',
    emptyOutDir: true,
  },

  server: {
    port: 3000,
    open: true,
  },
});
