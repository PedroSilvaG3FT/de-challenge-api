import { z } from "zod";

const schema = z.object({
  OPENAI_KEY: z.string(),
  JWT_SECRET_KEY: z.string(),

  SUPABASE_KEY: z.string(),
  SUPABASE_URL: z.string().url(),

  AMADEUS_API_URL: z.string(),
  AMADEUS_API_KEY: z.string(),
  AMADEUS_API_SECRET: z.string(),
});

export const enviroments = schema.parse(process.env);
