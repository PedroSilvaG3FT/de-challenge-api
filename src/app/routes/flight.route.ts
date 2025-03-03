import { AppRouteConfig } from "./@types/route.type";
import { FastifyInstance, FastifySchema } from "fastify";
import { FlightRouteSchemas } from "./schemas/flight.schema";
import { FlightController } from "../controllers/flight.controller";

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
          body: FlightRouteSchemas.flightSearchReqSchema,
          response: { 200: FlightRouteSchemas.flightSearchResSchema },
        },
      },
      _controller.search
    );

    fastify.post(
      "/airport",
      {
        schema: {
          ...schema,
          body: FlightRouteSchemas.searchAirportReq,
          response: { 200: FlightRouteSchemas.searchAirportRes },
        },
      },
      _controller.searchAirport
    );

    fastify.get(
      "/search/history",
      {
        schema: {
          ...schema,
          response: { 200: FlightRouteSchemas.flightSearchHistoryResSchema },
        },
      },
      _controller.history
    );
  },
};

export default route;
