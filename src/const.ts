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
	Offers: '/offers',
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
const MAX_NEARBY_OFFERS = 3;

const REVIEW_DATE_FORMATE = {
	year: <'numeric' | '2-digit' | undefined>'numeric',
	month: <'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined>'long'
};

const REVIEW_DATE_ATTRIBUTE_FORMATE = {
	year: <'numeric' | '2-digit' | undefined>'numeric',
	month: <'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined>'2-digit',
	day: <'numeric' | '2-digit' | undefined>'2-digit',
};

type TAuthorizationStatusKey = keyof typeof AuthorizationStatus;
type TAuthorizationStatusValue = typeof AuthorizationStatus[TAuthorizationStatusKey]

export type { TAuthorizationStatusValue };

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

const FavoriteChangeRequest = {
	Add: 1,
	Remove: 0
};

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
	MAX_NEARBY_OFFERS,
	REVIEW_DATE_FORMATE,
	REVIEW_DATE_ATTRIBUTE_FORMATE,
	SortingMap,
	RequestStatus,
	ActionName,
	FavoriteChangeRequest
};
