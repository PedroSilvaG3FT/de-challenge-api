import {
  IAmadeusFlightOfferResponse,
  IAmadeusFlightOffersSearchParams,
} from "amadeus";
import { ResponseUtil } from "@/shared/utils/response.util";
import { FlightHelper } from "@/shared/helpers/flight.helper";
import { amadeusService } from "@/shared/amadeus/amadeus.service";

export class FlightService {
  public search = async (searchParams: IAmadeusFlightOffersSearchParams) => {
    const response: IAmadeusFlightOfferResponse =
      await amadeusService._app.shopping.flightOffersSearch.get(searchParams);

    if (response.statusCode === 200)
      return ResponseUtil.success(FlightHelper.buildFlights(response.result));

    return ResponseUtil.error(response.statusCode || 500, []);
  };
}
