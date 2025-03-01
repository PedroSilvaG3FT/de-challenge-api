import { AppRouteConfig } from "./@types/route.type";
import { FastifyInstance, FastifySchema } from "fastify";
import { AuthRouteSchemas } from "./schemas/auth.schema";
import { AuthController } from "@/app/controllers/auth.controller";

const moduleName = "auth";
const schema: FastifySchema = { tags: [moduleName] };

const route: AppRouteConfig = {
  name: moduleName,
  routes: async (fastify: FastifyInstance) => {
    const _controller = new AuthController();

    fastify.post(
      "/sign-in",
      {
        schema: {
          ...schema,
          body: AuthRouteSchemas.signInReq,
          response: { 200: AuthRouteSchemas.signInRes },
        },
      },
      _controller.signIn
    );

    fastify.post(
      "/sign-up",
      {
        schema: {
          ...schema,
          body: AuthRouteSchemas.signUpReq,
          response: { 200: AuthRouteSchemas.signUpRes },
        },
      },
      _controller.signUp
    );
  },
};

export default route;
