import { FastifyInstance } from "fastify/types/instance";

export type AppRouteConfig = {
  name: string;
  routes: (fastify: FastifyInstance) => Promise<void>;
};
