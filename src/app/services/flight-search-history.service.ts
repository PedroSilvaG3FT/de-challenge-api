import { randomUUID } from "crypto";
import { FlightSearchHelper } from "@/shared/helpers/flight-search.helper";
import { IAmadeusFlightOffer, IAmadeusFlightOffersSearchParams } from "amadeus";
import { IFlightSearchHistory } from "@/shared/schemas/flight-search-history.schema";
import { FlightSearchHistoryRepository } from "../repositories/flight-search-history.repository";

export class FlightSearchHistoryService {
  #flightSearchHistoryRepository = new FlightSearchHistoryRepository();

  public getAll = () => {
    return this.#flightSearchHistoryRepository.getAll();
  };

  public getById = (id: string) => {
    return this.#flightSearchHistoryRepository.getById(id);
  };

  public getByProfileUserId = (profileUserId: string) => {
    return this.#flightSearchHistoryRepository.getByProfileUserId(
      profileUserId
    );
  };

  public create = async (data: IFlightSearchHistory) => {
    return this.#flightSearchHistoryRepository.create({
      ...data,
      id: randomUUID(),
    });
  };

  public update = async (id: string, data: Partial<IFlightSearchHistory>) => {
    const existingRecord = await this.getById(id);

    if (!existingRecord)
      throw new Error(`Flight search history does not exist`);

    const updatedRecord = await this.#flightSearchHistoryRepository.update(
      id,
      data
    );
    return updatedRecord;
  };

  public delete = async (id: string) => {
    const existingRecord = await this.getById(id);
    if (!existingRecord)
      throw new Error(`Flight search history does not exist`);

    await this.#flightSearchHistoryRepository.delete(id);
    return { message: "Flight search history deleted successfully" };
  };

  public createFromFlightSearch = async (
    userProfileId: string,
    searchParams: IAmadeusFlightOffersSearchParams,
    flightOffers: IAmadeusFlightOffer[]
  ) => {
    const [lowestPrice, higherPrice] =
      FlightSearchHelper.getPriceRange(flightOffers);

    const flightSearchHistory: IFlightSearchHistory = {
      id: randomUUID(),
      profileUserId: userProfileId,
      origin: searchParams.originLocationCode,
      destination: searchParams.destinationLocationCode,
      originDate: new Date(searchParams.departureDate),
      destinationDate: searchParams.returnDate
        ? new Date(searchParams.returnDate)
        : null,
      countPassengers:
        searchParams.adults +
        (searchParams.children || 0) +
        (searchParams.infants || 0),
      lowestPrice,
      higherPrice,
      createdAt: new Date(),
    };

    return this.#flightSearchHistoryRepository.create(flightSearchHistory);
  };
}
