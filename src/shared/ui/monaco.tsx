import Editor, { EditorProps } from "@monaco-editor/react";
import React from "react";
import { Spinner } from "./spinner";
import { useTheme } from "next-themes";

interface MonacoProps extends EditorProps {}

export const Monaco: React.FC<MonacoProps> = (props: MonacoProps) => {
  const { theme } = useTheme();

  return (
    <Editor
      loading={
        <div className="flex items-center justify-center h-32">
          <Spinner />
        </div>
      }
      className="flex-1"
      theme={theme === "dark" ? "vs" : "vs-dark"}
      {...props}
    />
  );
};
