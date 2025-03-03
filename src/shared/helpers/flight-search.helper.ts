import { IAmadeusFlightOffer } from "amadeus";

export class FlightSearchHelper {
  static getPriceRange(flights: IAmadeusFlightOffer[]) {
    const [minPrice, maxPrice] = flights.reduce(
      ([min, max], flight) => {
        const price = parseFloat(flight.price.total);
        return [Math.min(min, price), Math.max(max, price)];
      },
      [Infinity, -Infinity]
    );

    const formattedMinPrice =
      minPrice === Infinity ? 0 : parseFloat(minPrice.toFixed(2));
    const formattedMaxPrice =
      maxPrice === -Infinity ? 0 : parseFloat(maxPrice.toFixed(2));

    return [formattedMinPrice, formattedMaxPrice];
  }
}
