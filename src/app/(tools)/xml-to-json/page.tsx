"use client";
import { ConversionPanel, Transformer } from "@/shared/ui/transform-panel";
import { useCallback } from "react";
import { xml2json } from "xml-js";

export default function XmlToJson() {
  const transformer = useCallback<Transformer>(async ({ value }) => {
    return JSON.stringify(
      JSON.parse(
        xml2json(value, {
          compact: true,
        })
      )
    );
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="XML"
      editorLanguage="xml"
      resultTitle="JSON"
      resultLanguage={"json"}
    />
  );
}
