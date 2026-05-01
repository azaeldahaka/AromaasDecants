import { test, expect } from "@playwright/test";

/**
 * TEST 4: Redirección a WhatsApp en Sellados
 *
 * El botón "Consultar Stock en WhatsApp" en /sellados/[id] es un <button>
 * que dispara window.open() con un link wa.me. Lo validamos interceptando
 * la apertura de nueva ventana para verificar que la URL contiene wa.me.
 *
 * También validamos que el listado de sellados carga y los cards navegan
 * correctamente a las páginas de detalle.
 */
test.describe("Redirección a WhatsApp en Sellados", () => {
  const selladosParaTestear = [
    { id: "hawas-malibu-sellado", nombre: "Hawas Malibu" },
    { id: "afnan-9pm-sellado", nombre: "9PM" },
    { id: "lattafa-khamrah-sellado", nombre: "Khamrah" },
  ];

  test("la página de listado de sellados carga correctamente", async ({
    page,
  }) => {
    await page.goto("/sellados");

    // El heading de sellados debe estar visible
    const heading = page.getByRole("heading", { name: /perfumes sellados/i });
    await expect(heading).toBeVisible();
  });

  test("los filtros del listado de sellados están presentes", async ({
    page,
  }) => {
    await page.goto("/sellados");

    // Filtros: Todos, Hombre, Unisex, Diseñador, Árabe, Oferta
    await expect(page.getByRole("button", { name: /^Todos$/i })).toBeVisible();
    await expect(
      page.getByRole("button", { name: /^Hombre$/i })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: /^Árabe$/i })).toBeVisible();
  });

  test("los cards del listado de sellados contienen links a las páginas de detalle", async ({
    page,
  }) => {
    await page.goto("/sellados");

    // Verificar que existen links a páginas de detalle (/sellados/[id])
    const selladoLinks = page.locator('a[href^="/sellados/"]');
    const count = await selladoLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  // Test parametrizado: verifica el botón de WhatsApp en cada sellado
  for (const sellado of selladosParaTestear) {
    test(`el detalle de "${sellado.nombre}" tiene botón de WhatsApp que lleva a wa.me`, async ({
      page,
      context,
    }) => {
      await page.goto(`/sellados/${sellado.id}`);

      // Verificar que la página cargó correctamente
      await expect(page.getByText(sellado.nombre)).toBeVisible();

      // Verificar que el botón de WhatsApp existe y tiene el texto correcto
      const waButton = page.getByRole("button", {
        name: /consultar stock/i,
      });
      await expect(waButton).toBeVisible();
      await expect(waButton).toBeEnabled();

      // Interceptamos la apertura de nueva pestaña para capturar la URL de wa.me
      const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        waButton.click(),
      ]);

      // Verificar que la URL de la nueva pestaña apunta a wa.me
      const waUrl = newPage.url();
      expect(waUrl).toContain("wa.me");

      // Verificar que el número de teléfono está presente en la URL
      const phoneMatch = waUrl.match(/wa\.me\/(\d+)/);
      expect(phoneMatch).not.toBeNull();
      expect(phoneMatch![1].length).toBeGreaterThanOrEqual(10);

      console.log(
        `✅ "${sellado.nombre}": WhatsApp URL → ${waUrl.substring(0, 80)}...`
      );

      await newPage.close();
    });
  }

  test('hacer click en un card del listado navega al detalle correcto', async ({
    page,
  }) => {
    await page.goto("/sellados");

    // Buscar el card de Hawas Malibu y hacer click
    const hawasCard = page.locator('a[href="/sellados/hawas-malibu-sellado"]');
    await expect(hawasCard).toBeVisible();
    await hawasCard.click();

    // Debe navegar a la página de detalle
    await expect(page).toHaveURL(/\/sellados\/hawas-malibu-sellado/);
    await expect(page.getByText("Hawas Malibu")).toBeVisible();
  });

  test("el filtro Árabe en sellados muestra solo productos árabes", async ({
    page,
  }) => {
    await page.goto("/sellados");

    const arabeFilter = page.getByRole("button", { name: /^Árabe$/i });
    await arabeFilter.click();

    await page.waitForTimeout(300);

    // Hawas Malibu es árabe y debe aparecer
    const hawasCard = page.locator('a[href="/sellados/hawas-malibu-sellado"]');
    await expect(hawasCard).toBeVisible();

    // Jean Paul Gaultier Le Male es diseñador, NO debe aparecer
    const jPGCard = page.locator('a[href="/sellados/jpg-le-male-sellado"]');
    await expect(jPGCard).not.toBeVisible();
  });
});
