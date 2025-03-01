import {
  IAmadeusFlightOffer,
  IAmadeusFlightOfferSearch,
  IAmadeusLocationResponse,
} from "amadeus";

export class FlighMapper {
  public static buildFlights(
    response: IAmadeusFlightOfferSearch
  ): IAmadeusFlightOffer[] {
    const { data, dictionaries } = response;

    return data.map((offer) => ({
      ...offer,
      price: {
        ...offer.price,
        currencyName: dictionaries?.currencies?.[offer.price?.currency],
      },
      itineraries: offer.itineraries?.map((itinerary) => ({
        ...itinerary,
        segments: itinerary.segments?.map((segment) => ({
          ...segment,
          departure: {
            ...segment.departure,
            cityCode:
              dictionaries?.locations?.[segment.departure?.iataCode]?.cityCode,
            countryCode:
              dictionaries?.locations?.[segment.departure?.iataCode]
                ?.countryCode,
          },
          arrival: {
            ...segment.arrival,
            cityCode:
              dictionaries?.locations?.[segment.arrival?.iataCode]?.cityCode,
            countryCode:
              dictionaries?.locations?.[segment.arrival?.iataCode]?.countryCode,
          },
          carrierName: dictionaries?.carriers?.[segment.carrierCode],
          aircraft: {
            ...segment.aircraft,
            name: dictionaries?.aircraft?.[segment.aircraft?.code],
          },
        })),
      })),
    }));
  }
}
