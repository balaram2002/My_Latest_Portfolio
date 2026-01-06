import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  base: command === "serve" ? "/" : "/My_Latest_Portfolio",
  server: {
    host: "::",
    port: 5173, // Vite default port (changed from 8080)
  },
  plugins: [react(), command === "serve" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
}));
