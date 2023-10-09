#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";
import { guessDistTag } from "./index.js";

const pkg = await loadPackageJson();
const distTag = await guessDistTag(pkg.name, pkg.version);
console.log(distTag);

/**
 *
 * @param {string=} cwd
 * @return {any}
 */
async function loadPackageJson(cwd = process.cwd()) {
  const packageJsonPath = path.join(cwd, "package.json");
  const packageJson = await readFile(packageJsonPath, "utf8");
  return JSON.parse(packageJson);
}
