import { z } from "zod";
import { createResponseSchema, createFlexibleSchema } from "./_base.schema";
import { ETravelClass } from "@/shared/enums/travel-class.enum";

const flightSearchReqSchema = z.object({
  adults: z.number().int().positive(),
  infants: z.number().int().nonnegative().optional(),
  children: z.number().int().nonnegative().optional(),
  originLocationCode: z.string().length(3),
  destinationLocationCode: z.string().length(3),
  travelClass: z.nativeEnum(ETravelClass).optional(),
  departureDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  returnDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),

  nonStop: z.boolean().optional(),
  maxPrice: z.number().positive().optional(),
  max: z.number().int().positive().optional(),
  currencyCode: z.string().length(3).optional(),
});

const amadeusPrice = createFlexibleSchema(
  z.object({
    base: z.string().optional(),
    total: z.string().optional(),
    currency: z.string().optional(),
    grandTotal: z.string().optional(),
    fees: z
      .array(
        z.object({
          type: z.string().optional(),
          amount: z.string().optional(),
        })
      )
      .optional(),
    currencyName: z.string().optional(),
  })
);

const amadeusItinerary = createFlexibleSchema(
  z.object({
    duration: z.string().optional(),
    segments: z
      .array(
        z.object({
          id: z.string().optional(),
          number: z.string().optional(),
          duration: z.string().optional(),
          carrierCode: z.string().optional(),
          numberOfStops: z.number().optional(),
          blacklistedInEU: z.boolean().optional(),
          arrival: z
            .object({
              at: z.string().optional(),
              iataCode: z.string().optional(),
              terminal: z.string().optional(),
              cityCode: z.string().optional(),
              countryCode: z.string().optional(),
            })
            .optional(),
          departure: z
            .object({
              at: z.string().optional(),
              iataCode: z.string().optional(),
              terminal: z.string().optional(),
              cityCode: z.string().optional(),
              countryCode: z.string().optional(),
            })
            .optional(),
          aircraft: z
            .object({
              code: z.string().optional(),
              name: z.string().optional(),
            })
            .optional(),
          operating: z
            .object({ carrierCode: z.string().optional() })
            .optional(),
          carrierName: z.string().optional(),
        })
      )
      .optional(),
  })
);

const amadeusTravelerPricing = createFlexibleSchema(
  z.object({
    price: amadeusPrice.optional(),
    travelerId: z.string().optional(),
    fareOption: z.string().optional(),
    travelerType: z.string().optional(),
    fareDetailsBySegment: z
      .array(
        z.object({
          class: z.string().optional(),
          cabin: z.string().optional(),
          segmentId: z.string().optional(),
          fareBasis: z.string().optional(),
          includedCheckedBags: z
            .object({
              weight: z.number().optional(),
              weightUnit: z.string().optional(),
            })
            .optional(),
          includedCabinBags: z
            .object({
              weight: z.number().optional(),
              weightUnit: z.string().optional(),
            })
            .optional(),
        })
      )
      .optional(),
  })
);

const amadeusPricingOptions = createFlexibleSchema(
  z.object({
    fareType: z.array(z.string()).optional(),
    includedCheckedBagsOnly: z.boolean().optional(),
  })
);

const flightOfferSchema = createFlexibleSchema(
  z.object({
    id: z.string().optional(),
    type: z.string().optional(),
    source: z.string().optional(),
    oneWay: z.boolean().optional(),
    price: amadeusPrice.optional(),
    isUpsellOffer: z.boolean().optional(),
    nonHomogeneous: z.boolean().optional(),
    lastTicketingDate: z.string().optional(),
    lastTicketingDateTime: z.string().optional(),
    numberOfBookableSeats: z.number().optional(),
    instantTicketingRequired: z.boolean().optional(),
    pricingOptions: amadeusPricingOptions.optional(),
    itineraries: z.array(amadeusItinerary).optional(),
    validatingAirlineCodes: z.array(z.string()).optional(),
    travelerPricings: z.array(amadeusTravelerPricing).optional(),
  })
);

const flightSearchResSchema = createResponseSchema(
  z.array(flightOfferSchema)
).passthrough();

const searchAirportReq = z.object({
  keyword: z.string().min(3, "Keyword is required"),
});

const searchAirportRes = createFlexibleSchema(
  z.object({
    id: z.string(),
    type: z.string(),
    name: z.string(),
    subType: z.string(),
    iataCode: z.string(),
    detailedName: z.string(),
    timeZoneOffset: z.string(),
    self: z.object({
      href: z.string().url(),
      methods: z.array(z.string()),
    }),
    geoCode: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
    address: z.object({
      cityName: z.string(),
      cityCode: z.string(),
      countryName: z.string(),
      countryCode: z.string(),
      regionCode: z.string().optional(),
    }),
  })
);

const flightSearchHistorySchema = createFlexibleSchema(
  z.object({
    id: z.string().uuid(),
    profileUserId: z.string().uuid(),
    origin: z.string().length(3),
    destination: z.string().length(3),
    originDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    destinationDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .nullable(),
    countPassengers: z.number().int().positive(),
    lowestPrice: z.string(),
    higherPrice: z.string(),
    createdAt: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/),
  })
);

const flightSearchHistoryResSchema = createResponseSchema(
  z.array(flightSearchHistorySchema)
).passthrough();

export const FlightRouteSchemas = {
  flightSearchHistoryResSchema,

  flightSearchReqSchema,
  flightSearchResSchema,

  searchAirportReq,
  searchAirportRes,
};
