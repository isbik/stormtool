import { EditorProps } from "@monaco-editor/react";
import copy from "clipboard-copy";
import { Delete, Trash, WandSparkles } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useState } from "react";
import { getWorker } from "../lib/worker-wrapper";

export interface EditorPanelProps {
  editable?: boolean;
  language?: string;
  defaultValue?: string;
  title: React.ReactNode;
  hasCopy?: boolean;
  hasPrettier?: boolean;
  id: string | number;
  onChange?: (value?: string) => void;
  hasLoad?: boolean;
  hasClear?: boolean;
  settingElement?: (args: { toggle: () => void; open: boolean }) => JSX.Element;
  alertMessage?: React.ReactNode;
  topNotifications?: (args: {
    toggleSettings: () => void;
    isSettingsOpen: boolean;
  }) => React.ReactNode;
  previewElement?: (value: string) => React.ReactNode;
  acceptFiles?: string | string[];
}

const Monaco = dynamic(() => import("./monaco").then((mod) => mod.Monaco), {
  ssr: false,
});

export function EditorPanel({
  editable = true,
  title,
  hasClear,
  hasCopy = true,
  topNotifications,
  language,
  defaultValue,
  onChange,
  id,
}: EditorPanelProps) {
  const [showSettingsDialogue, setSettingsDialog] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [fetchingUrl, setFetchingUrl] = useState("");

  const options = {
    fontSize: 14,
    readOnly: !editable,
    codeLens: false,
    fontFamily: "Menlo, Consolas, monospace, sans-serif",
    minimap: {
      enabled: false,
    },
    quickSuggestions: false,
    lineNumbers: "on",
    renderValidationDecorations: "off",
  } satisfies EditorProps["options"];

  const _toggleSettingsDialog = useCallback(
    () => setSettingsDialog(!showSettingsDialogue),
    [showSettingsDialogue]
  );

  useEffect(() => {
    // @ts-ignore
    window.__webpack_public_path__ = "/_next/static/";
  }, []);

  const copyValue = useCallback(() => {
    if (value) copy(value);
  }, [value]);

  const onPrettier = useCallback(async () => {
    if (value) {
      const prettierWorker = getWorker(
        new Worker(new URL("../../workers/prettier.worker.ts", import.meta.url))
      );

      const prettyValue = await prettierWorker.send({
        value: value,
        language: language === "postcss" ? "css" : language,
      }); // prettier

      setValue(prettyValue);
      onChange?.(prettyValue);
    }
  }, [value, language]);

  // whenever defaultValue changes, change the value of the editor.
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex flex-shrink-0 h-12 px-3 items-center border-b z-[2] bg-gray-100">
        <div className="flex-1">
          <h1 className="text-lg mt-0">{title}</h1>
        </div>

        {hasClear && (
          <button
            type="button"
            className="h-12 text-black mr-4"
            onClick={onPrettier}
          >
            <WandSparkles />
          </button>
        )}

        {hasClear && (
          <button
            type="button"
            className="h-12 text-black"
            onClick={() => setValue("")}
          >
            <Trash />
          </button>
        )}

        {hasCopy && (
          <button
            className="mr-3 border-gray-400 rounded h-12"
            onClick={copyValue}
          >
            Copy
          </button>
        )}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "hidden",
        }}
      >
        {topNotifications &&
          topNotifications({
            isSettingsOpen: showSettingsDialogue,
            toggleSettings: _toggleSettingsDialog,
          })}

        <Monaco
          language={language}
          value={value}
          options={options}
          onChange={(value) => {
            setValue(value);
            onChange?.(value);
          }}
        />
      </div>
    </div>
  );
}
