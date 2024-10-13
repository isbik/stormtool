import { EditorProps } from "@monaco-editor/react";
import { Copy, CopyCheck, Trash, WandSparkles } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useState } from "react";
import { getWorker } from "../lib/worker-wrapper";
import { useCopy } from "../hooks/use-copy";

export interface EditorPanelProps {
  editable?: boolean;
  language?: string;
  defaultValue?: string;
  title: React.ReactNode;
  hasCopy?: boolean;
  hasPrettier?: boolean;
  id: string | number;
  onChange?: (value: string) => void;
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
}: EditorPanelProps) {
  const [showSettingsDialogue, setSettingsDialog] = useState(false);
  const [value, setValue] = useState(defaultValue);

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

  const { onCopy, isCopied } = useCopy();

  const onPrettier = useCallback(async () => {
    if (value) {
      const prettierWorker = getWorker(
        new Worker(new URL("../../workers/prettier.worker.ts", import.meta.url))
      );

      const prettyValue = await prettierWorker.send({
        value: value.trim(),
        language: language,
      });

      setValue(prettyValue);
      onChange?.(prettyValue);
    }
  }, [value, language]);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex flex-shrink-0 h-12 px-3 items-center border-b border-white/20 z-[2] shadow-md">
        <div className="flex-1">
          <h1 className="text-lg mt-0">{title}</h1>
        </div>

        {hasClear && (
          <button type="button" className=" mr-4" onClick={onPrettier}>
            <WandSparkles className="size-4" />
          </button>
        )}

        {hasClear && (
          <button type="button" onClick={() => setValue("")}>
            <Trash className="size-4" />
          </button>
        )}

        {hasCopy && (
          <button
            className={isCopied ? "text-green-500" : ""}
            onClick={() => onCopy(value)}
          >
            {isCopied ? (
              <CopyCheck className="size-4" />
            ) : (
              <Copy className="size-4" />
            )}
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
            onChange?.(value ?? "");
          }}
        />
      </div>
    </div>
  );
}
