"use client";

import { useStorage } from "@/shared/hooks/use-storage";
import {
  toSentenceCase,
  toTitleCase,
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  toKebabCase,
  toUnderscoreCase,
} from "@/shared/lib/text";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Textarea } from "@/shared/ui/textarea";

const TEXT_FORMATS = [
  {
    name: "Заглавные предложения",
    value: "toSentenceCase",
    converter: (value: string) => toSentenceCase(value),
  },
  {
    name: "Title Case",
    value: "toTitleCase",
    converter: (value: string) => toTitleCase(value),
  },
  {
    name: "camelCase",
    value: "toCamelCase",
    converter: (value: string) => toCamelCase(value),
  },
  {
    name: "PascalCase",
    value: "toPascalCase",
    converter: (value: string) => toPascalCase(value),
  },
  {
    name: "snake_case",
    value: "toSnakeCase",
    converter: (value: string) => toSnakeCase(value),
  },
  {
    name: "kebab-case",
    value: "toKebabCase",
    converter: (value: string) => toKebabCase(value),
  },
  {
    name: "toSnakeCase -> to_snake_case",
    value: "toUnderscoreCase",
    converter: (value: string) => toUnderscoreCase(value),
  },
];

const SORT_BY_OPTIONS = [
  {
    name: "none",
    value: "none",
    converter: (value: string) => value,
  },
  {
    name: "asc",
    value: "asc",
    converter: (value: string) => value.split("\n").sort().join("\n"),
  },
  {
    name: "desc",
    value: "desc",
    converter: (value: string) => value.split("\n").sort().reverse().join("\n"),
  },
  {
    name: "random",
    value: "random",
    converter: (value: string) =>
      value
        .split("\n")
        .sort(() => Math.random() - 0.5)
        .join("\n"),
  },
];

export default function Home() {
  const textStore = useStorage(
    "text-analyze:text",
    "Съешь ещё этих мягких французских булок"
  );

  const textValue = textStore.value ?? "";

  const formatState = useStorage("text-analyze:format", TEXT_FORMATS[0].value);

  const sortByStore = useStorage("text-analyze:sortBy", "none");

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    textStore.set(event.target.value);
  };

  const formatter = TEXT_FORMATS.find(
    (f) => f.value === formatState.value
  )?.converter;
  const sorter = SORT_BY_OPTIONS.find(
    (f) => f.value === sortByStore.value
  )?.converter;

  const textResult = sorter?.(formatter?.(textValue) ?? "");

  return (
    <div className="w-full grow p-2 overflow-hidden">
      <div className="flex gap-2 mb-4">
        <Textarea
          className="w-full p-2 rounded"
          placeholder="Введите текс"
          value={textStore.value}
          onChange={handleInput}
          rows={10}
        />
        <Card className="min-w-64">
          <CardHeader className="font-bold text-lg">Статистика</CardHeader>

          <CardContent>
            <table className="w-full">
              <tbody>
                <tr>
                  <td>Количество строк</td>
                  <td className="text-right">{textValue.split("\n").length}</td>
                </tr>
                <tr>
                  <td>Количество слов</td>
                  <td className="text-right">
                    {textValue.split(/\s+/).length}
                  </td>
                </tr>
                <tr>
                  <td>Количество символов</td>
                  <td className="text-right">{textValue.length}</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2 flex-wrap mb-4">
        <div className="flex gap-1 flex-col">
          <p>Конвертирование текста</p>

          <Select
            value={formatState.value}
            onValueChange={(value) => {
              formatState.set(value);
            }}
          >
            <SelectTrigger className="w-fit">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {TEXT_FORMATS.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    {format.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          <p>Сортировка строк</p>

          <Select
            value={sortByStore.value}
            onValueChange={(value) => {
              sortByStore.set(value);
            }}
          >
            <SelectTrigger className="w-fit">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {SORT_BY_OPTIONS.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    {format.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Textarea
        className="w-full p-2 rounded"
        placeholder="Результат"
        value={textResult}
        rows={10}
      />
    </div>
  );
}
