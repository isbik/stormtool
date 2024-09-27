const prettier = require("prettier/standalone");
const plugins = [
  require("prettier/plugins/babel"),
  require("prettier/plugins/postcss"),
  require("prettier/plugins/estree"),
  require("prettier/plugins/html"),
  require("prettier/plugins/markdown"),
  require("prettier/plugins/yaml"),
  require("prettier/plugins/flow"),
  require("prettier/plugins/typescript"),
  require("prettier/plugins/graphql"),
];

export const prettierParsers = {
  css: "css",
  javascript: "babel",
  jsx: "babel",
  svg: "html",
  xml: "html",
  typescript: "typescript",
};

export const supportedLanguages = [
  "json",
  "babylon",
  "html",
  "postcss",
  "graphql",
  "markdown",
  "yaml",
  "typescript",
  "flow",
  ...Object.keys(prettierParsers),
];

// Function to prettify the given code based on the language
export async function prettify(
  language: keyof typeof prettierParsers | "json" | string,
  value: string
): Promise<string> {
  let result;

  if (!supportedLanguages.includes(language)) return value;

  if (language === "json") {
    result = JSON.stringify(JSON.parse(value), null, 2);
  } else {
    result = prettier.format(value, {
      parser: (prettierParsers as Record<string, string>)[language] || language,
      plugins,
      semi: true,
    });
  }

  return result;
}
