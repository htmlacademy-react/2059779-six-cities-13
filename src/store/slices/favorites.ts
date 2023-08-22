import { createSlice } from '@reduxjs/toolkit';
import { ActionName, RequestStatus, FavoriteChangeRequest } from '../../const';
import { TOffer } from '../../types/offer';
import { fetchFavorites, changeFavorite } from '../thunks/favorites';

type TInitialState = {
	favorites: TOffer[];
	favoritesStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
	favoritesCount: number;
}

const initialState: TInitialState = {
	favorites: [],
	favoritesStatus: RequestStatus.Idle,
	favoritesCount: 0,
};

export const favoritesSlice = createSlice({
	extraReducers: (builder) => {
		builder.
			addCase(fetchFavorites.fulfilled, (state, action) => {
				state.favorites = action.payload;
				state.favoritesStatus = RequestStatus.Success;
				state.favoritesCount = state.favorites.length;
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
						state.favorites.push(action.payload.offer);
						++state.favoritesCount;
						break;
					case FavoriteChangeRequest.Remove:
						state.favorites = state.favorites.filter(({ id }) => id !== action.payload.offer.id);
						--state.favoritesCount;

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
		}
	}
});

export const favoritesActions = { ...favoritesSlice.actions, fetchFavorites, changeFavorite };
