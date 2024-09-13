export const toSentenceCase = (text: string): string => {
  const sentences = text.split(". ");
  const sentenceCaseSentences = sentences.map((sentence) => {
    const words = sentence.split(" ");
    const firstWord = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    const restWords = words.slice(1);
    return [firstWord, ...restWords].join(" ");
  });
  return sentenceCaseSentences.join(". ");
};

export const toTitleCase = (text: string): string => {
  const words = text.split(" ");
  const titleCaseWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return titleCaseWords.join(" ");
};

export const toCamelCase = (text: string): string => {
  const words = text.split(" ");
  const camelCaseWords = words.map((word, index) => {
    if (index === 0) {
      return word.toLowerCase();
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return camelCaseWords.join("");
};

export const toPascalCase = (text: string): string => {
  const words = text.split(" ");
  const pascalCaseWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return pascalCaseWords.join("");
};

export const toSnakeCase = (text: string): string => {
  const words = text.split(" ");
  const snakeCaseWords = words.map((word) => word.toLowerCase());
  return snakeCaseWords.join("_");
};

export const toKebabCase = (text: string): string => {
  const words = text.split(" ");
  const kebabCaseWords = words.map((word) => word.toLowerCase());
  return kebabCaseWords.join("-");
};
