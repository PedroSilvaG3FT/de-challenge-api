import {
  IAmadeusFlightOfferResponse,
  IAmadeusFlightOffersSearchParams,
} from "amadeus";
import logger from "@/shared/utils/logger.util";
import { ResponseUtil } from "@/shared/utils/response.util";
import { FlightHelper } from "@/shared/helpers/flight.helper";
import { amadeusService } from "@/shared/amadeus/amadeus.service";

export class FlightService {
  public search = async (searchParams: IAmadeusFlightOffersSearchParams) => {
    const response: IAmadeusFlightOfferResponse =
      await amadeusService._app.shopping.flightOffersSearch.get(searchParams);

    if (response.statusCode === 200)
      return ResponseUtil.success(FlightHelper.buildFlights(response.result));

    logger.error("Error on search flights", response?.data);
    return ResponseUtil.error(response.statusCode || 500, []);
  };
}
