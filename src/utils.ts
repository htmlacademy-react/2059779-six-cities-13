import { Offer } from './mocks/offers';

function capitalizeFirstLetter(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function getOffersByCity(offers: Offer[]) {
	const offersByCity: Record<string, Offer[]> = {};

	for (const offer of offers) {
		const city = offer.city.name;

		if (city in offersByCity) {
			offersByCity[city].push(offer);
			continue;
		}
		offersByCity[city] = [offer];
		continue;
	}

	return offersByCity;
}

export { capitalizeFirstLetter, getOffersByCity };
