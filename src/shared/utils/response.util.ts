import { ZodError } from "zod";
import { FastifyReply } from "fastify";
import { IAppResponse } from "../interfaces/response.interface";

export class ResponseUtil {
  static success<T>(data: T, status: number = 200): IAppResponse<T> {
    return {
      data,
      status,
      messages: [],
      success: true,
    };
  }

  static error(status: number, messages: string[]): IAppResponse<null> {
    return {
      status,
      messages,
      data: null,
      success: false,
    };
  }

  static badRequest(messages: string[]): IAppResponse<null> {
    return this.error(400, messages);
  }

  static notFound(messages: string[]): IAppResponse<null> {
    return this.error(404, messages);
  }

  static unauthorized(messages: string[]): IAppResponse<null> {
    return this.error(401, messages);
  }

  static handler<T>(reply: FastifyReply, response: IAppResponse<T>) {
    reply.status(response.status).send(response);
  }

  public static handleError(error: unknown, reply: FastifyReply): void {
    let response: IAppResponse<null>;

    if (error instanceof ZodError) {
      response = this.error(
        400,
        error.errors.map((e) => e.message)
      );
    } else if (error instanceof Error) {
      response = this.error(500, [error.message]);
    } else {
      response = this.error(500, ["An unknown error occurred"]);
    }

    this.handler(reply, response);
  }
}
