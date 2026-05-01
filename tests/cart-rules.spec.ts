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
 * Helper: Abre el carrito haciendo click en el ícono del carrito del header.
 */
async function openCart(page: import("@playwright/test").Page) {
  // Intentamos primero por aria-label
  const cartByAria = page.getByRole("button", { name: /carrito|cart/i });

  if (await cartByAria.isVisible()) {
    await cartByAria.click();
  } else {
    // Fallback: el carrito es el último botón del header
    const headerButtons = page.locator("header button");
    const count = await headerButtons.count();
    await headerButtons.nth(count - 1).click();
  }
}

test.describe("Reglas de Negocio del Carrito", () => {
  test("el botón de checkout está DESHABILITADO con menos de 6ml (3ml)", async ({
    page,
  }) => {
    // 1. Ir a la página del producto Hawas Fire (árabe, 3ml disponible)
    await page.goto("/product/hawas-fire");

    // 2. Verificar que estamos en la página correcta
    await expect(page.getByText("Hawas Fire")).toBeVisible();

    // 3. El tamaño por defecto es 3ml — click en "Añadir al carrito"
    const addButton = page.getByRole("button", { name: /añadir al carrito/i });
    await expect(addButton).toBeVisible();
    await addButton.click();

    // 4. Esperar el toast de confirmación
    await page.waitForTimeout(500);

    // 5. Abrir el carrito
    await openCart(page);

    // 6. El carrito debe estar abierto con el producto
    await expect(page.getByText("TU CARRITO")).toBeVisible();
    await expect(page.getByText("Hawas Fire")).toBeVisible();

    // 7. Verificar que se muestra la advertencia de mínimo
    await expect(page.getByText(/pedido mínimo.*6ml/i)).toBeVisible();

    // 8. CRÍTICO: El botón de checkout debe estar DESHABILITADO
    const checkoutButton = page.getByRole("button", {
      name: /checkout por whatsapp/i,
    });
    await expect(checkoutButton).toBeDisabled();
  });

  test("el botón de checkout está HABILITADO con 8ml en total (3ml + 5ml)", async ({
    page,
  }) => {
    // === PARTE 1: Añadir 3ml de Hawas Fire ===
    await page.goto("/product/hawas-fire");
    await expect(page.getByText("Hawas Fire")).toBeVisible();

    // Asegurarse de que 3ml está seleccionado (es el default)
    const size3ml = page.getByRole("button", { name: /^3ml$/i });
    await expect(size3ml).toBeVisible();
    await size3ml.click();

    const addButton = page.getByRole("button", { name: /añadir al carrito/i });
    await addButton.click();
    await page.waitForTimeout(500);

    // === PARTE 2: Añadir 5ml de Hawas Tropical ===
    await page.goto("/product/hawas-tropical");
    await expect(page.getByText("Hawas Tropical")).toBeVisible();

    // Seleccionar 5ml
    const size5ml = page.getByRole("button", { name: /^5ml$/i });
    await expect(size5ml).toBeVisible();
    await size5ml.click();

    const addButton2 = page.getByRole("button", {
      name: /añadir al carrito/i,
    });
    await addButton2.click();
    await page.waitForTimeout(500);

    // === PARTE 3: Verificar el carrito con 8ml total ===
    await openCart(page);

    // El carrito debe estar abierto
    await expect(page.getByText("TU CARRITO")).toBeVisible();

    // Ambos productos deben estar en el carrito
    await expect(page.getByText("Hawas Fire")).toBeVisible();
    await expect(page.getByText("Hawas Tropical")).toBeVisible();

    // La advertencia de mínimo NO debe aparecer (ya superamos 6ml)
    await expect(page.getByText(/pedido mínimo.*6ml/i)).not.toBeVisible();

    // CRÍTICO: El botón de checkout debe estar HABILITADO
    const checkoutButton = page.getByRole("button", {
      name: /checkout por whatsapp/i,
    });
    await expect(checkoutButton).toBeEnabled();
    await expect(checkoutButton).not.toBeDisabled();
  });
});
