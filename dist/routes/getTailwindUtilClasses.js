"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
const tailwindService_1 = require("../services/tailwindService");
const bodyJsonSchema = {
    type: "object",
    required: ["classes"],
    properties: {
        classes: { type: "string" },
        theme: {
            type: "object",
            default: {},
        },
        plugins: {
            type: "array",
            items: { type: "object" },
            default: [],
        },
    },
};
server_1.server.post("/getTailwindUtilClasses", { schema: { body: bodyJsonSchema } }, async (request) => {
    const { body } = request;
    const { classes, theme, plugins } = body;
    console.time("getclasses");
    const result = await (0, tailwindService_1.getTailwindCSSFromUtilClasses)(classes, theme, plugins);
    console.timeEnd("getclasses");
    return {
        css: result.css,
    };
});
//# sourceMappingURL=getTailwindUtilClasses.js.map