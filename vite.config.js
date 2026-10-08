import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vercel-ready: default output folder is "dist", no extra config needed.
export default defineConfig({
  plugins: [react()],
});
