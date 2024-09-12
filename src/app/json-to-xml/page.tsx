"use client";
import { ConversionPanel } from "@/shared/ui/transform-panel";
import { useCallback } from "react";
import { json2xml } from "xml-js";

export default function XmlToJson() {
  const transformer = useCallback(async ({ value }) => {
    return json2xml(value, {
      compact: true,
    });
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
