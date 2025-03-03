import { AuthService } from "../services/auth.service";
import { FastifyReply, FastifyRequest } from "fastify";
import { ResponseUtil } from "@/shared/utils/response.util";
import { AuthRouteSchemas } from "../routes/schemas/auth.schema";

export class AuthController {
  public _authService = new AuthService();

  public signUp = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const payload = AuthRouteSchemas.signUpReq.parse(request.body);
      const data = await this._authService.signUp(payload);

      ResponseUtil.handler(reply, ResponseUtil.success(data));
    } catch (error) {
      ResponseUtil.handleError(reply, error);
    }
  };

  public signIn = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const payload = AuthRouteSchemas.signInReq.parse(request.body);
      const response = await this._authService.signIn(payload);

      ResponseUtil.handler(reply, response);
    } catch (error) {
      ResponseUtil.handleError(reply, error);
    }
  };
}
