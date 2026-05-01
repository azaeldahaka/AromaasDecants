import { test, expect } from "@playwright/test";

/**
 * TEST 4: Redirección a WhatsApp en Sellados
 *
 * El botón "Consultar Stock en WhatsApp" en /sellados/[id] usa window.open().
 * WhatsApp puede redirigir wa.me → api.whatsapp.com, así que validamos
 * la URL inicial o final conteniendo "whatsapp" o "wa.me".
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
    const heading = page.getByRole("heading", { name: /perfumes sellados/i });
    await expect(heading).toBeVisible();
  });

  test("los filtros del listado de sellados están presentes", async ({
    page,
  }) => {
    await page.goto("/sellados");
    await expect(page.getByRole("button", { name: /^Todos$/i })).toBeVisible();
    await expect(
      page.getByRole("button", { name: /^Hombre$/i })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: /^Árabe$/i })).toBeVisible();
  });

  test("los cards del listado de sellados contienen links a páginas de detalle", async ({
    page,
  }) => {
    await page.goto("/sellados");
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

      // Verificar que la página cargó — usamos el heading para evitar strict mode violation
      await expect(
        page.getByRole("heading", { name: new RegExp(sellado.nombre, "i") })
      ).toBeVisible();

      // Verificar que el botón de WhatsApp existe
      const waButton = page.getByRole("button", {
        name: /consultar stock/i,
      });
      await expect(waButton).toBeVisible();
      await expect(waButton).toBeEnabled();

      // Interceptamos la apertura de nueva pestaña
      const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        waButton.click(),
      ]);

      // Obtenemos la URL de la nueva pestaña (puede ser wa.me o api.whatsapp.com)
      const waUrl = newPage.url();

      // Verificar que la URL apunta a WhatsApp (en cualquiera de sus formas)
      const isWhatsAppUrl =
        waUrl.includes("wa.me") ||
        waUrl.includes("whatsapp.com") ||
        waUrl.includes("api.whatsapp.com");
      expect(isWhatsAppUrl).toBeTruthy();

      // Verificar que hay un número de teléfono en la URL
      const hasPhoneNumber =
        /wa\.me\/(\d+)/.test(waUrl) ||
        /phone=(\d+)/.test(waUrl) ||
        /5493874431282/.test(waUrl);
      expect(hasPhoneNumber).toBeTruthy();

      console.log(
        `✅ "${sellado.nombre}": WhatsApp URL → ${waUrl.substring(0, 80)}`
      );

      await newPage.close();
    });
  }

  test("hacer click en un card del listado navega al detalle correcto", async ({
    page,
  }) => {
    await page.goto("/sellados");

    const hawasCard = page.locator('a[href="/sellados/hawas-malibu-sellado"]');
    await expect(hawasCard).toBeVisible();
    await hawasCard.click();

    await expect(page).toHaveURL(/\/sellados\/hawas-malibu-sellado/);

    // Usar getByRole(heading) para evitar strict mode violation con route announcer
    await expect(
      page.getByRole("heading", { name: /Hawas Malibu/i })
    ).toBeVisible();
  });

  test("el filtro Árabe en sellados muestra solo productos árabes", async ({
    page,
  }) => {
    await page.goto("/sellados");

    const arabeFilter = page.getByRole("button", { name: /^Árabe$/i });
    await arabeFilter.click();
    await page.waitForTimeout(300);

    // Hawas Malibu es árabe, debe aparecer
    const hawasCard = page.locator('a[href="/sellados/hawas-malibu-sellado"]');
    await expect(hawasCard).toBeVisible();

    // Le Male Elixir de JPG es diseñador, NO debe aparecer
    const jPGCard = page.locator('a[href="/sellados/jpg-le-male-sellado"]');
    await expect(jPGCard).not.toBeVisible();
  });
});
