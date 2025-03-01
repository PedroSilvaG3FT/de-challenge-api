import {
  ITokenData,
  ITokenDecodeResult,
} from "@/shared/interfaces/token.interface";
import { ResponseUtil } from "@/shared/utils/response.util";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export class TokenService {
  static #instance: FastifyInstance;

  public static initialize(app: FastifyInstance) {
    this.#instance = app;
  }

  public static generate = (payload: ITokenData) =>
    this.#instance.jwt.sign({ payload });

  public static decode = (token: string) => {
    const value = token.replace("bearer", "").replace("Bearer", "").trim();
    const data = this.#instance.jwt.decode(value) as ITokenDecodeResult;

    return data.payload || {};
  };

  public static verifyAndDecode = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      await request.jwtVerify();
      const data = request.user as ITokenDecodeResult;
      return data.payload || {};
    } catch (error) {
      const badRequest = ResponseUtil.badRequest(["Invalid token"]);
      ResponseUtil.handler(reply, badRequest);
      return null;
    }
  };

  public static verifyHook = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  };
}
