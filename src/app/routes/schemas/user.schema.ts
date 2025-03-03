import { createResponseSchema } from "./_base.schema";
import { UserProfileSchema } from "@/shared/schemas/user.schema";

const meRes = createResponseSchema(UserProfileSchema);
export const UserRouteSchemas = { meRes };
