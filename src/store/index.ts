import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { offersSlice } from './slices/offers';
import { offerSlice } from './slices/offer';
import { reviewsSlice } from './slices/reviews';

const reducer = combineReducers({
	[offersSlice.name]: offersSlice.reducer,
	[offerSlice.name]: offerSlice.reducer,
	[reviewsSlice.name]: reviewsSlice.reducer,
});

export const api = createAPI();

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: api,
			},
		}),
});
