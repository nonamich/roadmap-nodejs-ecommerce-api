/**
 * @type {import("prettier").Config}
 */
export const basePrettierConfig = {
  trailingComma: "all",
  singleQuote: true,
  plugins: ["prettier-plugin-organize-imports", "prettier-plugin-tailwindcss"],
};
