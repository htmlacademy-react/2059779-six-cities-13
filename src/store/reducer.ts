import { createReducer } from '@reduxjs/toolkit';
import { selectCity, loadOffers } from './actions';
import { fetchOfferAction } from './api-actions';
import { CITIES, RequestStatus } from '../const';
import { TOffer } from '../mocks/offers';

type InitialState = {
	selectedCity: string | undefined;
	offers: TOffer[];
	offersFetchingStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: InitialState = {
	selectedCity: CITIES[0],
	offers: [],
	offersFetchingStatus: RequestStatus.Idle,
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(selectCity, (state, action) => {
			state.selectedCity = action.payload;
		}).
		addCase(loadOffers, (state, action) => {
			state.offers = action.payload;
		}).
		addCase(fetchOfferAction.pending, (state) => {
			state.offersFetchingStatus = RequestStatus.Pending;
		}).
		addCase(fetchOfferAction.fulfilled, (state) => {
			state.offersFetchingStatus = RequestStatus.Success;
		});
});

export { reducer };
