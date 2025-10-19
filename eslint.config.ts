import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import json from "@eslint/json";
import prettier from "eslint-config-prettier";
import astro from "eslint-plugin-astro";
import packageJson from "eslint-plugin-package-json";
import perfectionist from "eslint-plugin-perfectionist";
import unicorn from "eslint-plugin-unicorn";
import { defineConfig } from "eslint/config";
import globals from "globals";
import Path from "node:path";
import Url from "node:url";
import tseslint from "typescript-eslint";

// TODO Switch to built-ins e.g. import.meta.dirname, circa node v20.11
const __filename = Url.fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);
const gitignorePath = Path.resolve(__dirname, ".gitignore");

export default defineConfig([
  includeIgnoreFile(gitignorePath),
  {
    extends: [packageJson.configs.recommended],
    rules: {
      "package-json/require-description": "off",
    },
  },
  {
    extends: [json.configs.recommended],
    files: ["**/*.json"],
    ignores: ["package.json", "package-lock.json"],
    language: "json/json",
    rules: {
      "json/sort-keys": "error",
    },
  },
  {
    extends: [json.configs.recommended],
    files: ["**/*.jsonc", ".vscode/*.json"],
    language: "json/jsonc",
    rules: {
      "json/sort-keys": "error",
    },
  },
  {
    extends: [
      js.configs.recommended,
      tseslint.configs.strict,
      tseslint.configs.stylistic,
      unicorn.configs.recommended,
      perfectionist.configs["recommended-natural"],
    ],
    files: ["**/*.{js,ts,tsx,jsx,astro,mjs}"],
    rules: {
      "unicorn/no-keyword-prefix": ["off"],
      "unicorn/prevent-abbreviations": ["off"],
    },
  },
  {
    files: ["*.{js,ts,mjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    extends: [astro.configs.recommended, astro.configs["jsx-a11y-strict"]],
    files: ["**/*.astro"],
    rules: {
      // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v56.0.1/docs/rules/prefer-module.md
      // accounts for Astro frontmatter not looking like an ES Module
      "unicorn/prefer-module": ["off"],
    },
  },
  prettier,
]);
