"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Language, useData } from "../hooks/use-data";
import { getWorker } from "../lib/worker-wrapper";
import { EditorPanel, EditorPanelProps } from "../../widgets/editor";
import { Spinner } from "./spinner";
import { TriangleAlert, X } from "lucide-react";

function getEditorLanguage(lang: Language): Language {
  const mapping = {
    flow: "typescript",
  } as Record<Language, Language>;

  return mapping[lang] || lang;
}

export type Transformer = (args: {
  value: string;
  splitEditorValue?: string;
}) => Promise<string>;

export interface ConversionPanelProps {
  splitLanguage?: Language;
  editorTitle: string;
  editorLanguage: Language;
  editorDefaultValue?: Language;
  resultTitle: React.ReactNode;
  resultLanguage: Language;
  splitEditorProps?: Partial<EditorPanelProps>;
  splitEditorDefaultValue?: string;
  editorProps?: Partial<EditorPanelProps>;
  resultEditorProps?: Partial<EditorPanelProps>;
  transformer: Transformer;
  defaultSplitValue?: string;
  editorSettingsElement?: EditorPanelProps["settingElement"];
  resultSettingsElement?: EditorPanelProps["settingElement"];
  settings?: any;
}

export const ConversionPanel: React.FunctionComponent<ConversionPanelProps> =
  function ({
    editorProps,
    resultEditorProps,
    transformer,
    editorLanguage,
    editorTitle,
    resultLanguage,
    resultTitle,
    editorSettingsElement,
    settings,
    editorDefaultValue,
    resultSettingsElement,
  }) {
    const [value, setValue] = useData(editorDefaultValue || editorLanguage);

    const [result, setResult] = useState("");
    const [message, setMessage] = useState("");
    const [showUpdateSpinner, toggleUpdateSpinner] = useState(false);

    useEffect(() => {
      async function transform() {
        if (!value) return;

        try {
          toggleUpdateSpinner(true);

          const prettierWorker = getWorker(
            new Worker(
              new URL("../../workers/prettier.worker.ts", import.meta.url)
            )
          );

          const result = await transformer({
            value,
          });

          let prettyResult = await prettierWorker.send({
            value: result,
            language: resultLanguage,
          });

          // Fix for #319
          if (prettyResult.startsWith(";<")) {
            prettyResult = prettyResult.slice(1);
          }
          setResult(prettyResult);
          setMessage("");
        } catch (e: any) {
          setMessage(e.message);
        }
        toggleUpdateSpinner(false);
      }

      transform();
    }, [value, settings]);

    return (
      <>
        <div className="flex max-md:flex-col flex-1 overflow-auto relative">
          <div className="flex flex-1 border-r flex-col overflow-hidden min-h-64">
            <EditorPanel
              language={getEditorLanguage(editorLanguage)}
              onChange={setValue}
              hasLoad
              defaultValue={value}
              title={editorTitle}
              settingElement={editorSettingsElement}
              hasClear
              {...editorProps}
            />
          </div>
          <div className="flex flex-1 relative min-h-64">
            {showUpdateSpinner && (
              <div className="inline-flex absolute z-10 rounded-[50%] p-3 top-12 right-8">
                <Spinner />
              </div>
            )}
            <EditorPanel
              title={resultTitle}
              defaultValue={result}
              language={getEditorLanguage(resultLanguage)}
              editable={false}
              hasPrettier={false}
              settingElement={resultSettingsElement}
              {...resultEditorProps}
            />
          </div>
          {message && (
            <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 bg-red-500/80 p-2 whitespace-nowrap overflow-auto no-scrollbar">
              <TriangleAlert className="size-5 shrink-0" />
              {message}

              <button
                className="ml-auto"
                onClick={() => setMessage("")}
                type="button"
              >
                <X />
              </button>
            </div>
          )}
        </div>
      </>
    );
  };
