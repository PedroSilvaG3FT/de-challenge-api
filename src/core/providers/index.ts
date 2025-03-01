import { FastifyInstance } from "fastify";
import { TokenService } from "../services/token.service";

export class AppProvider {
  static init(app: FastifyInstance) {
    app.ready((err) => {
      if (err) throw err;

      TokenService.initialize(app);
    });
  }
}
