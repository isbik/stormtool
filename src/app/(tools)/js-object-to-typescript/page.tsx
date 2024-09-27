"use client";
import { ConversionPanel, Transformer } from "@/shared/ui/transform-panel";
import { useCallback } from "react";

export default function JsObjectToTypescript() {
  const transformer = useCallback<Transformer>(async ({ value }) => {
    const result = JSON.stringify(eval("(" + value + ")"), null, 2);

    const { run } = await import("json_typegen_wasm");

    return run(
      "Root",
      result,
      JSON.stringify({
        output_mode: "typescript",
      })
    );
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="JS Object"
      editorDefaultValue="jsObject"
      editorLanguage="javascript"
      resultTitle="TypeScript"
      resultLanguage={"typescript"}
    />
  );
}
