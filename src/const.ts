const CITIES = [
	'Paris',
	'Cologne',
	'Brussels',
	'Amsterdam',
	'Hamburg',
	'Dusseldorf',
];

const OFFER_TYPES = [
	'hotel',
	'apartment',
	'room',
	'cursed old house',
];

const AppRoute = {
	Root: '/',
	Login: '/login',
	Favorites: '/favorites',
	Offer: '/offer',
} as const;

export { CITIES, OFFER_TYPES, AppRoute };
