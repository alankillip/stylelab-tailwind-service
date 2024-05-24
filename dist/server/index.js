"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tailwindService_1 = require("../services/tailwindService");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const allowedOrigins = ((_a = process.env.ALLOWED_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(",")) || [];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = "The CORS policy for this site does not allow access from the specified Origin.";
            console.error(msg);
            return callback(null, false);
        }
        return callback(null, true);
    },
}));
const port = process.env.PORT;
app.get("/", (_req, res) => {
    res.send("Stylelab tailwind service");
});
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { classes, theme, plugins } = req.body;
    const result = yield (0, tailwindService_1.getTailwindCSSFromUtilClasses)(classes, theme, plugins);
    res.send({
        css: result.css,
    });
}));
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
