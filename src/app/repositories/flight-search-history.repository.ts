import prisma from "@/core/database/prisma";
import { IFlightSearchHistory } from "@/shared/schemas/flight-search-history.schema";

export class FlightSearchHistoryRepository {
  public getById(id: string) {
    return prisma.flightSearchHistory.findUnique({ where: { id } });
  }

  public getByProfileUserId(profileUserId: string) {
    return prisma.flightSearchHistory.findMany({ where: { profileUserId } });
  }

  public getAll() {
    return prisma.flightSearchHistory.findMany();
  }

  public create(data: IFlightSearchHistory) {
    return prisma.flightSearchHistory.create({ data });
  }

  public update(id: string, data: Partial<IFlightSearchHistory>) {
    return prisma.flightSearchHistory.update({
      where: { id },
      data,
    });
  }

  public delete(id: string) {
    return prisma.flightSearchHistory.delete({ where: { id } });
  }
}
