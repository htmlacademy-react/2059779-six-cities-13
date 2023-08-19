import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOffer } from '../../types/offer';
import { TThunkAPI } from '../../types/state';
import { APIRoute, ActionName } from '../../const';

type FavoritesChangeRequest = {
	offerId: string;
	status: number;
}


//На самом деле ответ это полный оффер, но я опять не понимаю по типам
type FavoriteChangeResponse = {
	offer: TOffer;
	status: number;
}

export const fetchFavorites = createAsyncThunk<TOffer[], undefined, TThunkAPI>(
	`${ActionName.Favorites}/fetchFavorites`,
	async (_arg, { extra: api }) => {
		const { data } = await api.get<TOffer[]>(APIRoute.Favorites);

		return data;
	},
);

export const changeFavorite = createAsyncThunk<FavoriteChangeResponse, FavoritesChangeRequest, TThunkAPI>(
	`${ActionName.NearByOffers}/fetchNearByOffers`,
	async ({ offerId, status }, { extra: api }) => {
		const response = await api.post<TOffer>(`${APIRoute.Favorites}/${offerId}/${status}`);
		return { offer: response.data, status};
	},
);
