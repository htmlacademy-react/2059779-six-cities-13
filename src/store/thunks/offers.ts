import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOffer, TFullOffer } from '../../types/offer';
import { TThunkAPI } from '../../types/state';
import { APIRoute, ActionName } from '../../const';

export const fetchOffers = createAsyncThunk<TOffer[], undefined, TThunkAPI>(
	`${ActionName.Offers}/fetchOffers`,
	async (_arg, { extra: api }) => {
		const { data } = await api.get<TOffer[]>(APIRoute.Offers);

		return data;
	},
);

export const fetchOffer = createAsyncThunk<TFullOffer, TFullOffer['id'], TThunkAPI>(
	`${ActionName.Offers}/fetchOffer`,
	async (offerId, { extra: api }) => {
		const { data } = await api.get<TFullOffer>(`${APIRoute.Offers}/${offerId}`);

		return data;
	},
);

export const fetchNearByOffers = createAsyncThunk<TOffer[], TOffer['id'], TThunkAPI>(
	`${ActionName.NearByOffers}/fetchNearByOffers`,
	async (offerId, { extra: api }) => {
		const { data } = await api.get<TOffer[]>(`${APIRoute.Offers}/${offerId}${APIRoute.NearByOffers}`);
		return data;
	},
);

