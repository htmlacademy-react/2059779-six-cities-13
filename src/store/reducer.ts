import { createReducer } from '@reduxjs/toolkit';
import { selectCity, dropOffer } from './actions';
import { fetchOffers, fetchOffer, fetchNearByOffers } from './api-actions';
import { CITIES, RequestStatus } from '../const';
import { TOffer, TFullOffer } from '../types/offer';

type InitialState = {
	selectedCity: string | undefined;
	offers: TOffer[];
	offer: TFullOffer | null;
	nearByOffers: TOffer[];
	offersFetchingStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
	offerFetchingStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: InitialState = {
	selectedCity: CITIES[0],
	offers: [],
	offer: null,
	nearByOffers: [],
	offersFetchingStatus: RequestStatus.Idle,
	offerFetchingStatus: RequestStatus.Idle,
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(selectCity, (state, action) => {
			state.selectedCity = action.payload;
		}).
		addCase(fetchOffers.pending, (state) => {
			state.offersFetchingStatus = RequestStatus.Pending;
		}).
		addCase(fetchOffers.fulfilled, (state, action) => {
			state.offers = action.payload;
			state.offersFetchingStatus = RequestStatus.Success;
		}).
		addCase(fetchOffer.pending, (state) => {
			state.offerFetchingStatus = RequestStatus.Pending;
		}).
		addCase(fetchOffer.fulfilled, (state, action) => {
			state.offer = action.payload;
			state.offerFetchingStatus = RequestStatus.Success;
		}).
		addCase(fetchNearByOffers.fulfilled, (state, action) => {
			state.nearByOffers = action.payload;
		}).
		addCase(dropOffer, (state) => {
			state.offer = null;
		});
});

export { reducer };
