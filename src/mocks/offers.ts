/* import { faker } from '@faker-js/faker';

const randomName = faker.person.fullName(); */

export interface IOffer {
	id: number;
	title: string;
	type: string;
	price: number;
	previewImage: string;
	city?: string;
	isFavorite: boolean;
	isPremium: boolean;
	rating: number;
}

//Может города и типы сделать литеральными типами тоже?
const offers: IOffer[] = [
	{
		id: 1,
		title: 'Beautiful & luxurious apartment at great location',
		type: 'Apartment',
		price: 120,
		previewImage: 'img/apartment-01.jpg',
		city: 'Amsterdam',
		isFavorite: false,
		isPremium: true,
		rating: 4,
	},
	{
		id: 2,
		title: 'Wood and stone place',
		type: 'Private room',
		price: 80,
		previewImage: 'img/room.jpg',
		city: 'Amsterdam',
		isFavorite: true,
		isPremium: false,
		rating: 4,
	},
	{
		id: 3,
		title: 'Canal View Prinsengracht',
		type: 'Apartment',
		price: 132,
		previewImage: 'img/apartment-02.jpg',
		city: 'Amsterdam',
		isFavorite: false,
		isPremium: false,
		rating: 4,
	},
	{
		id: 4,
		title: 'Nice, cozy, warm big bed apartment',
		type: 'Apartment',
		price: 180,
		previewImage: 'img/apartment-03.jpg',
		city: 'Amsterdam',
		isFavorite: false,
		isPremium: true,
		rating: 5,
	},
	{
		id: 5,
		title: 'Wood and stone place',
		type: 'Private room',
		price: 80,
		previewImage: 'img/room.jpg',
		city: 'Amsterdam',
		isFavorite: true,
		isPremium: false,
		rating: 4,
	}
];

export { offers };
