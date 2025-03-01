import { AppHook } from "./core/hooks";
import { AppProvider } from "./core/providers";
import { enviroments } from "./core/enviroments";
import { AppRoute } from "./app/routes/_app.route";
import { AppErrorHandler } from "./core/plugins/error-handler.plugin";

import {
  ZodTypeProvider,
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod";

import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import Fastify, { FastifyInstance } from "fastify";

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

  app.setErrorHandler(AppErrorHandler);
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  await app.register(fastifyCors, {
    origin: "*",
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  });

  await app.register(fastifyJwt, { secret: enviroments.JWT_SECRET_KEY });

  AppHook.init(app);
  AppProvider.init(app);
  await AppRoute.init(app);

  return app;
}
