import { FastifyReply, FastifyRequest } from "fastify";
import { TokenService } from "../services/token.service";
import { ResponseUtil } from "@/shared/utils/response.util";

const PUBLIC_ROUTES = [
  "/auth",
  "/swagger",
  "/api/health",
  "flight/search",
  "flight/airport",
];

export default async function RouteGuardHook(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const pathWithoutQuery = request.url.split("?")[0];

    const isPublic = PUBLIC_ROUTES.some((route) =>
      pathWithoutQuery.includes(route)
    );

    if (pathWithoutQuery === "/" || isPublic) return;

    const session = await TokenService.verifyAndDecode(request, reply);
    if (session) request.user = session;
  } catch (err) {
    ResponseUtil.handler(
      reply,
      ResponseUtil.unauthorized(["Unauthorized access"])
    );
  }
}
