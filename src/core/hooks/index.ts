import CorsHook from "./cors.hook";
import RouteGuardHook from "./route-guard.hook";
import { FastifyInstance } from "fastify";

export class AppHook {
  public static init(app: FastifyInstance) {
    app.addHook("onRequest", async (request, reply) => {
      await CorsHook(request, reply);
      await RouteGuardHook(request, reply);
    });
  }
}
