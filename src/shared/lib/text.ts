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

export const toUnderscoreCase = (text: string): string => {
  return text
    .trim()
    .replace(/([A-ZА-ЯЁ])/g, "_$1")
    .toLowerCase()
    .replace(/\s+/g, "_");
};

export const toSlug = (text: string): string => {
  const translitMap = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "e",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "sch",
    ы: "y",
    э: "e",
    ю: "yu",
    я: "ya",
  } as Record<string, string>;

  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[а-яё]/g, (char) => translitMap[char] || char) // Транслитерация русских букв
    .replace(/\s+/g, "-") // Заменяем пробелы на дефисы
    .replace(/[^\w\-]+/g, "") // Удаляем не буквы, цифры и дефисы
    .replace(/\-\-+/g, "-") // Убираем множественные дефисы
    .replace(/^-+/, "") // Убираем дефисы в начале строки
    .replace(/-+$/, "");
};
