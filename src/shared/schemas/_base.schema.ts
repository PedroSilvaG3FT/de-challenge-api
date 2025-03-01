import { z } from "zod";
export const EmailBaseFieldSchema = z
  .string()
  .email("Invalid email format")
  .min(1, "Email cannot be empty");

export const DateBaseFieldSchema = z
  .union([
    z.date(),
    z.string().refine((dateStr) => !isNaN(Date.parse(dateStr)), {
      message: "Invalid date string. Format should be YYYY-MM-DD",
    }),
  ])
  .transform((val) => {
    if (typeof val === "string") return new Date(val);
    else return val;
  });
