import { z } from "zod";
import { createResponseSchema } from "./_base.schema";
import {
  CreateUserSchema,
  UserProfileSchema,
} from "@/shared/schemas/user.schema";

const signInRes = createResponseSchema(
  z.object({ token: z.string(), user: UserProfileSchema })
);

const signInReq = z.object({
  email: z.string().min(1, "Content cannot be empty"),
  password: z.string().min(1, "Content cannot be empty"),
});

const signUpReq = CreateUserSchema;
const signUpRes = createResponseSchema(UserProfileSchema);

export const AuthRouteSchemas = { signInReq, signInRes, signUpReq, signUpRes };
