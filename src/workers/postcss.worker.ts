import postcss from "postcss";
import postcssJs from "postcss-js";

addEventListener(
  "message",
  async ({
    data: { payload, id },
  }: MessageEvent<{ payload: string; id: number }>) => {
    try {
      const root = postcss.parse(payload);

      postMessage({
        id,
        payload: JSON.stringify(postcssJs.objectify(root)),
      });
    } catch (e: any) {
      postMessage({
        id,
        err: e.message,
      });
    }
  }
);
