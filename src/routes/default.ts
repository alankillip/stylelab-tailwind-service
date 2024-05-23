import { server } from "../server";

server.get("/", async () => {
  return "stylelab tailwind api home";
});
