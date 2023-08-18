export type TUser = {
	name: string;
	avatarUrl: string;
	isPro: boolean;
	email: string;
	token: string;
}

export type TAuthStatus = 'AUTH' | 'NO_AUTH' | 'UNKNOWN';

export type TLoginData = {
	email: string;
	password: string;
};
