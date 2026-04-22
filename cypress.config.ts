import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:5173",
    specPattern: "cypress/e2e/**/*.e2e.test.tsx",
    supportFile: false,
    viewportWidth: 1280,
    viewportHeight: 900,
  },
  video: false,
});
