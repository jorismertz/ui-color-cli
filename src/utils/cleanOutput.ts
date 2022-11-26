// hey.. it works.

export function cleanOutput(output: string) {
  const result = output
    .replace(/'/g, '"')
    .replace(/\n/g, "")
    .replace(/\\/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/,}/gm, "}")
    .replace(/\"(.*?)\":\s/, "")
    .replace(/\},/, "}");

  return result;
}
