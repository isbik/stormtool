"use client";
import { ConversionPanel, Transformer } from "@/shared/ui/transform-panel";
import { useCallback } from "react";
import { json2xml } from "xml-js";

export default function XmlToJson() {
  const transformer = useCallback<Transformer>(async ({ value }) => {
    return json2xml(value, { compact: true, spaces: 4 });
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="JSON"
      editorLanguage="json"
      resultTitle="XML"
      resultLanguage={"xml"}
    />
  );
}
