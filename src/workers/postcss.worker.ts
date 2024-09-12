import postcss from "postcss";
import postcssJs from "postcss-js";

addEventListener(
  "message",
  async ({
    data: { payload, id },
    ...a
  }: MessageEvent<{ payload: string; id: number }>) => {
    try {
      const root = postcss.parse(payload);

      postMessage({
        id,
        payload: JSON.stringify(postcssJs.objectify(root)),
      });
    } catch (e) {
      postMessage({
        id,
        err: e.message,
      });
    }
  }
);
