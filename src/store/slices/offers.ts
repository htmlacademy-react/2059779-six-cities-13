import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, ActionName } from '../../const';
import { TOffer } from '../../types/offer';
import { fetchOffers } from '../thunks/offers';
import { CITIES } from '../../const';

type TInitialState = {
	selectedCity: string;
	offers: TOffer[];
	status: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: TInitialState = {
	selectedCity: CITIES[0],
	offers: [],
	status: RequestStatus.Idle,
};

export const offersSlice = createSlice({
	extraReducers: (builder) => {
		builder.
			addCase(fetchOffers.fulfilled, (state, action) => {
				state.offers = action.payload;
				state.status = RequestStatus.Success;
			}).
			addCase(fetchOffers.pending, (state) => {
				state.status = RequestStatus.Pending;
			}).
			addCase(fetchOffers.rejected, (state) => {
				state.status = RequestStatus.Failed;
			});
	},
	initialState,
	name: ActionName.Offers,
	reducers: {
		clear(state) {
			state.offers = [];
		},
		selectCity(state, action: PayloadAction<string>) {
			state.selectedCity = action.payload;
		}
	}
});

export const offersActions = { ...offersSlice.actions, fetchOffers };
