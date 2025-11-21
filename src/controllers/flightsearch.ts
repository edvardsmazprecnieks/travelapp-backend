import Amadeus, {
	type FlightOffersSearchGetResult,
	ResponseError,
} from "amadeus-ts";
import { config } from "dotenv";

config();

const amadeus = new Amadeus({
	clientId: process.env["AMADEUS_CLIENT_ID"],
	clientSecret: process.env["AMADEUS_SERVICE_SECRET"],
});

// change to amadeus types?
type CleanFlightOffer = {
	id: number;
	itineraries: Array<{
		duration: string;
		segments: Array<{
			departure: {
				iataCode: string;
				at: string;
			};
			arrival: {
				iataCode: string;
				at: string;
			};
			carrierCode: string;
			number: string;
			id: string;
		}>;
		id: string;
	}>;
	price: {
		grandTotal: string;
	};
};

function mapFlightOfferOutput(
	raw: FlightOffersSearchGetResult["data"][number]
): CleanFlightOffer {
	if (raw.price.grandTotal === undefined) {
		throw new Error();
	}
	const idAsNumber = Number(raw["id"]);

	if (!Number.isInteger(idAsNumber)) {
		throw new Error();
	}

	return {
		id: idAsNumber,
		itineraries: raw["itineraries"].map((itinerary, index) => ({
			duration: itinerary.duration,
			segments: itinerary.segments.map((segment) => ({
				departure: {
					iataCode: segment.departure.iataCode,
					at: segment.departure.at,
				},
				arrival: {
					iataCode: segment.arrival.iataCode,
					at: segment.arrival.at,
				},
				carrierCode: segment.carrierCode,
				number: segment.number,
				id: segment.id,
			})),
			id: `${raw["id"]}-itinerary-${index}`,
		})),
		price: {
			grandTotal: raw.price.grandTotal,
		},
	};
}

async function getFlightOffers(
	originLocationCode: string,
	destinationLocationCode: string,
	departureDate: string,
	adults: number
) {
	try {
		const response = await amadeus.shopping.flightOffersSearch.get({
			originLocationCode: originLocationCode,
			destinationLocationCode: destinationLocationCode,
			departureDate: departureDate,
			adults: adults,
		});

		return response.data.map(mapFlightOfferOutput);
	} catch (error: unknown) {
		if (error instanceof ResponseError) {
			console.error(error.code);
		}
		if (error instanceof Error) {
			console.error(error.message);
		}
		throw error;
	}
}
export default getFlightOffers;
