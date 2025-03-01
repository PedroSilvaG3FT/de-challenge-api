import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default async function CorsHook(_: FastifyRequest, reply: FastifyReply) {
  reply.header("Access-Control-Allow-Origin", "*");
  reply.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, OPTIONS"
  );
  reply.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );

  return new Promise((resolve) => resolve(true));
}
