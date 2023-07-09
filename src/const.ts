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
	Main: '/',
	Login: '/login',
	Favorites: '/favorites',
	Offer: '/offer',
} as const;

type AuthorizationStatus = {
	Auth: string;
	NoAuth: string;
	Unknown: string;
}

const AuthorizationStatus: AuthorizationStatus = {
	Auth: 'AUTH',
	NoAuth: 'NO_AUTH',
	Unknown: 'UNKNOWN',
} as const;

export { CITIES, OFFER_TYPES, AppRoute, AuthorizationStatus };
