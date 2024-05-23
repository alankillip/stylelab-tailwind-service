import { getTailwindCSSFromUtilClasses } from "../services/tailwindService";

type bodyType = {
  classes: string;
  theme: any;
  plugins: any[];
};

export async function POST(request: Request) {
  const { body } = request;
  const { classes, theme, plugins } = body as unknown as bodyType;
  console.time("vercel function getclasses");
  const result = await getTailwindCSSFromUtilClasses(classes, theme, plugins);
  console.timeEnd("vercel function getclasses");
  return {
    css: result.css,
  };
}
