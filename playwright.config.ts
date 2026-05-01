import { defineConfig, devices } from "@playwright/test";

/**
 * Configuración de Playwright para AromaasDecants E2E Tests.
 * Docs: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",

  /* TypeScript config dedicado para los tests (compatible con Playwright) */
  tsconfig: "./tests/tsconfig.json",

  /* Tiempo máximo por test */
  timeout: 30_000,

  /* Expect timeout */
  expect: {
    timeout: 10_000,
  },

  /* Correr tests en paralelo */
  fullyParallel: true,

  /* Fallar en CI si hay tests con .only */
  forbidOnly: !!process.env.CI,

  /* Reintentos en CI */
  retries: process.env.CI ? 2 : 0,

  /* Workers paralelos */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter: HTML para uso local, list para CI */
  reporter: process.env.CI ? "list" : [["html", { open: "never" }], ["list"]],

  use: {
    /* URL base del servidor de Next.js */
    baseURL: "http://localhost:3000",

    /* Captura de trazas en el primer retry */
    trace: "on-first-retry",

    /* Screenshots solo en fallos */
    screenshot: "only-on-failure",

    /* Viewport mobile-first (que es el target de AromaasDecants) */
    viewport: { width: 390, height: 844 },
  },

  /* Proyectos de test — usamos solo Chromium como base */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],

  /* Servidor web — arranca Next.js antes de los tests automáticamente */
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
    stdout: "ignore",
    stderr: "pipe",
  },
});
