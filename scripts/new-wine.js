import fs from "node:fs/promises";
import path from "node:path";

const wineId = process.argv[2];

if (!wineId) {
  throw new Error("Please provide a wine id as an argument.");
}

const winesJsonPath = path.resolve("src/content/wines.json");
const makersDirPath = path.resolve("src/content/makers");
const vintagesDirPath = path.resolve("src/content/vintages");

// 1. Update wines.json
try {
  const winesJson = await fs.readFile(winesJsonPath, "utf8");
  const wines = JSON.parse(winesJson);
  wines.push({
    hue: "",
    id: wineId,
    maker: "",
    name: "",
  });
  await fs.writeFile(winesJsonPath, JSON.stringify(wines, undefined, 2) + "\n");
  console.log(`Added "${wineId}" to ${winesJsonPath}`);
} catch (error) {
  console.error(`Error updating ${winesJsonPath}:`, error);
}

// 2. Create maker file
const makerFilePath = path.join(makersDirPath, `${wineId}-maker-TODO.mdx`);
const makerFileContent = `---
name: TODO
location: TODO
website: TODO
coordinates: TODO
---
`;
try {
  await fs.writeFile(makerFilePath, makerFileContent);
  console.log(`Created maker file: ${makerFilePath}`);
} catch (error) {
  console.error(`Error creating maker file:`, error);
}

// 3. Create vintage directory
const vintageDirPath = path.join(vintagesDirPath, wineId);
try {
  await fs.mkdir(vintageDirPath, { recursive: true });
  console.log(`Created vintage directory: ${vintageDirPath}`);
} catch (error) {
  console.error(`Error creating vintage directory:`, error);
}
