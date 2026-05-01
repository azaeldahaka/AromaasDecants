import { test, expect } from "@playwright/test";

/**
 * TEST 3: Reglas de Negocio del Carrito (EL MÁS IMPORTANTE)
 *
 * REGLA: El pedido mínimo para finalizar la compra es de 6ml en total.
 * - Botón "Checkout por WhatsApp" deshabilitado si totalMl < 6
 * - Botón habilitado si totalMl >= 6
 *
 * Flujo:
 * 1. Añadir 1x 3ml de Hawas Fire → total 3ml → botón DESHABILITADO
 * 2. Añadir 1x 5ml de Hawas Tropical → total 8ml → botón HABILITADO
 */

/**
 * Helper: Abre el carrito haciendo click en el botón con aria-label="Ver carrito"
 * El CartDrawer es un <aside> que solo se renderiza cuando está abierto.
 */
async function openCart(page: import("@playwright/test").Page) {
  // El botón del carrito tiene aria-label="Ver carrito" (Navbar.tsx, línea 79)
  const cartButton = page.getByRole("button", { name: "Ver carrito" });
  await expect(cartButton).toBeVisible({ timeout: 5000 });
  await cartButton.click();

  // El CartDrawer se renderiza como un <aside> cuando está abierto
  const cartPanel = page.locator("aside");
  await expect(cartPanel).toBeVisible({ timeout: 5000 });
}

test.describe("Reglas de Negocio del Carrito", () => {
  test("el botón de checkout está DESHABILITADO con menos de 6ml (3ml)", async ({
    page,
  }) => {
    // 1. Ir a la página del producto Hawas Fire (árabe, 3ml disponible)
    await page.goto("/product/hawas-fire");

    // 2. Verificar que estamos en la página correcta
    await expect(
      page.getByRole("heading", { name: /Hawas Fire/ })
    ).toBeVisible();

    // 3. El tamaño por defecto es 3ml — click en "Añadir al carrito"
    const addButton = page.getByRole("button", { name: /añadir al carrito/i });
    await expect(addButton).toBeVisible();
    await addButton.click();

    // 4. Esperar el toast de confirmación
    await page.waitForTimeout(700);

    // 5. Abrir el carrito
    await openCart(page);

    // 6. El panel lateral del carrito debe estar abierto
    const cartPanel = page.locator("aside");

    // 7. El producto debe estar en el carrito (buscar dentro del panel)
    await expect(
      cartPanel.getByRole("heading", { name: /Hawas Fire/ })
    ).toBeVisible();

    // 8. Verificar que se muestra la advertencia de mínimo
    await expect(
      cartPanel.getByText(/pedido mínimo.*6ml/i)
    ).toBeVisible();

    // 9. CRÍTICO: El botón de checkout debe estar DESHABILITADO
    const checkoutButton = cartPanel.getByRole("button", {
      name: /checkout por whatsapp/i,
    });
    await expect(checkoutButton).toBeDisabled();
  });

  test("el botón de checkout está HABILITADO con 8ml en total (3ml + 5ml)", async ({
    page,
  }) => {
    // === PARTE 1: Añadir 3ml de Hawas Fire ===
    await page.goto("/product/hawas-fire");
    await expect(
      page.getByRole("heading", { name: /Hawas Fire/ })
    ).toBeVisible();

    // Seleccionar 3ml (es el default, pero lo seleccionamos explícitamente)
    const size3ml = page.getByRole("button", { name: /^3ml$/i });
    await expect(size3ml).toBeVisible();
    await size3ml.click();

    const addButton = page.getByRole("button", { name: /añadir al carrito/i });
    await addButton.click();
    await page.waitForTimeout(700);

    // === PARTE 2: Añadir 5ml de Hawas Tropical ===
    await page.goto("/product/hawas-tropical");
    await expect(
      page.getByRole("heading", { name: /Hawas Tropical/ })
    ).toBeVisible();

    // Seleccionar 5ml
    const size5ml = page.getByRole("button", { name: /^5ml$/i });
    await expect(size5ml).toBeVisible();
    await size5ml.click();

    const addButton2 = page.getByRole("button", {
      name: /añadir al carrito/i,
    });
    await addButton2.click();
    await page.waitForTimeout(700);

    // === PARTE 3: Verificar el carrito con 8ml total ===
    await openCart(page);

    const cartPanel = page.locator("aside");

    // Ambos productos deben estar en el carrito (buscar dentro del panel aside)
    await expect(
      cartPanel.getByRole("heading", { name: /Hawas Fire/ })
    ).toBeVisible();
    await expect(
      cartPanel.getByRole("heading", { name: /Hawas Tropical/ })
    ).toBeVisible();

    // La advertencia de mínimo NO debe aparecer (ya superamos 6ml)
    await expect(
      cartPanel.getByText(/pedido mínimo.*6ml/i)
    ).not.toBeVisible();

    // CRÍTICO: El botón de checkout debe estar HABILITADO
    const checkoutButton = cartPanel.getByRole("button", {
      name: /checkout por whatsapp/i,
    });
    await expect(checkoutButton).toBeEnabled();
    await expect(checkoutButton).not.toBeDisabled();
  });
});
