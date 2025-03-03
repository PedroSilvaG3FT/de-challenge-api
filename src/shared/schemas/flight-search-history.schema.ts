import { z } from "zod";
import {
  DateBaseFieldSchema,
  NumberBaseFieldSchema,
  StringBaseFieldSchema,
} from "./_base.schema";

export const FlightSearchHistorySchema = z.object({
  id: z.string(),
  profileUserId: z.string(),
  origin: StringBaseFieldSchema,
  originDate: DateBaseFieldSchema,
  destination: StringBaseFieldSchema,
  countPassengers: NumberBaseFieldSchema,
  lowestPrice: NumberBaseFieldSchema,
  higherPrice: NumberBaseFieldSchema,
  createdAt: z.date().default(() => new Date()),
  destinationDate: z.union([DateBaseFieldSchema, z.null()]),
});

export interface IFlightSearchHistory
  extends z.infer<typeof FlightSearchHistorySchema> {}
