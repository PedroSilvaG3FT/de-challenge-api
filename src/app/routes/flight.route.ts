import { AppRouteConfig } from "./@types/route.type";
import { FastifyInstance, FastifySchema } from "fastify";
import { FlightController } from "../controllers/flight.controller";
import { FlightRouteSchemas } from "./schemas/flight.schema";
import { z } from "zod";

const moduleName = "flight";
const schema: FastifySchema = {
  tags: [moduleName],
  security: [{ bearerAuth: [] }],
};

const route: AppRouteConfig = {
  name: moduleName,
  routes: async (fastify: FastifyInstance) => {
    const _controller = new FlightController();

    fastify.post(
      "/search",
      {
        schema: {
          ...schema,
          body: FlightRouteSchemas.flightSearchParamsSchema,
          response: { 200: FlightRouteSchemas.flightSearchResSchema },
        },
      },
      _controller.search
    );
  },
};

export default route;
