"use client";

import { ConversionPanel, Transformer } from "@/shared/ui/transform-panel";
import { useCallback } from "react";
import * as sass from "sass";

export default function SassToCss() {
  const transformer = useCallback<Transformer>(async ({ value }) => {
    try {
      const result = await sass.compileStringAsync(value);
      return result.css;
    } catch (error) {
      console.error("Ошибка компиляции SCSS:", error);
      return "Ошибка компиляции SCSS";
    }
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="SASS to CSS"
      editorLanguage="scss"
      editorDefaultValue="scss"
      resultTitle="css"
      resultLanguage={"css"}
    />
  );
}
