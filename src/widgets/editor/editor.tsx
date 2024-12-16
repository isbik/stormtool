import { EditorProps } from "@monaco-editor/react";
import { Copy, CopyCheck, Trash, WandSparkles } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useState } from "react";
import { getWorker } from "../../shared/lib/worker-wrapper";
import { useCopy } from "../../shared/hooks/use-copy";

import { Uploader } from "./uploader";

export interface EditorPanelProps {
  editable?: boolean;
  language?: string;
  defaultValue?: string;
  title: React.ReactNode;
  hasCopy?: boolean;
  hasPrettier?: boolean;
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

const Monaco = dynamic(
  () => import("../../shared/ui/monaco").then((mod) => mod.Monaco),
  {
    ssr: false,
  }
);

export function EditorPanel({
  editable = true,
  title,
  hasClear,
  hasCopy = true,
  hasLoad = false,
  topNotifications,
  language,
  defaultValue,
  onChange,
}: EditorPanelProps) {
  const [showSettingsDialogue, setSettingsDialog] = useState(false);
  const [localValue, setLocalValue] = useState(defaultValue);

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
    automaticLayout: true,
  } satisfies EditorProps["options"];

  const _toggleSettingsDialog = useCallback(
    () => setSettingsDialog(!showSettingsDialogue),
    [showSettingsDialogue]
  );

  const { onCopy, isCopied } = useCopy();

  const onPrettier = useCallback(async () => {
    if (localValue) {
      const prettierWorker = getWorker(
        new Worker(new URL("../../workers/prettier.worker.ts", import.meta.url))
      );

      const prettyValue = await prettierWorker.send({
        value: localValue.trim(),
        language: language,
      });

      setLocalValue(prettyValue);
      onChange?.(prettyValue);
    }
  }, [localValue, language]);

  useEffect(() => {
    setLocalValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex flex-shrink-0 h-12 px-3 items-center border-b z-[2] shadow-md gap-4">
        <div className="flex-1">
          <h1 className="text-lg mt-0">{title}</h1>
        </div>

        {hasLoad && (
          <Uploader
            onChange={(value) => {
              setLocalValue(value);
              onChange?.(value);
            }}
          />
        )}

        {hasClear && (
          <button type="button" onClick={onPrettier}>
            <WandSparkles className="size-4" />
          </button>
        )}

        {hasClear && (
          <button type="button" onClick={() => setLocalValue("")}>
            <Trash className="size-4" />
          </button>
        )}

        {hasCopy && (
          <button
            className={isCopied ? "text-green-500" : ""}
            onClick={() => onCopy(localValue)}
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
        {topNotifications?.({
          isSettingsOpen: showSettingsDialogue,
          toggleSettings: _toggleSettingsDialog,
        })}

        <Monaco
          language={language}
          value={localValue}
          options={options}
          onChange={(value) => {
            setLocalValue(value);
            onChange?.(value ?? "");
          }}
        />
      </div>
    </div>
  );
}
