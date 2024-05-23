"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTailwindCSSFromUtilClasses = void 0;
const tailwindcss_1 = __importDefault(require("tailwindcss"));
const postcss_1 = __importDefault(require("postcss"));
const path_1 = __importDefault(require("path"));
const defaultTheme = {
    extend: {},
};
const getTailwindCSSFromUtilClasses = (utilsClasses = "", theme = defaultTheme, plugins = []) => {
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
    return (0, postcss_1.default)((0, tailwindcss_1.default)(config)).process(cssStub, {
        from: `${path_1.default.resolve(__filename)}`,
    });
};
exports.getTailwindCSSFromUtilClasses = getTailwindCSSFromUtilClasses;
//# sourceMappingURL=tailwindService.js.map