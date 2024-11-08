"use client";

import { ConversionPanel, Transformer } from "@/shared/ui/transform-panel";
import { useCallback } from "react";
import * as sass from "sass";

export default function SassToCss() {
  const transformer = useCallback<Transformer>(async ({ value }) => {
    try {
      const result = await sass.compileStringAsync(value, {
        syntax: "indented",
      });
      return result.css;
    } catch (error) {
      console.error("Ошибка компиляции SASS:", error);
      return "Ошибка компиляции SASS";
    }
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="SASS to CSS"
      editorLanguage="scss"
      editorDefaultValue="sass"
      resultTitle="css"
      resultLanguage="css"
    />
  );
}
