// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import path from "path";
// import { componentTagger } from "lovable-tagger";

// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) => ({
//   server: {
//     host: "::",
//     port: 8080,
//   },
//   plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// }));










// vite.config.ts  ← YE PURA REPLACE KAR DO

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Lovable tagger sirf development mein chalega — production mein nahi
const isDev = process.env.NODE_ENV === "development";
let commands = [];

if (isDev) {
  const { componentTagger } = await import("lovable-tagger");
  commands.push(componentTagger());
}

export default defineConfig({
  plugins: [react(), ...commands],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/", // ← Vercel ke liye zaroori
  build: {
    rollupOptions: {
      // Yeh line error ko permanently khatam kar degi
      external: [],
    },
  },
});