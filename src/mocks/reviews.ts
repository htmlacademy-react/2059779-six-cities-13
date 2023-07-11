import { faker } from '@faker-js/faker';

const enum ReviewsCount {
	count = 5,
}

type User = {
	name: string;
	avatarUrl: string;
	isPro: boolean;
}

export interface review {
	id: string;
	date: string;
	user: User;
	comment: string;
	rating: number;
}

function getReview() {
	const user: User = {
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

const reviews: review[] = faker.helpers.multiple(getReview, { count: ReviewsCount.count });

export { reviews };
