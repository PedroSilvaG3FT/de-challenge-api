import { FastifyReply, FastifyRequest } from "fastify";
import { TokenService } from "../services/token.service";
import { ResponseUtil } from "@/shared/utils/response.util";

const PUBLIC_ROUTES = ["/swagger", "/auth", "/api/health"];

export default async function RouteGuardHook(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const isPublic = PUBLIC_ROUTES.some((route) => request.url.includes(route));
    if (request.url === "/" || isPublic) return;

    const session = await TokenService.verifyAndDecode(request, reply);
    if (session) request.user = session;
  } catch (err) {
    ResponseUtil.handler(
      reply,
      ResponseUtil.unauthorized(["Unauthorized access"])
    );
  }
}
