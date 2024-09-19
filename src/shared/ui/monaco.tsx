import Editor, { EditorProps } from "@monaco-editor/react";
import React from "react";
import { Spinner } from "./spinner";

interface MonacoProps extends EditorProps {}

export const Monaco: React.FC<MonacoProps> = (props: MonacoProps) => {
  return (
    <Editor
      loading={
        <div className="flex items-center justify-center h-32">
          <Spinner />
        </div>
      }
      className="flex-1"
      theme="vs-dark"
      {...props}
    />
  );
};
