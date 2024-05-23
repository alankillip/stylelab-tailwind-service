import tailwindcss from "tailwindcss";
import postcss from "postcss";
import path from "path";

const defaultTheme: any = {
  extend: {},
};

export const getTailwindCSSFromUtilClasses = (
  utilsClasses: string = "",
  theme = defaultTheme,
  plugins: any[] = []
) => {
  const cssStub = `
      @tailwind utilities;
    `;
  const config = {
    content: [
      {
        raw: utilsClasses,
      },
    ],
    theme,
    plugins,
  };
  return postcss(tailwindcss(config)).process(cssStub, {
    from: `${path.resolve(__filename)}`,
  });
};
