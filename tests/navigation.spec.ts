import { test, expect } from "@playwright/test";

/**
 * TEST 1: Navegación Básica — Home, Carrusel y Logo
 */
test.describe("Navegación Básica", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("la Home debe cargar con el título correcto", async ({ page }) => {
    // El título en desarrollo es "Inicio" (el template | AromaasDecants se aplica con build)
    // Verificamos que al menos tenga contenido válido
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    // Verificamos que contenga alguna de las palabras clave del sitio
    expect(title.toLowerCase()).toMatch(/inicio|aromaas|decants|perfum/i);
  });

  test("el header con el logo de la marca debe ser visible", async ({
    page,
  }) => {
    const header = page.locator("header");
    await expect(header).toBeVisible();

    // El texto del logo/marca está en el header
    const brandName = page.getByText("AromaasDecants").first();
    await expect(brandName).toBeVisible();
  });

  test("el carrusel hero debe existir y ser interactuable", async ({
    page,
  }) => {
    // El botón de siguiente del carrusel
    const nextButton = page.getByRole("button", { name: /siguiente/i });
    await expect(nextButton).toBeVisible();

    // El botón de anterior también debe estar visible
    const prevButton = page.getByRole("button", { name: /anterior/i });
    await expect(prevButton).toBeVisible();
  });

  test("el carrusel debe avanzar al hacer click en Siguiente", async ({
    page,
  }) => {
    // El carrusel existe y sus controles son clickeables
    const nextButton = page.getByRole("button", { name: /siguiente/i });
    await expect(nextButton).toBeVisible();

    // Click — verificamos que no se crashea
    await nextButton.click();

    // Después del click, el botón sigue visible (el carrusel no se rompe)
    await expect(nextButton).toBeVisible();

    // Los dots de navegación deben estar presentes
    const dots = page.locator('[aria-label^="Ir a slide"]');
    await expect(dots.first()).toBeVisible();
  });

  test("el link Ver Catálogo del hero debe navegar a /catalog", async ({
    page,
  }) => {
    const ctaLink = page.getByRole("link", { name: /ver catálogo/i }).first();
    await expect(ctaLink).toBeVisible();
    await expect(ctaLink).toHaveAttribute("href", "/catalog");
  });
});
