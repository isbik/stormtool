"use client";

import { ConversionPanel, Transformer } from "@/shared/ui/transform-panel";
import { useCallback } from "react";

export default function JsObjectToJson() {
  const transformer = useCallback<Transformer>(async ({ value }) => {
    return JSON.stringify(eval("(" + value + ")"), null, 2);
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="JS Object"
      editorLanguage="javascript"
      editorDefaultValue="jsObject"
      resultTitle="JSON"
      resultLanguage={"json"}
    />
  );
}
