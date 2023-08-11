import { createReducer } from '@reduxjs/toolkit';
import { selectCity, getOffers, loadOffers } from './actions';
import { CITIES } from '../const';
import { offers, Offer } from '../mocks/offers';

type InitialState = {
	selectedCity: string | undefined;
	offers: Offer[];
}

const initialState: InitialState = {
	selectedCity: CITIES[0],
	offers: offers,
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(selectCity, (state, action) => {
			state.selectedCity = action.payload;
		})
		.addCase(getOffers, (state) => {
			state.offers = offers;
		}).
		addCase(loadOffers, (state, action) => {
			state.offers = action.payload;
		});
});

export { reducer };
