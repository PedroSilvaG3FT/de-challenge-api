import { FastifyReply, FastifyRequest } from "fastify";
import { FlightService } from "../services/flight.service";
import { ResponseUtil } from "@/shared/utils/response.util";
import { FlightRouteSchemas } from "../routes/schemas/flight.schema";

export class FlightController {
  #flightService = new FlightService();

  public search = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const payload = FlightRouteSchemas.flightSearchReqSchema.parse(
        request.body
      );

      const response = await this.#flightService.search(payload);
      ResponseUtil.handler(reply, response);
    } catch (error) {
      ResponseUtil.handleError(error, reply);
    }
  };

  public searchAirport = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const payload = FlightRouteSchemas.searchAirportReq.parse(request.query);
      const response = await this.#flightService.searchAirport(payload.keyword);
      ResponseUtil.handler(reply, response);
    } catch (error) {
      ResponseUtil.handleError(error, reply);
    }
  };
}
