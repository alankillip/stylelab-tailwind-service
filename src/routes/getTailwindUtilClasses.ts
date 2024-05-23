import { server } from "../server";
import { getTailwindCSSFromUtilClasses } from "../services/tailwindService";

type bodyType = {
  classes: string;
  theme: any;
  plugins: any[];
};

const bodyJsonSchema = {
  type: "object",
  required: ["classes"], // Only 'classes' is required
  properties: {
    classes: { type: "string" },
    theme: {
      type: "object",
      // You can provide additional default or validation properties here if needed
      default: {}, // Providing a default empty object for optional properties
    },
    plugins: {
      type: "array",
      items: { type: "object" },
      default: [], // Providing a default empty array for optional properties
    },
  },
};

server.post(
  "/getTailwindUtilClasses",
  { schema: { body: bodyJsonSchema } },
  async (request) => {
    const { body } = request;
    const { classes, theme, plugins } = body as bodyType;
    console.time("getclasses");
    const result = await getTailwindCSSFromUtilClasses(classes, theme, plugins);
    console.timeEnd("getclasses");
    return {
      css: result.css,
    };
  }
);
