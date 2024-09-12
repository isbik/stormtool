"use client";

import { ConversionPanel, Transformer } from "@/shared/ui/transform-panel";
import { htmlToJsx } from "html-to-jsx-transform";
import { useCallback } from "react";

interface Settings {
  createFunction: boolean;
  outputFunctionName: string;
}

export default function HtmlToJsxComponent() {
  const name = "HTML to JSX";

  const transformer = useCallback<Transformer>(async ({ value }) => {
    let result = htmlToJsx(value);

    return result;
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="HTML"
      resultLanguage={"javascript"}
      resultTitle="JSX"
      editorLanguage="html"
    />
  );
}
