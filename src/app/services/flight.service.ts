import {
  IAmadeusFlightOfferResponse,
  IAmadeusFlightOffersSearchParams,
} from "amadeus";
import logger from "@/shared/utils/logger.util";
import { ResponseUtil } from "@/shared/utils/response.util";
import { FlighMapper } from "@/shared/mappers/flight.mapper";
import { amadeusService } from "@/shared/amadeus/amadeus.service";

export class FlightService {
  public searchAirport = async (keyword: string) => {
    const response = await amadeusService._app.referenceData.locations.get({
      keyword,
      subType: "AIRPORT,CITY",
    });

    return ResponseUtil.success(response.data);
  };

  public search = async (searchParams: IAmadeusFlightOffersSearchParams) => {
    const response: IAmadeusFlightOfferResponse =
      await amadeusService._app.shopping.flightOffersSearch.get(searchParams);

    if (response.statusCode === 200)
      return ResponseUtil.success(FlighMapper.buildFlights(response.result));

    logger.error("Error on search flights", response?.data);
    return ResponseUtil.error(response.statusCode || 500, []);
  };
}
