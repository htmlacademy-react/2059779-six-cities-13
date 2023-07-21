/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { faker } from '@faker-js/faker';
import { CITIES, OFFER_TYPES, OFFER_FEATURES } from '../const';

const enum OffersCount {
	count = 50,
}

const enum ImagesCount {
	count = 10,
}

type Location = {
	latitude: number;
	longitude: number;
	zoom: number;
}

export type City = {
	name: string;
	location: Location;
}

export interface Offer {
	id: string;
	title: string;
	type: string;
	price: number;
	previewImage: string;
	city: City;
	location: Location;
	isFavorite?: boolean;
	isPremium?: boolean;
	rating: number;
}

//Нет ли здесь некосистентности в связи с тем, что выше у меня интерфейс, а здесь тип?
type OfferDetails = {
	bedrooms: number;
	description: string;
	goods: string[];
	host: {
		name: string;
		avatarUrl: string;
		isPro: boolean;
	};
	images: string[];
	maxAdults: number;
}

//По идее нужно выкинуть previewImage.
export type FullOffer = Offer & OfferDetails;

function getOffer(): Offer {
	const location: Location = {
		latitude: faker.location.latitude({ precision: 17 }),
		longitude: faker.location.longitude({ precision: 17 }),
		zoom: faker.number.int({ min: 1, max: 16 })
	};

	const city: City = {
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

function getOfferDetails(): OfferDetails {
	const offerDetailedImages: string[] = Array.from({ length: ImagesCount.count }, () => faker.image.urlLoremFlickr({ width: 260, height: 200, category: 'apartment' }));

	return {
		bedrooms: faker.number.int({ min: 1, max: 4 }),
		description: faker.commerce.productDescription(),
		goods: faker.helpers.arrayElements(OFFER_FEATURES),
		host: {
			name: faker.person.fullName(),
			avatarUrl: faker.image.avatar(),
			isPro: faker.datatype.boolean()
		},
		images: faker.helpers.arrayElements(offerDetailedImages),
		maxAdults: faker.number.int({ min: 1, max: 8 }),
	};
}

const offers: Offer[] = faker.helpers.multiple(getOffer, { count: OffersCount.count });

const fullOffers: FullOffer[] = offers.map((item) => ({ ...item, ...getOfferDetails() }));

export { offers, fullOffers };
