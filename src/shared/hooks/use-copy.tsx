import { useClipboard } from "@siberiacancode/reactuse";
import { useState } from "react";

export const useCopy = () => {
  const { copy } = useClipboard();
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = (text?: string) => {
    if (!text) {
      return;
    }

    copy(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  return { onCopy, isCopied };
};
