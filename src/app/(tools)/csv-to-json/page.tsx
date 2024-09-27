"use client";
import { ConversionPanel, Transformer } from "@/shared/ui/transform-panel";
import { useCallback } from "react";

export default function XmlToJson() {
  const transformer = useCallback<Transformer>(async ({ value }) => {
    const lines: string[] = value.split("\n");
    const keys: string[] = lines[0].split(",");
    const result = lines.slice(1).map((line) => {
      return line.split(",").reduce((acc, cur, i) => {
        const toAdd: Record<string, string> = {};
        toAdd[keys[i]] = cur;
        return { ...acc, ...toAdd };
      }, {});
    });

    return JSON.stringify(result);
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="CSV"
      editorLanguage="csv"
      resultTitle="JSON"
      resultLanguage={"json"}
    />
  );
}
