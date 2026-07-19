import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("./Home.jsx", import.meta.url), "utf8");

assert.match(
  source,
  /import ListAnime from "\.\.\/components\/home\/ListAnime";/,
);
assert.match(source, /<ListAnime\s+titlePage="Anime"\s+path="\/anime"\s+\/>/);

console.log("home page checks passed");
