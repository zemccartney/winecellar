import fs from "node:fs/promises";
import path from "node:path";

const makerId = process.argv[2];
const wineId = process.argv[3];
const vintageId = process.argv[4];

if (!makerId || !wineId || !vintageId) {
  throw new Error("Must provide a maker, wine, and vintage");
}

const winesJsonPath = path.resolve("src/content/wines.json");
const makersDirPath = path.resolve("src/content/makers");
const vintagesDirPath = path.resolve("src/content/vintages");

// 1. Update wines.json
try {
  const winesJson = await fs.readFile(winesJsonPath, "utf8");
  const wines = JSON.parse(winesJson);
  if (wines.some((wine) => wine.id === wineId)) {
    console.log(`Wine "${wineId}" already exists in ${winesJsonPath}`);
  } else {
    wines.push({
      hue: "",
      id: wineId,
      maker: makerId,
      name: "",
    });
    await fs.writeFile(
      winesJsonPath,
      JSON.stringify(wines, undefined, 2) + "\n",
    );
    console.log(`Added "${wineId}" to ${winesJsonPath}`);
  }
} catch (error) {
  console.error(`Error updating ${winesJsonPath}:`, error);
}

// 2. Create maker file
const makerFilePath = path.join(makersDirPath, `${makerId}.mdx`);
const makerFileContent = `---\ncoordinates: TODO\nlocation: TODO\nname: TODO\nwebsite: TODO\n---\n`;
try {
  await fs.writeFile(makerFilePath, makerFileContent, { flag: "wx" });
  console.log(`Created maker file: ${makerFilePath}`);
} catch (error) {
  if (error.code === "EEXIST") {
    console.log(`Maker file already exists: ${makerFilePath}`);
  } else {
    console.error(`Error creating maker file:`, error);
  }
}

// 3. Create vintage directory and vintage file
const vintageDir = path.join(vintagesDirPath, wineId);
const vintageFilePath = path.join(vintageDir, `${vintageId}.mdx`);
const vintageFileContent = `---\ncepage: TODO\ndateTried: TODO\nwine: ${wineId} \n---\n`;
try {
  await fs.mkdir(vintageDir, { recursive: true });
  await fs.writeFile(vintageFilePath, vintageFileContent, { flag: "wx" });
  console.log(`Created vintage file: ${vintageFilePath}`);
} catch (error) {
  if (error.code === "EEXIST") {
    console.log(`Vintage file already exists: ${vintageFilePath}`);
  } else {
    console.error(`Error creating vintage file:`, error);
  }
}
