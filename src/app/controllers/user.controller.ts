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

  public get = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const response = await this.#userService.getById(id);

    reply.send({ data: response });
  };

  public getAll = async (request: FastifyRequest, reply: FastifyReply) => {
    const reponse = await this.#userService.getAll();
    reply.send({ data: reponse });
  };

  public create = async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body;
    reply.code(201).send({ message: "User created", data: body });
  };

  public update = async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body;
    reply.send({ message: "User updated", data: body });
  };

  public delete = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    reply.send({ message: `User with id ${id} deleted` });
  };
}
