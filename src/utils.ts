import type { CollectionEntry } from "astro:content";

const formatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  // accounts for browser bug by which passing YYYY-MM-DD to Date yields the timestamp for
  // the start of that day in UTC, regardless of local timezone
  // e.g. new Date(2024-10-22), if I'm in Portland, ME, yields the timestamp for October 11th @ 8PM in Portland (-4:00 from UTC)
  timeZone: "UTC",
  year: "numeric",
});

export const formatYYYYMMDD = (yyyymmdd: string) => {
  const parts = formatter.formatToParts(new Date(yyyymmdd));

  // formatter should guarantee these parts exist
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  const day = parts.find((p) => p.type === "day")!;
  const month = parts.find((p) => p.type === "month")!;
  const year = parts.find((p) => p.type === "year")!;
  /* eslint-enable @typescript-eslint/no-non-null-assertion */

  return `${month.value} ${day.value}, ${year.value}`;
};

const vintageImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/content/vintages/**/*.{jpeg,jpg,png}",
);

export const vintageImage = (vintage: CollectionEntry<"vintages">) => {
  return vintageImages[`/src/content/vintages/${vintage.id}.png`]?.();
};

export const getVintageYear = (vintage: CollectionEntry<"vintages">) =>
  vintage.id.split("/")[1].toLocaleUpperCase(); // uppercase handles nv (nonvintage) id
