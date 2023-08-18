import { createSlice } from '@reduxjs/toolkit';
import { ActionName, RequestStatus, FavoriteChangeRequest } from '../../const';
import { TFullOffer } from '../../types/offer';
import { fetchFavorites, changeFavorite } from '../thunks/favorites';

type TInitialState = {
	favorites: TFullOffer[];
	count: number;
	favoritesStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: TInitialState = {
	favorites: [],
	count: 0,
	favoritesStatus: RequestStatus.Idle
};

export const favoritesSlice = createSlice({
	extraReducers: (builder) => {
		builder.
			addCase(fetchFavorites.fulfilled, (state, action) => {
				state.favorites = action.payload;
				state.favoritesStatus = RequestStatus.Success;
			}).
			addCase(fetchFavorites.rejected, (state) => {
				state.favoritesStatus = RequestStatus.Failed;
			}).
			addCase(fetchFavorites.pending, (state) => {
				state.favoritesStatus = RequestStatus.Pending;
			}).
			addCase(changeFavorite.fulfilled, (state, action) => {
				state.favoritesStatus = RequestStatus.Success;
				switch (action.payload.status) {
					case FavoriteChangeRequest.Add:
						state.favorites.push(action.payload.status);
						state.count++;
						break;
					case FavoriteChangeRequest.Remove:
						state.favorites = state.favorites.filter(({ offerId }) => offerId !== action.payload.offerId);

				}
			}).
			addCase(changeFavorite.rejected, (state) => {
				state.favoritesStatus = RequestStatus.Failed;
			}).
			addCase(changeFavorite.pending, (state) => {
				state.favoritesStatus = RequestStatus.Pending;
			});
	},
	initialState,
	name: ActionName.Favorites,
	reducers: {
		clear(state) {
			state.favorites = [];
			state.favoritesStatus = RequestStatus.Idle;
			state.count = 0;
		}
	}
});

export const favoritesActions = { ...favoritesSlice.actions, fetchFavorites };
