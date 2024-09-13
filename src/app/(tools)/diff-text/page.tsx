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
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Diff Text</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold mb-2">Text 1</h2>
          <Monaco
            className="w-full h-96  border-2 border-gray-300 rounded-md"
            value={text1}
            onChange={handleText1Change}
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Text 2</h2>
          <Monaco
            className="w-full h-96 border-2 border-gray-300 rounded-md"
            value={text2}
            onChange={handleText2Change}
          />
        </div>
      </div>
      {(text1 || text2) && (
        <>
          <h2 className="text-2xl font-bold mt-8 mb-4">Result</h2>
          <div className="w-full h-96 border-2 border-gray-300 rounded-md">
            <DiffEditor
              height="100%"
              original={text1}
              modified={text2}
              options={{
                renderSideBySide: true,
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default DiffTextPage;
