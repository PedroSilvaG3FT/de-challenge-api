import { AppRouteConfig } from "./@types/route.type";
import { FastifyInstance, FastifySchema } from "fastify";
import { UserController } from "../controllers/user.controller";

const moduleName = "user";
const schema: FastifySchema = { tags: [moduleName] };

const route: AppRouteConfig = {
  name: moduleName,
  routes: async (fastify: FastifyInstance) => {
    const _controller = new UserController();

    fastify.get("", { schema: { ...schema } }, _controller.getAll);
    fastify.put("", { schema: { ...schema } }, _controller.update);
    fastify.post("", { schema: { ...schema } }, _controller.create);
    fastify.get("/:id", { schema: { ...schema } }, _controller.get);
    fastify.get("/me", { schema: { ...schema } }, _controller.getByToken);
    fastify.delete("/:id", { schema: { ...schema } }, _controller.delete);
  },
};

export default route;
