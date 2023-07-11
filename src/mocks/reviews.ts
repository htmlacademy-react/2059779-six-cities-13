import { faker } from '@faker-js/faker';

const REVIEWS_COUNT = 5;

type user = {
	name: string;
	avatarUrl: string;
	isPro: boolean;
}

type review = {
	id: string;
	date: string;
	user: user;
	comment: string;
	rating: number;
}

function getReview() {
	const user: user = {
		name: faker.person.fullName(),
		avatarUrl: faker.image.avatar(),
		isPro: faker.datatype.boolean()
	};

	return {
		id: faker.string.uuid(),
		date: faker.date.recent().toString(),
		user: user,
		comment: faker.commerce.productDescription(),
		rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
	};
}

const reviews: review[] = faker.helpers.multiple(getReview, { count: REVIEWS_COUNT });

export { reviews };
