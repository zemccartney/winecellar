import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
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
import tseslint from "typescript-eslint";

const gitignorePath = Path.resolve(import.meta.dirname, ".gitignore");

export default defineConfig([
    includeIgnoreFile(gitignorePath),
    {
        extends: [comments.recommended],
        rules: {
            "@eslint-community/eslint-comments/require-description": "error"
        }
    },
    {
        extends: [packageJson.configs.recommended],
        rules: {
            "package-json/require-description": "off",
            "package-json/require-license": "off" // TODO re-enable, figure out appropriate license
        }
    },
    {
        extends: [json.configs.recommended],
        files: ["**/*.json"],
        ignores: ["package.json", "package-lock.json", "tsconfig.json"],
        language: "json/json",
        rules: {
            "json/sort-keys": "error"
        }
    },
    {
        extends: [json.configs.recommended],
        files: ["**/*.jsonc", ".vscode/*.json", "tsconfig.json"],
        language: "json/jsonc",
        rules: {
            "json/sort-keys": "error"
        }
    },
    {
        extends: [
            js.configs.recommended,
            tseslint.configs.strict,
            tseslint.configs.stylistic,
            unicorn.configs.recommended,
            perfectionist.configs["recommended-natural"]
        ],
        // astro files still get non-typed lint rules from typescript eslint ...
        files: ["**/*.{js,ts,tsx,jsx,astro,mjs}"],
        rules: {
            "block-scoped-var": ["error"],
            "unicorn/no-keyword-prefix": ["off"],
            "unicorn/prevent-abbreviations": ["off"]
        }
    },
    // ... but typed linting crashes eslint on astro files, seems to be some conflict in
    // parser settings? leaving alone for now
    {
        extends: [
            tseslint.configs.strictTypeChecked,
            tseslint.configs.stylisticTypeChecked
        ],
        files: ["**/*.{ts,tsx,mts}"],
        languageOptions: {
            parserOptions: {
                projectService: true
            }
        }
    },
    {
        files: ["*.{js,ts,mjs}", "./scripts/*.js"],
        languageOptions: {
            globals: {
                ...globals.node
            }
        }
    },
    {
        extends: [astro.configs.recommended, astro.configs["jsx-a11y-strict"]],
        files: ["**/*.astro"],
        rules: {
            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v56.0.1/docs/rules/prefer-module.md
            // accounts for Astro frontmatter not looking like an ES Module
            "unicorn/prefer-module": ["off"]
        }
    },
    prettier
]);
