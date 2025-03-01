declare module "amadeus" {
  export interface IAmadeusFlightOffersSearchParams {
    adults: number;
    departureDate: string;
    originLocationCode: string;
    destinationLocationCode: string;

    max?: number;
    infants?: number;
    nonStop?: boolean;
    children?: number;
    maxPrice?: number;
    returnDate?: string;
    currencyCode?: string;
    travelClass?: "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST";
  }

  export interface IAmadeusFlightOfferSearch {
    meta: IAmadeusMeta;
    data: IAmadeusFlightOffer[];
    dictionaries: IAmadeusDictionaries;
  }

  export interface IAmadeusFlightOfferResponse {
    body: string;
    parsed: boolean;
    statusCode: number;
    data: IAmadeusFlightOffer[];
    result: IAmadeusFlightOfferSearch;
  }

  export interface IAmadeusMeta {
    count: number;
    links: { self: string };
  }

  export interface IAmadeusFlightOffer {
    id: string;
    type: string;
    source: string;
    oneWay: boolean;
    price: IAmadeusPrice;
    nonHomogeneous: boolean;
    lastTicketingDate: string;
    numberOfBookableSeats: number;
    itineraries: IAmadeusItinerary[];
    validatingAirlineCodes: string[];
    instantTicketingRequired: boolean;
    pricingOptions: IAmadeusPricingOptions;
    travelerPricings: IAmadeusTravelerPricing[];
  }

  export interface IAmadeusItinerary {
    duration: string;
    segments: IAmadeusSegment[];
  }

  export interface IAmadeusSegment {
    id: string;
    number: string;
    duration: string;
    carrierCode: string;
    numberOfStops: number;
    blacklistedInEU: boolean;
    arrival: IAmadeusLocation;
    departure: IAmadeusLocation;
    aircraft: { code: string };
    operating: { carrierCode: string };
  }

  export interface IAmadeusLocation {
    at: string;
    iataCode: string;
    terminal?: string;
  }

  export interface IAmadeusPrice {
    base: string;
    total: string;
    currency: string;
    grandTotal: string;
    fees: IAmadeusFee[];
  }

  export interface IAmadeusFee {
    type: string;
    amount: string;
  }

  export interface IAmadeusPricingOptions {
    fareType: string[];
    includedCheckedBagsOnly: boolean;
  }

  export interface IAmadeusTravelerPricing {
    travelerId: string;
    fareOption: string;
    travelerType: string;
    price: IAmadeusPrice;
    fareDetailsBySegment: IAmadeusFareDetails[];
  }

  export interface IAmadeusFareDetails {
    class: string;
    cabin: string;
    segmentId: string;
    fareBasis: string;
    includedCheckedBags: IAmadeusCheckedBags;
  }

  export interface IAmadeusCheckedBags {
    weight: number;
    weightUnit: string;
  }

  export interface IAmadeusDictionaries {
    aircraft: Record<string, string>;
    carriers: Record<string, string>;
    currencies: Record<string, string>;
    locations: Record<string, IAmadeusDictionaryLocation>;
  }

  export interface IAmadeusDictionaryLocation {
    cityCode: string;
    countryCode: string;
  }

  class Amadeus {
    constructor(params: { clientId: string; clientSecret: string });

    shopping: {
      flightOffersSearch: {
        get: (
          params: IAmadeusFlightOffersSearchParams
        ) => Promise<IAmadeusFlightOfferResponse>;
      };
    };
  }

  export default Amadeus;
}
