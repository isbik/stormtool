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
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Textarea } from "@/shared/ui/textarea";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState("Съешь ещё этих мягких французских булок");
  const [result, setResult] = useState("");

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const handleSortLines = () => {
    setResult(value.split("\n").sort().join("\n"));
  };

  const handleSortReverseLines = () => {
    setResult(value.split("\n").sort().reverse().join("\n"));
  };

  const handleSortRandom = () => {
    setResult(
      value
        .split("\n")
        .sort(() => Math.random() - 0.5)
        .join("\n")
    );
  };

  const handleToSentenceCase = () => {
    setResult(toSentenceCase(value));
  };

  const handleToTitleCase = () => {
    setResult(toTitleCase(value));
  };

  const handleToCamelCase = () => {
    setResult(toCamelCase(value));
  };

  const handleToPascalCase = () => {
    setResult(toPascalCase(value));
  };

  const handleToSnakeCase = () => {
    setResult(toSnakeCase(value));
  };

  const handleToKebabCase = () => {
    setResult(toKebabCase(value));
  };

  return (
    <div className="w-full grow p-2 overflow-hidden">
      <div className="flex gap-2 mb-4">
        <Textarea
          className="w-full p-2 rounded"
          placeholder="Введите текс"
          value={value}
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
          </CardContent>
        </Card>
      </div>

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

      <div className="flex gap-2 mb-4">
        <Button onClick={handleSortLines}>По алфавиту</Button>
        <Button onClick={handleSortReverseLines}>По убыванию</Button>
        <Button onClick={handleSortRandom}>Случайно</Button>
      </div>

      <Textarea
        className="w-full p-2 rounded"
        placeholder="Результат"
        value={result}
        rows={10}
      />
    </div>
  );
}
