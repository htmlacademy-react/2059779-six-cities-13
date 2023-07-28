import { createReducer } from '@reduxjs/toolkit';
import { selectCity, getOffersBySelectedCity } from './actions';
import { offers } from '../mocks/offers';

const initialState = {
	city: 0,
	offersByCity: offers,
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(selectCity, (state) => {
			state.step = state.step + STEP_COUNT;
		});
});

export { reducer };
