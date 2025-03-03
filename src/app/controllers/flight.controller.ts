import { FastifyReply, FastifyRequest } from "fastify";
import { FlightService } from "../services/flight.service";
import { ResponseUtil } from "@/shared/utils/response.util";
import { TokenService } from "@/core/services/token.service";
import { FlightRouteSchemas } from "../routes/schemas/flight.schema";
import { FlightSearchHistoryService } from "../services/flight-search-history.service";

export class FlightController {
  #flightService = new FlightService();
  #flightSearchHistoryService = new FlightSearchHistoryService();

  public search = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const payload = FlightRouteSchemas.flightSearchReqSchema.parse(
        request.body
      );

      const user = await TokenService.verifyAndDecode(request, reply, true);
      const response = await this.#flightService.search(
        payload,
        user?.user_profile_id
      );

      ResponseUtil.handler(reply, response);
    } catch (error) {
      ResponseUtil.handleError(reply, error);
    }
  };

  public searchAirport = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const payload = FlightRouteSchemas.searchAirportReq.parse(request.body);
      const response = await this.#flightService.searchAirport(payload.keyword);
      ResponseUtil.handler(reply, response);
    } catch (error) {
      ResponseUtil.handleError(reply, error);
    }
  };

  public history = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = await TokenService.verifyAndDecode(request, reply);

      if (!user?.user_profile_id) {
        ResponseUtil.unauthorized(["Token not provided"]);
        return;
      }

      const response =
        await this.#flightSearchHistoryService.getByProfileUserId(
          user.user_profile_id
        );

      ResponseUtil.handler(reply, response);
    } catch (error) {
      ResponseUtil.handleError(reply, error);
    }
  };
}
