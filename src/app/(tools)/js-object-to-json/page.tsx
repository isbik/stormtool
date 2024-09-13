"use client";

import { ConversionPanel } from "@/shared/ui/transform-panel";
import { useCallback } from "react";

export default function JsObjectToJson() {
  const transformer = useCallback(async ({ value }) => {
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
