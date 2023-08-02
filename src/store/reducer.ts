import { createReducer } from '@reduxjs/toolkit';
import { selectCity } from './actions';
// import { offers } from '../mocks/offers';
// import { getOffersByCity } from '../utils';
import { CITIES } from '../const';

// const offersByCity = getOffersByCity(offers);

type InitialState = {
	selectedCity: string | undefined;
}

const initialState: InitialState = {
	selectedCity: CITIES[0],
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(selectCity, (state, action) => {
			state.selectedCity = action.payload;
		});
});

export { reducer };
