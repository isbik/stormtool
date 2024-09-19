"use client";

import { toSlug } from "@/shared/lib/text";
import { Input, InputLabel } from "@/shared/ui/input";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState("Съешь ещё этих мягких французских булок");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const result = toSlug(value);

  return (
    <div className="w-full grow p-2 overflow-hidden">
      <InputLabel>Строка</InputLabel>
      <Input
        className="mb-4 w-full p-2 rounded"
        placeholder="Введите текс"
        value={value}
        onChange={handleInput}
      />

      <InputLabel>Результат</InputLabel>
      <Input
        className="w-full p-2 rounded"
        placeholder="Результат"
        value={result}
      />
    </div>
  );
}
