import { createReducer } from '@reduxjs/toolkit';
import { selectCity, getOffersBySelectedCity } from './actions';
import { offers } from '../mocks/offers';
import { getOffersByCity } from '../utils';
import { CITIES } from '../const';

const offersByCity = getOffersByCity(offers);

const initialState = {
	city: CITIES[0],
	offersByCity: offersByCity.CITIES[0],
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(selectCity, (state) => {
			state.city = city;
		})
		.addCase(getOffersBySelectedCity, (state) => {
			state.offersByCity = getOffersByCity(offers);
		});
});

export { reducer };
