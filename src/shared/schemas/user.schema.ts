import { z } from "zod";
import { DateBaseFieldSchema, EmailBaseFieldSchema } from "./_base.schema";

export const CreateUserSchema = z.object({
  email: EmailBaseFieldSchema,
  birthDate: DateBaseFieldSchema,
  name: z.string().min(1, "Name cannot be empty"),
  phone: z.string().min(1, "Phone number cannot be empty"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const UserProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  userId: z.string(),
  active: z.boolean(),
  birthDate: z.union([z.date(), z.string()]),
  email: z.string().email("Invalid email format"),
});

export interface ICreateUser extends z.infer<typeof CreateUserSchema> {}
export interface IUserProfile extends z.infer<typeof UserProfileSchema> {}
