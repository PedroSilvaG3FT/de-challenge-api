import { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "../services/user.service";
import { ResponseUtil } from "@/shared/utils/response.util";
import { TokenService } from "@/core/services/token.service";

export class UserController {
  #userService = new UserService();

  public getByToken = async (request: FastifyRequest, reply: FastifyReply) => {
    const token = request?.headers?.authorization ?? "";
    const badRequest = ResponseUtil.badRequest(["Token not found"]);

    if (!token) ResponseUtil.handler(reply, badRequest);
    else {
      const { user_profile_id } = TokenService.decode(token);

      const data = await this.#userService.getById(user_profile_id);
      ResponseUtil.handler(reply, ResponseUtil.success(data));
    }
  };
}
