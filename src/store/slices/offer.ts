import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, ActionName } from '../../const';
import { TOffer, TFullOffer } from '../../types/offer';
import { fetchNearByOffers, fetchOffer } from '../thunks/offers';

type TInitialState = {
	offer: TFullOffer | null;
	offerStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
	nearByOffers: TOffer[];
	nearByOffersStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
	highlightedOffer?: string | null;
}

const initialState: TInitialState = {
	offer: null,
	offerStatus: RequestStatus.Idle,
	nearByOffers: [],
	nearByOffersStatus: RequestStatus.Idle,
	highlightedOffer: null,
};

export const offerSlice = createSlice({
	extraReducers: (builder) => {
		builder.
			addCase(fetchOffer.fulfilled, (state, action) => {
				state.offer = action.payload;
				state.offerStatus = RequestStatus.Success;
			}).
			addCase(fetchOffer.pending, (state) => {
				state.offerStatus = RequestStatus.Pending;
			}).
			addCase(fetchOffer.rejected, (state) => {
				state.offerStatus = RequestStatus.Failed;
			}).
			addCase(fetchNearByOffers.fulfilled, (state, action) => {
				state.nearByOffers = action.payload;
				state.nearByOffersStatus = RequestStatus.Success;
			}).
			addCase(fetchNearByOffers.pending, (state) => {
				state.nearByOffersStatus = RequestStatus.Pending;
			}).
			addCase(fetchNearByOffers.rejected, (state) => {
				state.nearByOffersStatus = RequestStatus.Failed;
			});
	},
	initialState,
	name: ActionName.Offer,
	reducers: {
		clear(state) {
			state.offer = null;
			state.offerStatus = RequestStatus.Idle;
			state.nearByOffers = [];
			state.nearByOffersStatus = RequestStatus.Idle;
			state.highlightedOffer = null;
		},
		highlightOffer(state, action: PayloadAction<string | null>) {
			state.highlightedOffer = action.payload;
		}
	}
});

export const offerActions = { ...offerSlice.actions, fetchNearByOffers, fetchOffer };
