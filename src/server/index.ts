import express, { Request, Response } from "express";
import { getTailwindCSSFromUtilClasses } from "../services/tailwindService";
import cors from "cors";

const app = express();

app.use(express.json());

console.log("process.env.ALLOWED_ORIGINS", process.env.ALLOWED_ORIGINS);
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      console.log("allowedOrigins = ", allowedOrigins);
      console.log("origin = ", origin);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        console.error(msg);
        return callback(null, false);
      }
      return callback(null, true);
    },
  })
);

const port = process.env.PORT;

app.get("/", (_req: Request, res: Response) => {
  res.send("Stylelab tailwind service");
});

app.post("/", async (req: Request, res: Response) => {
  const { classes, theme, plugins } = req.body;
  const result = await getTailwindCSSFromUtilClasses(classes, theme, plugins);
  res.send({
    css: result.css,
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
