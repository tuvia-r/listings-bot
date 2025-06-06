import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

//

export default defineConfig([
  { files: ["**/*.{ts,mts,cts}"], languageOptions: { globals: globals.node } },
  tseslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.mts", "**/*.cts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    files: ["**/*.ts", "**/*.mts", "**/*.cts"],
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    ignores: ["dist", "node_modules", "coverage", "build", "out", "lib", '.puppeteerrc.cjs'],
  },
]);
