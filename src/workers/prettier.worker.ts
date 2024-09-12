import { prettify } from "@/shared/lib/prettify";
import { BuiltInParserName } from "prettier";

interface Payload {
  value: string;
  language: BuiltInParserName;
}

addEventListener(
  "message",
  async ({
    data: { payload, id },
  }: MessageEvent<{ payload: Payload; id: number }>) => {
    const { value, language } = payload;
    try {
      const payload = await prettify(language, value);

      postMessage({
        id,
        payload,
      });
    } catch (e) {
      postMessage({
        id,
        err: e.message,
      });
    }
  }
);
