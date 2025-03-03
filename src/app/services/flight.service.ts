import {
  IAmadeusFlightOffer,
  IAmadeusLocationData,
  IAmadeusFlightOfferResponse,
  IAmadeusFlightOffersSearchParams,
} from "amadeus";
import logger from "@/shared/utils/logger.util";
import { StringUtil } from "@/shared/utils/string.util";
import CacheService from "@/core/services/cache.service";
import { ResponseUtil } from "@/shared/utils/response.util";
import { FlighMapper } from "@/shared/mappers/flight.mapper";
import { amadeusService } from "@/shared/amadeus/amadeus.service";
import { FlightSearchHelper } from "@/shared/helpers/flight-search.helper";
import { FlightSearchHistoryService } from "./flight-search-history.service";

export class FlightService {
  private AIRPORT_CACHE_TTL = 24 * 60 * 60; // 24h
  private FLIGHT_SEARCH_CACHE_TTL = 2 * 60; // 2min
  #flightSearchHistoryService = new FlightSearchHistoryService();

  public searchAirport = async (keyword: string) => {
    const formatedKeyword = StringUtil.removeAccents(
      keyword.trim().toUpperCase()
    );

    const cacheKey = `airport_${formatedKeyword}`;
    const cachedResult = CacheService.get<IAmadeusLocationData[]>(cacheKey);

    if (cachedResult) return ResponseUtil.success(cachedResult);

    const response = await amadeusService._app.referenceData.locations.get({
      keyword: formatedKeyword,
      subType: "AIRPORT",
    });

    CacheService.set(cacheKey, response.data, this.AIRPORT_CACHE_TTL);

    return ResponseUtil.success(response.data);
  };

  public search = async (
    searchParams: IAmadeusFlightOffersSearchParams,
    userId?: string
  ) => {
    const cacheKey = this.createSearchCacheKey(searchParams);
    const cachedResult = CacheService.get<IAmadeusFlightOffer[]>(cacheKey);

    if (cachedResult) return ResponseUtil.success(cachedResult);

    const response: IAmadeusFlightOfferResponse =
      await amadeusService._app.shopping.flightOffersSearch.get(searchParams);

    if (response.statusCode === 200) {
      const flightData = FlighMapper.buildFlights(response.result);

      if (userId)
        await this.#flightSearchHistoryService.createFromFlightSearch(
          userId,
          searchParams,
          flightData
        );

      CacheService.set(cacheKey, flightData, this.FLIGHT_SEARCH_CACHE_TTL);

      return ResponseUtil.success(flightData);
    }

    logger.error("Error on search flights", response?.data);
    return ResponseUtil.error(response.statusCode || 500, []);
  };

  private createSearchCacheKey(
    params: IAmadeusFlightOffersSearchParams
  ): string {
    const keyParts = [
      params.originLocationCode,
      params.destinationLocationCode,
      params.departureDate,
      params.adults,
      params.travelClass || "ANY",
      params.currencyCode || "ANY",
      params.max || "ANY",
      params.maxPrice || "ANY",
      params.nonStop || "F",
    ];

    if (params.returnDate) keyParts.push(params.returnDate);
    if (params.children) keyParts.push(`C${params.children}`);
    if (params.infants) keyParts.push(`I${params.infants}`);

    return keyParts.join("_");
  }
}
