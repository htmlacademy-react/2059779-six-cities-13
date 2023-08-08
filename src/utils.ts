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

function sortByRating(a: Offer, b: Offer) {
	return b.rating - a.rating;
}

function sortPriceLowToHigh(a: Offer, b: Offer) {
	return a.price - b.price;
}

function sortPriceHighToLow(a: Offer, b: Offer) {
	return b.price - a.price;
}

const sorting = {
	Popular: (cityOffers: Offer[]) => cityOffers.slice(),
	HighToLow: (cityOffers: Offer[]) => cityOffers.slice().sort(sortPriceHighToLow),
	LowToHigh: (cityOffers: Offer[]) => cityOffers.slice().sort(sortPriceLowToHigh),
	TopRated: (cityOffers: Offer[]) => cityOffers.slice().sort(sortByRating)
};

export { capitalizeFirstLetter, getOffersByCity, sorting };
