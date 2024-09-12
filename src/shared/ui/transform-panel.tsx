"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Language, useData } from "../hooks/use-data";
import { getWorker } from "../lib/worker-wrapper";
import { EditorPanel, EditorPanelProps } from "./editor";
import { Spinner } from "./spinner";

function getEditorLanguage(lang: Language) {
  const mapping = {
    flow: "typescript",
  };

  return mapping[lang] || lang;
}

export type Transformer = (args: {
  value: string;
  splitEditorValue?: string;
}) => Promise<string>;

export interface ConversionPanelProps {
  splitTitle?: string;
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
    splitEditorProps,
    editorProps,
    resultEditorProps,
    transformer,
    splitLanguage,
    splitTitle,
    editorLanguage,
    editorTitle,
    resultLanguage,
    resultTitle,
    editorSettingsElement,
    settings,
    editorDefaultValue,
    splitEditorDefaultValue,
    resultSettingsElement,
  }) {
    const [value, setValue] = useData(editorDefaultValue || editorLanguage);
    const [splitValue, setSplitValue] = useData(
      splitEditorDefaultValue || splitLanguage
    );
    const [result, setResult] = useState("");
    const [message, setMessage] = useState("");
    const [showUpdateSpinner, toggleUpdateSpinner] = useState(false);

    useEffect(() => {
      async function transform() {
        try {
          toggleUpdateSpinner(true);
          const prettierWorker = getWorker(
            new Worker(
              new URL("../../workers/prettier.worker.ts", import.meta.url)
            )
          );

          const result = await transformer({
            value,
            splitEditorValue: splitTitle ? splitValue : undefined,
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
        } catch (e) {
          console.error(e);
          setMessage(e.message);
        }
        toggleUpdateSpinner(false);
      }

      transform();
    }, [splitValue, value, splitTitle, settings]);

    return (
      <>
        <div className="flex flex-row flex-1 overflow-hidden h-[calc(100vh-40px)]">
          <div className="flex flex-1 border-r flex-col overflow-hidden">
            <EditorPanel
              language={getEditorLanguage(editorLanguage)}
              onChange={setValue}
              hasLoad
              defaultValue={value}
              id={1}
              hasCopy={false}
              title={editorTitle}
              settingElement={editorSettingsElement}
              hasClear
              {...editorProps}
            />

            {splitTitle && (
              <div className="flex flex-1 border-t">
                <EditorPanel
                  title={splitTitle}
                  defaultValue={splitValue}
                  language={getEditorLanguage(splitLanguage)}
                  id={2}
                  hasCopy={false}
                  onChange={setSplitValue}
                  hasLoad
                  hasClear
                  {...splitEditorProps}
                />
              </div>
            )}
          </div>
          <div className="flex flex-1  relative">
            {showUpdateSpinner && (
              <div className="inline-flex absolute bg-white z-10 rounded-[50%] p-3 top-12 right-8">
                <Spinner />
              </div>
            )}
            <EditorPanel
              title={resultTitle}
              defaultValue={result}
              language={getEditorLanguage(resultLanguage)}
              id={3}
              editable={false}
              hasPrettier={false}
              settingElement={resultSettingsElement}
              {...resultEditorProps}
            />
          </div>
        </div>

        {/* {message && (
          <Alert
            paddingY={15}
            paddingX={20}
            left={240}
            right={0}
            position="absolute"
            intent="danger"
            bottom={0}
            title={message}
            backgroundColor="#FAE2E2"
            zIndex={3}
          />
        )} */}
      </>
    );
  };
