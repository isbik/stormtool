"use client";

import { Monaco } from "@/shared/ui/monaco";
import { DiffEditor } from "@monaco-editor/react";
import { useState } from "react";

function DiffTextPage() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  const handleText1Change = (value: string) => {
    setText1(value);
  };

  const handleText2Change = (value: string) => {
    setText2(value);
  };

  return (
    <div className="p-4 w-full">
      <h1 className="text-3xl font-bold mb-4">Введите текста</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Monaco
          className="w-full h-96"
          value={text1}
          onChange={handleText1Change}
          theme="vs-dark"
        />
        <Monaco
          className="w-full h-96"
          value={text2}
          onChange={handleText2Change}
          theme="vs-dark"
        />
      </div>
      {(text1 || text2) && (
        <>
          <h2 className="text-2xl font-bold mt-8 mb-4">Результат</h2>
          <div className="w-full h-96 ">
            <DiffEditor
              height="100%"
              original={text1}
              modified={text2}
              options={{
                renderSideBySide: true,
              }}
              theme="vs-dark"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default DiffTextPage;
