import { z } from "zod";

export const baseResponseSchema = z.object({
  data: z.any().nullable().optional(),

  status: z.number(),
  success: z.boolean(),
  details: z.array(z.any()).optional(),
  messages: z.array(z.string()).optional(),
});

export function createResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return baseResponseSchema
    .extend({ data: dataSchema.nullable().optional() })
    .passthrough();
}

export function createFlexibleSchema<T extends z.ZodTypeAny>(schema: T) {
  return z.union([
    schema,
    z.unknown().transform((data) => {
      console.warn("Schema validation failed, returning original data");
      return data;
    }),
  ]);
}
