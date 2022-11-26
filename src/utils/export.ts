import { template } from "../resources/tailwind.template.ts";
import { cleanOutput } from "../utils/cleanOutput.ts";
import { createRequire } from "https://deno.land/std@0.112.0/node/module.ts";

const require = createRequire(import.meta.url);

async function findConfig() {
  const allowedFileTypes = ["js", "cjs"];
  for await (const file of Deno.readDir(Deno.cwd())) {
    const fileType = file.name.split(".").pop();
    if (!fileType) break;
    if (
      allowedFileTypes.includes(fileType) &&
      file.name.includes("tailwind.config")
    ) {
      console.log("✅ Found config file: ", file.name);
      return "/" + file.name;
    }
  }
  return null;
}

export async function addColorsToConfig(data: string, name: string) {
  const foundConfig = await findConfig();
  const parsedData = JSON.parse(cleanOutput(data));
  console.table(parsedData);

  let configLocation = Deno.cwd() + foundConfig;

  if (!foundConfig) {
    console.log("⚠️  No config file found, creating one...");
    const data = new TextEncoder().encode(template);
    Deno.writeFile(Deno.cwd() + "/tailwind.config.js", data);
    configLocation = Deno.cwd() + "/tailwind.config.js";
  }

  const currentConfigObject = require(configLocation);

  if (!currentConfigObject?.theme || !currentConfigObject?.theme?.colors) {
    currentConfigObject.theme = { ...currentConfigObject?.theme, colors: {} };
  }
  currentConfigObject.theme.colors = {
    ...currentConfigObject.theme.colors,
    [name]: parsedData,
  };

  const configData = new TextEncoder().encode(
    `module.exports = ${JSON.stringify(currentConfigObject, null, 2)}`
  );

  Deno.writeFileSync(configLocation, configData);
  console.log("✅ Succesfully added colors to config file.");
}
