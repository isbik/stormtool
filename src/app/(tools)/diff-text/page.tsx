"use client";

import { Monaco } from "@/shared/ui/monaco";
import { Uploader } from "@/widgets/editor/uploader";
import { DiffEditor } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useState } from "react";

function DiffTextPage() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const { theme } = useTheme();

  const handleText1Change = (value: string | undefined) => {
    setText1(value!);
  };

  const handleText2Change = (value: string | undefined) => {
    setText2(value!);
  };

  return (
    <>
      <div className="grid mb-4 grid-cols-1 gap-2 sm:grid-cols-2 p-1">
        <div>
          <div className="flex items-center gap-2">
            <Uploader
              onChange={(value) => {
                setText1(value);
              }}
            />
            <p>Оригинал</p>
          </div>
          <Monaco
            className="w-full h-96 border"
            value={text1}
            onChange={handleText1Change}
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <Uploader
              onChange={(value) => {
                setText2(value);
              }}
            />
            <p>Измененный</p>
          </div>

          <Monaco
            className="w-full h-96 border"
            value={text2}
            onChange={handleText2Change}
          />
        </div>
      </div>
      {(text1 || text2) && (
        <div className="w-full min-h-96 border grow p-1">
          <DiffEditor
            height="100%"
            original={text1}
            modified={text2}
            options={{
              renderSideBySide: true,
            }}
            theme={theme === "dark" ? "vs-dark" : "vs"}
          />
        </div>
      )}
    </>
  );
}

export default DiffTextPage;
