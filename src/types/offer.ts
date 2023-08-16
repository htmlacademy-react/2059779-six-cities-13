type TLocation = {
	latitude: number;
	longitude: number;
	zoom: number;
}

export type TCity = {
	name: string;
	location: TLocation;
}

export type TOffer = {
	id: string;
	title: string;
	type: string;
	price: number;
	previewImage: string;
	city: TCity;
	location: TLocation;
	isFavorite?: boolean;
	isPremium?: boolean;
	rating: number;
}

export type TFullOffer = {
	id: string;
	title: string;
	type: string;
	price: number;
	city: TCity;
	location: TLocation;
	isFavorite?: boolean;
	isPremium?: boolean;
	rating: number;
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
