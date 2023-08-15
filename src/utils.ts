import { TOffer } from './mocks/offers';

function capitalizeFirstLetter(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function getOffersByCity(offers: TOffer[]) {
	const offersByCity: Record<string, TOffer[]> = {};

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

function sortByRating(a: TOffer, b: TOffer) {
	return b.rating - a.rating;
}

function sortPriceLowToHigh(a: TOffer, b: TOffer) {
	return a.price - b.price;
}

function sortPriceHighToLow(a: TOffer, b: TOffer) {
	return b.price - a.price;
}

const sorting = {
	Popular: (cityOffers: TOffer[]) => cityOffers.slice(),
	HighToLow: (cityOffers: TOffer[]) => cityOffers.slice().sort(sortPriceHighToLow),
	LowToHigh: (cityOffers: TOffer[]) => cityOffers.slice().sort(sortPriceLowToHigh),
	TopRated: (cityOffers: TOffer[]) => cityOffers.slice().sort(sortByRating)
};

export { capitalizeFirstLetter, getOffersByCity, sorting };
