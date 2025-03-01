import { ZodError } from "zod";
import { ResponseUtil } from "@/shared/utils/response.util";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export function AppErrorHandler(
  error: FastifyError | ZodError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.error(error);

  if (error instanceof ZodError) {
    const response = ResponseUtil.error(
      400,
      error.errors.map((e) => e.message)
    );

    return ResponseUtil.handler(reply, {
      ...response,
      details: error.errors,
    });
  }

  if ("statusCode" in error && error.statusCode) {
    const response = ResponseUtil.error(error.statusCode, [error.message]);
    return ResponseUtil.handler(reply, { ...response });
  }

  const response = ResponseUtil.error(500, ["An unknown error occurred"]);
  ResponseUtil.handler(reply, { ...response });
}
