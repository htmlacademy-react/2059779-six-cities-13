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

const URL_MARKER_DEFAULT = './img/pin.svg';
const URL_MARKER_CURRENT = './img/pin-active.svg';

const MAX_OFFER_IMAGES = 6;
const MAX_REVIEW_COUNT = 10;

type AuthorizationStatusKey = keyof typeof AuthorizationStatus;
type AuthorizationStatusValue = typeof AuthorizationStatus[AuthorizationStatusKey]

export type { AuthorizationStatusValue };

export {
	CITIES,
	OFFER_TYPES,
	OFFER_FEATURES,
	AppRoute,
	AuthorizationStatus,
	URL_MARKER_CURRENT,
	URL_MARKER_DEFAULT,
	MAX_OFFER_IMAGES,
	MAX_REVIEW_COUNT
};
