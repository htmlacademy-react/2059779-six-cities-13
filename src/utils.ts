import { TFullOffer, TOffer } from './types/offer';

function capitalizeFirstLetter(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function getOffersByCity<O extends TOffer | TFullOffer>(offers: O[]) {
	const offersByCity: Record<string, O[]> = {};

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

function getMultipleRandomArrayElements<El>(arr: El[] | readonly El[], num: number) {
	const shuffled: El[] = [...arr].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, num);
}

function getRandomArrayElement<El>(arr: El[] | readonly El[]) {
	return arr[Math.floor(Math.random() * arr.length)];
}

const pluralIntl = new Intl.PluralRules('en-US');

export {
	capitalizeFirstLetter,
	getOffersByCity,
	sorting,
	getMultipleRandomArrayElements,
	getRandomArrayElement,
	pluralIntl
};
