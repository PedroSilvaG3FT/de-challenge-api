import { FastifyReply, FastifyRequest } from "fastify";

export default async function RouteGuardHook(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const publicRoutes = ["/swagger", "/auth", "/", "api/health"];
    const isPublic = publicRoutes.some((item) => request.url.includes(item));

    if (isPublic) return;

    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
}
