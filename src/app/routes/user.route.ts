import { UserRouteSchemas } from "./schemas/user.schema";
import { AppRouteConfig } from "./@types/route.type";
import { FastifyInstance, FastifySchema } from "fastify";
import { UserController } from "../controllers/user.controller";

const moduleName = "user";
const schema: FastifySchema = { tags: [moduleName] };

const route: AppRouteConfig = {
  name: moduleName,
  routes: async (fastify: FastifyInstance) => {
    const _controller = new UserController();

    fastify.get(
      "/me",
      { schema: { ...schema, response: { 200: UserRouteSchemas.meRes } } },
      _controller.getByToken
    );
  },
};

export default route;
