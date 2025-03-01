import { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

import user from "./user.route";
import auth from "./auth.route";
import flight from "./flight.route";

const APP_PREFIX = `/api`;
const APP_MODULES = [auth, user, flight];

export class AppRoute {
  private static async register(app: FastifyInstance) {
    APP_MODULES.forEach((m) => {
      app.register(m.routes, { prefix: `${APP_PREFIX}/${m.name}` });
    });

    app.get(`${APP_PREFIX}/health`, () => ({ status: "OK" }));
  }

  static async init(app: FastifyInstance) {
    await app.register(fastifySwagger, {
      transform: jsonSchemaTransform,
      swagger: {
        security: [{ bearerAuth: [] }],
        securityDefinitions: {
          bearerAuth: {
            in: "header",
            type: "apiKey",
            name: "Authorization",
          },
        },
      },
    });

    await app.register(fastifySwaggerUi, {
      routePrefix: "/swagger",
      uiConfig: {
        deepLinking: false,
        docExpansion: "none",
      },
    });

    await app.register(AppRoute.register);
  }
}
