"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const tailwindService_1 = require("../services/tailwindService");
async function POST(request) {
    const { body } = request;
    const { classes, theme, plugins } = body;
    console.time("vercel function getclasses");
    const result = await (0, tailwindService_1.getTailwindCSSFromUtilClasses)(classes, theme, plugins);
    console.timeEnd("vercel function getclasses");
    return {
        css: result.css,
    };
}
exports.POST = POST;
//# sourceMappingURL=getTailwindUtilClasses.js.map