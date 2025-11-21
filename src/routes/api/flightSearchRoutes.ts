import express from "express";
import getFlightOffers from "../../controllers/flightsearch.js";

const router = express.Router();

router.get("/", async (req, res) => {
	const {
		originLocationCode,
		destinationLocationCode,
		departureDate,
		adults,
	} = req.query;

	if (
		typeof originLocationCode !== "string" ||
		typeof destinationLocationCode !== "string" ||
		typeof departureDate !== "string"
	) {
		return res.status(400).json({ error: "Invalid query parameters" });
	}

	if (typeof adults !== "string") {
		return res.status(400).json({ error: "Invalid query parameters" });
	}

	const adultsNumber = Number(adults);

	if (!Number.isInteger(adultsNumber) || adultsNumber <= 0) {
		return res.status(400).json({ error: "Invalid query parameters" });
	}

	try {
		const flightOffers = await getFlightOffers(
			originLocationCode,
			destinationLocationCode,
			departureDate,
			adultsNumber
		);
		return res.json(flightOffers);
	} catch (error: unknown) {
		if (error instanceof Error) {
			return res.status(500).json({ error: error.message });
		}
		return res.status(500).json({ error: "Unknown Error" });
	}
});

export default router;
