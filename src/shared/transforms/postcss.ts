import postcss from "postcss";
import postcssJs from "postcss-js";

export const cssToJsx = (payload: string) => {
  try {
    const root = postcss.parse(payload);

    return JSON.stringify(postcssJs.objectify(root));
  } catch (error) {
    return "";
  }
};
