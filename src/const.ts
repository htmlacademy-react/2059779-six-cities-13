import { faker } from '@faker-js/faker';

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

const APIRoute = {
	Offers: '/offers',
	NearByOffers: '/nearby',
	Favorites: '/favorite',
	Reviews: '/comments',
	Login: '/login',
	Logout: '/logout'
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

const REVIEW_DATE_FORMATE = {
	year: <'numeric' | '2-digit' | undefined>'numeric',
	month: <'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined>'long'
};

type TAuthorizationStatusKey = keyof typeof AuthorizationStatus;
type TAuthorizationStatusValue = typeof AuthorizationStatus[TAuthorizationStatusKey]

export type { TAuthorizationStatusValue };

const AUTH_STATUS = faker.datatype.boolean();

const SortingMap = {
	Popular: 'Popular',
	LowToHigh: 'Price: low to high',
	HighToLow: 'Price: high to low',
	TopRated: 'Top rated first',
} as const;

const RequestStatus = {
	Idle: 'idle',
	Pending: 'pending',
	Success: 'succeeded',
	Failed: 'failed'
} as const;

const enum ActionName {
	Offer = 'OFFER',
	Offers = 'OFFERS',
	NearByOffers = 'NEAR_OFFERS',
	Favorites = 'Favorites',
	Reviews = 'REVIEWS',
	User = 'USER'
}

export {
	CITIES,
	OFFER_TYPES,
	OFFER_FEATURES,
	AppRoute,
	APIRoute,
	AuthorizationStatus,
	URL_MARKER_CURRENT,
	URL_MARKER_DEFAULT,
	MAX_OFFER_IMAGES,
	MAX_REVIEW_COUNT,
	REVIEW_DATE_FORMATE,
	AUTH_STATUS,
	SortingMap,
	RequestStatus,
	ActionName
};
