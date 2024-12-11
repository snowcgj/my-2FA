import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['@otplib/preset-default']
  }
});
