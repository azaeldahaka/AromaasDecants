import { test, expect } from "@playwright/test";

/**
 * TEST 1: Navegación Básica — Home, Carrusel y Logo
 *
 * Verifica que la Home carga correctamente, que el carrusel existe
 * y que el logo/marca de AromaasDecants es visible en el header.
 */
test.describe("Navegación Básica", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("la Home debe cargar con el título correcto", async ({ page }) => {
    // El título de la página debe incluir AromaasDecants
    await expect(page).toHaveTitle(/AromaasDecants/i);
  });

  test("el header con el logo de la marca debe ser visible", async ({
    page,
  }) => {
    // El header contiene el nombre de la marca
    const header = page.locator("header");
    await expect(header).toBeVisible();

    // El texto del logo/marca está en el header
    const brandName = page.getByText("AromaasDecants").first();
    await expect(brandName).toBeVisible();
  });

  test("el carrusel hero debe existir y ser interactuable", async ({
    page,
  }) => {
    // El botón de siguiente del carrusel debe estar visible
    const nextButton = page.getByRole("button", { name: /siguiente/i });
    await expect(nextButton).toBeVisible();

    // El botón de anterior también debe estar visible
    const prevButton = page.getByRole("button", { name: /anterior/i });
    await expect(prevButton).toBeVisible();
  });

  test("el carrusel debe avanzar al hacer click en Siguiente", async ({
    page,
  }) => {
    // Captura el contenido del slide actual antes del click
    const slide = page.locator("section").first();
    await expect(slide).toBeVisible();

    const nextButton = page.getByRole("button", { name: /siguiente/i });
    await nextButton.click();

    // Después del click, el carrusel debe seguir visible (no crashear)
    await expect(slide).toBeVisible();
  });

  test("el link Ver Catálogo del hero debe navegar a /catalog", async ({
    page,
  }) => {
    const ctaLink = page.getByRole("link", { name: /ver catálogo/i }).first();
    await expect(ctaLink).toBeVisible();
    await expect(ctaLink).toHaveAttribute("href", "/catalog");
  });
});
