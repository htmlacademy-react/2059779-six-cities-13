/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { faker } from '@faker-js/faker';
import { CITIES, OFFER_TYPES } from '../const';

const OFFERS_COUNT = 5;

type location = {
	latitude: number;
	longitude: number;
	zoom: number;
}

type city = {
	name: string;
	location: location;
}

export interface offer {
	id: string;
	title: string;
	type: string;
	price: number;
	previewImage: string;
	city: city;
	isFavorite: boolean;
	isPremium: boolean;
	rating: number;
}

function getOffer() {
	const location: location = {
		latitude: faker.location.latitude({ precision: 17 }),
		longitude: faker.location.longitude({ precision: 17 }),
		zoom: faker.number.int({ min: 1, max: 16 })
	};

	const city: city = {
		name: faker.helpers.arrayElement((CITIES)),
		location: location,
	};

	return {
		id: faker.string.uuid(),
		title: faker.word.words({ count: { min: 5, max: 10 } }),
		type: faker.helpers.arrayElement((OFFER_TYPES)),
		price: faker.number.int({ min: 20, max: 300 }),
		previewImage: faker.image.urlLoremFlickr({ width: 260, height: 200, category: 'apartment' }),
		city: city,
		location: location,
		isFavorite: faker.datatype.boolean(),
		isPremium: faker.datatype.boolean(),
		rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
	};
}

const offers: offer[] = faker.helpers.multiple(getOffer, { count: OFFERS_COUNT });

export { offers };
