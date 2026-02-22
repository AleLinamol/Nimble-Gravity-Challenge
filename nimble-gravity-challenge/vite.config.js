import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  resolve: {
    dedupe: ["react", "react-dom"],
  },

  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setupTests.js",
    globals: true,

    deps: {
      inline: [
        "react",
        "react-dom",
        "@mui/material",
        "@mui/system",
        "@emotion/react",
        "@emotion/styled",
      ],
    },
  },
});