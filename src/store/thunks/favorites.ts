import { createAsyncThunk } from '@reduxjs/toolkit';
import { TFullOffer } from '../../types/offer';
import { TThunkAPI } from '../../types/state';
import { APIRoute, ActionName } from '../../const';

type FavoritesChangeRequest = {
	offerId: string;
	status: number;
}

export const fetchFavorites = createAsyncThunk<TFullOffer[], undefined, TThunkAPI>(
	`${ActionName.Favorites}/fetchFavorites`,
	async (_arg, { extra: api }) => {
		const { data } = await api.get<TFullOffer[]>(APIRoute.Favorites);

		return data;
	},
);

export const changeFavorite = createAsyncThunk<TFullOffer[], FavoritesChangeRequest, TThunkAPI>(
	`${ActionName.NearByOffers}/fetchNearByOffers`,
	async ({ offerId, status }, { extra: api }) => {
		const { data } = await api.post<TFullOffer[]>(`${APIRoute.Favorites}/${offerId}/${status}`);
		return data;
	},
);
