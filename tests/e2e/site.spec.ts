import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/identidad",
  "/funciones",
  "/modo-estudio",
  "/bibi",
  "/descargar",
  "/contacto",
  "/privacidad",
  "/terminos",
];

test.describe("sitio público", () => {
  for (const route of routes) {
    test(`${route} responde y conserva una estructura accesible`, async ({ page }) => {
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.ok()).toBeTruthy();
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main#main-content")).toBeVisible();
      await expect(page).toHaveTitle(/BIBLION/u);
    });
  }

  test("los tres temas se seleccionan y persisten", async ({ page }, testInfo) => {
    await page.goto("/");

    const isMobile = (testInfo.project.use.viewport?.width ?? 1280) <= 760;

    for (const [label, theme] of [
      ["Usar tema claro", "light"],
      ["Usar tema oscuro", "dark"],
      ["Usar tema azul", "blue"],
    ] as const) {
      if (isMobile) {
        await page.getByRole("button", { name: /cambiar tema/i }).click();
      }
      await page.getByRole("button", { name: label }).filter({ visible: true }).click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
    }

    await page.goto("/funciones");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "blue");
  });

  test("el diálogo de acceso anticipado restaura el foco", async ({ page }) => {
    await page.goto("/");
    const trigger = page
      .getByRole("button", { name: "Acceso anticipado" })
      .filter({ visible: true })
      .first();
    await trigger.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("el simulador de Modo estudio conserva sus interacciones principales", async ({ page }) => {
    await page.goto("/modo-estudio", { waitUntil: "domcontentloaded" });
    await page.getByRole("link", { name: "Probar el editor" }).click();

    const simulator = page.locator(".study-live-device");
    const bold = simulator.getByRole("button", { name: "Negrita" });
    await bold.click();
    await expect(bold).toHaveAttribute("aria-pressed", "true");

    await simulator.getByRole("button", { name: "Mostrar solo el documento" }).click();
    await expect(simulator).toHaveClass(/is-document-only/u);

    await simulator
      .getByRole("button", { name: /Cambiar tema de la aplicación/u })
      .click();
    await expect(simulator).toHaveClass(/study-theme-light/u);

    await simulator.getByRole("button", { name: "Abrir Bibi" }).click();
    const assistant = simulator.getByRole("dialog", { name: "Bibi dentro del editor" });
    await expect(assistant).toBeVisible();
    await assistant.getByRole("button", { name: "Explica Juan 15:5" }).click();
    await expect(assistant).toContainText("Jesús como la vid");
  });

  test("la portada muestra cifras reales y el recorrido por pasos", async ({ page }) => {
    await page.goto("/");
    const stats = page.locator(".home-stats");
    await stats.scrollIntoViewIfNeeded();
    await expect(stats).toContainText("340.645");
    await expect(stats).toContainText("6.346");

    for (const step of ["descubrir", "preguntar", "construir"]) {
      const item = page.locator(`[data-step="${step}"]`);
      await item.evaluate((node) => node.scrollIntoView({ block: "center" }));
      await expect(item).toHaveClass(/is-active/u);
    }
  });

  test("la imagen para redes sociales está publicada", async ({ request, page }) => {
    await page.goto("/");
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(ogImage).toContain("/og/biblion-og.png");
    const response = await request.get("/og/biblion-og.png");
    expect(response.ok()).toBeTruthy();
  });

  test("robots, sitemap y manifest están disponibles", async ({ request }) => {
    for (const path of ["/robots.txt", "/sitemap.xml", "/manifest.webmanifest"]) {
      const response = await request.get(path);
      expect(response.ok()).toBeTruthy();
    }
  });
});
