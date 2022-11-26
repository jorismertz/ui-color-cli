import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";
import { addColorsToConfig } from "./export.ts";

const pageUrl = "https://uicolors.app/create";
const inputSelector = "input[placeholder='Hexcode']";

export async function main(color: string, name: string) {
  console.log("⏱️ fetching colors...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(pageUrl);

  // Select and replace color input field
  await page.click(inputSelector, { clickCount: 3 });
  await page.type(inputSelector, color || "#000000");

  // Selecting the specific button is a pain because they use tailwind classes.
  const matchingButtons = await page.$$("button");

  matchingButtons.forEach(async (button) => {
    const thisButton = await button.evaluate((node) => node.textContent);

    if (thisButton === "Export") {
      await button.click();
      const outputContainer = await page.$("pre#tailwind");
      if (!outputContainer) throw new Error("No output container found");
      const tailwindConfig = await outputContainer.evaluate(
        (node) => node.textContent
      );
      if (!tailwindConfig) throw new Error("Something went wrong.");
      console.log("✅ Succesfully fetched color pallete.");
      addColorsToConfig(tailwindConfig, name);
      await browser.close();
    }
  });
}
