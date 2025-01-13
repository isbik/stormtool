"use client";
import { ConversionPanel, Transformer } from "@/shared/ui/transform-panel";
import { useCallback } from "react";

export default function JSONToCSV() {
  const transformer = useCallback<Transformer>(async ({ value }) => {
    if (!value) return "";

    try {
      let jsonData = JSON.parse(value);

      if (!Array.isArray(jsonData)) {
        jsonData = [jsonData];
      }

      const headers = Object.keys(jsonData[0]);

      const csvContent = [
        headers.map((key) => `"` + key + `"`).join(";"),
        ...jsonData.map((obj: Record<string, unknown>) =>
          headers
            .map((header) => {
              const value = obj[header];
              return value === true || value === false
                ? value.toString()
                : value;
            })
            .map((key) => `"` + key + `"`)
            .join(";")
        ),
      ].join("\n");

      return csvContent;
    } catch (error) {
      console.error("Error converting JSON to CSV:", error);
      return "Error converting JSON to CSV";
    }
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="JSON"
      editorLanguage="json"
      resultTitle="CSV"
      resultLanguage="csv"
    />
  );
}
