import fastify from "fastify";
import cors from "@fastify/cors";

export const server = fastify();

server.setErrorHandler((error, request, reply) => {
  // Log the error internally
  console.error(error, request);

  // Send a generic message to the client
  reply.status(500).send({ error: "Internal Server Error" });
});

server.register(cors, {
  // Options are optional
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify which methods to allow
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  credentials: true, // Enable sending of credentials (cookies, authorization headers, etc.)
});

server.listen({ port: Number(process.env.PORT) }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
