import express, { Request, Response } from "express";
import { getTailwindCSSFromUtilClasses } from "../services/tailwindService";

const app = express();
app.use(express.json());
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
