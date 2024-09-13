"use client";

import {
  toSentenceCase,
  toTitleCase,
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  toKebabCase,
} from "@/shared/lib/text";
import { Button } from "@/shared/ui/button";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState("Test My Very Long Text");

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const handleSortLines = () => {
    setValue(value.split("\n").sort().join("\n"));
  };

  const handleSortReverseLines = () => {
    setValue(value.split("\n").sort().reverse().join("\n"));
  };

  const handleSortRandom = () => {
    setValue(
      value
        .split("\n")
        .sort(() => Math.random() - 0.5)
        .join("\n")
    );
  };

  const handleToSentenceCase = () => {
    setValue(toSentenceCase(value));
  };

  const handleToTitleCase = () => {
    setValue(toTitleCase(value));
  };

  const handleToCamelCase = () => {
    setValue(toCamelCase(value));
  };

  const handleToPascalCase = () => {
    setValue(toPascalCase(value));
  };

  const handleToSnakeCase = () => {
    setValue(toSnakeCase(value));
  };

  const handleToKebabCase = () => {
    setValue(toKebabCase(value));
  };

  return (
    <div className="w-full grow p-2 overflow-hidden">
      <p>Конвертирование текста</p>

      <div className="flex gap-2 mb-2">
        <Button onClick={handleToSentenceCase}>Заглавные предложения</Button>
        <Button onClick={handleToTitleCase}>Title Case</Button>
        <Button onClick={handleToCamelCase}>camelCase</Button>
        <Button onClick={handleToPascalCase}>PascalCase</Button>
        <Button onClick={handleToSnakeCase}>snake_case</Button>
        <Button onClick={handleToKebabCase}>kebab-case</Button>
      </div>

      <p>Сортировка строк</p>
      <div className="flex gap-2 mb-2">
        <Button onClick={handleSortLines}>По алфавиту</Button>
        <Button onClick={handleSortReverseLines}>По убыванию</Button>
        <Button onClick={handleSortRandom}>Случайно</Button>
      </div>

      <div className="flex gap-2">
        <textarea
          className="border w-full p-2 rounded"
          placeholder="Enter JWT token"
          value={value}
          onChange={handleInput}
          rows={10}
        />
        <div className="border p-2 bg-slate-100 rounded min-w-64">
          <p className="font-bold text-lg">Статистика</p>

          <table className="w-full">
            <tbody>
              <tr>
                <td>Количество строк</td>
                <td className="text-right">{value.split("\n").length}</td>
              </tr>
              <tr>
                <td>Количество слов</td>
                <td className="text-right">{value.split(/\s+/).length}</td>
              </tr>
              <tr>
                <td>Количество символов</td>
                <td className="text-right">{value.length}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
