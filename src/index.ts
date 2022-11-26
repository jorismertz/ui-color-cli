import Denomander from "https://deno.land/x/denomander@0.9.3/mod.ts";
import { main } from "./utils/getColors.ts";

const program = new Denomander({
  app_name: "uicolors",
  app_description: "A CLI for uicolors.app",
  app_version: "1.0.1",
});

program
  .command("add")
  .option("-c --color", "Color to create pallete from in hex format")
  .option("-n --name", "Name of the color")
  .parse(Deno.args);

if (program.color && program.name) {
  main(program.color, program.name);
}
