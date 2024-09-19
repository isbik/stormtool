"use client";

import { getWorker } from "@/shared/lib/worker-wrapper";
import { ConversionPanel, Transformer } from "@/shared/ui/transform-panel";
import { useCallback } from "react";

export default function CssToJs() {
  const transformer = useCallback<Transformer>(async ({ value }) => {
    const postCssWorker = getWorker(
      new Worker(new URL("@/workers/postcss.worker.ts", import.meta.url))
    );

    const _value = await postCssWorker.send(value);
    return `const converted = ${_value}`;
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      resultTitle="JavaScript Object"
      editorTitle="CSS"
      editorLanguage="css"
      resultLanguage="javascript"
      editorProps={{
        acceptFiles: "text/css",
      }}
    />
  );
}
