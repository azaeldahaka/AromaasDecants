import { test, expect } from "@playwright/test";

/**
 * TEST 2: Catálogo y Filtros
 *
 * Verifica que en /catalog:
 * - Los chips de filtrado existen
 * - Al hacer click en "Árabes", la grilla se actualiza
 *   mostrando solo productos de esa categoría
 * - Al hacer click en "Árabes", no aparecen productos de tipo "Diseñador"
 */
test.describe("Catálogo y Filtros", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/catalog");
  });

  test("la página del catálogo carga correctamente", async ({ page }) => {
    // El heading del catálogo debe estar visible
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
  });

  test("todos los chips de filtro deben estar presentes", async ({ page }) => {
    // Los filtros disponibles en /catalog son: Nuestra Colección, Árabes, Diseñador, Para Hombre, Para Mujer
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
    // Hace click en el filtro "Árabes"
    const arabicFilter = page.getByRole("button", { name: /Árabes/i });
    await arabicFilter.click();

    // Espera a que la grilla se actualice
    await page.waitForTimeout(300);

    // Debe aparecer al menos un producto árabe conocido
    // "Hawas Fire" es árabe (tipo: "Árabe") y debe estar visible
    const hawasCard = page.getByText("Hawas Fire");
    await expect(hawasCard).toBeVisible();

    // El producto "Le Male Elixir" de JPG es de tipo Diseñador, no debe estar visible
    const designerProduct = page.getByRole("link", {
      name: /Le Male Elixir/i,
    });
    await expect(designerProduct).not.toBeVisible();
  });

  test("el filtro Diseñador no debe mostrar productos árabes", async ({
    page,
  }) => {
    const designerFilter = page.getByRole("button", { name: /Diseñador/i });
    await designerFilter.click();

    await page.waitForTimeout(300);

    // "Le Male Elixir" de JPG es diseñador, debe aparecer
    const jPGCard = page.getByText("Le Male Elixir");
    await expect(jPGCard).toBeVisible();

    // "Hawas Fire" es árabe, NO debe aparecer
    const arabicProduct = page.getByText("Hawas Fire");
    await expect(arabicProduct).not.toBeVisible();
  });

  test("el filtro activo debe destacarse visualmente", async ({ page }) => {
    const arabicFilter = page.getByRole("button", { name: /Árabes/i });
    await arabicFilter.click();

    // El filtro activo tiene la clase bg-[#D4AF37] — verificamos con aria o clases
    // Verificamos que el chip tiene la clase de activo (texto negro sobre fondo dorado)
    await expect(arabicFilter).toHaveClass(/bg-\[#D4AF37\]/);
  });
});
