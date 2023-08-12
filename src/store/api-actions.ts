import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from './state';
import { Offer } from '../mocks/offers';
import { loadOffers } from './actions';
import { APIRoute } from '../const';

export const fetchOfferAction = createAsyncThunk<void, undefined, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	'data/fetchQuestions',
	async (_arg, { dispatch, extra: api }) => {
		const { data } = await api.get<Offer[]>(APIRoute.Offers);
		dispatch(loadOffers(data));
	},
);