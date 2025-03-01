declare module "amadeus" {
  export interface IAmadeusMeta {
    count: number;
    links: { self: string };
  }

  export interface IAmadeusDictionaries {
    aircraft: Record<string, string>;
    carriers: Record<string, string>;
    currencies: Record<string, string>;
    locations: Record<string, IAmadeusDictionaryLocation>;
  }

  export interface IAmadeusBaseResponse<Data> {
    data: Data;
    parsed: boolean;
    headers: object;
    request: object;
    analytics: object;
    statusCode: number;
    result: {
      data: Data;
      meta: IAmadeusMeta;
      dictionaries: IAmadeusDictionaries;
    };
  }

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

  export interface IAmadeusFlightOfferResponse
    extends IAmadeusBaseResponse<IAmadeusFlightOffer[]> {}

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

  export interface IAmadeusDictionaryLocation {
    cityCode: string;
    countryCode: string;
  }

  export interface IAmadeusSearchLocationParams {
    keyword: string;
    subType: string;
  }

  export interface IAmadeusLocationData {
    id: string;
    type: string;
    name: string;
    subType: string;
    iataCode: string;
    detailedName: string;
    timeZoneOffset: string;
    self: { href: string; methods: string[] };
    geoCode: { latitude: number; longitude: number };
    address: {
      cityName: string;
      cityCode: string;
      countryName: string;
      countryCode: string;
      regionCode?: string;
    };
  }

  export interface IAmadeusLocationResponse
    extends IAmadeusBaseResponse<IAmadeusLocationData[]> {}

  class Amadeus {
    constructor(params: { clientId: string; clientSecret: string });

    shopping: {
      flightOffersSearch: {
        get: (
          params: IAmadeusFlightOffersSearchParams
        ) => Promise<IAmadeusFlightOfferResponse>;
      };
    };

    referenceData: {
      locations: {
        get: (
          params: IAmadeusSearchLocationParams
        ) => Promise<IAmadeusLocationResponse>;
      };
    };
  }

  export default Amadeus;
}
