import { test, expect } from "@playwright/test";

/**
 * TEST 2: Catálogo y Filtros
 *
 * Verifica que en /catalog:
 * - Los chips de filtrado existen
 * - Al hacer click en "Árabes", la grilla se actualiza
 *   mostrando solo productos de esa categoría
 */
test.describe("Catálogo y Filtros", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/catalog");
  });

  test("la página del catálogo carga correctamente", async ({ page }) => {
    // El h1 del contenido por defecto es "Nuestra Colección"
    // Usamos el selector por nombre para evitar strict mode violation con el h1 del Navbar
    const heading = page.getByRole("heading", { name: /Nuestra Colección|Árabes|Diseñador|Para Hombre|Para Mujer/i });
    await expect(heading).toBeVisible();
  });

  test("todos los chips de filtro deben estar presentes", async ({ page }) => {
    // Los filtros en /catalog: Nuestra Colección, Árabes, Diseñador, Para Hombre, Para Mujer
    await expect(
      page.getByRole("button", { name: /Nuestra Colección/i })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Árabes/i })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Diseñador/i })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Para Hombre/i })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Para Mujer/i })
    ).toBeVisible();
  });

  test("el filtro Árabes debe mostrar productos árabes", async ({ page }) => {
    const arabicFilter = page.getByRole("button", { name: /Árabes/i });
    await arabicFilter.click();

    await page.waitForTimeout(300);

    // "Hawas Fire" es árabe y debe estar visible
    await expect(page.getByText("Hawas Fire")).toBeVisible();

    // "Le Male Elixir" de JPG es Diseñador, no debe estar visible
    await expect(page.getByText("Le Male Elixir")).not.toBeVisible();
  });

  test("el filtro Diseñador no debe mostrar productos árabes", async ({
    page,
  }) => {
    const designerFilter = page.getByRole("button", { name: /Diseñador/i });
    await designerFilter.click();

    await page.waitForTimeout(300);

    // "Le Male Elixir" de JPG es diseñador, debe aparecer
    await expect(page.getByText("Le Male Elixir")).toBeVisible();

    // "Hawas Fire" es árabe, NO debe aparecer
    await expect(page.getByText("Hawas Fire")).not.toBeVisible();
  });

  test("el filtro activo debe destacarse visualmente", async ({ page }) => {
    const arabicFilter = page.getByRole("button", { name: /Árabes/i });
    await arabicFilter.click();

    await page.waitForTimeout(300);

    // El filtro activo tiene bg-[#D4AF37] (fondo dorado)
    await expect(arabicFilter).toHaveClass(/bg-\[#D4AF37\]/);
  });
});
