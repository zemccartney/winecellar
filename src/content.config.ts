import { file, glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

const makers = defineCollection({
  loader: glob({
    base: "./src/content/makers",
    pattern: "**/[^_]*.{md,mdx}",
  }),
  schema: z.object({
    coordinates: z.tuple([z.number(), z.number()]),
    location: z.string(),
    name: z.string(),
    website: z.string().url().optional(),
  }),
});

const wines = defineCollection({
  loader: file("src/content/wines.json"),
  schema: z.object({
    hue: z.string(),
    maker: reference("makers"),
    name: z.string(),
  }),
});

const vintages = defineCollection({
  loader: glob({
    base: "./src/content/vintages",
    pattern: "**/[^_]*.{md,mdx}",
  }),
  schema: z.object({
    cepage: z.string(),
    dateTried: z.string(),
    wine: reference("wines"),
  }),
});

export const collections = {
  makers,
  vintages,
  wines,
};
