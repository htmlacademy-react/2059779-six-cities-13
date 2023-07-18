const CITIES = [
	'Paris',
	'Cologne',
	'Brussels',
	'Amsterdam',
	'Hamburg',
	'Dusseldorf',
] as const;

const OFFER_TYPES = [
	'hotel',
	'apartment',
	'room',
	'cursed old house',
] as const;

const OFFER_FEATURES = [
	'Wi-Fi',
	'Heating',
	'Kitchen',
	'Fridge',
	'Washing machine',
	'Coffee machine',
	'Dishwasher',
	'Towels',
	'Baby seat',
	'Cabel TV',
	'Friendly Ghost'
] as const;

const AppRoute = {
	Main: '/',
	Login: '/login',
	Favorites: '/favorites',
	Offer: '/offer',
} as const;

const AuthorizationStatus = {
	Auth: 'AUTH',
	NoAuth: 'NO_AUTH',
	Unknown: 'UNKNOWN',
} as const;

type AuthorizationStatusKey = keyof typeof AuthorizationStatus;
type AuthorizationStatusValue = typeof AuthorizationStatus[AuthorizationStatusKey]

export type { AuthorizationStatusValue };

export { CITIES, OFFER_TYPES, OFFER_FEATURES, AppRoute, AuthorizationStatus };
