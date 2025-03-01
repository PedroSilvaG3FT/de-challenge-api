import Amadeus from "amadeus";
import { enviroments } from "@/core/enviroments";

class AmadeusService {
  private static instance: AmadeusService;

  public readonly _app = new Amadeus({
    clientId: enviroments.AMADEUS_API_KEY,
    clientSecret: enviroments.AMADEUS_API_SECRET,
  });

  public static getInstance(): AmadeusService {
    if (!AmadeusService.instance)
      AmadeusService.instance = new AmadeusService();

    return AmadeusService.instance;
  }
}

export const amadeusService = AmadeusService.getInstance();
